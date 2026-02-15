# 📱 Mobile Demo Guide - Show on Your Phone

## 🎯 Goal
Show the KONE Maintenance App on your actual phone during your POC meeting.

## 🚀 Quick Setup (3 Methods)

### Method 1: Direct Mobile Browser ⭐ RECOMMENDED
**Best for**: Live demos, hands-on exploration, passing device around

1. **Get the URL** from your deployment
   - Example: `https://your-app.figma.com/...`

2. **Open on your phone**
   - Use Safari (iOS) or Chrome (Android)
   - Type URL directly into browser

3. **Bookmark for easy access** (optional)
   - Tap Share icon → "Add to Home Screen"
   - Creates app-like icon
   - Opens without browser chrome

4. **Test before meeting**
   - Login as tech@kone.com
   - Complete one quick session
   - Verify heat maps display

**Pros**: Real mobile experience, touch interactions, portable
**Cons**: Small screen for group viewing

---

### Method 2: Screen Mirroring to TV/Projector ⭐ BEST FOR MEETINGS
**Best for**: Group presentations, conference rooms

#### For iPhone (iOS):
1. **Enable Screen Mirroring**
   - Swipe down from top-right (or up from bottom on older iPhones)
   - Tap "Screen Mirroring"
   - Select Apple TV or AirPlay receiver

2. **Alternative: Lightning to HDMI**
   - Use Apple Lightning Digital AV Adapter
   - Connect HDMI cable to TV/projector
   - Instant mirroring

3. **Open app in Safari**
   - Full-screen mode automatically
   - Rotate to portrait if needed

#### For Android:
1. **Enable Cast / Smart View**
   - Swipe down notification shade
   - Tap "Cast" or "Smart View"
   - Select Chromecast or smart TV

2. **Alternative: USB-C to HDMI**
   - Use USB-C to HDMI adapter
   - Connect to TV/projector
   - May need to enable "Desktop mode" in Chrome

3. **Open app in Chrome**
   - Full-screen mode
   - Portrait orientation

**Pros**: Everyone can see, professional, interactive
**Cons**: Requires compatible TV/equipment

---

### Method 3: Desktop Browser with Mobile Emulation
**Best for**: Remote demos, screen sharing, recorded demos

1. **Open Chrome or Edge**
   - Navigate to app URL

2. **Enable Device Emulation**
   - Press **F12** (or Cmd+Option+I on Mac)
   - Click **mobile/tablet icon** (top-left of DevTools)
   - Or press **Ctrl+Shift+M** (Cmd+Shift+M on Mac)

3. **Select Device**
   - Dropdown at top: Select "iPhone 14 Pro"
   - Dimensions: 390 × 844
   - Or custom: 390 width, 844 height

4. **Rotate if needed**
   - Click rotate icon next to device selector
   - Portrait orientation recommended

5. **Hide DevTools for cleaner view**
   - Press F12 again to close DevTools
   - Or minimize to side

**Pros**: Easy to record, share screen on Zoom/Teams, no special hardware
**Cons**: Not real mobile experience, mouse instead of touch

---

## 🎬 Meeting Setup Recommendations

### Option A: Phone + Screen Mirroring (BEST)
**Setup:**
1. Your phone with app loaded
2. Screen mirroring to conference room TV
3. You control on phone, everyone watches on TV

**Flow:**
1. Show splash screen on big screen
2. Demo entire workflow on phone
3. Everyone sees on TV
4. Can zoom in on phone to show details
5. Natural, professional presentation

---

### Option B: Desktop Browser Emulation + Laptop Projector
**Setup:**
1. Laptop connected to projector
2. Browser in mobile emulation mode
3. Mouse simulates touch

**Flow:**
1. Project browser to screen
2. Walk through with mouse clicks
3. Explain each step
4. Easy to navigate with familiar mouse

---

### Option C: Dual View (Phone + Laptop)
**Setup:**
1. Phone for close-up demonstrations
2. Laptop screen mirrored for group viewing

**Flow:**
1. Main demo on laptop (everyone sees)
2. Pass phone around for hands-on feel
3. Best of both worlds

---

## 📋 Pre-Meeting Checklist

### 1 Hour Before Meeting:

- [ ] **Charge phone** to 100%
- [ ] **Test URL** on phone browser
- [ ] **Complete test session** (tech login → start → wait 20s → end)
- [ ] **Verify heat maps** display correctly
- [ ] **Test language switch** (English → Finnish → English)
- [ ] **Check screen mirroring** if using it
- [ ] **Disable notifications** on phone (Do Not Disturb)
- [ ] **Close other browser tabs** on phone
- [ ] **Increase screen brightness** to max
- [ ] **Disable auto-lock** temporarily (Settings → Display → Sleep: Never)

### Test These Scenarios:

1. **Login as technician** ✓
2. **Search for elevator** ✓
3. **Start maintenance** ✓
4. **Add issue** ✓
5. **Mark issue resolved** ✓
6. **End maintenance** (after 15-20s) ✓
7. **View vertical heat map** ✓
8. **View horizontal heat map** ✓
9. **Logout** ✓
10. **Login as admin** ✓
11. **View all reports** ✓
12. **Change language** ✓

---

## 🎯 Recommended Demo Script (5 Minutes)

### Part 1: Technician View (3 min)

**Say:** "Let me show you how a technician uses this..."

1. **Splash → Login**
   - "KONE branded, professional appearance"
   - Login as tech@kone.com

2. **Dashboard**
   - "All elevators at a glance"
   - "Search by location or ID"
   - Show bottom navigation: "5 main sections"

