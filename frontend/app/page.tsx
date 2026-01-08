'use client';

import React, { useState, useMemo } from 'react';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmployeeList } from '@/components/dashboard/EmployeeList';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { Building, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { roster, presentEmployeeIds, loading, error } = useEmployeeContext();
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Calculate stats
  const totalEmployees = roster.length;
  const presentCount = presentEmployeeIds.size;
  const utilization = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;

  // Extract unique departments
  const departments = useMemo(() => {
    const depts = new Set(roster.map(e => e.department));
    return Array.from(depts).sort();
  }, [roster]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p>Loading Headquarters Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-rose-400">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center pt-8 mb-8"
        >
          <p className="text-slate-400 font-medium tracking-[0.2em] uppercase text-sm">Real-time presence monitoring</p>
        </motion.div>

        {/* Stats Grid - Centered Portrait Tiles - STRICT LAYOUT */}
        <div className="flex justify-center mb-10 w-full">
          <div className="flex flex-row flex-wrap justify-center gap-6">
            <StatCard
              title="Present Today"
              value={presentCount}
              icon={Building}
              subtext="Currently on site"
            />
            <StatCard
              title="Utilization"
              value={`${utilization}%`}
              icon={Activity}
              subtext="Office capacity usage"
            />
            <StatCard
              title="Avg Arrival"
              value="09:12 AM"
              icon={Clock}
              subtext="Based on recent scans"
            />
          </div>
        </div>

        {/* System Status - Centered below stats */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse box-shadow-glow-emerald" />
            <span className="text-xs font-medium text-emerald-500/80 tracking-widest uppercase">System Live</span>
          </div>
        </div>

        {/* Filters and List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Employee Roster</h2>
          </div>

          <FilterBar
            departments={departments}
            currentFilter={departmentFilter}
            onFilterChange={setDepartmentFilter}
          />

          <EmployeeList
            employees={roster}
            presentEmployeeIds={presentEmployeeIds}
            departmentFilter={departmentFilter}
          />
        </div>
      </div>
    </main>
  );
}
