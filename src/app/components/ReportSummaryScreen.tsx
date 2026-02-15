import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Language, MaintenanceSession } from '../types';
import { getTranslation } from '../i18n';

interface ReportSummaryScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  session: MaintenanceSession;
  language: Language;
}

export const ReportSummaryScreen: React.FC<ReportSummaryScreenProps> = ({
  onGoBack,
  onNavigate,
  session,
  language
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const duration = session.endTime ? session.endTime - session.startTime : 0;
  const resolvedIssues = session.issues.filter(i => i.resolved).length;
  
  const handleExportTXT = () => {
    const content = `
KONE Maintenance Report
========================
Elevator ID: ${session.elevatorId}
Technician: ${session.technicianName}
Date: ${formatDate(session.startTime)}
Start Time: ${formatTime(session.startTime)}
End Time: ${formatTime(session.endTime || Date.now())}
Duration: ${formatDuration(duration)}

Issues (${resolvedIssues}/${session.issues.length} resolved):
${session.issues.map(i => `- [${i.resolved ? 'X' : ' '}] ${i.description}`).join('\n')}

Floors Visited:
${session.floorsVisited.map(f => `Floor ${f.floor}: ${Math.floor(f.timeSpent / 60)}m ${f.timeSpent % 60}s`).join('\n')}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maintenance-report-${session.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'sessionReport')}</h1>
            <p className="text-sm text-[#005EB8]">{session.elevatorId}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-3">Session Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'date')}:</span>
              <span className="text-gray-900 font-medium">{formatDate(session.startTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'startTime')}:</span>
              <span className="text-gray-900 font-medium">{formatTime(session.startTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'endTime')}:</span>
              <span className="text-gray-900 font-medium">{formatTime(session.endTime || Date.now())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'totalDuration')}:</span>
              <span className="text-gray-900 font-medium font-mono">{formatDuration(duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'issuesResolved')}:</span>
              <span className="text-gray-900 font-medium">{resolvedIssues} / {session.issues.length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-3">{getTranslation(language, 'floorsVisited')}</h2>
          <div className="space-y-2">
            {session.floorsVisited.map((fv) => (
              <div key={fv.floor} className="flex justify-between items-center text-sm">
                <span className="text-gray-900">{getTranslation(language, 'floor')} {fv.floor}</span>
                <span className="text-gray-600 font-mono">
                  {Math.floor(fv.timeSpent / 60)}:{String(fv.timeSpent % 60).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-2">{getTranslation(language, 'movementAnalysis')}</h2>
          <p className="text-xs text-gray-600 mb-3">Heat maps show where the technician worked during the session</p>
          <div className="space-y-2">
            <button
              onClick={() => onNavigate({ type: 'vertical-heatmap', params: { sessionId: session.id } })}
              className="w-full px-4 py-2 bg-[#005EB8] text-white text-sm hover:bg-[#004a94]"
            >
              {getTranslation(language, 'viewVerticalHeatMap')}
            </button>
            {session.floorsVisited.map((fv) => (
              <button
                key={fv.floor}
                onClick={() => onNavigate({ type: 'floor-heatmap', params: { sessionId: session.id, floor: fv.floor } })}
                className="w-full px-4 py-2 border border-gray-300 text-sm text-gray-900 hover:border-[#005EB8]"
              >
                {getTranslation(language, 'viewFloorHeatMap')} {fv.floor}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-2">Export Options</h2>
          <p className="text-xs text-gray-600 mb-3">Reports are stored locally on the device</p>
          <button
            onClick={handleExportTXT}
            className="w-full px-4 py-2 border border-gray-300 text-sm text-gray-900 hover:border-[#005EB8] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {getTranslation(language, 'exportTXT')}
          </button>
        </div>
        
        <button
          onClick={() => onNavigate({ type: 'dashboard' })}
          className="w-full px-4 py-3 bg-gray-200 text-gray-900 font-medium hover:bg-gray-300"
        >
          {getTranslation(language, 'backToDashboard')}
        </button>
      </div>
    </>
  );
};
