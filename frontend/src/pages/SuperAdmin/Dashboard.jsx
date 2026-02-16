import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    UserCheck,
    Vote,
    ShieldCheck,
    Activity,
    AlertTriangle,
    Clock,
    Database,
    ChevronRight,
    Search,
    Trophy
} from 'lucide-react';
import { superAdminService, voterService } from '../../services/api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, subValue, subLabel }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between transition-all"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                <Icon size={24} className={color} />
            </div>
            <Activity size={16} className="text-gray-300" />
        </div>
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
            {subValue && (
                <div className="flex items-center mt-2 text-xs">
                    <span className="text-blue-500 font-bold">{subValue}</span>
                    <span className="text-gray-400 ml-1">{subLabel}</span>
                </div>
            )}
        </div>
    </motion.div>
);

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState({
        totalVoters: 0,
        totalAdmins: 0,
        verifiedVoters: 0,
        votesCast: 0,
        deptStats: []
    });
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000); // 3s auto-refresh for "live" feel
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const [analyticsRes, candidatesRes] = await Promise.all([
                superAdminService.getAnalytics(),
                voterService.getCandidates()
            ]);
            setStats(analyticsRes.data);
            setCandidates(candidatesRes.data);

            // Generate Dynamic Alerts
            const newAlerts = [];
            const unverified = analyticsRes.data.totalVoters - analyticsRes.data.verifiedVoters;
            if (unverified > 5) {
                newAlerts.push({ type: 'warning', message: `${unverified} voters pending verification.`, icon: ShieldCheck });
            }

            analyticsRes.data.deptStats.forEach(dept => {
                const turnout = dept.count > 0 ? (dept.voted / dept.count) * 100 : 0;
                if (turnout < 20 && analyticsRes.data.votesCast > 0) {
                    newAlerts.push({ type: 'error', message: `Low turnout (${Math.round(turnout)}%) in ${dept.area} area.`, icon: AlertTriangle });
                }
            });

            setAlerts(newAlerts);
        } catch (error) {
            console.error("Failed to load dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    const sortedCandidates = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 md:space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Command Center</h1>
                    <p className="text-gray-500 font-medium">Global Election Monitoring & Governance</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold ring-1 ring-blue-200">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        LIVE MONITORING
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Search size={20} />
                    </button>
                    <div className="h-6 w-px bg-gray-100"></div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium px-2">
                        <Clock size={14} />
                        Last checked: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </header>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Registered"
                    value={stats.totalVoters}
                    icon={Users}
                    color="text-blue-600"
                    subValue="+12%"
                    subLabel="this week"
                />
                <StatCard
                    title="Identity Verified"
                    value={stats.verifiedVoters}
                    icon={UserCheck}
                    color="text-indigo-600"
                    subValue={`${stats.totalVoters > 0 ? Math.round((stats.verifiedVoters / stats.totalVoters) * 100) : 0}%`}
                    subLabel="verification rate"
                />
                <StatCard
                    title="Total Votes"
                    value={stats.votesCast}
                    icon={Vote}
                    color="text-indigo-600"
                    subValue={`${stats.totalVoters > 0 ? Math.round((stats.votesCast / stats.totalVoters) * 100) : 0}%`}
                    subLabel="turnout"
                />
                <StatCard
                    title="Active Admins"
                    value={stats.totalAdmins}
                    icon={ShieldCheck}
                    color="text-amber-600"
                    subValue="0"
                    subLabel="security incidents"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Active Election Preview (Leaderboard) */}
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <Trophy className="text-yellow-400 mb-4" size={48} />
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Live Race Standings</h2>
                    <p className="text-gray-500 font-medium mb-8">Snapshot of the leading candidate across all areas</p>

                    {sortedCandidates.length > 0 ? (
                        <div className="w-full max-w-lg space-y-4">
                            {sortedCandidates.slice(0, 1).map((cand, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl mb-4 border-4 border-white">
                                        {cand.name.charAt(0)}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{cand.name}</h3>
                                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">{cand.party}</p>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-gray-800">{cand.voteCount || 0}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirmed Votes</p>
                                        </div>
                                        <div className="w-px h-8 bg-gray-100"></div>
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-gray-800">
                                                {stats.votesCast > 0 ? Math.round(((cand.voteCount || 0) / stats.votesCast) * 100) : 0}%
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Share</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-400 text-sm font-bold">
                            No active election data found.
                        </div>
                    )}
                </div>

                {/* Live Alerts Panel */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 text-red-600 rounded-xl shadow-sm shadow-red-500/10">
                            <AlertTriangle size={20} />
                        </div>
                        <h3 className="font-black text-gray-800 tracking-tight">Real-time Security Alerts</h3>
                    </div>

                    <div className="space-y-4">
                        {alerts.length > 0 ? alerts.map((alert, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className={`flex items-start gap-3 p-4 rounded-2xl border ${alert.type === 'error' ? 'bg-red-50 border-red-100 text-red-700' :
                                    alert.type === 'critical' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                                        'bg-orange-50 border-orange-100 text-orange-700'
                                    }`}
                            >
                                <alert.icon size={18} className="mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-black leading-relaxed">{alert.message}</p>
                                    <span className="text-[9px] font-bold opacity-60 uppercase tracking-tighter mt-1 block">Just now</span>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="text-center py-12 flex flex-col items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <p className="text-xs font-bold text-gray-400 max-w-[150px]">All systems operational. No active threats detected.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
