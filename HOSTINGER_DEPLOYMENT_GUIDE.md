# 🚀 Hostinger Deployment Guide for Shehryar Khan Foundation

## 📋 Prerequisites
- Hostinger hosting account with Node.js support
- MongoDB Atlas account (for database)
- Domain name configured on Hostinger

## 🔧 Step 1: Prepare Your Project

### Build the Production Version
```bash
# Run the production build script
chmod +x build-production.sh
./build-production.sh
```

### Update Environment Variables
1. **Server Environment** (`server/production.env`):
   - Replace `yourdomain.com` with your actual domain
   - Update `MONGODB_URI` with your MongoDB Atlas connection string
   - Generate a strong `JWT_SECRET`

2. **Client Environment** (`client/production.env`):
   - Update `VITE_API_URL` with your server domain

## 🌐 Step 2: Deploy to Hostinger

### Option A: Shared Hosting (Static Files Only)
1. **Upload Client Files**:
   - Upload `client/dist/` contents to `public_html/`
   - Create `.htaccess` file for React Router support

2. **Deploy Server Elsewhere**:
   - Use Railway, Render, or Heroku for the Node.js server
   - Update client environment variables accordingly

### Option B: VPS Hosting (Full Stack)
1. **Upload Server Files**:
   - Upload entire `server/` folder to your VPS
   - Upload `client/dist/` to `public_html/`

2. **Install Dependencies**:
   ```bash
   cd server
   npm install --production
   ```

3. **Set Environment Variables**:
   ```bash
   cp production.env .env
   # Edit .env with your actual values
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

## 📁 Step 3: File Structure on Hostinger

```
yourdomain.com/
├── public_html/          # Client files (client/dist/)
│   ├── index.html
│   ├── assets/
│   └── .htaccess
└── server/               # Server files (if VPS)
    ├── index.js
    ├── package.json
    ├── .env
    └── uploads/
```

## 🔒 Step 4: Security Configuration

### .htaccess for React Router (public_html/.htaccess)
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### Environment Variables Checklist
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (MongoDB Atlas connection string)
- [ ] `JWT_SECRET` (strong secret key)
- [ ] `CORS_ORIGIN` (your domain)
- [ ] `PORT` (usually 4000 or Hostinger assigned port)

## 🗄️ Step 5: Database Setup

### MongoDB Atlas Configuration
1. Create a new cluster
2. Set up database user with read/write permissions
3. Get connection string
4. Update `MONGODB_URI` in server environment

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/sk_production
```

## 🚀 Step 6: Start Your Application

### Development Testing
```bash
# Test locally with production build
cd client
npm run serve
```

### Production Deployment
```bash
# On Hostinger VPS
cd server
npm start
```

## 🔍 Step 7: Testing & Verification

### Check These URLs
- [ ] `https://yourdomain.com` - Client loads
- [ ] `https://yourdomain.com/api` - Server responds
- [ ] Admin panel: `https://yourdomain.com/login`
- [ ] File uploads work
- [ ] Database connections successful

### Common Issues & Solutions

#### CORS Errors
- Verify `CORS_ORIGIN` includes your exact domain
- Check for trailing slashes in URLs

#### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes Hostinger IPs
- Check connection string format

#### File Upload Issues
- Ensure `uploads/` directory has write permissions
- Check file size limits in Hostinger settings

## 📊 Step 8: Performance Optimization

### Client Optimization
- Images are optimized and compressed
- CSS/JS are minified
- Lazy loading implemented
- CDN for static assets (optional)

### Server Optimization
- Environment variables properly set
- Error handling implemented
- Security headers enabled
- Rate limiting (optional)

## 🔧 Step 9: Maintenance

### Regular Tasks
- Monitor server logs
- Update dependencies monthly
- Backup database regularly
- Check for security updates

### Monitoring
- Server uptime
- Database performance
- File upload success rate
- Error rates

## 📞 Support

If you encounter issues:
1. Check Hostinger error logs
2. Verify environment variables
3. Test database connectivity
4. Check CORS configuration
5. Verify file permissions

## 🎯 Final Checklist

- [ ] Production build completed
- [ ] Environment variables updated
- [ ] Files uploaded to Hostinger
- [ ] Database connected and working
- [ ] Admin panel accessible
- [ ] File uploads working
- [ ] All routes functioning
- [ ] Security headers enabled
- [ ] SSL certificate active
- [ ] Performance optimized

---

**🎉 Congratulations! Your Shehryar Khan Foundation website is now live on Hostinger!**
