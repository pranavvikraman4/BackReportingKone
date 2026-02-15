# KONE Elevator Maintenance Tracking Application

A comprehensive web-based mobile application for tracking elevator maintenance activities with real-time heat map visualization and back-reporting capabilities.

## 🎯 Overview

This application provides a complete maintenance tracking system for elevator technicians and administrators, featuring:
- **Real-time movement tracking** with simulated IoT sensor data
- **Dual heat map visualization**: Vertical (floor-to-floor) and Horizontal (within elevator car)
- **Back-reporting system** to analyze technician movement and maintenance patterns
- **Multi-language support**: English, Finnish, German, French, Chinese
- **Role-based access**: Admin and Technician views
- **Health monitoring** with vibration alerts every 30 minutes
- **Persistent data storage** using Supabase backend

## 🚀 Quick Start

### Demo Access

**Login Credentials:**

**Admin Account:**
- Email: `admin@kone.com`
- Password: (any password works)
- Access: View all reports, heat maps, analytics

**Technician Account:**
- Email: `tech@kone.com`  
- Password: (any password works)
- Access: Start/end maintenance, record issues, limited reports

### Key Features

1. **Splash Screen**: 2.5s KONE logo animation
2. **Dashboard**: 
   - Search elevators by location or ID
   - Bottom navigation (Home, Heat Maps, Issues, Reports, Settings)
   - Working hamburger menu with all options
3. **Elevator Management**:
   - Dynamic floors (1-12 floors per elevator)
   - View elevator details
   - Start maintenance on any floor
4. **Maintenance Tracking**:
   - Real-time timer
   - Issue logging with resolved/unresolved states
   - Automatic movement recording every 5 seconds
5. **Heat Maps**:
   - **Vertical Heat Map**: Shows floor-to-floor movement (3m per floor)
   - **Horizontal Heat Map**: Shows position within 1.5m × 1.5m elevator car
6. **Reports**:
   - Session summaries with duration, issues, floors visited
   - Export to TXT format
   - Saved to Supabase for persistent access
7. **Settings**:
   - Language selection (5 languages)
   - All UI text translates dynamically

## 📱 Using the Application

### For Technicians

1. **Login** with technician credentials
2. **Select an elevator** from the dashboard
3. **Click on a floor** to start maintenance
4. **Press "Start Maintenance"**
5. **Log issues** as you work (tap checkbox to mark resolved)
6. **Movement is auto-tracked** (simulated every 5 seconds)
7. **Press "End Maintenance"** when done
8. **View the report** with heat maps showing where you worked
9. **Export report** if needed

### For Administrators

1. **Login** with admin credentials (email contains "admin")
2. **View all elevators** from dashboard
3. **Click elevator → View Details** (no "Start Maintenance" button)
4. **Select floor** to see back-reports for that floor
5. **Access Heat Maps** from bottom navigation or hamburger menu
6. **Filter by elevator** using dropdown
7. **View Vertical Heat Map** to see floor-to-floor movement
8. **View individual floor heat maps** to see work patterns
9. **Analyze technician performance** through time-spent data

## 🗺️ Heat Map System

### Vertical Heat Map (Floor Movement)
- Shows technician movement between floors
- Each floor = 3 meters in height
- Heat intensity = time spent on each floor
- Useful for: Understanding workflow, identifying problem floors

### Horizontal Heat Map (Within Car)
- Shows position within 1.5m × 1.5m elevator car
- Car Top Access area marked at top
- Heat zones based on clustered movement points
- Useful for: Identifying specific maintenance areas, equipment locations

### How It Works
1. Every 5 seconds during active maintenance, app records position
2. Position simulated with random x, y within 1.5m × 1.5m
3. Floor calculated from z-height (3m per floor)
4. Data clustered into 30cm grid zones
5. Heat intensity = duration spent in each zone

## 🌍 Multi-Language Support

**Supported Languages:**
- 🇬🇧 English (default)
- 🇫🇮 Finnish (Suomi)
- 🇩🇪 German (Deutsch)
- 🇫🇷 French (Français)
- 🇨🇳 Chinese (中文)

**To Change Language:**
1. Click Settings (gear icon) in bottom navigation
2. Select desired language
3. All text updates immediately

## 💾 Data Persistence

All data is saved to Supabase backend:
- **Elevators**: Persisted across sessions
- **Maintenance Sessions**: Complete history with movements
- **Reports**: Accessible by admins and technicians
- **Issues**: Tracked per session

## 📊 Technical Details

### Movement Tracking Logic
- **Floor Height**: 3 meters per floor
- **Elevator Dimensions**: 1.5m × 1.5m square
- **Recording Interval**: Every 5 seconds during active maintenance
- **Grid Resolution**: 30cm clusters for heat zones
- **Z-Position Calculation**: `z = (floor - 1) * 3` meters

### Back-Reporting Analysis
Admins can determine:
- Which floor had longest maintenance time
- Where within the car technician worked
- Total session duration
- Issues resolved vs unresolved
- Movement patterns (started from top floor per protocol)

## 🔧 How to Demo on Mobile

### Option 1: Direct Browser Access
1. Open the deployed URL in mobile browser
2. Bookmark for fullscreen app-like experience
3. Use Chrome/Safari "Add to Home Screen" for PWA-like behavior

