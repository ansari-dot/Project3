import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
// import routes files 
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import mediaRoutes from './routes/media.routes.js'
import partnershipRoutes from './routes/partnership.routes.js'
import programRoutes from './routes/program.routes.js';
import projectRoutes from './routes/project.routes.js';
import sponsorshipRoutes from './routes/sponsorship.routes.js'
import volunteerRoutes from './routes/volunteer.routes.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server');
});


// restful apis  

app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', mediaRoutes)
app.use('/api', partnershipRoutes)
app.use('/api', programRoutes)
app.use('/api', projectRoutes)
app.use('/api', sponsorshipRoutes)
app.use('/api', volunteerRoutes)








// to connect to the database
connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});