import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { Language, Issue, MovementPoint } from '../types';
import { getTranslation } from '../i18n';

interface FloorMaintenanceScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  elevatorId: string;
  floor: number;
  language: Language;
  sessionActive: boolean;
  onStartSession: () => void;
  onEndSession: () => Promise<string | null>;
  issues: Issue[];
  onAddIssue: (description: string) => void;
  onToggleIssue: (issueId: string) => void;
  onRecordMovement: (point: MovementPoint) => void;
}

export const FloorMaintenanceScreen: React.FC<FloorMaintenanceScreenProps> = ({
  onGoBack,
  onNavigate,
  elevatorId,
  floor,
  language,
  sessionActive,
  onStartSession,
  onEndSession,
  issues,
  onAddIssue,
  onToggleIssue,
  onRecordMovement
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [newIssue, setNewIssue] = useState('');
  const startTimeRef = useRef<number | null>(null);
  const movementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wakeLockRef = useRef<any>(null);
  
  // Prevent browser back button during active session
  useEffect(() => {
    if (!sessionActive) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Maintenance session is active! Please end the session before leaving.';
      return e.returnValue;
    };
    
    const handlePopState = (e: PopStateEvent) => {
      if (sessionActive) {
        const confirmLeave = window.confirm(
          'Maintenance session is active! You must end the maintenance session before leaving. Stay on this page?'
        );
        if (confirmLeave) {
          window.history.pushState(null, '', window.location.href);
        }
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [sessionActive]);
  
  // Keep screen awake during maintenance using Wake Lock API
  useEffect(() => {
    const requestWakeLock = async () => {
      if (sessionActive && 'wakeLock' in navigator) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          console.log('🔒 Screen wake lock activated - phone will stay on during maintenance');
        } catch (err) {
          console.log('Wake lock not available:', err);
        }
      }
    };
    
    if (sessionActive) {
      requestWakeLock();
    }
    
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().then(() => {
          console.log('🔓 Screen wake lock released');
        });
        wakeLockRef.current = null;
      }
    };
  }, [sessionActive]);
  
  useEffect(() => {
    if (sessionActive) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      
      const timer = setInterval(() => {
        if (startTimeRef.current) {
          setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
      }, 1000);
      
      // Simulate movement recording every 5 seconds
      movementIntervalRef.current = setInterval(() => {
        // Simulate random position in 1.5m x 1.5m elevator
        const x = Math.random() * 1.5;
        const y = Math.random() * 1.5;
        const z = (floor - 1) * 3; // 3m per floor
        
        onRecordMovement({
          timestamp: Date.now(),
          x,
          y,
          z,
          floor
        });
      }, 5000);
      
      return () => {
        clearInterval(timer);
        if (movementIntervalRef.current) {
          clearInterval(movementIntervalRef.current);
        }
      };
    } else {
      startTimeRef.current = null;
      setElapsedTime(0);
    }
  }, [sessionActive, floor, onRecordMovement]);
  
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const handleAddIssue = () => {
    if (newIssue.trim()) {
      onAddIssue(newIssue);
      setNewIssue('');
    }
  };
  
  const handleEndMaintenance = async () => {
    if (movementIntervalRef.current) {
      clearInterval(movementIntervalRef.current);
    }
    const sessionId = await onEndSession();
    if (sessionId) {
      onNavigate({ type: 'report-summary', params: { sessionId } });
    }
  };
  
  const handleBackClick = () => {
    if (sessionActive) {
      const confirmLeave = window.confirm(
        'Maintenance session is active! You must end the maintenance session before leaving. Do you want to continue your work?'
      );
      if (!confirmLeave) {
        return; // Stay on the page
      }
    }
    onGoBack();
  };
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBackClick} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">
              {getTranslation(language, 'floor')} {floor}
            </h1>
            <p className="text-sm text-[#005EB8]">{elevatorId}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {!sessionActive ? (
          <div className="h-full flex items-center justify-center p-6">
            <button
              onClick={onStartSession}
              className="px-8 py-4 bg-[#005EB8] text-white font-medium hover:bg-[#004a94]"
            >
              {getTranslation(language, 'startMaintenance')}
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-green-100 border border-green-300 p-3 mb-3">
              <p className="text-green-800 font-medium text-sm">
                {getTranslation(language, 'maintenanceActive')}
              </p>
              <p className="text-green-700 text-2xl font-mono mt-1">
                {formatTime(elapsedTime)}
              </p>
            </div>
            
            <div className="bg-orange-50 border border-orange-300 p-3 mb-4">
              <p className="text-orange-800 text-xs font-medium">
                ⚠️ Session Locked - You cannot leave this screen until you end the maintenance session. The phone screen will stay awake.
              </p>
            </div>
            
            <div className="bg-white border border-gray-300 p-4 mb-4">
              <h2 className="font-medium text-gray-900 mb-3">{getTranslation(language, 'issues')}</h2>
              <div className="space-y-2 mb-4">
                {issues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => onToggleIssue(issue.id)}
                    className="w-full flex items-start gap-3 p-2 hover:bg-gray-50 text-left"
                  >
                    {issue.resolved ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={issue.resolved ? 'text-gray-500 line-through' : 'text-gray-900'}>
                      {issue.description}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={getTranslation(language, 'addNewIssue')}
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddIssue()}
                  className="flex-1 px-3 py-2 border border-gray-300 text-sm"
                />
                <button
                  onClick={handleAddIssue}
                  className="px-4 py-2 bg-[#005EB8] text-white text-sm hover:bg-[#004a94]"
                >
                  {getTranslation(language, 'add')}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleEndMaintenance}
              className="w-full px-4 py-3 bg-red-600 text-white font-medium hover:bg-red-700"
            >
              {getTranslation(language, 'endMaintenance')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
