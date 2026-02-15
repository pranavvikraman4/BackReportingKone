import React, { useState, useEffect, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ElevatorDetailScreen } from './components/ElevatorDetailScreen';
import { FloorMaintenanceScreen } from './components/FloorMaintenanceScreen';
import { ReportSummaryScreen } from './components/ReportSummaryScreen';
import { FloorHeatMapScreen } from './components/FloorHeatMapScreen';
import { VerticalHeatMapScreen } from './components/VerticalHeatMapScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SavedReportsScreen } from './components/SavedReportsScreen';
import { AdminReportsScreen } from './components/AdminReportsScreen';
import { HealthMonitorScreen } from './components/HealthMonitorScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AllIssuesScreen } from './components/AllIssuesScreen';
import { AddElevatorScreen } from './components/AddElevatorScreen';
import { 
  Screen, 
  Language, 
  UserRole, 
  User, 
  Elevator, 
  MaintenanceSession, 
  Issue, 
  MovementPoint 
} from './types';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: 'splash' });
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [currentSession, setCurrentSession] = useState<MaintenanceSession | null>(null);
  const [savedSessions, setSavedSessions] = useState<Map<string, MaintenanceSession>>(new Map());
  const [isVibrating, setIsVibrating] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  // Initialize elevators from backend
  useEffect(() => {
    const initElevators = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/elevators`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setElevators(data);
            setBackendStatus('online');
            console.log('✅ Successfully loaded elevators from backend');
            return;
          }
        }
      } catch (error) {
        setBackendStatus('offline');
        // Silently handle - UI shows offline banner
      }
      
      // Initialize with default elevators if backend is empty or unavailable
      const defaultElevators: Elevator[] = [
        { id: "ELV-001", building: "Tower A", location: "Helsinki Central", status: "active", totalFloors: 10 },
        { id: "ELV-002", building: "Tower A", location: "Helsinki Central", status: "inactive", totalFloors: 8 },
        { id: "ELV-003", building: "Office Building B", location: "Espoo Campus", status: "active", totalFloors: 12 },
        { id: "ELV-004", building: "Residential C", location: "Tampere North", status: "active", totalFloors: 6 },
        { id: "ELV-005", building: "Shopping Mall D", location: "Vantaa District", status: "inactive", totalFloors: 4 }
      ];
      
      setElevators(defaultElevators);
      console.log('ℹ️ Initialized with default elevator data');
      
      // Try to save to backend (silently fail if backend not available)
      for (const elevator of defaultElevators) {
        try {
          const saveResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/elevators`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(elevator)
            }
          );
          if (saveResponse.ok) {
            console.log(`✅ Saved elevator ${elevator.id} to backend`);
          }
        } catch (error) {
          // Silently fail - app works with local data
        }
      }
    };
    
    initElevators();
  }, []);
  
  // Health monitor vibration every 30 minutes
  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'technician') return;
    
    const vibrationInterval = setInterval(() => {
      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500, 200, 500]);
        setIsVibrating(true);
      }
    }, 30 * 60 * 1000); // 30 minutes
    
    // Handle volume keys to stop vibration
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'VolumeUp' || e.key === 'VolumeDown') {
        setIsVibrating(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearInterval(vibrationInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isLoggedIn, user]);
  
  const handleNavigate = useCallback((screen: Screen) => {
    setNavigationHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  }, [currentScreen]);
  
  const handleGoBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const previous = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previous);
    } else {
      setCurrentScreen({ type: 'dashboard' });
    }
  }, [navigationHistory]);
  
  const handleLogin = (email: string, name: string, role: UserRole) => {
    const employeeId = `MNT-${Math.floor(1000 + Math.random() * 9000)}`;
    setUser({ id: employeeId, email, name, role, employeeId });
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentSession(null);
    setNavigationHistory([]);
    setCurrentScreen({ type: 'login' });
  };
  
  const handleStartMaintenance = (elevatorId: string, floor: number) => {
    const session: MaintenanceSession = {
      id: `session-${Date.now()}`,
      elevatorId,
      technicianId: user!.id,
      technicianName: user!.name,
      startTime: Date.now(),
      endTime: null,
      issues: [
        { id: '1', description: 'Door sensor misalignment', resolved: false, timestamp: Date.now() },
        { id: '2', description: 'Unusual vibration detected', resolved: false, timestamp: Date.now() },
        { id: '3', description: 'Call button not responding', resolved: true, timestamp: Date.now() },
        { id: '4', description: 'Floor indicator flickering', resolved: false, timestamp: Date.now() },
      ],
      movements: [],
      floorsVisited: [{ floor, timeSpent: 0 }]
    };
    setCurrentSession(session);
  };
  
  const handleEndSession = async (): Promise<string | null> => {
    if (currentSession) {
      const endedSession: MaintenanceSession = {
        ...currentSession,
        endTime: Date.now()
      };
      
      // Calculate time spent per floor
      const floorTimes = new Map<number, number>();
      endedSession.movements.forEach(m => {
        const current = floorTimes.get(m.floor) || 0;
        floorTimes.set(m.floor, current + 5); // 5 seconds per movement point
      });
      
      endedSession.floorsVisited = Array.from(floorTimes.entries()).map(([floor, timeSpent]) => ({
        floor,
        timeSpent
      }));
      
      // Save to state
      setSavedSessions(prev => new Map(prev).set(endedSession.id, endedSession));
      
      // Try to save to backend
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/sessions`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(endedSession)
          }
        );
        if (response.ok) {
          console.log(`✅ Session ${endedSession.id} saved to backend`);
        } else {
          console.warn(`⚠️ Could not save session to backend (saved locally)`);
        }
      } catch (error) {
        // App still works with local data
        console.warn(`⚠️ Backend not available - session saved locally only`);
      }
      
      const sessionId = endedSession.id;
      setCurrentSession(null);
      return sessionId;
    }
    return null;
  };
  
  const handleAddIssue = (description: string) => {
    if (currentSession) {
      const newIssue: Issue = {
        id: Date.now().toString(),
        description,
        resolved: false,
        timestamp: Date.now()
      };
      setCurrentSession({
        ...currentSession,
        issues: [...currentSession.issues, newIssue]
      });
    }
  };
  
  const handleToggleIssue = (issueId: string) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        issues: currentSession.issues.map(issue =>
          issue.id === issueId ? { ...issue, resolved: !issue.resolved } : issue
        )
      });
    }
  };
  
  const handleRecordMovement = (point: MovementPoint) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        movements: [...currentSession.movements, point]
      });
    }
  };
  
  const handleAddElevator = async (elevator: Elevator) => {
    setElevators(prev => [...prev, elevator]);
    
    // Try to save to backend
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/elevators`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(elevator)
        }
      );
      if (response.ok) {
        console.log(`✅ Elevator ${elevator.id} saved to backend`);
      } else {
        console.warn(`⚠️ Could not save elevator ${elevator.id} to backend (saved locally)`);
      }
    } catch (error) {
      // App still works with local data
      console.warn(`⚠️ Backend not available - elevator ${elevator.id} saved locally only`);
    }
  };
  
  const handleAcknowledge = () => {
    setIsVibrating(false);
  };
  
  // Render current screen
  const renderScreen = () => {
    switch (currentScreen.type) {
      case 'splash':
        return (
          <SplashScreen
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            language={language}
          />
        );
      
      case 'login':
        return (
          <LoginScreen
            onNavigate={handleNavigate}
            onLogin={handleLogin}
            language={language}
          />
        );
      
      case 'dashboard':
        return (
          <DashboardScreen
            onNavigate={handleNavigate}
            userName={user?.name || ''}
            userRole={user?.role || 'technician'}
            elevators={elevators}
            isVibrating={isVibrating}
            language={language}
            onLogout={handleLogout}
            currentSession={currentSession}
          />
        );
      
      case 'elevator-detail':
        const elevator = elevators.find(e => e.id === currentScreen.params?.elevatorId);
        if (!elevator) return null;
        return (
          <ElevatorDetailScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            elevator={elevator}
            userRole={user?.role || 'technician'}
            language={language}
            onStartMaintenance={handleStartMaintenance}
            savedSessions={savedSessions}
          />
        );
      
      case 'floor-maintenance':
        return (
          <FloorMaintenanceScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            elevatorId={currentScreen.params?.elevatorId}
            floor={currentScreen.params?.floor}
            language={language}
            sessionActive={currentSession !== null}
            onStartSession={() => handleStartMaintenance(currentScreen.params?.elevatorId, currentScreen.params?.floor)}
            onEndSession={handleEndSession}
            issues={currentSession?.issues || []}
            onAddIssue={handleAddIssue}
            onToggleIssue={handleToggleIssue}
            onRecordMovement={handleRecordMovement}
          />
        );
      
      case 'report-summary':
        const sessionForReport = currentScreen.params?.sessionId
          ? savedSessions.get(currentScreen.params.sessionId) || currentSession
          : currentSession;
        
        if (!sessionForReport || !sessionForReport.endTime) return null;
        
        return (
          <ReportSummaryScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            session={sessionForReport}
            language={language}
          />
        );
      
      case 'floor-heatmap':
        const sessionForFloorMap = savedSessions.get(currentScreen.params?.sessionId);
        if (!sessionForFloorMap) return null;
        
        return (
          <FloorHeatMapScreen
            onGoBack={handleGoBack}
            session={sessionForFloorMap}
            floor={currentScreen.params?.floor}
            language={language}
          />
        );
      
      case 'vertical-heatmap':
        const sessionForVerticalMap = savedSessions.get(currentScreen.params?.sessionId);
        if (!sessionForVerticalMap) return null;
        
        return (
          <VerticalHeatMapScreen
            onGoBack={handleGoBack}
            session={sessionForVerticalMap}
            language={language}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            onGoBack={handleGoBack}
            language={language}
            onLanguageChange={setLanguage}
          />
        );
      
      case 'saved-reports':
        return (
          <SavedReportsScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            language={language}
          />
        );
      
      case 'admin-reports':
        return (
          <AdminReportsScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            language={language}
            elevators={elevators}
            elevatorId={currentScreen.params?.elevatorId}
            floor={currentScreen.params?.floor}
          />
        );
      
      case 'health-monitor':
        return (
          <HealthMonitorScreen
            onGoBack={handleGoBack}
            language={language}
            onAcknowledge={handleAcknowledge}
          />
        );
      
      case 'profile':
        if (!user) return null;
        return (
          <ProfileScreen
            onGoBack={handleGoBack}
            user={user}
            language={language}
          />
        );
      
      case 'all-issues':
        return (
          <AllIssuesScreen
            onGoBack={handleGoBack}
            language={language}
          />
        );
      
      case 'add-elevator':
        return (
          <AddElevatorScreen
            onGoBack={handleGoBack}
            onNavigate={handleNavigate}
            onAddElevator={handleAddElevator}
            language={language}
          />
        );
      
      default:
        return null;
    }
  };
  
  // Load session from backend when viewing report
  useEffect(() => {
    if (currentScreen.type === 'report-summary' || 
        currentScreen.type === 'floor-heatmap' || 
        currentScreen.type === 'vertical-heatmap') {
      const sessionId = currentScreen.params?.sessionId;
      if (sessionId && !savedSessions.has(sessionId)) {
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d8538b0e/sessions/${sessionId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Session not found in backend');
          })
          .then(session => {
            setSavedSessions(prev => new Map(prev).set(sessionId, session));
            console.log(`✅ Loaded session ${sessionId} from backend`);
          })
          .catch(error => {
            console.warn(`⚠️ Could not load session from backend (using local data):`, error.message);
          });
      }
    }
  }, [currentScreen]);
  
  return (
    <div className="size-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[390px] h-full max-h-[844px] bg-white shadow-2xl overflow-hidden relative flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
