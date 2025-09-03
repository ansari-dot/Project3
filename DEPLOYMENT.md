# Deployment Guide

This guide provides step-by-step instructions to deploy the SAF Charity Foundation website to production.

## 🚀 Quick Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connected
- [ ] File upload directory created
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Build process completed

## 📋 Pre-Deployment Steps

### 1. Environment Setup

#### Server Environment Variables
Create `server/.env` with production values:
```env
PORT=4000
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-domain.com
```

#### Client Environment Variables
Create `ui/.env` with production values:
```env
VITE_API_URL=https://your-domain.com/api
```

### 2. Build Process

```bash
# Build the frontend
cd ui
npm run build

# The build files will be in ui/dist/
```

### 3. Database Setup

Ensure MongoDB is accessible and the connection string is correct in your `.env` file.

## 🌐 Deployment Options

### Option 1: Hostinger VPS (Recommended)

#### Step 1: Server Setup
1. Connect to your VPS via SSH
2. Install Node.js and npm:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install MongoDB:
   ```bash
   sudo apt update
   sudo apt install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

4. Install PM2 for process management:
   ```bash
   sudo npm install -g pm2
   ```

#### Step 2: Upload Project
1. Upload the entire project to your VPS
2. Navigate to the server directory:
   ```bash
   cd /path/to/saf/server
   npm install
   ```

3. Start the server with PM2:
   ```bash
   pm2 start index.js --name "saf-server"
   pm2 startup
   pm2 save
   ```

#### Step 3: Configure Nginx
Create Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /path/to/saf/ui/dist;
        try_files $uri $uri/ /index.html;
    }

    location /uploads/ {
        alias /path/to/saf/server/uploads/;
    }
}
```

#### Step 4: SSL Certificate
Install Certbot for SSL:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 2: Heroku

#### Backend Deployment
```bash
cd server
heroku create your-saf-backend
# Add MongoDB addon
heroku addons:create mongolab:sandbox
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
# Deploy
git add .
git commit -m "Deploy backend to Heroku"
git push heroku main
```

#### Frontend Deployment (Netlify)
```bash
cd ui
npm run build
# Deploy dist folder to Netlify
```

### Option 3: Docker Deployment

#### Step 1: Create Dockerfile
Create `Dockerfile` in root directory:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY server/package*.json ./server/
COPY ui/package*.json ./ui/

# Install dependencies
RUN cd server && npm install --production
RUN cd ui && npm install

# Copy source code
COPY server ./server
COPY ui ./ui

# Build frontend
RUN cd ui && npm run build

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "server/index.js"]
```

#### Step 2: Deploy with Docker
```bash
docker build -t saf-charity .
docker run -p 4000:4000 --env-file server/.env saf-charity
```

## 🔧 Post-Deployment Configuration

### 1. File Upload Directory
Ensure the uploads directory exists and has proper permissions:
```bash
mkdir -p server/uploads
chmod 755 server/uploads
```

### 2. Database Seeding (Optional)
Create initial admin user:
```javascript
// Run this script once to create admin user
const bcrypt = require('bcrypt');
const User = require('./model/User');

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    email: 'admin@your-domain.com',
    password: hashedPassword,
    role: 'admin'
  });
};
```

### 3. Health Check
Verify deployment:
- Backend: `https://your-domain.com/api/health`
- Frontend: `https://your-domain.com`
- File uploads: Test image upload functionality

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Issues
Ensure `CORS_ORIGIN` in server `.env` matches your frontend domain.

#### 2. File Upload Issues
- Check upload directory permissions
- Ensure `multer` is properly configured
- Verify file size limits

#### 3. Database Connection
- Verify MongoDB connection string
- Check if MongoDB service is running
- Ensure database user has proper permissions

#### 4. Build Issues
```bash
# Clear cache and rebuild
cd ui
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Performance Optimization

### 1. Enable Compression
Install compression middleware:
```bash
cd server
npm install compression
```

### 2. Set Up CDN
For static assets and uploaded images, consider using:
- Cloudflare
- AWS CloudFront
- Google Cloud CDN

### 3. Database Optimization
- Create indexes on frequently queried fields
- Use MongoDB Atlas for managed hosting
- Implement caching with Redis

## 🔍 Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs saf-server
```

### Health Check Endpoint
Add to your server:
```javascript
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

## 📞 Support

For deployment support:
1. Check this guide
2. Review server logs
3. Check browser console for frontend issues
4. Contact support team

---

**Happy Deploying! 🚀**