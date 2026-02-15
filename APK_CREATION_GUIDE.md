# 📱 APK Creation Guide for KONE Maintenance App

## 🎯 Goal

Convert your React web app into a native Android APK that can be installed on Android phones without Google Play Store.

---

## 🔍 Understanding Your Options

### Option 1: PWA (Progressive Web App) ⭐ RECOMMENDED for POC
**What it is:** Users add your web app to their home screen
**Pros:**
- ✅ No code changes needed
- ✅ Works immediately
- ✅ Easy updates (just update website)
- ✅ No app store approval needed
- ✅ Works on Android AND iOS

**Cons:**
- ⚠️ Not a "real" APK file
- ⚠️ Requires internet connection
- ⚠️ Limited device features

### Option 2: Capacitor ⭐ BEST for Production
**What it is:** Wraps your React app in a native container
**Pros:**
- ✅ Creates real APK file
- ✅ Access to native device features
- ✅ Can work offline
- ✅ Feels like native app
- ✅ Same codebase for iOS & Android

**Cons:**
- ⚠️ Requires setup and configuration
- ⚠️ Larger file size
- ⚠️ Need Android Studio

### Option 3: React Native (Complete Rewrite)
**Not Recommended** - Would require rewriting entire app

---

## 🚀 METHOD 1: PWA (Quick Demo - 10 minutes)

### Step 1: Add PWA Manifest

Create `/public/manifest.json`:

```json
{
  "name": "KONE Maintenance Tracker",
  "short_name": "KONE Maintenance",
  "description": "Track elevator maintenance with real-time heat maps",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#005EB8",
  "theme_color": "#005EB8",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Step 2: Add Service Worker

Create `/public/sw.js`:

```javascript
const CACHE_NAME = 'kone-maintenance-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### Step 3: Update index.html

Add to `<head>` section:

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#005EB8">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="KONE Maintenance">
<link rel="apple-touch-icon" href="/icon-192.png">
```

Add before closing `</body>`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registered'))
      .catch((err) => console.log('Service Worker registration failed:', err));
  }
</script>
```

### Step 4: Create Icons

