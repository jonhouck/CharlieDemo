import { render, screen } from '@testing-library/react'
import Page from '../page'
import { describe, it, expect, vi } from 'vitest'

// Mock the context hook
vi.mock('@/context/EmployeeContext', () => ({
    useEmployeeContext: () => ({
        roster: [
            { id: '1', name: 'Test User', department: 'Test Dept', avatarUrl: '' }
        ],
        presentEmployeeIds: new Set(['1']),
        loading: false,
        error: null
    }),
    // If EmployeeProvider is needed by other components (not here since we mock the hook), we could mock it too
    EmployeeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock lucide-react to avoid issues with icon rendering in tests if any
vi.mock('lucide-react', () => ({
    Users: () => <div data-testid="icon-users" />,
    Building: () => <div data-testid="icon-building" />,
    Clock: () => <div data-testid="icon-clock" />,
    Activity: () => <div data-testid="icon-activity" />
}))

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('Page', () => {
    it('renders correctly', () => {
        render(<Page />)
        expect(screen.getByText('Real-time presence monitoring')).toBeDefined()
        expect(screen.getByText('Test User')).toBeDefined()
    })
})
