import express from 'express';
import cors from 'cors';
import {PORT} from './.env/port.env.js'
import tableSettingsRoutes from './routes/tableSettings.route.js'

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/tablesettings', tableSettingsRoutes);


app.listen(PORT, () => {
    console.log(`Backend is working ON PORT ${PORT}`);
})