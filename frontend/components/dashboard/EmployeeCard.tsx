import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Employee } from '@/types/employee';
import { User, Clock } from 'lucide-react';
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
            <Card className="hover:bg-slate-800/80 transition-colors cursor-pointer group relative overflow-hidden">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600 group-hover:border-indigo-500/50 transition-colors">
                            {employee.avatarUrl ? (
                                <img src={employee.avatarUrl} alt={employee.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-lg font-medium text-slate-300">
                                    {employee.name.charAt(0)}
                                    {employee.name.split(' ')[1]?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${present ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-slate-100 font-medium truncate group-hover:text-indigo-400 transition-colors">
                            {employee.name}
                        </h4>
                        <div className="flex items-center text-xs text-slate-400 mt-0.5">
                            <span className="truncate">{employee.department}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <Badge variant={present ? 'success' : 'ghost'} className="text-[10px] px-2">
                            {present ? 'In Office' : 'Absent'}
                        </Badge>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
