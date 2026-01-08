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
    // Filter to ONLY show present employees (and filter by department if selected)
    const activeEmployees = useMemo(() => {
        // First filter by presence
        const presentOnly = employees.filter(emp => presentEmployeeIds.has(emp.id));

        // Then sort by name
        const sorted = presentOnly.sort((a, b) => a.name.localeCompare(b.name));

        if (departmentFilter === 'All') return sorted;
        return sorted.filter(emp => emp.department === departmentFilter);
    }, [employees, presentEmployeeIds, departmentFilter]);

    if (activeEmployees.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <p>No active employees on site.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-0.5">
                <AnimatePresence mode="popLayout">
                    {activeEmployees.map((employee, index) => (
                        <div
                            key={employee.id}
                            className={`${index % 2 === 0 ? 'bg-white/5' : 'bg-orange-500/10'} rounded-sm overflow-hidden`}
                        >
                            <EmployeeCard
                                employee={employee}
                                present={true} // Always true as we filter above
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
