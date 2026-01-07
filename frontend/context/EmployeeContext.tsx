'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Employee, SwipeEvent } from '../types/employee';

interface EmployeeContextType {
    roster: Employee[];
    presentEmployeeIds: Set<string>;
    loading: boolean;
    error: string | null;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [roster, setRoster] = useState<Employee[]>([]);
    const [presentEmployeeIds, setPresentEmployeeIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Roster
    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/roster');
                if (!response.ok) {
                    throw new Error('Failed to fetch roster');
                }
                const data = await response.json();
                setRoster(data);
            } catch (err: any) {
                console.error('Error fetching roster:', err);
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, []);

    // WebSocket Connection
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            try {
                const data: SwipeEvent = JSON.parse(event.data);
                if (data.type === 'SWIPE_IN') {
                    setPresentEmployeeIds((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(data.employeeId);
                        return newSet;
                    });
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <EmployeeContext.Provider value={{ roster, presentEmployeeIds, loading, error }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployeeContext must be used within an EmployeeProvider');
    }
    return context;
};
