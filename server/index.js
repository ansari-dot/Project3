import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// import routes
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import mediaRoutes from './routes/media.routes.js';
import partnershipRoutes from './routes/partnership.routes.js';
import programRoutes from './routes/program.routes.js';
import projectRoutes from './routes/project.routes.js';
import sponsorshipRoutes from './routes/sponsorship.routes.js';
import volunteerRoutes from './routes/volunteer.routes.js';
import opportunityRoutes from './routes/opportunity.routes.js';
import featuredEventRoutes from './routes/featuredEvent.routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "https://shehryarkhanfoundation.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Security middleware
app.set('trust proxy', 1);
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Default route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server');
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
    });
});

// RESTful APIs
app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', mediaRoutes);
app.use('/api', partnershipRoutes);
app.use('/api', programRoutes);
app.use('/api', projectRoutes);
app.use('/api', sponsorshipRoutes);
app.use('/api', volunteerRoutes);
app.use('/api', opportunityRoutes);
app.use('/api', featuredEventRoutes);

// Database connection
connectDB();
const PORT = process.env.PORT || 4000;

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});