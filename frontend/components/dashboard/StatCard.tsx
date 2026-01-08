import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    subtext?: string;
    className?: string;
}

export function StatCard({ title, value, icon: Icon, subtext, className }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className={cn("overflow-hidden relative", className)}>
                <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400">{title}</p>
                            <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
                            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
                        </div>
                        <div className="p-3 bg-indigo-500/10 rounded-lg">
                            <Icon className="w-6 h-6 text-indigo-400" />
                        </div>
                    </div>
                    {/* Decorative blur */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
                </CardContent>
            </Card>
        </motion.div>
    );
}
