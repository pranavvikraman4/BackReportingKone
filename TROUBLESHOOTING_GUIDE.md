# 🔧 Troubleshooting Guide - KONE Maintenance App

## ❌ Current Errors Fixed

### Error: "Failed to fetch"

**What you were seeing:**
```
❌ Error fetching elevators: TypeError: Failed to fetch
❌ Error saving elevator: TypeError: Failed to fetch
❌ Error fetching sessions: TypeError: Failed to fetch
❌ Error saving session: TypeError: Failed to fetch
```

**Root Cause:** Supabase backend wasn't connected properly

**✅ FIXED:** Supabase connection has been established and your backend is now running!

---

## 🔍 How to Verify Backend is Working

### Test 1: Check Health Endpoint

Open browser console (F12) and run:

```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d8538b0e/health', {
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Backend healthy:', data))
.catch(err => console.log('❌ Backend error:', err));
```

**Expected response:**
```json
{"status": "ok"}
```

### Test 2: Check Elevators Endpoint

```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d8538b0e/elevators', {
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Elevators:', data))
.catch(err => console.log('❌ Error:', err));
```

**Expected response:** Array of elevator objects

### Test 3: Watch Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by **Fetch/XHR**
4. Perform action (login, start maintenance)
5. See requests to Supabase with status 200 ✅

---

## 🔄 What Changed in Your Fix

### 1. **Backend Connection Established**
- Supabase is now properly connected
- All API endpoints are active
- Data persistence is working

### 2. **Fixed Report Navigation**
- After ending maintenance, you now see the report immediately
- Session ID is properly passed to report screen
- Heat maps are accessible

### 3. **Enhanced Admin View**
- Removed "Start Maintenance" from admin access (admins can only view)
- When admin clicks a floor, they see heat maps for that floor
- Shows last recorded heat map if no recent activity

### 4. **Improved Error Messages**
- All errors now have ❌ emoji for visibility
- More descriptive console logging
- Easier debugging

---

## 🎯 Testing Your Fixes

### Test Scenario 1: Technician Workflow

1. **Login** as `tech@kone.com`
2. **Click elevator** "ELV-003"
3. **Click floor** "Floor 5"
4. **Start maintenance** → Timer starts
5. **Wait 15-20 seconds** → Movement points recorded
6. **Add issue**: "Test issue"
7. **End maintenance** → **YOU SHOULD NOW SEE THE REPORT! ✅**
8. **Verify heat maps** are visible
9. **Check Reports tab** → Session should be saved

**Expected:**
- ✅ Report screen appears immediately after ending
- ✅ Heat maps button works
- ✅ Report is saved in Reports tab
- ✅ No more "blank screen" after ending

### Test Scenario 2: Admin Workflow

1. **Login** as `admin@kone.com`
2. **Click elevator** "ELV-003"
3. **Verify NO "Start Maintenance" button** ✅
4. **Click floor** "Floor 5"
5. **Should navigate to Admin Reports screen** ✅
6. **See heat maps** for that floor (if any maintenance was done)

**Expected:**
- ✅ Admin cannot start maintenance
- ✅ Clicking floor shows floor-specific reports
- ✅ Heat maps button shows "Floor 5 Heat Map" instead of "Vertical Map"
- ✅ If no data, shows helpful message

### Test Scenario 3: Reports Section

1. **Complete a maintenance session** (as technician)
2. **Go to Reports tab** (bottom navigation)
3. **Verify session appears** in list
4. **Click session** → Should open report
5. **Click "View Vertical Heat Map"** → Should show heat map
6. **Click "View Floor Heat Map"** → Should show floor-specific heat map

**Expected:**
- ✅ All completed sessions appear
- ✅ Reports are clickable
- ✅ Heat maps display data
- ✅ No errors in console

---

## 🐛 If You Still See Errors

### Check 1: Supabase Project Status

1. Go to https://supabase.com/dashboard
2. Check your project is "Active" (green)
3. Verify Edge Functions are deployed
4. Check "Logs" tab for any errors

### Check 2: Environment Variables

Your app needs these values (check `/utils/supabase/info.tsx`):
```typescript
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

**To find these values:**
1. Supabase Dashboard → Your Project
2. Settings → API
3. Copy "Project URL" (extract project ID from it)
4. Copy "anon public" key

### Check 3: CORS Issues

If you see "CORS policy" errors:
1. Check Edge Function has CORS enabled (it should be)
2. Verify `allowHeaders` includes "Authorization"
3. Try incognito/private browser window

### Check 4: Network Issues

```javascript
// Test if you can reach Supabase at all
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d8538b0e/health')
  .then(() => console.log('✅ Can reach backend'))
  .catch(() => console.log('❌ Cannot reach backend - check internet/firewall'));
