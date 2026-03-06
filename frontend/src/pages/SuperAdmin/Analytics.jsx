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
        departmentStats: [],
        candidateStats: []
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
            <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <Activity className="text-blue-500 animate-pulse" size={20} />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global Live Node Sync Active</span>
                </div>
                <div className="text-[9px] font-bold text-gray-400">Master Data Refreshing in 3s Cycles</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Area-wise distribution Chart */}
                <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Activity className="text-blue-500" size={20} />
                            Departmental Monitoring
                        </h2>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-lg">
                            Student Distribution
                        </div>
                    </div>
                    <div className="h-[300px] md:h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.departmentStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="department"
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
                                    {stats.departmentStats.map((entry, index) => (
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
                                <span className="font-medium text-gray-600">Verified Students</span>
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

            {/* Live Candidate Results Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Live Election Results</h2>
                        <p className="text-gray-500 font-medium text-sm">Real-time vote counts aggregated per candidate across all departments.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-bold border border-green-100">
                        <Vote size={14} />
                        Total Votes Cast: {stats.votesCast}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stats.candidateStats && stats.candidateStats.length > 0 ? (
                        stats.candidateStats.map((candidate, idx) => (
                            <div key={idx} className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 transition-all hover:shadow-xl hover:bg-white hover:scale-[1.02] group">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                                        {candidate.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 leading-tight text-lg">{candidate.name}</h3>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-1">{candidate.party}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Votes</span>
                                        <div className="text-4xl font-black text-gray-900 tracking-tighter">
                                            {candidate.voteCount}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Vote Share</span>
                                        <div className="text-2xl font-black text-blue-600 tracking-tighter">
                                            {stats.votesCast > 0 ? Math.round((candidate.voteCount / stats.votesCast) * 100) : 0}%
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                                            style={{ width: `${stats.votesCast > 0 ? (candidate.voteCount / stats.votesCast) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                            <Users className="text-gray-300 mb-4" size={48} />
                            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No registered candidates found</p>
                            <p className="text-gray-400 text-xs mt-1 font-medium italic">Please verify candidate registration in the Admin panel.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
