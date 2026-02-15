import React from 'react';
import { ArrowLeft, Activity, TrendingUp, MoveVertical, MoveHorizontal } from 'lucide-react';
import { Language, UserRole, Elevator, MaintenanceSession } from '../types';
import { getTranslation } from '../i18n';

interface ElevatorDetailScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  elevator: Elevator;
  userRole: UserRole;
  language: Language;
  onStartMaintenance: (elevatorId: string, floor: number) => void;
  savedSessions: Map<string, MaintenanceSession>;
}

export const ElevatorDetailScreen: React.FC<ElevatorDetailScreenProps> = ({
  onGoBack,
  onNavigate,
  elevator,
  userRole,
  language,
  onStartMaintenance,
  savedSessions
}) => {
  // Get all sessions for this elevator
  const elevatorSessions = Array.from(savedSessions.values()).filter(
    session => session.elevatorId === elevator.id
  );
  
  // Calculate movement statistics
  const calculateMovementStats = () => {
    if (elevatorSessions.length === 0) {
      return {
        totalSessions: 0,
        floorsVisited: [],
        avgVerticalMovement: 0,
        avgHorizontalMovement: 0,
        totalMovements: 0
      };
    }
    
    const allFloors = new Set<number>();
    let totalVerticalDistance = 0;
    let totalHorizontalDistance = 0;
    let totalMovements = 0;
    
    elevatorSessions.forEach(session => {
      session.floorsVisited.forEach(fv => allFloors.add(fv.floor));
      
      // Calculate vertical movement (floor to floor - 3m per floor)
      for (let i = 1; i < session.movements.length; i++) {
        const prevFloor = session.movements[i - 1].floor;
        const currFloor = session.movements[i].floor;
        totalVerticalDistance += Math.abs(currFloor - prevFloor) * 3; // 3 meters per floor
        
        // Calculate horizontal movement within elevator car
        const dx = session.movements[i].x - session.movements[i - 1].x;
        const dy = session.movements[i].y - session.movements[i - 1].y;
        totalHorizontalDistance += Math.sqrt(dx * dx + dy * dy);
        totalMovements++;
      }
    });
    
    return {
      totalSessions: elevatorSessions.length,
      floorsVisited: Array.from(allFloors).sort((a, b) => a - b),
      avgVerticalMovement: totalMovements > 0 ? (totalVerticalDistance / totalMovements).toFixed(2) : '0',
      avgHorizontalMovement: totalMovements > 0 ? (totalHorizontalDistance / totalMovements).toFixed(2) : '0',
      totalMovements
    };
  };
  
  const stats = calculateMovementStats();
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-[#005EB8]">{elevator.id}</h1>
            <p className="text-sm text-gray-600">{elevator.building}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 border border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-1">{getTranslation(language, 'lastInspection')}</p>
            <p className="text-sm font-medium text-gray-900">Feb 10, 2026</p>
          </div>
          <div className="bg-gray-50 border border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-1">{getTranslation(language, 'status')}</p>
            <p className={`text-sm font-medium ${elevator.status === 'active' ? 'text-green-700' : 'text-gray-700'}`}>
              {getTranslation(language, elevator.status)}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-1">{getTranslation(language, 'totalFloors')}</p>
            <p className="text-sm font-medium text-gray-900">{elevator.totalFloors}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {userRole === 'admin' ? (
          <>
            <h2 className="text-sm font-medium text-gray-700 mb-3 uppercase">
              {getTranslation(language, 'floorsVisited')}
            </h2>
            
            {stats.totalSessions === 0 ? (
              <div className="bg-gray-50 border border-gray-300 p-6 text-center mb-4">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">No maintenance data available yet</p>
                <p className="text-gray-500 text-xs mt-1">Movement statistics will appear after technician sessions</p>
              </div>
            ) : (
              <>
                <div className="bg-white border border-gray-300 p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total Sessions</p>
                      <p className="text-2xl font-bold text-[#005EB8]">{stats.totalSessions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Data Points</p>
                      <p className="text-2xl font-bold text-[#005EB8]">{stats.totalMovements}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <p className="text-xs text-gray-600 mb-2">Floors with Activity</p>
                    <div className="flex flex-wrap gap-2">
                      {stats.floorsVisited.map(floor => (
                        <span key={floor} className="px-2 py-1 bg-blue-50 text-[#005EB8] text-xs border border-blue-200">
                          Floor {floor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white border border-gray-300 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MoveVertical className="w-5 h-5 text-[#005EB8]" />
                      <h3 className="font-medium text-gray-900">Vertical Movement</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Average floor-to-floor movement per data point</p>
                    <p className="text-2xl font-bold text-[#005EB8]">{stats.avgVerticalMovement}m</p>
                    <p className="text-xs text-gray-500 mt-1">Based on 3m per floor standard</p>
                  </div>
                  
                  <div className="bg-white border border-gray-300 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MoveHorizontal className="w-5 h-5 text-[#005EB8]" />
                      <h3 className="font-medium text-gray-900">Horizontal Movement</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Average position change within elevator car</p>
                    <p className="text-2xl font-bold text-[#005EB8]">{stats.avgHorizontalMovement}m</p>
                    <p className="text-xs text-gray-500 mt-1">Within 1.5m × 1.5m elevator space</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onNavigate({ type: 'admin-reports', params: { elevatorId: elevator.id } })}
                  className="w-full px-4 py-3 bg-white border border-[#005EB8] text-[#005EB8] font-medium hover:bg-blue-50"
                >
                  View All Session Reports
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-sm font-medium text-gray-700 mb-3 uppercase">
              {getTranslation(language, 'floor')}s
            </h2>
            <div className="space-y-2">
              {Array.from({ length: elevator.totalFloors }, (_, i) => i + 1).map((floor) => (
                <button
                  key={floor}
                  onClick={() => onNavigate({ type: 'floor-maintenance', params: { elevatorId: elevator.id, floor } })}
                  className="w-full bg-white border border-gray-300 p-4 flex items-center justify-between hover:border-[#005EB8] transition-colors"
                >
                  <span className="text-gray-900 font-medium">{getTranslation(language, 'floor')} {floor}</span>
                  <Activity className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                onStartMaintenance(elevator.id, 1);
                onNavigate({ type: 'floor-maintenance', params: { elevatorId: elevator.id, floor: 1 } });
              }}
              className="w-full mt-6 px-4 py-3 bg-[#005EB8] text-white font-medium hover:bg-[#004a94]"
            >
              {getTranslation(language, 'startFullMaintenance')}
            </button>
          </>
        )}
      </div>
    </>
  );
};
