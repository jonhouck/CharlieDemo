import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmployeeList } from '@/components/dashboard/EmployeeList';

const mockEmployees = [
    { id: '1', name: 'Alice Smith', department: 'Engineering', avatarUrl: '' },
    { id: '2', name: 'Bob Jones', department: 'Sales', avatarUrl: '' },
];

describe('EmployeeList', () => {
    it('renders all employees when filter is All', () => {
        render(
            <EmployeeList
                employees={mockEmployees}
                presentEmployeeIds={new Set()}
                departmentFilter="All"
            />
        );

        expect(screen.getByText('Alice Smith')).toBeDefined();
        expect(screen.getByText('Bob Jones')).toBeDefined();
    });

    it('filters employees by department', () => {
        render(
            <EmployeeList
                employees={mockEmployees}
                presentEmployeeIds={new Set()}
                departmentFilter="Engineering"
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
        expect(screen.getByText(/No employees found/i)).toBeDefined();
    });
});
