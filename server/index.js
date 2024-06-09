import express from 'express';
import cors from 'cors';
import {PORT} from './env.js';
import settingsRoutes from './routes/settings-route.js';
import bookingRoutes from './routes/booking-route.js';
import dashBoardRoutes from './routes/dashBoard-route.js';
import stockRoutes from './routes/stock-route.js';
import mechanicRoutes from './routes/mechanic-route.js';
import openJobRoutes from './routes/openJob-route.js';
import updateJobRoutes from './routes/updateJob-route.js';
import recordsRoutes from './routes/records-router.js';
import summaryRoutes from './routes/summary-router.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

// Serve static files from the 'images' directory
app.use('/images', express.static('images'));

//parths - shop
app.use('/api/settings', settingsRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/mechanic', mechanicRoutes);

//parths - jobs
app.use('/api/openjob', openJobRoutes);
app.use('/api/updatejob', updateJobRoutes);
app.use('/api/records', recordsRoutes);

//parths - dashboard
app.use('/api/dashboard', dashBoardRoutes);

//parths - owner
app.use('/api/summary', summaryRoutes);


app.listen(PORT, () => {
    console.log(`Backend is working ON PORT ${PORT}`);
})