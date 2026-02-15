// Multi-language translations

import { Language } from './types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Title
    appTitle: 'KONE Maintenance Tracking',
    
    // Login
    login: 'Login',
    email: 'Email',
    password: 'Password',
    
    // Dashboard
    dashboard: 'Dashboard',
    searchPlaceholder: 'Search by location or equipment ID',
    welcome: 'Welcome',
    
    // Navigation
    userProfile: 'User Profile',
    heatMaps: 'Heat Maps',
    allIssues: 'All Issues',
    savedReports: 'Saved Reports',
    addElevator: 'Add Elevator',
    kmpPortal: 'KMP Portal',
    healthMonitor: 'Health Monitor',
    logout: 'Logout',
    settings: 'Settings',
    
    // Elevator
    elevatorId: 'Elevator ID',
    building: 'Building',
    location: 'Location',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    totalFloors: 'Total Floors',
    lastInspection: 'Last Inspection',
    
    // Maintenance
    startMaintenance: 'Start Maintenance',
    endMaintenance: 'End Maintenance',
    startFullMaintenance: 'Start Full Maintenance',
    maintenanceActive: 'Maintenance session active',
    addNewIssue: 'Add new issue',
    issuesResolved: 'Issues Resolved',
    
    // Floors
    floor: 'Floor',
    floorsVisited: 'Floors Visited',
    timeSpent: 'Time Spent',
    
    // Reports
    reports: 'Reports',
    sessionReport: 'Session Report',
    date: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    totalDuration: 'Total Duration',
    movementAnalysis: 'Movement Analysis',
    viewFloorHeatMap: 'View Floor',
    viewVerticalHeatMap: 'View Vertical Movement',
    generateReport: 'Generate Report',
    exportTXT: 'Generate TXT Report',
    exportDOCX: 'Generate DOCX Report',
    backToDashboard: 'Back to Dashboard',
    
    // Heat Maps
    floorHeatMap: 'Floor Heat Map',
    verticalHeatMap: 'Vertical Heat Map',
    heatIntensity: 'Heat Intensity',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Health Monitor
    healthCheck: 'Health Check',
    safetyCheck: 'Safety Check',
    healthCheckActive: 'Health Check Active',
    nextCheckIn: 'Next check in',
    lastCheck: 'Last Check',
    nextCheck: 'Next Check',
    acknowledge: "I'm OK - Acknowledge",
    overdue: 'Overdue by',
    
    // Profile
    maintainerProfile: 'Maintainer Profile',
    name: 'Name',
    employeeId: 'Employee ID',
    department: 'Department',
    elevatorMaintenance: 'Elevator Maintenance',
    contactInfo: 'Contact Information',
    certifications: 'Certifications',
    workSchedule: 'Work Schedule',
    emergencyContact: 'Emergency Contact',
    
    // Add Elevator
    addNewElevator: 'Add New Elevator',
    cancel: 'Cancel',
    add: 'Add',
    
    // Settings
    language: 'Language',
    english: 'English',
    finnish: 'Finnish',
    german: 'German',
    french: 'French',
    chinese: 'Chinese',
    
    // Issues
    issues: 'Issues',
    resolved: 'Resolved',
    unresolved: 'Unresolved',
    
    // Admin
    viewDetails: 'View Details',
    backReports: 'Back Reports',
    noReports: 'No maintenance reports available',
    adminDashboard: 'Admin Dashboard',
    
    // Common
    back: 'Back',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    home: 'Home',
  },
  
  fi: {
    // App Title
    appTitle: 'KONE Huollon Seuranta',
    
    // Login
    login: 'Kirjaudu sisään',
    email: 'Sähköposti',
    password: 'Salasana',
    
    // Dashboard
    dashboard: 'Kojelauta',
    searchPlaceholder: 'Hae sijainnin tai laitteen tunnuksen perusteella',
    welcome: 'Tervetuloa',
    
    // Navigation
    userProfile: 'Käyttäjäprofiili',
    heatMaps: 'Lämpökartat',
    allIssues: 'Kaikki ongelmat',
    savedReports: 'Tallennetut raportit',
    addElevator: 'Lisää hissi',
    kmpPortal: 'KMP-portaali',
    healthMonitor: 'Terveysmonitori',
    logout: 'Kirjaudu ulos',
    settings: 'Asetukset',
    
    // Elevator
    elevatorId: 'Hissin tunnus',
    building: 'Rakennus',
    location: 'Sijainti',
    status: 'Tila',
    active: 'Aktiivinen',
    inactive: 'Ei-aktiivinen',
    totalFloors: 'Kerroksia yhteensä',
    lastInspection: 'Viimeisin tarkastus',
    
    // Maintenance
    startMaintenance: 'Aloita huolto',
    endMaintenance: 'Lopeta huolto',
    startFullMaintenance: 'Aloita täysi huolto',
    maintenanceActive: 'Huoltosessio aktiivinen',
    addNewIssue: 'Lisää uusi ongelma',
    issuesResolved: 'Ratkaistut ongelmat',
    
    // Floors
    floor: 'Kerros',
    floorsVisited: 'Vieraillut kerrokset',
    timeSpent: 'Käytetty aika',
    
    // Reports
    reports: 'Raportit',
    sessionReport: 'Istuntoraportti',
    date: 'Päivämäärä',
    startTime: 'Aloitusaika',
    endTime: 'Lopetusaika',
    totalDuration: 'Kokonaiskesto',
    movementAnalysis: 'Liikkeen analyysi',
    viewFloorHeatMap: 'Näytä kerros',
    viewVerticalHeatMap: 'Näytä pystysuuntainen liike',
    generateReport: 'Luo raportti',
    exportTXT: 'Luo TXT-raportti',
    exportDOCX: 'Luo DOCX-raportti',
    backToDashboard: 'Takaisin kojelautaan',
    
    // Heat Maps
    floorHeatMap: 'Kerroksen lämpökartta',
    verticalHeatMap: 'Pystysuuntainen lämpökartta',
    heatIntensity: 'Lämpöintensiteetti',
    low: 'Matala',
    medium: 'Keskitaso',
    high: 'Korkea',
    
    // Health Monitor
    healthCheck: 'Terveystarkastus',
    safetyCheck: 'Turvallisuustarkastus',
    healthCheckActive: 'Terveystarkastus aktiivinen',
    nextCheckIn: 'Seuraava tarkastus',
    lastCheck: 'Viimeisin tarkastus',
    nextCheck: 'Seuraava tarkastus',
    acknowledge: 'Olen kunnossa - Kuittaa',
    overdue: 'Myöhässä',
    
    // Profile
    maintainerProfile: 'Huoltajan profiili',
    name: 'Nimi',
    employeeId: 'Työntekijätunnus',
    department: 'Osasto',
    elevatorMaintenance: 'Hissin huolto',
    contactInfo: 'Yhteystiedot',
    certifications: 'Sertifikaatit',
    workSchedule: 'Työaikataulu',
    emergencyContact: 'Hätäyhteystieto',
    
    // Add Elevator
    addNewElevator: 'Lisää uusi hissi',
    cancel: 'Peruuta',
    add: 'Lisää',
    
    // Settings
    language: 'Kieli',
    english: 'Englanti',
    finnish: 'Suomi',
    german: 'Saksa',
    french: 'Ranska',
    chinese: 'Kiina',
    
    // Issues
    issues: 'Ongelmat',
    resolved: 'Ratkaistu',
    unresolved: 'Ratkaisematon',
    
    // Admin
    viewDetails: 'Näytä tiedot',
    backReports: 'Takaisin raportit',
    noReports: 'Ei huoltoraportteja saatavilla',
    adminDashboard: 'Ylläpidon kojelauta',
    
    // Common
    back: 'Takaisin',
    save: 'Tallenna',
    edit: 'Muokkaa',
    delete: 'Poista',
    close: 'Sulje',
    home: 'Koti',
  },
  
  de: {
    // App Title
    appTitle: 'KONE Wartungsverfolgung',
    
    // Login
    login: 'Anmelden',
    email: 'E-Mail',
    password: 'Passwort',
    
    // Dashboard
    dashboard: 'Dashboard',
    searchPlaceholder: 'Suche nach Standort oder Geräte-ID',
    welcome: 'Willkommen',
    
    // Navigation
    userProfile: 'Benutzerprofil',
    heatMaps: 'Heatmaps',
    allIssues: 'Alle Probleme',
    savedReports: 'Gespeicherte Berichte',
    addElevator: 'Aufzug hinzufügen',
    kmpPortal: 'KMP-Portal',
    healthMonitor: 'Gesundheitsmonitor',
    logout: 'Abmelden',
    settings: 'Einstellungen',
    
    // Elevator
    elevatorId: 'Aufzug-ID',
    building: 'Gebäude',
    location: 'Standort',
    status: 'Status',
    active: 'Aktiv',
    inactive: 'Inaktiv',
    totalFloors: 'Gesamtanzahl Etagen',
    lastInspection: 'Letzte Inspektion',
    
    // Maintenance
    startMaintenance: 'Wartung starten',
    endMaintenance: 'Wartung beenden',
    startFullMaintenance: 'Vollwartung starten',
    maintenanceActive: 'Wartungssitzung aktiv',
    addNewIssue: 'Neues Problem hinzufügen',
    issuesResolved: 'Gelöste Probleme',
    
    // Floors
    floor: 'Etage',
    floorsVisited: 'Besuchte Etagen',
    timeSpent: 'Verbrachte Zeit',
    
    // Reports
    reports: 'Berichte',
    sessionReport: 'Sitzungsbericht',
    date: 'Datum',
    startTime: 'Startzeit',
    endTime: 'Endzeit',
    totalDuration: 'Gesamtdauer',
    movementAnalysis: 'Bewegungsanalyse',
    viewFloorHeatMap: 'Etage anzeigen',
    viewVerticalHeatMap: 'Vertikale Bewegung anzeigen',
    generateReport: 'Bericht erstellen',
    exportTXT: 'TXT-Bericht erstellen',
    exportDOCX: 'DOCX-Bericht erstellen',
    backToDashboard: 'Zurück zum Dashboard',
    
    // Heat Maps
    floorHeatMap: 'Etagen-Heatmap',
    verticalHeatMap: 'Vertikale Heatmap',
    heatIntensity: 'Wärmeintensität',
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    
    // Health Monitor
    healthCheck: 'Gesundheitscheck',
    safetyCheck: 'Sicherheitscheck',
    healthCheckActive: 'Gesundheitscheck aktiv',
    nextCheckIn: 'Nächster Check in',
    lastCheck: 'Letzter Check',
    nextCheck: 'Nächster Check',
    acknowledge: 'Ich bin OK - Bestätigen',
    overdue: 'Überfällig um',
    
    // Profile
    maintainerProfile: 'Wartungsprofil',
    name: 'Name',
    employeeId: 'Mitarbeiter-ID',
    department: 'Abteilung',
    elevatorMaintenance: 'Aufzugwartung',
    contactInfo: 'Kontaktinformationen',
    certifications: 'Zertifizierungen',
    workSchedule: 'Arbeitsplan',
    emergencyContact: 'Notfallkontakt',
    
    // Add Elevator
    addNewElevator: 'Neuen Aufzug hinzufügen',
    cancel: 'Abbrechen',
    add: 'Hinzufügen',
    
    // Settings
    language: 'Sprache',
    english: 'Englisch',
    finnish: 'Finnisch',
    german: 'Deutsch',
    french: 'Französisch',
    chinese: 'Chinesisch',
    
    // Issues
    issues: 'Probleme',
    resolved: 'Gelöst',
    unresolved: 'Ungelöst',
    
    // Admin
    viewDetails: 'Details anzeigen',
    backReports: 'Zurück Berichte',
    noReports: 'Keine Wartungsberichte verfügbar',
    adminDashboard: 'Admin-Dashboard',
    
    // Common
    back: 'Zurück',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    close: 'Schließen',
    home: 'Startseite',
  },
  
  fr: {
    // App Title
    appTitle: 'Suivi de Maintenance KONE',
    
    // Login
    login: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    
    // Dashboard
    dashboard: 'Tableau de bord',
    searchPlaceholder: 'Rechercher par emplacement ou ID équipement',
    welcome: 'Bienvenue',
    
    // Navigation
    userProfile: 'Profil utilisateur',
    heatMaps: 'Cartes thermiques',
    allIssues: 'Tous les problèmes',
    savedReports: 'Rapports enregistrés',
    addElevator: 'Ajouter ascenseur',
    kmpPortal: 'Portail KMP',
    healthMonitor: 'Moniteur de santé',
    logout: 'Déconnexion',
    settings: 'Paramètres',
    
    // Elevator
    elevatorId: 'ID ascenseur',
    building: 'Bâtiment',
    location: 'Emplacement',
    status: 'Statut',
    active: 'Actif',
    inactive: 'Inactif',
    totalFloors: 'Total des étages',
    lastInspection: 'Dernière inspection',
    
    // Maintenance
    startMaintenance: 'Démarrer maintenance',
    endMaintenance: 'Terminer maintenance',
    startFullMaintenance: 'Démarrer maintenance complète',
    maintenanceActive: 'Session de maintenance active',
    addNewIssue: 'Ajouter nouveau problème',
    issuesResolved: 'Problèmes résolus',
    
    // Floors
    floor: 'Étage',
    floorsVisited: 'Étages visités',
    timeSpent: 'Temps passé',
    
    // Reports
    reports: 'Rapports',
    sessionReport: 'Rapport de session',
    date: 'Date',
    startTime: 'Heure de début',
    endTime: 'Heure de fin',
    totalDuration: 'Durée totale',
    movementAnalysis: 'Analyse des mouvements',
    viewFloorHeatMap: 'Voir étage',
    viewVerticalHeatMap: 'Voir mouvement vertical',
    generateReport: 'Générer rapport',
    exportTXT: 'Générer rapport TXT',
    exportDOCX: 'Générer rapport DOCX',
    backToDashboard: 'Retour au tableau de bord',
    
    // Heat Maps
    floorHeatMap: 'Carte thermique étage',
    verticalHeatMap: 'Carte thermique verticale',
    heatIntensity: 'Intensité thermique',
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    
    // Health Monitor
    healthCheck: 'Contrôle santé',
    safetyCheck: 'Contrôle sécurité',
    healthCheckActive: 'Contrôle santé actif',
    nextCheckIn: 'Prochain contrôle dans',
    lastCheck: 'Dernier contrôle',
    nextCheck: 'Prochain contrôle',
    acknowledge: 'Je vais bien - Confirmer',
    overdue: 'En retard de',
    
    // Profile
    maintainerProfile: 'Profil technicien',
    name: 'Nom',
    employeeId: 'ID employé',
    department: 'Département',
    elevatorMaintenance: 'Maintenance ascenseur',
    contactInfo: 'Informations contact',
    certifications: 'Certifications',
    workSchedule: 'Horaire travail',
    emergencyContact: 'Contact urgence',
    
    // Add Elevator
    addNewElevator: 'Ajouter nouvel ascenseur',
    cancel: 'Annuler',
    add: 'Ajouter',
    
    // Settings
    language: 'Langue',
    english: 'Anglais',
    finnish: 'Finnois',
    german: 'Allemand',
    french: 'Français',
    chinese: 'Chinois',
    
    // Issues
    issues: 'Problèmes',
    resolved: 'Résolu',
    unresolved: 'Non résolu',
    
    // Admin
    viewDetails: 'Voir détails',
    backReports: 'Retour rapports',
    noReports: 'Aucun rapport de maintenance disponible',
    adminDashboard: 'Tableau de bord admin',
    
    // Common
    back: 'Retour',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    close: 'Fermer',
    home: 'Accueil',
  },
  
  zh: {
    // App Title
    appTitle: 'KONE 维护跟踪',
    
    // Login
    login: '登录',
    email: '电子邮件',
    password: '密码',
    
    // Dashboard
    dashboard: '仪表板',
    searchPlaceholder: '按位置或设备ID搜索',
    welcome: '欢迎',
    
    // Navigation
    userProfile: '用户资料',
    heatMaps: '热图',
    allIssues: '所有问题',
    savedReports: '已保存报告',
    addElevator: '添加电梯',
    kmpPortal: 'KMP门户',
    healthMonitor: '健康监测',
    logout: '登出',
    settings: '设置',
    
    // Elevator
    elevatorId: '电梯ID',
    building: '建筑',
    location: '位置',
    status: '状态',
    active: '活跃',
    inactive: '不活跃',
    totalFloors: '总楼层',
    lastInspection: '上次检查',
    
    // Maintenance
    startMaintenance: '开始维护',
    endMaintenance: '结束维护',
    startFullMaintenance: '开始完整维护',
    maintenanceActive: '维护会话活跃',
    addNewIssue: '添加新问题',
    issuesResolved: '已解决问题',
    
    // Floors
    floor: '楼层',
    floorsVisited: '访问楼层',
    timeSpent: '花费时间',
    
    // Reports
    reports: '报告',
    sessionReport: '会话报告',
    date: '日期',
    startTime: '开始时间',
    endTime: '结束时间',
    totalDuration: '总时长',
    movementAnalysis: '运动分析',
    viewFloorHeatMap: '查看楼层',
    viewVerticalHeatMap: '查看垂直运动',
    generateReport: '生成报告',
    exportTXT: '生成TXT报告',
    exportDOCX: '生成DOCX报告',
    backToDashboard: '返回仪表板',
    
    // Heat Maps
    floorHeatMap: '楼层热图',
    verticalHeatMap: '垂直热图',
    heatIntensity: '热强度',
    low: '低',
    medium: '中',
    high: '高',
    
    // Health Monitor
    healthCheck: '健康检查',
    safetyCheck: '安全检查',
    healthCheckActive: '健康检查活跃',
    nextCheckIn: '下次检查',
    lastCheck: '上次检查',
    nextCheck: '下次检查',
    acknowledge: '我很好 - 确认',
    overdue: '逾期',
    
    // Profile
    maintainerProfile: '维护人员资料',
    name: '姓名',
    employeeId: '员工ID',
    department: '部门',
    elevatorMaintenance: '电梯维护',
    contactInfo: '联系信息',
    certifications: '认证',
    workSchedule: '工作时间表',
    emergencyContact: '紧急联系人',
    
    // Add Elevator
    addNewElevator: '添加新电梯',
    cancel: '取消',
    add: '添加',
    
    // Settings
    language: '语言',
    english: '英语',
    finnish: '芬兰语',
    german: '德语',
    french: '法语',
    chinese: '中文',
    
    // Issues
    issues: '问题',
    resolved: '已解决',
    unresolved: '未解决',
    
    // Admin
    viewDetails: '查看详情',
    backReports: '返回报告',
    noReports: '没有可用的维护报告',
    adminDashboard: '管理员仪表板',
    
    // Common
    back: '返回',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    close: '关闭',
    home: '主页',
  },
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language][key] || translations.en[key] || key;
};
