import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language, MaintenanceSession, MovementPoint } from '../types';
import { getTranslation } from '../i18n';

interface FloorHeatMapScreenProps {
  onGoBack: () => void;
  session: MaintenanceSession;
  floor: number;
  language: Language;
}

export const FloorHeatMapScreen: React.FC<FloorHeatMapScreenProps> = ({
  onGoBack,
  session,
  floor,
  language
}) => {
  const [hoveredZone, setHoveredZone] = useState<{ x: number; y: number; duration: number; label: string } | null>(null);
  
  // Filter movements for this floor
  const floorMovements = session.movements.filter(m => m.floor === floor);
  
  // Create heat zones by clustering nearby points
  const createHeatZones = (movements: MovementPoint[]) => {
    if (movements.length === 0) return [];
    
    const zones: { x: number; y: number; duration: number; label: string }[] = [];
    const gridSize = 0.3; // 30cm grid
    const grid: Map<string, { x: number; y: number; count: number; points: MovementPoint[] }> = new Map();
    
    movements.forEach(m => {
      const gridX = Math.floor(m.x / gridSize);
      const gridY = Math.floor(m.y / gridSize);
      const key = `${gridX},${gridY}`;
      
      if (!grid.has(key)) {
        grid.set(key, { x: gridX * gridSize + gridSize / 2, y: gridY * gridSize + gridSize / 2, count: 0, points: [] });
      }
      
      const cell = grid.get(key)!;
      cell.count++;
      cell.points.push(m);
    });
    
    grid.forEach((cell, key) => {
      const duration = cell.count * 5; // 5 seconds per point
      const label = `Zone (${Math.round(cell.x * 100)}cm, ${Math.round(cell.y * 100)}cm)`;
      zones.push({
        x: cell.x,
        y: cell.y,
        duration,
        label
      });
    });
    
    return zones;
  };
  
  const heatZones = createHeatZones(floorMovements);
  const maxDuration = Math.max(...heatZones.map(z => z.duration), 1);
  
  // Elevator dimensions: 1.5m x 1.5m
  const elevatorWidth = 240;
  const elevatorHeight = 240;
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">
              {getTranslation(language, 'floorHeatMap')} - {getTranslation(language, 'floor')} {floor}
            </h1>
            <p className="text-sm text-[#005EB8]">{session.elevatorId}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-2">Elevator Car (1.5m × 1.5m)</h2>
          <p className="text-xs text-gray-600 mb-4">
            Heat map shows technician positions within the elevator car
          </p>
          
          <div className="flex justify-center">
            <div
              className="bg-white border-2 border-gray-400 relative"
              style={{ width: `${elevatorWidth}px`, height: `${elevatorHeight}px` }}
            >
              {/* Door indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-gray-600">Door</div>
              
              {/* Car top area indicator */}
              <div className="absolute top-8 left-2 right-2 h-8 border border-dashed border-gray-400 bg-gray-50 flex items-center justify-center">
                <span className="text-xs text-gray-600">Car Top Access</span>
              </div>
              
              {/* Heat zones */}
              {heatZones.map((zone, idx) => {
                const xPos = (zone.x / 1.5) * elevatorWidth;
                const yPos = (zone.y / 1.5) * elevatorHeight;
                const intensity = zone.duration / maxDuration;
                const size = 20 + (intensity * 40); // 20-60px diameter
                const opacity = 0.3 + (intensity * 0.6);
                
                return (
                  <div
                    key={idx}
                    className="absolute rounded-full bg-[#005EB8] cursor-pointer transition-transform hover:scale-110"
                    style={{
                      left: `${xPos}px`,
                      top: `${yPos}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                  />
                );
              })}
              
              {/* Hover tooltip */}
              {hoveredZone && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10">
                  {hoveredZone.label}: {Math.floor(hoveredZone.duration / 60)}m {hoveredZone.duration % 60}s
                </div>
              )}
              
              {/* No data message */}
              {heatZones.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500 text-sm text-center px-4">
                    No movement data recorded for this floor
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-2">{getTranslation(language, 'heatIntensity')}</h3>
          <p className="text-xs text-gray-600 mb-3">Based on time spent in each position</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#005EB8]" style={{ opacity: 0.3 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'low')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#005EB8]" style={{ opacity: 0.6 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'medium')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#005EB8]" style={{ opacity: 0.9 }} />
              <span className="text-xs text-gray-600">{getTranslation(language, 'high')}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-300 p-3">
          <p className="text-xs text-blue-900">
            <strong>Note:</strong> Heat intensity is based on time spent in each area, not exact GPS position.
            The car top area at the top shows where technicians access the elevator machinery.
          </p>
        </div>
      </div>
    </>
  );
};
