import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
    className?: string;
}

export function Badge({ children, variant = 'default', className, ...props }: BadgeProps) {
    const variants = {
        default: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        outline: "border border-slate-700 text-slate-400",
        ghost: "bg-slate-800/50 text-slate-400",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        error: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
