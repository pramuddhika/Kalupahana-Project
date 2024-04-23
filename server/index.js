import express from 'express';
import cors from 'cors';
import {PORT} from './.env';
import settingsRoutes from './routes/settings-route.js';
import bookingRoutes from './routes/booking-route.js';
import dashBoardRoutes from './routes/dashBoard-route.js';


const app = express();
app.use(cors());

app.use(express.json());

//parths - shop
app.use('/api/settings', settingsRoutes);
app.use('/api/booking', bookingRoutes);

//parths - dashboard
app.use('/api/dashboard', dashBoardRoutes);


app.listen(PORT, () => {
    console.log(`Backend is working ON PORT ${PORT}`);
})