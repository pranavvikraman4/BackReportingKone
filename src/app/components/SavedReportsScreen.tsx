import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Language, MaintenanceSession } from '../types';
import { getTranslation } from '../i18n';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface SavedReportsScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  language: Language;
}

export const SavedReportsScreen: React.FC<SavedReportsScreenProps> = ({
  onGoBack,
  onNavigate,
  language
}) => {
  const [sessions, setSessions] = useState<MaintenanceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  
  useEffect(() => {
    fetchSessions();
  }, []);
  
  const fetchSessions = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/sessions`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
        setBackendOffline(false);
        console.log(`✅ Loaded ${data.length} sessions from backend`);
      } else {
        console.warn('⚠️ Could not load sessions from backend');
        setSessions([]);
        setBackendOffline(true);
      }
    } catch (error) {
      console.warn('⚠️ Backend not available - no saved sessions to display');
      setSessions([]);
      setBackendOffline(true);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'savedReports')}</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading reports...</div>
        ) : sessions.length === 0 ? (
          <div className="bg-gray-50 border border-gray-300 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{getTranslation(language, 'noReports')}</p>
            <p className="text-sm text-gray-500 mt-2">
              Complete a maintenance session to see reports here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onNavigate({ type: 'report-summary', params: { sessionId: session.id } })}
                className="w-full bg-white border border-gray-300 p-4 text-left hover:border-[#005EB8] transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#005EB8] font-medium">{session.elevatorId}</p>
                    <p className="text-sm text-gray-600">{session.technicianName}</p>
                  </div>
                  <span className="text-xs text-gray-600">{formatDate(session.startTime)}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>{formatTime(session.startTime)} - {formatTime(session.endTime || Date.now())}</span>
                  <span>• {session.floorsVisited.length} floors</span>
                  <span>• {session.issues.filter(i => i.resolved).length}/{session.issues.length} issues resolved</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