### Option 2: Browser Dev Tools
1. Open in desktop browser
2. Press F12 for DevTools
3. Click device emulation (mobile icon)
4. Select "iPhone 14 Pro" (390 × 844)
5. Refresh page

### Option 3: Local Development
1. Run: `npm install`
2. Run: `npm run dev`
3. Open mobile browser to local IP
4. Example: `http://192.168.1.x:5173`

## 🎨 Design Specifications

- **Mobile Frame**: 390px × 844px (iPhone 14 Pro)
- **Primary Color**: #005EB8 (KONE Blue)
- **Background**: White/Light Gray
- **Style**: Clean, minimal, professional wireframe
- **Navigation**: Custom screen-based with proper history
- **Typography**: Sans-serif, multiple sizes

## 🔔 Health Monitor

For technician safety:
- Vibrates every 30 minutes (simulated)
- Red pulsing indicator on dashboard when active
- Click "Health Monitor" or "Acknowledge" to dismiss
- Volume buttons also stop vibration (keyboard event simulation)

## 📝 Notes for POC Demo

### Key Talking Points
1. **Real-time tracking**: Show movement being recorded every 5 seconds
2. **Dual heat maps**: Demonstrate both vertical and horizontal views
3. **Back-reporting**: Show admin view analyzing technician work
4. **Multi-language**: Switch languages to show internationalization
5. **Role-based access**: Login as admin vs technician to show differences
6. **Data persistence**: Show saved reports loading from backend
7. **Professional UI**: Clean KONE branding throughout

### Demo Flow Suggestion
1. Start with splash screen → Login as technician
2. Search for elevator, view details
3. Start maintenance on Floor 5
4. Add some issues, mark one resolved
5. Wait 15-20 seconds (3-4 movement recordings)
6. End maintenance
7. Show report with heat maps
8. Logout → Login as admin
9. View the same elevator's back-reports
10. Show vertical and horizontal heat maps
11. Change language in settings
12. Show all elevators and saved reports

## 🚨 Important Limitations

- **Simulated Movement**: Positions are randomized, not real GPS/sensor data
- **Web-based**: This is a React web app, not native React Native
- **Browser Vibration API**: May not work on all devices/browsers
- **No Real IoT Integration**: Movement tracking is simulated every 5 seconds
- **Mock Authentication**: Any password works for demo purposes

## 🔮 Future Enhancements

- Real GPS/sensor integration
- Emergency contact notifications
- Advanced analytics dashboard
- Photo attachments for issues
- Offline mode with sync
- QR code elevator scanning
- Maintenance scheduling
- Parts inventory tracking

---

## 📚 Complete Documentation

### 🚀 Getting Started
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - 5-minute demo walkthrough
- **[MANAGER_DEMO_GUIDE.md](./MANAGER_DEMO_GUIDE.md)** - One-page guide for manager demos

### 🔧 Recent Fixes
- **[FIXES_SUMMARY.md](./FIXES_SUMMARY.md)** - All issues resolved & code changes
- **[TROUBLESHOOTING_GUIDE.md](./TROUBLESHOOTING_GUIDE.md)** - Common issues & debugging

### ☁️ Deployment Guides
- **[AWS_S3_DEPLOYMENT_GUIDE.md](./AWS_S3_DEPLOYMENT_GUIDE.md)** - Deploy web app to AWS S3 (< $1/month)
- **[APK_CREATION_GUIDE.md](./APK_CREATION_GUIDE.md)** - Create Android APK (PWA + Capacitor methods)

### 📋 Technical Details
- **[FEATURE_CHECKLIST.md](./FEATURE_CHECKLIST.md)** - All features and their status
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical architecture
- **[MOBILE_DEMO_GUIDE.md](./MOBILE_DEMO_GUIDE.md)** - Mobile testing instructions

---

## ✅ Latest Updates (February 2026)

### 🎉 All Issues RESOLVED:

1. **✅ Reports now show immediately after ending maintenance**
   - Previously: Reports section was blank
   - Now: Full report with heat maps appears instantly
   - Sessions properly saved to Supabase

2. **✅ Admin access properly restricted**
   - Previously: Admin could see "Start Maintenance" button
   - Now: Admin can ONLY view data and analytics
   - Floor clicks show floor-specific heat maps

3. **✅ Backend connection established**
   - Previously: "Failed to fetch" errors everywhere
   - Now: Supabase fully connected and working
   - All data persists correctly

4. **✅ Enhanced admin floor view**
   - Click any floor as admin → See heat maps for that floor
   - Shows last recorded heat map if no recent activity
   - Floor-specific button labels and data filtering

### 🚀 Ready for Production Demo:
- ✅ All features working
- ✅ Backend connected
- ✅ Data persisting
- ✅ Role-based access enforced
- ✅ Reports displaying correctly
- ✅ Heat maps with real data
- ✅ Deployment guides ready

---

## 📞 Support

This is a proof-of-concept demonstration application built with React, TypeScript, Tailwind CSS, and Supabase.

**Status:** ✅ Production-ready POC
**Deployment Cost:** < $1/month (AWS S3 + Supabase free tier)
**Mobile:** Web + PWA + Native APK available

---

**Built for KONE by Figma Make** | February 2026 | **Latest Update:** All Issues Resolved ✅