3. **Select Elevator**
   - Click ELV-003
   - "12 floors, all accessible"

4. **Start Maintenance**
   - Click Floor 7
   - Press "Start Maintenance"
   - "Timer starts, movement tracking begins automatically"

5. **Add Issue**
   - Type: "Door sensor alignment"
   - Press Add
   - "Issues logged in real-time"

6. **Wait 15 seconds**
   - "Every 5 seconds, position is recorded"
   - "Simulating IoT sensor data"
   - Show timer counting up

7. **Mark Resolved**
   - Click checkbox on one issue
   - "Easy to track progress"

8. **End Session**
   - Press "End Maintenance"
   - "Automatic report generation"

9. **View Report**
   - "Session summary with all details"
   - Click "View Vertical Heat Map"
   - "Shows floor movement"
   - Go back, click "View Floor 7 Heat Map"
   - "Shows position within elevator car"

### Part 2: Admin View (2 min)

**Say:** "Now as an administrator..."

1. **Logout → Login as admin@kone.com**
   - "Different role, different view"

2. **Navigate to Heat Maps**
   - Click Heat Maps tab at bottom
   - "See all sessions from all technicians"

3. **Select Session**
   - Click the session just created
   - "Can verify work was done"
   - "See exactly where technician worked"
   - Click "Vertical Map"
   - "Floor 7 shows activity"

4. **Highlight Value**
   - "No need to ask technician what they did"
   - "Automatic back-reporting"
   - "Compliance verification"

### Part 3: Languages (30 sec)

**Say:** "Global teams need multiple languages..."

1. **Click Settings**
2. **Select Finnish**
   - UI changes
3. **Select Chinese**
   - UI changes
4. **Back to English**
   - "5 languages supported"

---

## 💡 Pro Tips for Phone Demo

### 1. Keep Phone Steady
- Hold phone with both hands
- Rest elbows on table
- Or use phone stand/holder
- Prevents shaky screen mirroring

### 2. Slow Down Gestures
- Tap deliberately
- Pause between actions
- Let animations complete
- Give viewers time to see

### 3. Narrate Everything
- "Now I'm clicking Start Maintenance..."
- "Notice the timer starting..."
- "Heat map shows 3 zones..."
- Don't assume viewers see what you see

### 4. Zoom In (if needed)
- Triple-tap screen for zoom (iOS)
- Pinch to zoom (Android)
- Show details on heat maps
- Then zoom back out

### 5. Rotate for Better View
- Heat maps: Portrait orientation
- Dashboard: Portrait orientation
- Reports: Could rotate to landscape

---

## 🔧 Troubleshooting

### "App not loading on phone"
- ✓ Check internet connection (WiFi or cellular)
- ✓ Clear browser cache
- ✓ Try different browser (Safari vs Chrome)
- ✓ Check URL is correct

### "Screen mirroring not working"
- ✓ Ensure phone and TV on same WiFi network
- ✓ Restart both devices
- ✓ Check TV input source
- ✓ Update phone OS if needed

### "Heat maps not displaying"
- ✓ Must complete a session first
- ✓ Wait at least 15 seconds during maintenance
- ✓ End session properly
- ✓ Check backend connection

### "Language change not working"
- ✓ Should be instant
- ✓ Try different language
- ✓ Refresh page if stuck

### "Touch not responsive"
- ✓ Clean phone screen
- ✓ Disable screen protector if problematic
- ✓ Check for system updates

---

## 📸 Alternative: Pre-Record Demo Video

If live demo is risky, record it beforehand:

### Recording on Phone:

**iOS:**
1. Settings → Control Center → Add "Screen Recording"
2. Swipe down, tap record button
3. Open app, do demo
4. Stop recording from Control Center
5. Video saved to Photos

**Android:**
1. Swipe down twice
2. Tap "Screen Record"
3. Open app, do demo
4. Stop from notification
5. Video saved to Gallery

### Benefits:
- ✓ No live demo risks
- ✓ Perfect execution
- ✓ Can edit/add narration
- ✓ Reusable for other meetings

---

## 🎓 What to Emphasize on Mobile

1. **"This is a web app, but feels native"**
   - Responsive design
   - Touch-friendly
   - Mobile-first approach

2. **"Works on any device"**
   - No app store needed
   - No installation
   - Instant updates

3. **"Real-time tracking"**
   - Show timer
   - Explain 5-second intervals
   - Movement auto-recorded

4. **"Heat maps are data-driven"**
   - Not mock data
   - Real calculations
   - Based on actual movements

5. **"Backend-powered"**
   - Data persists
   - Cloud storage
   - Multi-device access

---

## 🏆 Meeting Success Checklist

After demo, you should have shown:
- [ ] Clean, professional KONE branding
- [ ] Mobile-optimized interface
- [ ] Real-time movement tracking
- [ ] Both types of heat maps (vertical + horizontal)
- [ ] Admin vs Technician views
- [ ] Multi-language support
- [ ] Data persistence (refresh still shows data)
- [ ] Easy-to-use interface
- [ ] Complete workflow (start to report)
- [ ] Back-reporting value proposition

---

## 📞 Support During Demo

If something goes wrong:
1. **Stay calm** - Technical glitches happen
2. **Have backup plan** - Switch to desktop browser emulation
3. **Explain the concept** - Even if tech fails, the idea is clear
4. **Use the docs** - Show README, diagrams, screenshots
5. **Reschedule if needed** - Better to postpone than show broken demo

---

**You're Ready!** 🎉

Pick your method, test it thoroughly, and you'll deliver a compelling POC demonstration. The app is solid, data is real, features are complete. Trust the demo!

Good luck! 🍀
