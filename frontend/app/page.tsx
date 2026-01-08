'use client';

import React, { useState, useMemo } from 'react';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmployeeList } from '@/components/dashboard/EmployeeList';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { Users, Building, Clock, Activity } from 'lucide-react';
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
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Headquarters Overview</h1>
            <p className="text-slate-400 mt-1">Real-time presence monitoring</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">System Live</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value={totalEmployees}
            icon={Users}
            subtext="Registered in system"
          />
          <StatCard
            title="Present Today"
            value={presentCount}
            icon={Building}
            subtext="Currently on site"
            className="border-indigo-500/30"
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
