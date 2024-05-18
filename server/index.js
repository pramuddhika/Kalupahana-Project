import express from 'express';
import cors from 'cors';
import {PORT, db} from './.env';
import settingsRoutes from './routes/settings-route.js';
import bookingRoutes from './routes/booking-route.js';
import dashBoardRoutes from './routes/dashBoard-route.js';
import stockRoutes from './routes/stock-route.js';
import mechanicRoutes from './routes/mechanic-route.js';


const app = express();
app.use(cors());

app.use(express.json());

//parths - shop
app.use('/api/settings', settingsRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/mechanic', mechanicRoutes);

//parths - dashboard
app.use('/api/dashboard', dashBoardRoutes);


app.listen(PORT, () => {
    console.log(`Backend is working ON PORT ${PORT}`);
})