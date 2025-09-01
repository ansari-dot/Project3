#!/bin/bash

echo "🚀 Building for Production..."

# Build client
echo "📦 Building client..."
cd client
npm run build:prod
cd ..

# Build server (if needed)
echo "🔧 Preparing server..."
cd server
npm install --production
cd ..

echo "✅ Production build complete!"
echo ""
echo "📁 Client build output: client/dist/"
echo "📁 Server ready: server/"
echo ""
echo "🌐 To deploy:"
echo "1. Upload client/dist/ to your web hosting"
echo "2. Upload server/ to your Node.js hosting"
echo "3. Set environment variables on your hosting platform"
echo "4. Update CORS_ORIGIN in server/production.env with your domain"
echo "5. Update MONGODB_URI in server/production.env with your MongoDB connection string"
