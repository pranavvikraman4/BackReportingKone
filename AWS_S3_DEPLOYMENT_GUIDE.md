# 🚀 AWS S3 Deployment Guide for KONE Maintenance App

## ⚠️ Important: Understanding AWS S3

**AWS S3 is for STATIC FILE HOSTING only** - it hosts your built React app (HTML, CSS, JavaScript files).

**Your Supabase backend is SEPARATE** - it's already hosted and will continue working after deploying to S3.

**Cost**: AWS S3 Free Tier includes:
- 5 GB of standard storage
- 20,000 GET requests
- 2,000 PUT requests per month
- Perfect for demos and small apps!

---

## 📋 Prerequisites

1. **AWS Account** - Create one at https://aws.amazon.com/free/
2. **AWS CLI** - Install from https://aws.amazon.com/cli/
3. **Your React App** - Already built and ready
4. **Supabase Backend** - Already connected (no changes needed)

---

## 🔧 Step 1: Build Your App

Open terminal in your project directory and run:

```bash
npm run build
```

This creates a `dist` folder with your production-ready app.

**What happens:**
- React code is compiled and minified
- All files are optimized for production
- Creates HTML, CSS, JS, and asset files

---

## ☁️ Step 2: Create S3 Bucket

### Option A: Using AWS Console (Easiest for beginners)

1. **Login to AWS Console**
   - Go to https://console.aws.amazon.com/
   - Login with your AWS account

2. **Navigate to S3**
   - Search for "S3" in the top search bar
   - Click "S3" under Services

3. **Create Bucket**
   - Click orange "Create bucket" button
   - **Bucket name**: `kone-maintenance-app` (must be globally unique)
   - **Region**: Choose closest to your users (e.g., `eu-north-1` for Finland)
   - **Uncheck** "Block all public access" (your app needs to be public)
   - Check the acknowledgment box
   - Click "Create bucket"

### Option B: Using AWS CLI (For advanced users)

```bash
# Configure AWS CLI (only once)
aws configure
# Enter: Access Key ID, Secret Access Key, Region (eu-north-1), Output format (json)

# Create bucket
aws s3 mb s3://kone-maintenance-app --region eu-north-1

# Enable public access
aws s3api put-public-access-block \
    --bucket kone-maintenance-app \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

---

## 🌐 Step 3: Enable Static Website Hosting

### Using AWS Console:

1. **Click on your bucket** (`kone-maintenance-app`)
2. **Go to "Properties" tab**
3. **Scroll to "Static website hosting"**
4. **Click "Edit"**
5. **Enable** static website hosting
6. **Index document**: `index.html`
7. **Error document**: `index.html` (for React Router)
8. **Save changes**
9. **Copy the "Bucket website endpoint"** URL (e.g., `http://kone-maintenance-app.s3-website.eu-north-1.amazonaws.com`)

### Using AWS CLI:

```bash
aws s3 website s3://kone-maintenance-app/ \
    --index-document index.html \
    --error-document index.html
```

---

## 📤 Step 4: Upload Your App

### Using AWS Console:

1. **Go to "Objects" tab** in your bucket
2. **Click "Upload"**
3. **Add files** - Select ALL files from your `dist` folder
4. **Add folders** - Also upload any subfolders
5. **Permissions**: Under "Predefined ACLs", select "Grant public-read access"
6. **Click "Upload"**

### Using AWS CLI (Recommended):

```bash
# Upload all files from dist folder
aws s3 sync ./dist/ s3://kone-maintenance-app/ --acl public-read

# Optional: Set cache control for better performance
aws s3 sync ./dist/ s3://kone-maintenance-app/ \
    --acl public-read \
    --cache-control "public, max-age=31536000" \
    --exclude "index.html" \
    --exclude "*.html"

# Upload HTML files with no cache (so updates are immediate)
aws s3 sync ./dist/ s3://kone-maintenance-app/ \
    --acl public-read \
    --cache-control "no-cache" \
    --include "*.html"
```

---

## 🔐 Step 5: Set Bucket Policy (Important!)

This makes your app publicly accessible.