```

---

## 📝 Common Issues & Solutions

### Issue: "Session saved but not showing in Reports"

**Solution:**
- Refresh the Reports screen
- Check browser console for errors
- Verify session has `endTime` (not null)
- Try logout and login again

### Issue: "Heat maps show no data"

**Solution:**
- Ensure maintenance ran for at least 15 seconds (3+ movement points)
- Check session has movements array populated
- Verify `floorsVisited` is calculated correctly
- Look for errors in browser console

### Issue: "Admin can still start maintenance"

**Solution:**
- Verify you're logged in as admin (check top-right)
- Logout and login again to clear state
- Check UserRole is correctly set to 'admin'

### Issue: "Reports screen is blank"

**Solution:**
- Complete at least one maintenance session first
- Verify session.endTime is not null
- Check sessions are being saved to Supabase
- Look at Network tab to see if fetch succeeded

### Issue: "App freezes after ending maintenance"

**Solution:**
- Check browser console for JavaScript errors
- Verify handleEndSession returns sessionId
- Ensure navigation has correct params
- Try hard refresh (Ctrl+Shift+R)

---

## 🔍 Debugging Tips

### Enable Verbose Logging

Add this to App.tsx to see all state changes:

```typescript
useEffect(() => {
  console.log('🔷 Current Session:', currentSession);
  console.log('🔷 Saved Sessions:', Array.from(savedSessions.values()));
}, [currentSession, savedSessions]);
```

### Check Local Storage

Open Console and run:
```javascript
// See what's stored locally
console.log('Storage:', localStorage);

// Clear if corrupted
localStorage.clear();
```

### Monitor All API Calls

```javascript
// Add to App.tsx
const originalFetch = window.fetch;
window.fetch = (...args) => {
  console.log('🌐 API Call:', args[0]);
  return originalFetch(...args)
    .then(response => {
      console.log('✅ Response:', response.status);
      return response;
    })
    .catch(error => {
      console.log('❌ Error:', error);
      throw error;
    });
};
```

### Inspect Supabase Data

Using browser console:
```javascript
// Get all sessions
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d8538b0e/sessions', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
.then(r => r.json())
.then(data => console.table(data));

// Get all elevators
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d8538b0e/elevators', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
.then(r => r.json())
.then(data => console.table(data));
```

---

## ✅ Success Indicators

You know everything is working when:

1. **✅ No console errors** after login
2. **✅ Elevators load** on dashboard
3. **✅ Start maintenance** works without errors
4. **✅ Timer runs** and movement points record
5. **✅ End maintenance** → Report appears immediately
6. **✅ Heat maps display** with actual data
7. **✅ Reports tab** shows all completed sessions
8. **✅ Admin can view** but not start maintenance
9. **✅ Floor-specific heat maps** work for admin
10. **✅ Backend API calls** all return 200 status

---

## 🚀 Performance Check

### Expected Behavior:

| Action | Expected Time |
|--------|---------------|
| Login | < 1 second |
| Load elevators | < 2 seconds |
| Start maintenance | Instant |
| Record movement | Every 5 seconds |
| End maintenance | 1-2 seconds |
| Load report | < 1 second |
| Display heat map | < 1 second |
| Save to backend | < 2 seconds |

### If Slower:

1. **Check internet speed**
2. **Verify Supabase region** (closer = faster)
3. **Clear browser cache**
4. **Check if backend is cold-starting** (first request after idle is slower)

---

## 📞 Getting Help

### Before Asking for Help:

Gather this information:
1. **Browser version** (Chrome, Firefox, etc.)
2. **Console errors** (copy full text)
3. **Network tab screenshot** (showing failed requests)
4. **What you did** (step by step)
5. **What you expected** vs **what happened**

### Error Report Template:

```
ISSUE: [Brief description]

STEPS TO REPRODUCE:
1. Login as technician
2. Select ELV-003
3. Start maintenance
4. ...

EXPECTED: Report should appear
ACTUAL: Blank screen

CONSOLE ERRORS:
[Paste full error message]

NETWORK TAB:
[Screenshot or description of failed requests]

ALREADY TRIED:
- Cleared cache
- Tried different browser
- Logged out and back in
```

---

## 🎉 Your App is Ready!

After these fixes, your KONE Maintenance App should:

- ✅ Connect to Supabase backend successfully
- ✅ Save all maintenance sessions
- ✅ Display reports immediately after ending maintenance
- ✅ Show heat maps with actual movement data
- ✅ Respect admin vs technician permissions
- ✅ Work reliably for your manager demo

**Next Steps:**
1. Test all workflows (technician + admin)
2. Deploy to AWS S3 (see AWS_S3_DEPLOYMENT_GUIDE.md)
3. Create APK for mobile (see APK_CREATION_GUIDE.md)
4. Prepare demo script
5. Show to manager! 🚀

---

## 💡 Pro Debugging Tips

1. **Always check Console first** - Most errors appear here
2. **Use Network tab** - Shows exactly what API calls are made
3. **Test in Incognito** - Rules out browser cache issues
4. **Log everything** - When in doubt, add console.log()
5. **Test incrementally** - Make small changes, test immediately
6. **Keep backup** - Copy working version before major changes

---

**Last Updated:** After Supabase connection fix
**Status:** ✅ All major issues resolved
**Ready for:** Production demo
