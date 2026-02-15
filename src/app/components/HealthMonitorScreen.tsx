import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Check } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n';

interface HealthMonitorScreenProps {
  onGoBack: () => void;
  language: Language;
  onAcknowledge: () => void;
}

export const HealthMonitorScreen: React.FC<HealthMonitorScreenProps> = ({
  onGoBack,
  language,
  onAcknowledge
}) => {
  const [timeUntilNext, setTimeUntilNext] = useState(30 * 60); // 30 minutes in seconds
  const [lastCheck, setLastCheck] = useState(Date.now());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilNext(prev => {
        if (prev <= 0) return 30 * 60;
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    if (seconds < 0) {
      const absSeconds = Math.abs(seconds);
      const mins = Math.floor(absSeconds / 60);
      return `${mins} min`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleAcknowledge = () => {
    setTimeUntilNext(30 * 60);
    setLastCheck(Date.now());
    onAcknowledge();
  };
  
  const nextCheck = lastCheck + (30 * 60 * 1000);
  const isOverdue = timeUntilNext < 0;
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'healthMonitor')}</h1>
            <p className="text-sm text-gray-600">{getTranslation(language, 'safetyCheck')}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-6 mb-4 text-center">
          <Heart className="w-16 h-16 text-[#005EB8] mx-auto mb-3" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            {getTranslation(language, 'healthCheckActive')}
          </h2>
          <p className="text-sm text-gray-600">
            Regular safety checks ensure technician well-being during maintenance work
          </p>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-3">
            {isOverdue ? getTranslation(language, 'overdue') : getTranslation(language, 'nextCheckIn')}
          </h3>
          <div className={`text-5xl font-mono mb-2 ${isOverdue ? 'text-red-600' : 'text-[#005EB8]'}`}>
            {isOverdue && '- '}{formatTime(Math.abs(timeUntilNext))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-600">{getTranslation(language, 'lastCheck')}</p>
              <p className="text-gray-900 font-medium">{formatDateTime(lastCheck)}</p>
            </div>
            <div>
              <p className="text-gray-600">{getTranslation(language, 'nextCheck')}</p>
              <p className="text-gray-900 font-medium">{formatDateTime(nextCheck)}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleAcknowledge}
          className="w-full px-4 py-4 bg-green-600 text-white font-medium hover:bg-green-700 flex items-center justify-center gap-2 mb-4"
        >
          <Check className="w-5 h-5" />
          {getTranslation(language, 'acknowledge')}
        </button>
        
        <div className="bg-blue-50 border border-blue-300 p-4">
          <h3 className="font-medium text-blue-900 mb-2">Instructions</h3>
          <ul className="text-sm text-blue-900 space-y-2">
            <li>• The app will vibrate every 30 minutes</li>
            <li>• Click "I'm OK - Acknowledge" to confirm your safety</li>
            <li>• You can also press Volume Up/Down buttons to stop the vibration</li>
            <li>• If no response, emergency contact will be notified</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white border border-gray-300 p-3 text-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1" />
            <p className="text-xs text-gray-600">Location Tracking</p>
          </div>
          <div className="bg-white border border-gray-300 p-3 text-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1" />
            <p className="text-xs text-gray-600">Safety Timer</p>
          </div>
          <div className="bg-white border border-gray-300 p-3 text-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1" />
            <p className="text-xs text-gray-600">Vibration Alerts</p>
          </div>
        </div>
      </div>
    </>
  );
};
