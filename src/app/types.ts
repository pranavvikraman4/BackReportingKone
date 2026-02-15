// Type definitions for KONE Elevator Maintenance App

export type Language = 'en' | 'fi' | 'de' | 'fr' | 'zh';

export type UserRole = 'admin' | 'technician';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  employeeId: string;
}

export interface Elevator {
  id: string;
  building: string;
  location: string;
  status: 'active' | 'inactive';
  totalFloors: number;
}

export interface Issue {
  id: string;
  description: string;
  resolved: boolean;
  timestamp: number;
}

export interface MovementPoint {
  timestamp: number;
  x: number; // Position in elevator (0-1.5m)
  y: number; // Position in elevator (0-1.5m)
  z: number; // Height in meters from ground
  floor: number;
}

export interface MaintenanceSession {
  id: string;
  elevatorId: string;
  technicianId: string;
  technicianName: string;
  startTime: number;
  endTime: number | null;
  issues: Issue[];
  movements: MovementPoint[];
  floorsVisited: { floor: number; timeSpent: number }[];
}

export interface HeatMapZone {
  x: number;
  y: number;
  duration: number;
  label: string;
}

export type ScreenType = 
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'elevator-detail'
  | 'floor-maintenance'
  | 'report-summary'
  | 'floor-heatmap'
  | 'vertical-heatmap'
  | 'add-elevator'
  | 'health-monitor'
  | 'profile'
  | 'all-issues'
  | 'saved-reports'
  | 'settings'
  | 'admin-reports';

export interface Screen {
  type: ScreenType;
  params?: any;
}
