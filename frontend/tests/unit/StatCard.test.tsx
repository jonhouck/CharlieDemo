import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {
    it('renders title and value correctly', () => {
        render(
            <StatCard
                title="Utilization"
                value={"85%"}
                icon={Users}
                subtext="Test Subtext"
            />
        );

        expect(screen.getByText('Utilization')).toBeDefined();
        expect(screen.getByText('85%')).toBeDefined();
        expect(screen.getByText('Test Subtext')).toBeDefined();
    });
});
