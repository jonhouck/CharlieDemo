import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
    try {
        const rosterPath = path.join(__dirname, '../../data/roster.json');
        const rosterData = fs.readFileSync(rosterPath, 'utf-8');
        const roster = JSON.parse(rosterData);
        res.json(roster);
    } catch (error) {
        console.error('Error reading roster file:', error);
        res.status(500).json({ error: 'Failed to fetch roster data' });
    }
});

export default router;
