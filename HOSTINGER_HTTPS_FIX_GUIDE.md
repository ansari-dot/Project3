# HTTPS Mixed Content Fix Guide - Hostinger Deployment

## Issue Summary
You are experiencing a **Mixed Content** error where your HTTPS website (https://shehryarkhanfoundation.com) is trying to load resources from an insecure HTTP endpoint (http://31.97.239.47/api/media/get).

## Root Cause
The frontend is configured to use HTTP URLs instead of HTTPS for API calls.

## Solution Steps

### 1. Code Updates (Already Applied)
✅ **Updated client/.env**:
```
VITE_API_URL=https://shehryarkhanfoundation.com/api
```

✅ **Updated all Admin components** to use HTTPS fallback URLs
✅ **Updated axiosConfig.js** to use HTTPS fallback

### 2. Hostinger Server Configuration

#### A. Update Environment Variables on Hostinger
1. **Access Hostinger File Manager**:
   - Log into your Hostinger account
   - Go to "Files" → "File Manager"
   - Navigate to your project root

2. **Update server .env file**:
   ```bash
   # Ensure these settings are correct:
   CORS_ORIGIN=https://shehryarkhanfoundation.com,http://localhost:3000,http://localhost:5173
   PORT=4000
   ```

#### B. Configure HTTPS on Hostinger
1. **Enable SSL Certificate**:
   - Go to Hostinger Dashboard → "Websites"
   - Find your domain → "SSL" section
   - Ensure SSL certificate is active and set to "Force HTTPS"

2. **Update Server Configuration**:
   - In Hostinger, go to "Advanced" → "Cron Jobs"
   - Or use "SSH Access" for terminal commands

#### C. Update PM2 Configuration (if using)
1. **Check ecosystem.config.js**:
   ```javascript
   module.exports = {
     apps: [{
       name: 'skf-server',
       script: './server/index.js',
       env: {
         NODE_ENV: 'production',
         PORT: 4000,
         CORS_ORIGIN: 'https://shehryarkhanfoundation.com'
       }
     }]
   };
   ```

### 3. Rebuild and Redeploy

#### A. Rebuild Client
```bash
# In Hostinger terminal (or local then upload)
cd client
npm run build
```

#### B. Restart Server
```bash
# In Hostinger terminal
pm2 restart skf-server
# Or
npm run dev  # if using development mode
```

### 4. Verify the Fix

#### A. Check API Endpoints
Test these URLs in browser:
- ✅ https://shehryarkhanfoundation.com/api/media/get
- ✅ https://shehryarkhanfoundation.com/api/program/get
- ✅ https://shehryarkhanfoundation.com/api/project/get

#### B. Browser Developer Tools
1. Open your website: https://shehryarkhanfoundation.com
2. Press F12 → "Console" tab
3. Look for Mixed Content errors (should be resolved)
4. Check "Network" tab for HTTPS requests

#### C. Clear Cache
- Clear browser cache and cookies
- Clear CDN cache (if using Cloudflare)
- Restart PM2: `pm2 restart all`

### 5. Troubleshooting

#### If Still Getting Mixed Content:
1. **Check for hardcoded URLs**:
   ```bash
   # In Hostinger terminal, search for http://
   grep -r "http://31.97.239.47" ./
   grep -r "http://localhost:4000" ./
   ```

2. **Force HTTPS Redirect**:
   - In Hostinger: "Websites" → "Force HTTPS" → Enable
   - Or add to server .htaccess:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

3. **Update DNS Settings**:
   - Ensure A record points to correct IP
   - Check if domain is properly propagated

### 6. Quick Verification Commands

#### Check Server is Running on HTTPS:
```bash
# In Hostinger terminal
curl -I https://shehryarkhanfoundation.com/api/health
# Should return 200 OK
```

#### Check Environment Variables:
```bash
# In Hostinger terminal
cd server
cat .env
```

## Expected Result
After these changes:
- ✅ No more Mixed Content errors
- ✅ All API calls use HTTPS
- ✅ Images load properly over HTTPS
- ✅ Website functions correctly

## Support
If issues persist:
1. Check Hostinger support for SSL configuration
2. Verify server is listening on correct ports
3. Ensure firewall allows HTTPS (port 443)

## Summary
The issue was caused by hardcoded HTTP URLs in the frontend code. All references to `http://31.97.239.47` and `http://localhost:4000` have been updated to use `https://shehryarkhanfoundation.com/api`. After rebuilding and redeploying, the Mixed Content error should be resolved.