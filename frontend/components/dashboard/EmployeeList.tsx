import React, { useMemo } from 'react';
import { Employee } from '@/types/employee';
import { EmployeeCard } from './EmployeeCard';
import { AnimatePresence } from 'framer-motion';

interface EmployeeListProps {
    employees: Employee[];
    presentEmployeeIds: Set<string>;
    departmentFilter: string;
}

export function EmployeeList({ employees, presentEmployeeIds, departmentFilter }: EmployeeListProps) {
    const filteredEmployees = useMemo(() => {
        const sorted = [...employees].sort((a, b) => a.name.localeCompare(b.name));

        // Prioritize present employees
        sorted.sort((a, b) => {
            const aPresent = presentEmployeeIds.has(a.id);
            const bPresent = presentEmployeeIds.has(b.id);
            if (aPresent && !bPresent) return -1;
            if (!aPresent && bPresent) return 1;
            return 0;
        });

        if (departmentFilter === 'All') return sorted;
        return sorted.filter(emp => emp.department === departmentFilter);
    }, [employees, presentEmployeeIds, departmentFilter]);

    if (filteredEmployees.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <p>No employees found matching the criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
                {filteredEmployees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        present={presentEmployeeIds.has(employee.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
