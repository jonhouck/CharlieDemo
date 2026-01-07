import request from 'supertest';
import app from '../../src/app';
import path from 'path';
import fs from 'fs';

jest.mock('fs');

describe('GET /api/roster', () => {
    it('should return roster data', async () => {
        const mockRoster = [{ id: '1', name: 'Test' }];
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockRoster));

        const response = await request(app).get('/api/roster');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRoster);
    });

    it('should handle errors', async () => {
        (fs.readFileSync as jest.Mock).mockImplementation(() => {
            throw new Error('File not found');
        });

        const response = await request(app).get('/api/roster');
        expect(response.status).toBe(500);
    });
});
