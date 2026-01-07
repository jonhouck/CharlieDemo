import { startSimulation } from '../../src/services/simulator';
import { broadcast } from '../../src/services/websocket';
import fs from 'fs';

jest.mock('../../src/services/websocket');
jest.mock('fs');
jest.useFakeTimers();

describe('Simulator', () => {
    it('should broadcast swipe events', () => {
        const mockRoster = [{ id: '1', name: 'Test' }];
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockRoster));

        startSimulation();

        jest.advanceTimersByTime(2000);

        expect(broadcast).toHaveBeenCalled();
        expect(broadcast).toHaveBeenCalledWith(expect.objectContaining({
            type: 'SWIPE_IN',
            employeeId: '1'
        }));
    });
});
