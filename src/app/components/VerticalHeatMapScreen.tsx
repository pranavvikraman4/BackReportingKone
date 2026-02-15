import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language, MaintenanceSession } from '../types';
import { getTranslation } from '../i18n';

interface VerticalHeatMapScreenProps {
  onGoBack: () => void;
  session: MaintenanceSession;
  language: Language;
}

export const VerticalHeatMapScreen: React.FC<VerticalHeatMapScreenProps> = ({
  onGoBack,
  session,
  language
}) => {
  // Calculate floor time distribution
  const floorData = session.floorsVisited.map(fv => ({
    floor: fv.floor,
    time: fv.timeSpent,
    height: (fv.floor - 1) * 3 // 3m per floor
  }));
  
  const maxTime = Math.max(...floorData.map(f => f.time), 1);
  const maxFloor = Math.max(...floorData.map(f => f.floor));
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'verticalHeatMap')}</h1>
            <p className="text-sm text-[#005EB8]">{session.elevatorId}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-3">Vertical Movement Analysis</h2>
          <p className="text-xs text-gray-600 mb-4">Shows time spent at each floor level (3m per floor)</p>
          
          <div className="relative" style={{ height: `${maxFloor * 60 + 40}px` }}>
            {/* Vertical axis */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r-2 border-gray-400">
              {floorData.map(({ floor, height }) => (
                <div
                  key={floor}
                  className="absolute right-0 flex items-center justify-end pr-2"
                  style={{ bottom: `${((floor - 1) / maxFloor) * 100}%` }}
                >
                  <span className="text-xs text-gray-600">F{floor}</span>
                  <div className="absolute right-0 w-2 h-0.5 bg-gray-400" style={{ right: '-2px' }} />
                </div>
              ))}
              <div className="absolute bottom-0 right-0 text-xs text-gray-600 pr-2">0m</div>
            </div>
            
            {/* Heat bars */}
            <div className="absolute left-14 right-0 top-0 bottom-0">
              {floorData.map(({ floor, time, height }) => {
                const intensity = time / maxTime;
                const barHeight = 50; // Fixed height for each floor bar
                const opacity = 0.3 + (intensity * 0.6);
                
                return (
                  <div
                    key={floor}
                    className="absolute left-0 right-0 flex items-center gap-2 group"
                    style={{ 
                      bottom: `${((floor - 1) / maxFloor) * 100}%`,
                      height: `${barHeight}px`
                    }}
                  >
                    <div
                      className="h-10 bg-[#005EB8] rounded"
                      style={{
                        width: `${intensity * 80}%`,
                        opacity
                      }}
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {getTranslation(language, 'floor')} {floor}: {Math.floor(time / 60)}m {time % 60}s ({height}m)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4">
          <h3 className="font-medium text-gray-900 mb-2">{getTranslation(language, 'heatIntensity')}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#005EB8]" style={{ opacity: 0.3 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'low')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#005EB8]" style={{ opacity: 0.6 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'medium')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#005EB8]" style={{ opacity: 0.9 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'high')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
