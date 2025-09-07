# CORS Error Fix Guide - Hostinger Deployment

## Issue Summary
You're getting a CORS error: `Access to XMLHttpRequest at 'https://api.shehryarkhanfoundation.com/media/get' from origin 'https://shehryarkhanfoundation.com' has been blocked by CORS policy`

## Root Cause
The client is trying to access `api.shehryarkhanfoundation.com` (a subdomain that doesn't exist) instead of `shehryarkhanfoundation.com/api` (the correct path).

## ✅ Solution Applied
- **Updated server CORS configuration**: Removed non-existent `api.shehryarkhanfoundation.com` from allowed origins
- **Fixed client configuration**: Ensured all API calls use the correct domain

## 🚀 Next Steps on Hostinger

### 1. Update Server Configuration
```bash
# In Hostinger terminal, restart your server
pm2 restart skf-server
```

### 2. Verify API Endpoint
Test these URLs directly in browser:
- ✅ `https://shehryarkhanfoundation.com/api/health` (should return server status)
- ✅ `https://shehryarkhanfoundation.com/api/media/get` (should return media data)
- ❌ `https://api.shehryarkhanfoundation.com/media/get` (should fail - doesn't exist)

### 3. Rebuild Client Application
```bash
# In Hostinger terminal
cd client
npm run build
```

### 4. Check Environment Variables
Ensure your client `.env` has:
```bash
VITE_API_URL=https://shehryarkhanfoundation.com/api
```

### 5. Clear All Caches
- **Browser**: Ctrl+F5 (hard refresh)
- **CDN**: Clear Cloudflare cache if using
- **Server**: `pm2 restart all`

## 🔍 Troubleshooting Commands

### Check Server Status
```bash
# In Hostinger terminal
curl -I https://shehryarkhanfoundation.com/api/health
pm2 logs skf-server
```

### Verify CORS Headers
```bash
curl -H "Origin: https://shehryarkhanfoundation.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://shehryarkhanfoundation.com/api/media/get
```

### Check Server Logs
```bash
# View recent logs
pm2 logs skf-server --lines 50
```

## 🎯 Expected Results After Fix
- ✅ No CORS errors in browser console
- ✅ All API calls succeed with 200 status
- ✅ Media/images load properly
- ✅ Website functions correctly

## 🚨 Common Issues & Solutions

### If CORS Still Fails:
1. **Check server is running**: `pm2 status`
2. **Verify domain DNS**: Ensure A record points to correct IP
3. **Check firewall**: Ensure port 4000 is accessible
4. **SSL certificate**: Ensure valid SSL for main domain

### Quick Fix Commands (Hostinger)
```bash
# Restart everything
pm2 restart skf-server
cd client && npm run build

# Check if server responds
curl https://shehryarkhanfoundation.com/api/health
```

## 📋 Verification Checklist
After applying the fix:
- [ ] Server restarted successfully
- [ ] Client rebuilt with correct API URL
- [ ] CORS headers present in API responses
- [ ] No errors in browser console
- [ ] All API endpoints accessible
- [ ] Images and media loading properly

## 🆘 Still Having Issues?
1. **Check Hostinger firewall settings**
2. **Verify SSL certificate validity**
3. **Ensure server is bound to correct IP**
4. **Check for any proxy configurations**

The CORS issue should now be resolved with the server configured to accept requests from your main domain.