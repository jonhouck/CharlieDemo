import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {
    it('renders title and value correctly', () => {
        render(
            <StatCard
                title="Total Employees"
                value={100}
                icon={Users}
                subtext="Test Subtext"
            />
        );

        expect(screen.getByText('Total Employees')).toBeDefined();
        expect(screen.getByText('100')).toBeDefined();
        expect(screen.getByText('Test Subtext')).toBeDefined();
    });
});