Create KONE-branded icons:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Design tips:
- Use KONE blue (#005EB8) background
- White KONE logo or "K" letter
- Simple, recognizable design

### Step 5: Deploy & Test

1. **Deploy to S3** (from previous guide)
2. **Open on Android phone**
3. **Tap Chrome menu (⋮)** → "Add to Home screen"
4. **Name it** "KONE Maintenance"
5. **Icon appears** on home screen like native app!

**Demo for Manager:**
1. Send them the S3 URL
2. Guide them: "Open in Chrome → Menu → Add to Home screen"
3. They can launch it like any app!

---

## 🔧 METHOD 2: Capacitor (Production APK - 2 hours)

### Prerequisites

1. **Node.js** (already installed)
2. **Android Studio** - Download from https://developer.android.com/studio
3. **Java JDK 11+** - Comes with Android Studio

### Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Step 2: Initialize Capacitor

```bash
npx cap init "KONE Maintenance" "com.kone.maintenance" --web-dir=dist
```

**Explanation:**
- App name: "KONE Maintenance"
- Package ID: "com.kone.maintenance" (unique identifier)
- Web directory: "dist" (your build folder)

### Step 3: Add Android Platform

```bash
npx cap add android
```

This creates an `android` folder with native Android project.

### Step 4: Configure Capacitor

Edit `capacitor.config.json`:

```json
{
  "appId": "com.kone.maintenance",
  "appName": "KONE Maintenance",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "url": "https://your-s3-url.com",
    "cleartext": true
  },
  "android": {
    "allowMixedContent": true,
    "backgroundColor": "#005EB8"
  }
}
```

### Step 5: Build React App

```bash
npm run build
```

### Step 6: Sync with Android

```bash
npx cap sync android
```

This copies your built app into the Android project.

### Step 7: Open in Android Studio

```bash
npx cap open android
```

Android Studio will open with your project.

### Step 8: Build APK in Android Studio

1. **Wait for Gradle sync** to complete (bottom right)
2. **Click "Build"** menu → "Build Bundle(s) / APK(s)" → "Build APK(s)"
3. **Wait 2-5 minutes** for build to complete
4. **Click "locate"** link in notification
5. **APK location**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 9: Install APK on Phone

#### Method A: USB Cable
1. **Enable Developer Mode** on Android phone:
   - Settings → About Phone → Tap "Build Number" 7 times
2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging → ON
3. **Connect phone** via USB
4. **In Android Studio**: Click "Run" button (green play icon)
5. **Select your device** from list
6. **App installs and launches** automatically!

#### Method B: Share APK File
1. **Copy APK** to Google Drive / Dropbox / Email
2. **Download on phone**
3. **Tap APK file**
4. **Allow "Install from Unknown Sources"** if prompted
5. **Install** and open!

### Step 10: Test APK

Test all features:
- [ ] Login works
- [ ] Navigation works
- [ ] Start/End maintenance
- [ ] Add issues
- [ ] View heat maps
- [ ] Reports save
- [ ] Offline behavior (if needed)

---

## 🎨 Customizing Your APK

### Change App Icon

1. **Create icon** (1024x1024 PNG with KONE branding)
2. **Use Android Asset Studio**: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
3. **Download icon pack**
4. **Replace files** in `android/app/src/main/res/` folders:
   - mipmap-hdpi
   - mipmap-mdpi
   - mipmap-xhdpi
   - mipmap-xxhdpi
   - mipmap-xxxhdpi

### Change App Name

Edit `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">KONE Maintenance</string>
    <string name="title_activity_main">KONE Maintenance</string>
    <string name="package_name">com.kone.maintenance</string>
</resources>
```

### Change Splash Screen

1. **Create splash image** (2732x2732 PNG, KONE branding)
2. **Add to**: `android/app/src/main/res/drawable/splash.png`
3. **Configure** splash colors in `capacitor.config.json`:

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2500,
      "backgroundColor": "#005EB8",
      "showSpinner": false
    }
  }
}
```

---

## 📦 Creating SIGNED APK (For Distribution)

### Why Sign?

- Required for Google Play Store
- Required for enterprise distribution
- Verifies app hasn't been tampered with

### Step 1: Generate Keystore

```bash
keytool -genkey -v -keystore kone-maintenance.keystore -alias kone -keyalg RSA -keysize 2048 -validity 10000
```

**Enter information when prompted:**
- Password: (create strong password, SAVE IT!)
- Name: KONE Corporation
- Organization: KONE
- City: Helsinki
- Country: FI

### Step 2: Configure Signing

Create `android/key.properties`:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=kone
storeFile=../kone-maintenance.keystore
```

**⚠️ IMPORTANT: Never commit this file to git!**

Add to `android/.gitignore`:
```
key.properties
*.keystore
```

### Step 3: Update build.gradle

Edit `android/app/build.gradle`:

Add after `android {` block:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 4: Build Signed APK

In Android Studio:
1. **Build** → "Generate Signed Bundle / APK"
2. **Select "APK"** → Next
3. **Select keystore file** → Enter passwords
4. **Select "release"** build variant
5. **Click "Finish"**

**Output:** `android/app/release/app-release.apk`

This APK can be:
- Distributed to testers
- Uploaded to Google Play Store
- Shared with enterprise users

---

## 🏢 Enterprise Distribution (For KONE Internal Use)

### Option 1: Internal App Store (MDM)

If KONE uses Mobile Device Management (MDM):
1. **Contact IT department**
2. **Provide signed APK**
3. **IT uploads to MDM**
4. **Employees download from company portal**

### Option 2: Google Play Console (Private)

1. **Create Google Play Console account** ($25 one-time fee)
2. **Create "Internal Testing" track**
3. **Add tester emails** (up to 100 for free)
4. **Upload APK**
5. **Testers receive link** to download

### Option 3: Direct Distribution

1. **Host APK on internal server**
2. **Create download page** with instructions
3. **Users download and install**
4. **Update by downloading new version**

---

## 🔄 Updating Your APK

### After Code Changes:

```bash
# 1. Build React app
npm run build

# 2. Sync with Capacitor
npx cap sync android

# 3. Increment version
# Edit android/app/build.gradle:
# versionCode 2
# versionName "1.0.1"

# 4. Build new APK in Android Studio
```

**Version Numbering:**
- **versionCode**: Integer that increases (1, 2, 3, ...)
- **versionName**: Display version ("1.0.0", "1.0.1", "1.1.0", ...)

---

## 📊 APK Size Optimization

Your APK will be ~15-25 MB. To reduce size:

### 1. Enable Proguard (Minification)

