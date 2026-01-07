import fs from 'fs';
import path from 'path';
import { broadcast } from './websocket';
import { faker } from '@faker-js/faker';

interface Employee {
    id: string;
    name: string;
    department: string;
    avatarUrl: string;
}

let roster: Employee[] = [];

const loadRoster = () => {
    try {
        const rosterPath = path.join(__dirname, '../../data/roster.json');
        const rosterData = fs.readFileSync(rosterPath, 'utf-8');
        roster = JSON.parse(rosterData);
    } catch (error) {
        console.error('Error loading roster for simulation:', error);
    }
};

export const startSimulation = () => {
    loadRoster();

    if (roster.length === 0) {
        console.warn('Roster is empty. Simulation cannot start.');
        return;
    }

    setInterval(() => {
        const randomEmployee = faker.helpers.arrayElement(roster);
        const event = {
            type: 'SWIPE_IN',
            employeeId: randomEmployee.id,
            timestamp: new Date().toISOString(),
        };

        // console.log('Simulating swipe:', event);
        broadcast(event);
    }, 2000); // Every 2 seconds
};
