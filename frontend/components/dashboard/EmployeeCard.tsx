import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
            <Card className="hover:bg-slate-800/80 transition-colors cursor-pointer group relative overflow-hidden p-3 border-slate-800">
                <div className="flex items-center space-x-3">
                    <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600 group-hover:border-indigo-500/50 transition-colors">
                            {employee.avatarUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={employee.avatarUrl} alt={employee.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-medium text-slate-300">
                                    {employee.name.charAt(0)}
                                    {employee.name.split(' ')[1]?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${present ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-slate-100 text-sm font-medium truncate group-hover:text-indigo-400 transition-colors leading-tight">
                            {employee.name}
                        </h4>
                        <div className="flex items-center text-[10px] text-slate-400 mt-0.5">
                            <span className="truncate">{employee.department}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <Badge variant={present ? 'success' : 'ghost'} className="text-[9px] px-1.5 py-0">
                            {present ? 'In' : 'Out'}
                        </Badge>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