Already configured in signed APK process above.

### 2. Use APK Analyzer

In Android Studio:
- **Build** → "Analyze APK"
- **Select your APK**
- **See what's taking space**
- **Remove unused resources**

### 3. Remove Unused Libraries

Check `package.json` and remove packages you're not using.

### 4. Optimize Images

- Use WebP format instead of PNG
- Compress images before bundling
- Use SVG for icons when possible

---

## 🐛 Common Issues & Solutions

### Issue: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"

**Solution:**
```bash
# Uninstall old version first
adb uninstall com.kone.maintenance

# Then install new version
adb install app-debug.apk
```

### Issue: "App won't connect to Supabase"

**Solution:**
- Add internet permission to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<application android:usesCleartextTraffic="true" ...>
```

### Issue: "White screen after install"

**Solution:**
- Check capacitor.config.json has correct server URL
- Verify app built correctly: `npm run build`
- Check logcat in Android Studio for errors

### Issue: "Gradle sync failed"

**Solution:**
- Update Android Studio to latest version
- File → Invalidate Caches / Restart
- Delete `android/.gradle` folder and retry

---

## ✅ Final Checklist

Before giving APK to manager:

- [ ] App opens without errors
- [ ] Login works
- [ ] All screens navigate correctly
- [ ] Start/End maintenance functions
- [ ] Heat maps display properly
- [ ] Reports save to Supabase
- [ ] App icon looks professional
- [ ] Splash screen shows KONE branding
- [ ] All 5 languages work
- [ ] Tested on at least 2 different phones
- [ ] Version number is correct
- [ ] APK is signed (for distribution)

---

## 📋 Demo Preparation

### For Manager Demo:

1. **Share APK** via email/drive (app-release.apk)
2. **Provide installation instructions**:
   - "Download APK on phone"
   - "Tap downloaded file"
   - "Allow install from unknown sources"
   - "Tap Install"
3. **Share login credentials**:
   - Admin: admin@kone.com
   - Tech: tech@kone.com
4. **Provide quick start guide**
5. **Mention internet is required** (data or WiFi)

### Installation Instructions Document:

Create a simple guide:

```
KONE MAINTENANCE APP - INSTALLATION GUIDE

1. Download the APK file from the link provided
2. Open Downloads folder on your Android phone
3. Tap "kone-maintenance.apk"
4. If prompted "Install blocked" → Tap "Settings" → Enable "Allow from this source"
5. Tap "Install"
6. Wait 10 seconds for installation
7. Tap "Open"
8. Login with: admin@kone.com (any password)

DEMO CREDENTIALS:
- Admin access: admin@kone.com
- Technician: tech@kone.com

Need help? Contact: [your-email]
```

---

## 🎯 Next Steps

### Immediate:
- [ ] Create PWA version (10 min)
- [ ] Test on multiple Android devices
- [ ] Prepare demo script
- [ ] Create installation guide

### Short-term:
- [ ] Build full Capacitor APK
- [ ] Design professional app icon
- [ ] Create splash screen
- [ ] Test offline capabilities

### Long-term:
- [ ] Google Play Store listing
- [ ] iOS version with Capacitor
- [ ] Add push notifications
- [ ] Enhanced offline mode
- [ ] Analytics integration

---

## 💡 Pro Tips

1. **Use PWA for POC** - Fastest, easiest, works immediately
2. **Use Capacitor for Production** - Real app feel, full features
3. **Sign your APK** - Professional, secure, distributable
4. **Test on real devices** - Emulators don't show all issues
5. **Keep versions tracked** - Easy to identify what users have
6. **Monitor errors** - Use Sentry or similar service

---

## 📞 Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Studio**: https://developer.android.com/studio
- **PWA Guide**: https://web.dev/progressive-web-apps/
- **App Icon Generator**: https://www.appicon.co/
- **APK Analyzer**: Built into Android Studio

---

## 🎉 Success!

You now have multiple options for deploying your KONE Maintenance App:

✅ **Web Version** - Deployed on AWS S3
✅ **PWA** - Installable web app (quick demo)
✅ **APK** - Native Android app (production)
✅ **Backend** - Supabase (working seamlessly)

**Total deployment time:**
- PWA: 30 minutes
- Full APK: 2-3 hours (first time)
- Updates: 15 minutes

Your app is now demo-ready for your manager! 🚀