1. **Go to "Permissions" tab**
2. **Click "Bucket Policy"**
3. **Paste this policy** (replace `kone-maintenance-app` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::kone-maintenance-app/*"
        }
    ]
}
```

4. **Save changes**

### Using AWS CLI:

```bash
# Create policy.json file with the above content, then:
aws s3api put-bucket-policy \
    --bucket kone-maintenance-app \
    --policy file://policy.json
```

---

## ✅ Step 6: Test Your Deployment

1. **Open the S3 website endpoint URL** you copied in Step 3
2. **Test login** with demo credentials
3. **Test maintenance flow** - start/end session
4. **Check heat maps** - verify they display correctly
5. **Test all 5 languages**
6. **Check mobile responsiveness** - resize browser

**Example URL format:**
```
http://kone-maintenance-app.s3-website.eu-north-1.amazonaws.com
```

---

## 🔄 Step 7: Updating Your App (When you make changes)

After making code changes:

```bash
# 1. Build new version
npm run build

# 2. Upload to S3 (replaces old files)
aws s3 sync ./dist/ s3://kone-maintenance-app/ --acl public-read --delete

# The --delete flag removes old files that no longer exist
```

---

## 🌍 Step 8 (Optional): Custom Domain with CloudFront

For production, use CloudFront CDN for:
- HTTPS (secure connection)
- Custom domain (e.g., `maintenance.kone.com`)
- Faster global access
- Lower latency

### Quick CloudFront Setup:

1. **Go to CloudFront** in AWS Console
2. **Create Distribution**
3. **Origin domain**: Select your S3 bucket
4. **Viewer protocol policy**: Redirect HTTP to HTTPS
5. **Default root object**: `index.html`
6. **Create distribution**
7. **Wait 10-15 minutes** for deployment
8. **Use CloudFront URL** (e.g., `d1234567890.cloudfront.net`)

**Cost**: CloudFront free tier includes 1 TB of data transfer out per month.

---

## 📱 Mobile Access

Your app is now accessible from ANY device with a browser:

```
✅ Desktop computers
✅ Laptops
✅ Tablets
✅ Mobile phones (Android & iOS)
✅ Any device with internet
```

**For manager demo:**
1. Share the S3 website URL
2. Manager opens on their phone browser
3. No installation needed!

**To make it feel like a native app:**
- On Android Chrome: Tap "⋮" menu → "Add to Home screen"
- On iOS Safari: Tap Share icon → "Add to Home Screen"
- Creates an icon like a real app!

---

## 🔍 Troubleshooting

### Problem: "Access Denied" error

**Solution:**
- Check bucket policy is applied correctly
- Verify "Block public access" is turned OFF
- Ensure all files have public-read ACL

### Problem: White screen or 404 errors

**Solution:**
- Check error document is set to `index.html`
- Verify all files uploaded correctly
- Check browser console for errors

### Problem: Changes not showing

**Solution:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check you uploaded latest build
- Wait a few minutes for S3 to update

### Problem: Supabase errors

**Solution:**
- Supabase backend is separate from S3
- Check your Supabase project is running
- Verify projectId and publicAnonKey in code

---

## 💰 Cost Estimate

**For a POC/Demo (100 users, 1000 sessions/month):**

| Service | Usage | Cost |
|---------|-------|------|
| S3 Storage | 1 GB | $0.02/month |
| S3 Requests | 10,000 GET | Free Tier |
| Data Transfer | 10 GB out | Free Tier |
| **Total** | | **< $1/month** |

**Supabase:**
- Free tier: Unlimited API requests
- 500 MB database
- 1 GB file storage
- Perfect for POC!

---

## 🎯 Production Checklist

Before going to production:

- [ ] Custom domain configured
- [ ] HTTPS enabled (via CloudFront)
- [ ] Environment variables secured
- [ ] Error monitoring setup (e.g., Sentry)
- [ ] Analytics added (e.g., Google Analytics)
- [ ] Backup strategy for Supabase data
- [ ] Terms of Service / Privacy Policy
- [ ] Load testing completed
- [ ] Security audit done

---

## 📞 Support Resources

- **AWS S3 Documentation**: https://docs.aws.amazon.com/s3/
- **AWS Free Tier**: https://aws.amazon.com/free/
- **Supabase Docs**: https://supabase.com/docs
- **AWS Support**: Available in AWS Console

---

## 🎉 You're Done!

Your KONE Maintenance App is now:
- ✅ Deployed on AWS S3
- ✅ Accessible worldwide via URL
- ✅ Connected to Supabase backend
- ✅ Costing < $1/month
- ✅ Ready for demo on any device

**Next Steps:**
- Share URL with stakeholders
- Test on multiple devices
- Collect feedback
- Prepare for APK creation (see APK_CREATION_GUIDE.md)
