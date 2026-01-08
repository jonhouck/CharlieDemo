import React from 'react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
    departments: string[];
    currentFilter: string;
    onFilterChange: (dept: string) => void;
}

export function FilterBar({ departments, currentFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <button
                onClick={() => onFilterChange('All')}
                className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    currentFilter === 'All'
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                )}
            >
                All Departments
            </button>
            {departments.map((dept) => (
                <button
                    key={dept}
                    onClick={() => onFilterChange(dept)}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        currentFilter === dept
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    )}
                >
                    {dept}
                </button>
            ))}
        </div>
    );
}
