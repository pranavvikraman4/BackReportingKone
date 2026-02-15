# 🚀 KONE Maintenance App - Quick Start Guide

## 📱 Instant Demo Access

1. Open the app in your browser
2. Wait 2.5s for splash screen
3. Login with:
   - **Admin**: `admin@kone.com` (any password)
   - **Technician**: `tech@kone.com` (any password)

## 🎯 5-Minute Demo Walkthrough

### As Technician:

1. **Login** → Dashboard appears
2. **Click "ELV-003"** → View elevator details (12 floors)
3. **Click "Floor 5"** → Maintenance screen
4. **Press "Start Maintenance"** → Timer starts ⏱️
5. **Add an issue**: Type "Door alignment" → Press Add
6. **Wait 15 seconds** → 3 movement points recorded automatically
7. **Click checkbox** next to an issue → Marks it resolved ✅
8. **Press "End Maintenance"** → Report appears
9. **Click "View Vertical Heat Map"** → See floor movement 📊
10. **Click "View Floor 5 Heat Map"** → See position within car 🗺️
11. **Scroll down** → Click "Generate TXT Report" → Downloads 📥

### As Admin:

1. **Logout** → Login as `admin@kone.com`
2. **Click "Heat Maps" tab** (bottom navigation)
3. **See all sessions** from all technicians
4. **Select elevator** from dropdown → Filter reports
5. **Click "Vertical Map"** on any session → Analyze movement
6. **Click "Full Report"** → See complete details
7. **Notice**: No "Start Maintenance" buttons (admin can only view)

### Language Change:

1. **Click Settings** (gear icon at bottom)
2. **Select "Finnish"** → UI updates to Suomi 🇫🇮
3. **Select "Chinese"** → UI updates to 中文 🇨🇳
4. **Select "English"** → Back to English 🇬🇧

## 🔑 Key Features to Highlight

### ✅ Bottom Navigation (Working!)
- **Home**: Dashboard with all elevators
- **Heat Maps**: Quick access to analytics
- **Issues**: All logged issues across elevators
- **Reports**: Saved maintenance sessions
- **Settings**: Language selection

### ✅ Hamburger Menu (Working!)
- All features accessible
- Slides from left with smooth animation
- Red dot on "Health Monitor" when active
- Logout at bottom

### ✅ Real Heat Maps (Not Mock!)
- Movement recorded every 5 seconds
- Saved to Supabase backend
- Vertical: Floor-to-floor movement
- Horizontal: Position within 1.5m × 1.5m car

### ✅ Admin vs Tech Views
- **Admin**: Can't start maintenance, only view reports
- **Technician**: Can start/end, log issues, see own reports

### ✅ Data Persistence
- All sessions saved to cloud
- Refresh page → Data still there
- Admin sees ALL sessions
- Reports survive browser close

## 📊 Understanding Heat Maps

### Vertical Heat Map
```
Floor 12 ▓░░░░░░░░░░░░░░░░░░░ (5m 30s)
Floor 11 ▓░░░░░░░░░░░░░░░░░░░ (2m 15s)
Floor 10 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ (15m 40s) ← Most time
Floor 9  ▓░░░░░░░░░░░░░░░░░░░ (3m 20s)
```
- Bar length = time spent on floor
- Darker = more time
- Shows workflow pattern

### Horizontal Heat Map
```
┌─────────────────────┐
│  Door               │
│ ┌─────────────────┐ │
│ │ Car Top Access  │ │
│ └─────────────────┘ │
│                     │
│     ●               │ ← Small circle = quick work
│           ●●●       │ ← Large circles = long time
│        ●●●●●        │
│                     │
└─────────────────────┘
```
- Circle size = time in that spot
- Opacity = intensity
- Shows WHERE technician worked

## 🌍 Language Support

| Language | Code | Example |
|----------|------|---------|
| English | `en` | "Start Maintenance" |
| Finnish | `fi` | "Aloita huolto" |
| German | `de` | "Wartung starten" |
| French | `fr` | "Démarrer maintenance" |
| Chinese | `zh` | "开始维护" |

**All text translates**: Buttons, labels, titles, messages, tooltips

## 🎨 Visual Guide

### KONE Logo
```
┌───┬───┬───┬───┐
│ K │ O │ N │ E │
└───┴───┴───┴───┘
```
4 bordered boxes with blue letters

### Mobile Frame
```
┌─────────────────┐ 390px width
│                 │
│   App Content   │ 844px height
│                 │
└─────────────────┘
```

### Bottom Navigation
```
┌──────┬──────┬──────┬──────┬──────┐
│ Home │ Maps │Issues│Report│ Set  │
└──────┴──────┴──────┴──────┴──────┘
```
All tabs work, highlight when active

## 🔍 Troubleshooting

**Q: Heat maps show "No data"**
- A: Need to complete a maintenance session first
- Solution: Start → Wait 15s → End maintenance

**Q: Reports not saving**
- A: Check browser console for errors
- Backend should be connected to Supabase

**Q: Vibration not working**
- A: Browser Vibration API not supported on all devices
- Normal for desktop browsers

**Q: Language not changing**
- A: Should work instantly
- Try refreshing if stuck

**Q: Can't see "Start Maintenance" as admin**
- A: Correct! Admins can only view, not start
- Login as tech@kone.com to start maintenance

## 📞 Demo Tips

### For Best Impression:

1. **Start with splash screen** (shows KONE branding)
2. **Login as technician first** (show main workflow)
3. **Actually wait 15-20 seconds** during maintenance (shows real tracking)
4. **Add multiple issues** (makes report more interesting)
5. **Show both heat maps** (vertical + horizontal)
6. **Then login as admin** (show different view)
7. **Change language** (impressive internationalization)
8. **End with mobile view** (show responsive design)

### What to Say:

- "Movement tracked every 5 seconds"
- "3 meters per floor, standard elevator height"
- "1.5m × 1.5m square elevator car"
- "Heat intensity shows WHERE technician worked"
- "Back-reporting eliminates manual logs"
- "Multi-language for global teams"
- "Admin can analyze all technician activity"
- "Data persists in cloud (Supabase)"

## 🎬 30-Second Elevator Pitch

> "This is a back-reporting system for elevator maintenance. Technicians start a session, and their movement is automatically tracked every 5 seconds. When they finish, we generate heat maps showing exactly where they worked—both which floors they visited and where within the elevator car. Admins can see all sessions, analyze patterns, and verify work without asking technicians. It supports 5 languages and works on any mobile device. All data is saved to the cloud."

## 🏆 Success Criteria

Your demo is successful when viewers understand:
- ✅ This tracks technician movement automatically
- ✅ Heat maps show time spent on each floor AND within car
- ✅ Admin can see where faults were fixed without asking
- ✅ System works in multiple languages
- ✅ Data is saved and accessible anywhere
- ✅ Replaces manual reporting

---

**Ready to Demo!** 🎉

Open the app, follow this guide, and you'll have a compelling POC demonstration.
