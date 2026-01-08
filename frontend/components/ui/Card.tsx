import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:border-slate-600/50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: CardProps) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
    return <h3 className={cn("text-xl font-semibold text-slate-100", className)}>{children}</h3>;
}

export function CardContent({ children, className }: CardProps) {
    return <div className={cn("", className)}>{children}</div>;
}
