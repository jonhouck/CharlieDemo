import React from 'react';
import { cn } from '@/lib/utils';
import { Employee } from '@/types/employee';
import { motion } from 'framer-motion';

interface EmployeeCardProps {
    employee: Employee;
    present?: boolean;
}

export function EmployeeCard({ employee, present = false }: EmployeeCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <div className={cn(
                "hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden",
                "border border-white/5 rounded-lg bg-black/20 backdrop-blur-sm",
                "flex items-center p-2 gap-3"
            )}>
                <div className="relative flex-shrink-0">
                    <div
                        className="rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-colors shadow-inner"
                        style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px' }} // Explicit strict sizing
                    >
                        {employee.avatarUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={employee.avatarUrl}
                                alt={employee.name}
                                className="w-full h-full object-cover block" // Ensure block display
                                style={{ width: '100%', height: '100%' }} // Double ensure
                            />
                        ) : (
                            <span className="text-xs font-medium text-slate-400">
                                {employee.name.charAt(0)}
                                {employee.name.split(' ')[1]?.charAt(0)}
                            </span>
                        )}
                    </div>
                    {/* Status Dot */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0f172a] ${present ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-slate-600'}`} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-slate-200 text-xs font-medium truncate group-hover:text-indigo-300 transition-colors leading-none mb-1">
                        {employee.name}
                    </h4>
                    <div className="flex items-center text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        <span className="truncate">{employee.department}</span>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${present ? 'bg-emerald-500/50' : 'bg-slate-700/50'}`} />
                </div>
            </div>
        </motion.div>
    );
}
