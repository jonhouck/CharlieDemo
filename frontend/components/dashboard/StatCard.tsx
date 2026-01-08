import React from 'react';
import { Card } from '@/components/ui/Card';
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
            <Card className={cn(
                "relative overflow-hidden transition-all duration-300",
                "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-indigo-500/30",
                "flex flex-col items-center justify-center text-center p-6 aspect-[4/5] min-w-[200px]",
                "shadow-2xl shadow-black/20",
                className
            )}>
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 mb-4 ring-1 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        <Icon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-sm font-medium text-slate-400 tracking-wide uppercase mb-1">{title}</h3>
                    <div className="text-4xl font-light text-white tracking-tight mb-2 text-shadow-glow">{value}</div>
                    {subtext && (
                        <p className="text-xs text-slate-500 font-medium">{subtext}</p>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
