import React, { useState } from 'react';
import { Menu, X, User, Search, MapPin, AlertCircle, FileText, Plus, ExternalLink, Activity, Home, Map, AlertTriangle, Settings as SettingsIcon, Clock } from 'lucide-react';
import { Language, UserRole, Elevator, MaintenanceSession } from '../types';
import { getTranslation } from '../i18n';

interface DashboardScreenProps {
  onNavigate: (screen: any) => void;
  userName: string;
  userRole: UserRole;
  elevators: Elevator[];
  isVibrating: boolean;
  language: Language;
  onLogout: () => void;
  currentSession?: MaintenanceSession | null;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  userName,
  userRole,
  elevators,
  isVibrating,
  language,
  onLogout,
  currentSession
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  
  const filteredElevators = elevators.filter(e =>
    e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleMenuItemClick = (screen: any) => {
    setMenuOpen(false);
    onNavigate(screen);
  };
  
  const handleTabClick = (tab: string, screen?: any) => {
    setActiveTab(tab);
    if (screen) {
      onNavigate(screen);
    }
  };
  
  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setMenuOpen(true)} className="p-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex gap-2">
            {['K', 'O', 'N', 'E'].map((letter, i) => (
              <div
                key={i}
                className="w-[20px] h-[26px] border border-[#005EB8] flex items-center justify-center text-[#005EB8] font-bold text-sm"
              >
                {letter}
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate({ type: 'profile' })} className="p-2 relative">
            <User className="w-6 h-6 text-gray-700" />
            {isVibrating && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>
        
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600 mb-3">
            {getTranslation(language, 'welcome')}, <span className="font-medium">{userName}</span>
            {userRole === 'admin' && <span className="ml-2 text-xs bg-[#005EB8] text-white px-2 py-1">Admin</span>}
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={getTranslation(language, 'searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm"
            />
          </div>
        </div>
        
        {/* Active Maintenance Session Banner */}
        {currentSession && (
          <div className="bg-green-50 border-t border-b border-green-300 px-4 py-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  {getTranslation(language, 'maintenanceActive')}
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  {currentSession.elevatorId} - Floor {currentSession.floorsVisited[currentSession.floorsVisited.length - 1]?.floor || currentSession.startFloor}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Started: {new Date(currentSession.startTime).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => onNavigate({ type: 'floor-maintenance', params: { elevatorId: currentSession.elevatorId, floor: currentSession.startFloor } })}
                className="text-xs text-green-700 font-medium hover:text-green-900 underline"
              >
                Return to session
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Elevator List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredElevators.map((elevator) => (
            <button
              key={elevator.id}
              onClick={() => onNavigate({ type: 'elevator-detail', params: { elevatorId: elevator.id } })}
              className="w-full bg-white border border-gray-300 p-4 text-left hover:border-[#005EB8] transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-[#005EB8] font-medium text-lg">{elevator.id}</p>
                  <p className="text-gray-700 font-medium">{elevator.building}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs ${
                    elevator.status === 'active'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
                >
                  {getTranslation(language, elevator.status)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{elevator.location}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-300 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'home' ? 'text-[#005EB8]' : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">{getTranslation(language, 'home')}</span>
          </button>
          <button
            onClick={() => handleTabClick('heatmaps', { type: userRole === 'admin' ? 'admin-reports' : 'saved-reports' })}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'heatmaps' ? 'text-[#005EB8]' : 'text-gray-500'
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs">{getTranslation(language, 'heatMaps')}</span>
          </button>
          <button
            onClick={() => handleTabClick('issues', { type: 'all-issues' })}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'issues' ? 'text-[#005EB8]' : 'text-gray-500'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs">{getTranslation(language, 'issues')}</span>
          </button>
          <button
            onClick={() => handleTabClick('reports', { type: 'saved-reports' })}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'reports' ? 'text-[#005EB8]' : 'text-gray-500'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">{getTranslation(language, 'reports')}</span>
          </button>
          <button
            onClick={() => handleTabClick('settings', { type: 'settings' })}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'settings' ? 'text-[#005EB8]' : 'text-gray-500'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-xs">{getTranslation(language, 'settings')}</span>
          </button>
        </div>
      </div>
      
      {/* Hamburger Menu Drawer */}
      {menuOpen && (
        <>
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-[264px] bg-white z-50 border-r border-gray-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <span className="font-medium text-gray-900">{getTranslation(language, 'dashboard')}</span>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="py-2">
              <button
                onClick={() => handleMenuItemClick({ type: 'profile' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'userProfile')}</span>
              </button>
              <button
                onClick={() => handleMenuItemClick({ type: userRole === 'admin' ? 'admin-reports' : 'saved-reports' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
              >
                <Map className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'heatMaps')}</span>
              </button>
              <button
                onClick={() => handleMenuItemClick({ type: 'all-issues' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
              >
                <AlertCircle className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'allIssues')}</span>
              </button>
              <button
                onClick={() => handleMenuItemClick({ type: 'saved-reports' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
              >
                <FileText className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'savedReports')}</span>
              </button>
              {userRole === 'technician' && (
                <button
                  onClick={() => handleMenuItemClick({ type: 'add-elevator' })}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-900">{getTranslation(language, 'addElevator')}</span>
                </button>
              )}
              <button
                onClick={() => handleMenuItemClick({ type: 'health-monitor' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left relative"
              >
                <Activity className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'healthMonitor')}</span>
                {isVibrating && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-auto" />
                )}
              </button>
              <button
                onClick={() => handleMenuItemClick({ type: 'settings' })}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left"
              >
                <SettingsIcon className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{getTranslation(language, 'settings')}</span>
              </button>
              <div className="border-t border-gray-300 mt-2 pt-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left text-red-600"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>{getTranslation(language, 'logout')}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
