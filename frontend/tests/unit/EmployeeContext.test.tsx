import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import { EmployeeProvider, useEmployeeContext } from '../../context/EmployeeContext';

// Mock Data
const MOCK_ROSTER = [
    { id: 'EMP-001', name: 'Alice', department: 'Engineering', avatarUrl: 'http://example.com/alice.jpg' },
    { id: 'EMP-002', name: 'Bob', department: 'Sales', avatarUrl: 'http://example.com/bob.jpg' },
];

// Test Component
const TestComponent = () => {
    const { roster, presentEmployeeIds, loading, error } = useEmployeeContext();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <div data-testid="roster-count">{roster.length}</div>
            <div data-testid="present-count">{presentEmployeeIds.size}</div>
            <ul>
                {Array.from(presentEmployeeIds).map(id => (
                    <li key={id} data-testid={`present-${id}`}>{id}</li>
                ))}
            </ul>
        </div>
    );
};

// WebSocket Mock
class MockWebSocket {
    onopen: () => void = () => { };
    onmessage: (event: { data: string }) => void = () => { };
    onclose: () => void = () => { };
    close: () => void = () => { };
    send: () => void = () => { };

    constructor() {
        setTimeout(() => this.onopen(), 0);
    }
}

describe('EmployeeContext', () => {
    let mockFetch: ReturnType<typeof vi.fn>;
    // We need a way to capture the active websocket instance to emit events
    let activeSocket: MockWebSocket | null = null;

    beforeEach(() => {
        // Mock Fetch
        mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(MOCK_ROSTER),
            })
        );
        vi.stubGlobal('fetch', mockFetch);

        // Mock WebSocket
        activeSocket = null; // Reset
        // Create a mock class that captures the instance
        const MockWSClass = class extends MockWebSocket {
            constructor() {
                super();
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                activeSocket = this;
            }
        }
        vi.stubGlobal('WebSocket', MockWSClass);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches roster on mount', async () => {
        render(
            <EmployeeProvider>
                <TestComponent />
            </EmployeeProvider>
        );

        expect(screen.getByText('Loading...')).toBeDefined();

        await waitFor(() => {
            expect(screen.getByTestId('roster-count').textContent).toBe('2');
        });

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/roster');
    });

    it('updates present employees on SWIPE_IN WebSocket event', async () => {
        render(
            <EmployeeProvider>
                <TestComponent />
            </EmployeeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('roster-count').textContent).toBe('2');
        });

        // Simulate WebSocket Message
        // Need to wait for WS to be initialized (useEffect)
        // In our mock it happens immediately but let's wrap in act just in case state updates flow

        act(() => {
            if (activeSocket) {
                const event = {
                    data: JSON.stringify({
                        type: 'SWIPE_IN',
                        employeeId: 'EMP-001',
                        timestamp: new Date().toISOString()
                    })
                };
                activeSocket.onmessage(event);
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId('present-count').textContent).toBe('1');
        });

        expect(screen.getByTestId('present-EMP-001')).toBeDefined();
    });
});
