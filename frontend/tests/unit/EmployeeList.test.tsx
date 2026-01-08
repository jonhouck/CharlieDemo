import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmployeeList } from '@/components/dashboard/EmployeeList';

const mockEmployees = [
    { id: '1', name: 'Alice Smith', department: 'Engineering', avatarUrl: '' },
    { id: '2', name: 'Bob Jones', department: 'Sales', avatarUrl: '' },
];

describe('EmployeeList', () => {
    it('renders only present employees when filter is All', () => {
        const presentIds = new Set(['1', '2']);
        render(
            <EmployeeList
                employees={mockEmployees}
                presentEmployeeIds={presentIds}
                departmentFilter="All"
            />
        );

        expect(screen.getByText('Alice Smith')).toBeDefined();
        expect(screen.getByText('Bob Jones')).toBeDefined();
    });

    it('filters employees by department', () => {
        const presentIds = new Set(['1', '2']);
        render(
            <EmployeeList
                employees={mockEmployees}
                presentEmployeeIds={presentIds}
                departmentFilter="Engineering"
            />
        );

        expect(screen.getByText('Alice Smith')).toBeDefined();
        expect(screen.queryByText('Bob Jones')).toBeNull();
    });

    it('filters out non-present employees', () => {
        const presentIds = new Set(['1']); // Only Alice
        render(
            <EmployeeList
                employees={mockEmployees}
                presentEmployeeIds={presentIds}
                departmentFilter="All"
            />
        );

        expect(screen.getByText('Alice Smith')).toBeDefined();
        expect(screen.queryByText('Bob Jones')).toBeNull();
    });

    it('shows empty state message', () => {
        render(
            <EmployeeList
                employees={[]}
                presentEmployeeIds={new Set()}
                departmentFilter="All"
            />
        );
        expect(screen.getByText(/No active employees on site/i)).toBeDefined();
    });
});
