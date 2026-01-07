import express from 'express';
import cors from 'cors';
import rosterRoutes from './routes/roster';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/roster', rosterRoutes);

export default app;
