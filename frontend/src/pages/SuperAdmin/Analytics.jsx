import React, { useEffect, useState } from 'react';
import { superAdminService } from '../../services/api';
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
import { Activity, ShieldCheck, UserCheck, Users, Vote } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];

const Analytics = () => {
    const [stats, setStats] = useState({
        totalVoters: 0,
        totalAdmins: 0,
        verifiedVoters: 0,
        votesCast: 0,
        areaStats: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const res = await superAdminService.getAnalytics();
            setStats(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const pieData = [
        { name: 'Verified', value: stats.verifiedVoters },
        { name: 'Unverified', value: stats.totalVoters - stats.verifiedVoters }
    ];

    if (loading) return <div className="animate-pulse text-gray-400">Loading analytics...</div>;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Area-wise distribution Chart */}
                <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Activity className="text-blue-500" size={20} />
                            Area Wise Monitoring
                        </h2>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-lg">
                            Voter Distribution
                        </div>
                    </div>
                    <div className="h-[300px] md:h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.areaStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="area"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }}
                                    dy={5}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6', radius: 8 }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={45}>
                                    {stats.areaStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Verification Chart */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Verification Ratio</h2>
                    <div className="h-[250px] w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#3B82F6" />
                                    <Cell fill="#F3F4F6" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <p className="text-3xl font-black text-gray-800">
                                {stats.totalVoters > 0 ? Math.round((stats.verifiedVoters / stats.totalVoters) * 100) : 0}%
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified</p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4 w-full">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="font-medium text-gray-600">Verified Voters</span>
                            </div>
                            <span className="font-bold text-gray-800">{stats.verifiedVoters}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-100"></div>
                                <span className="font-medium text-gray-600">Unverified</span>
                            </div>
                            <span className="font-bold text-gray-800">{stats.totalVoters - stats.verifiedVoters}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
