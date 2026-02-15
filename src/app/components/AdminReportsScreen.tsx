import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Map, AlertCircle } from 'lucide-react';
import { Language, MaintenanceSession, Elevator } from '../types';
import { getTranslation } from '../i18n';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AdminReportsScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  language: Language;
  elevators: Elevator[];
  elevatorId?: string;
  floor?: number;
}

export const AdminReportsScreen: React.FC<AdminReportsScreenProps> = ({
  onGoBack,
  onNavigate,
  language,
  elevators,
  elevatorId,
  floor
}) => {
  const [sessions, setSessions] = useState<MaintenanceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedElevator, setSelectedElevator] = useState<string>(elevatorId || 'all');
  const [backendOffline, setBackendOffline] = useState(false);
  
  useEffect(() => {
    fetchSessions();
  }, [selectedElevator]);
  
  const fetchSessions = async () => {
    try {
      const url = selectedElevator === 'all'
        ? `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/sessions`
        : `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/elevators/${selectedElevator}/sessions`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        let filteredSessions = Array.isArray(data) ? data : [data];
        
        // Filter by floor if specified
        if (floor) {
          filteredSessions = filteredSessions.filter(s =>
            s.floorsVisited.some((fv: any) => fv.floor === floor)
          );
        }
        
        setSessions(filteredSessions);
        setBackendOffline(false);
        console.log(`✅ Loaded ${filteredSessions.length} sessions from backend`);
      } else {
        console.warn('⚠️ Could not load sessions from backend');
        setSessions([]);
        setBackendOffline(true);
      }
    } catch (error) {
      console.warn('⚠️ Backend not available - no sessions to display');
      setSessions([]);
      setBackendOffline(true);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'adminDashboard')}</h1>
            <p className="text-sm text-gray-600">
              {floor ? `${getTranslation(language, 'floor')} ${floor} - ${getTranslation(language, 'backReports')}` : getTranslation(language, 'backReports')}
            </p>
          </div>
        </div>
        
        <select
          value={selectedElevator}
          onChange={(e) => setSelectedElevator(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 text-sm"
        >
          <option value="all">All Elevators</option>
          {elevators.map(e => (
            <option key={e.id} value={e.id}>{e.id} - {e.building}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading reports...</div>
        ) : sessions.length === 0 ? (
          <div className="bg-gray-50 border border-gray-300 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              {floor 
                ? `No maintenance records for Floor ${floor} yet`
                : getTranslation(language, 'noReports')
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Technician sessions will appear here once maintenance work is completed.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => {
              // Get the specific floor data if viewing floor-specific reports
              const floorData = floor ? session.floorsVisited.find(fv => fv.floor === floor) : null;
              
              return (
                <div key={session.id} className="bg-white border border-gray-300 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[#005EB8] font-medium">{session.elevatorId}</p>
                      <p className="text-sm text-gray-600">Technician: {session.technicianName}</p>
                      <p className="text-xs text-gray-500">{formatDate(session.startTime)}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      {floorData ? (
                        <>
                          <p className="text-[#005EB8] font-medium">Floor {floor}</p>
                          <p>{Math.floor(floorData.timeSpent / 60)}m {floorData.timeSpent % 60}s</p>
                        </>
                      ) : (
                        <>
                          <p>{session.floorsVisited.length} floors</p>
                          <p>{session.issues.filter(i => i.resolved).length}/{session.issues.length} issues</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {floor ? (
                      <button
                        onClick={() => onNavigate({ type: 'floor-heatmap', params: { sessionId: session.id, floor } })}
                        className="flex-1 px-3 py-2 bg-[#005EB8] text-white text-sm hover:bg-[#004a94] flex items-center justify-center gap-2"
                      >
                        <Map className="w-4 h-4" />
                        Floor {floor} Heat Map
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate({ type: 'vertical-heatmap', params: { sessionId: session.id } })}
                        className="flex-1 px-3 py-2 bg-[#005EB8] text-white text-sm hover:bg-[#004a94] flex items-center justify-center gap-2"
                      >
                        <Map className="w-4 h-4" />
                        Vertical Map
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate({ type: 'report-summary', params: { sessionId: session.id } })}
                      className="flex-1 px-3 py-2 border border-gray-300 text-sm text-gray-900 hover:border-[#005EB8] flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Full Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
