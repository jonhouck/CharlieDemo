import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmployeeCard } from '@/components/dashboard/EmployeeCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { Building } from 'lucide-react';
import { Employee } from '@/types/employee';

describe('Layout Constraints Violations', () => {

    it('EmployeeCard avatar should be exactly 30px x 30px (Dime Size)', () => {
        const employee: Employee = {
            id: '1',
            name: 'Test User',
            department: 'Engineering',
            avatarUrl: 'https://example.com/avatar.jpg'
        };

        render(<EmployeeCard employee={employee} />);

        // Find the avatar container. It's the div with the specific style or class.
        // We'll traverse to the image parent.
        const img = screen.getByRole('img');
        const avatarContainer = img.parentElement as HTMLElement;

        expect(avatarContainer).toBeDefined();

        // Check inline styles explicitly for exact sizing
        expect(avatarContainer.style.width).toBe('30px');
        expect(avatarContainer.style.height).toBe('30px');
        expect(avatarContainer.style.minWidth).toBe('30px');
        expect(avatarContainer.style.minHeight).toBe('30px');
    });

    it('StatCard should have strict fixed width of 180px', () => {
        const { container } = render(
            <StatCard
                title="Test"
                value="123"
                icon={Building}
            />
        );

        // Class assertion
        // We look for w-[180px] in the class list
        const card = container.firstChild?.firstChild as HTMLElement; // motion.div -> Card
        expect(card.className).toContain('w-[180px]');
        expect(card.className).toContain('h-[240px]');

        // Ensure it DOES NOT contain full width classes that might stretch it
        expect(card.className).not.toContain('w-full');
        expect(card.className).not.toContain('flex-1');
    });
});
