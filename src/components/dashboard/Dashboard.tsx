import React from 'react';
import { Users, Calendar, Activity, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { useClinicStore } from '../../hooks/useClinicStore';
import { format } from 'date-fns';

export function Dashboard({ onStartConsultation }: { onStartConsultation: () => void }) {
  const { patients, consultations } = useClinicStore();

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: <Users className="text-blue-600" />, trend: '+12%', color: 'bg-blue-50' },
    { label: 'Consultations', value: consultations.length, icon: <Activity className="text-teal-600" />, trend: '+5%', color: 'bg-teal-50' },
    { label: 'Today Visits', value: '8', icon: <Calendar className="text-purple-600" />, trend: '+2', color: 'bg-purple-50' },
    { label: 'Wait Time', value: '14m', icon: <Clock className="text-amber-600" />, trend: '-3m', color: 'bg-amber-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clinic Overview</h1>
          <p className="text-slate-500">Welcome back, Dr. Miller. Here's what's happening today.</p>
        </div>
        <button 
          onClick={onStartConsultation}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-teal-100"
        >
          <Activity size={18} />
          New Consultation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Consultations</h3>
            <button className="text-teal-600 text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-slate-50">
            {consultations.length > 0 ? consultations.slice(-5).reverse().map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                    {patients.find(p => p.id === c.patientId)?.firstName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {patients.find(p => p.id === c.patientId)?.firstName} {patients.find(p => p.id === c.patientId)?.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{c.diagnosis}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{format(new Date(c.date), 'MMM d, h:mm a')}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">Completed</span>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-slate-400">
                <p>No recent consultations found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">AI Health Analytics</h3>
            <p className="text-teal-50 text-sm mb-6 leading-relaxed">
              Unlock clinical insights and diagnostic patterns with our advanced AI health engine.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-xs font-medium text-teal-200 uppercase tracking-wider mb-1">Clinic Efficiency</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-teal-300 rounded-full shadow-[0_0_8px_rgba(153,246,228,0.5)]"></div>
                  </div>
                  <span className="font-bold text-sm">80%</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-xs font-medium text-teal-200 uppercase tracking-wider mb-1">Patient Satisfaction</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                  </div>
                  <span className="font-bold text-sm">92%</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 group">
              View Insights
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}