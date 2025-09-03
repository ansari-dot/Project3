# SAF Charity Foundation Website

A modern, responsive charity foundation website built with React (frontend) and Node.js/Express (backend) with MongoDB.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Admin Dashboard**: Complete admin panel for managing content
- **File Upload**: Support for uploading images and documents
- **Dynamic Content**: Manage programs, projects, events, and more
- **Contact Forms**: Integrated contact and volunteer forms
- **Newsletter Subscription**: Email subscription functionality
- **SEO Optimized**: Built with SEO best practices

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Bootstrap 5** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Multer** for file uploads
- **CORS** enabled

## 📁 Project Structure

```
saf/
├── server/                 # Backend (Node.js + Express)
│   ├── Controller/         # API controllers
│   ├── routes/            # API routes
│   ├── model/             # MongoDB models
│   ├── uploads/           # Uploaded files
│   ├── middleware/        # Custom middleware
│   ├── util/              # Utility functions
│   ├── .env               # Environment variables
│   └── index.js           # Server entry point
│
├── ui/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/         # Main pages
│   │   ├── Admin/         # Admin dashboard
│   │   ├── components/    # Reusable components
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── .env               # Frontend environment variables
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### 1. Clone the Repository
```bash
git clone [your-repository-url]
cd saf
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:
```bash
npm run dev    # Development
npm start      # Production
```

### 3. Frontend Setup
```bash
cd ui
npm install
```

Create `.env` file in ui directory:
```env
VITE_API_URL=http://localhost:4000/api
```

Start the development server:
```bash
npm run dev
```

### 4. Build for Production
```bash
cd ui
npm run build
```

## 🚀 Deployment

### Option 1: Deploy to Hostinger (Recommended)

1. **Backend Deployment**:
   - Upload the `server` folder to your hosting
   - Set up environment variables in your hosting panel
   - Ensure MongoDB connection is configured

2. **Frontend Deployment**:
   - Build the frontend: `npm run build`
   - Upload the `dist` folder contents to your hosting
   - Configure the API URL in your hosting environment

### Option 2: Deploy to Heroku

1. **Backend**:
   ```bash
   cd server
   heroku create your-app-name
   git add .
   git commit -m "Initial backend deployment"
   git push heroku main
   ```

2. **Frontend**:
   ```bash
   cd ui
   npm run build
   # Deploy the dist folder to Netlify, Vercel, or similar
   ```

### Option 3: Deploy to VPS/Dedicated Server

1. Install Node.js and MongoDB on your server
2. Clone the repository
3. Follow the Quick Start steps
4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   cd server
   pm2 start index.js --name "saf-server"
   ```

## 📋 Environment Variables

### Server (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/saf
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

### Client (.env)
```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🔄 API Endpoints

### Authentication
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration

### Featured Events
- `GET /api/featured-event/latest` - Get latest featured event
- `POST /api/featured-event/create` - Create new featured event
- `PUT /api/featured-event/update/:id` - Update featured event

### Programs & Projects
- `GET /api/program/get` - Get all programs
- `GET /api/project/get` - Get all projects

### Contact & Forms
- `POST /api/contact/add` - Submit contact form
- `POST /api/volunteer/add` - Submit volunteer form

## 🛡️ Security Features

- JWT-based authentication
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Environment variable protection

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email [your-email@domain.com] or create an issue in the GitHub repository.

## 📱 Contact

- **Website**: [your-website-url]
- **Email**: [your-email@domain.com]
- **GitHub**: [your-github-profile]

---

**Built with ❤️ for SAF Charity Foundation**