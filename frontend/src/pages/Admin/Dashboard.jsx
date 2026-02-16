import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserCheck, Vote, Activity, Users, Shield, Clock, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, subLabel }) => (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 shadow-sm`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{subLabel}</span>
        </div>
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalCandidates: 0,
        verifiedVoters: 0,
        unverifiedVoters: 0,
        liveVoteCount: 0,
        electionStatus: 'Loading...'
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadStats();
        const interval = setInterval(loadStats, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadStats = async () => {
        try {
            const res = await adminService.getStats();
            setStats(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="animate-pulse text-gray-400 font-bold">Initializing Dashboard...</div>;

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Candidates"
                    value={stats.totalCandidates}
                    icon={Users}
                    color="bg-blue-500"
                    subLabel="Registered"
                />
                <StatCard
                    title="Verified Voters"
                    value={stats.verifiedVoters}
                    icon={UserCheck}
                    color="bg-indigo-500"
                    subLabel={`${stats.unverifiedVoters} Pending`}
                />
                <StatCard
                    title="Live Vote Count"
                    value={stats.liveVoteCount}
                    icon={Vote}
                    color="bg-purple-500"
                    subLabel="Real-time"
                />
                <StatCard
                    title="Election Status"
                    value={stats.electionStatus}
                    icon={Activity}
                    color="bg-orange-500"
                    subLabel="Current Phase"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Quick Actions */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Shield className="text-blue-600" size={20} />
                        Administrative Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.button
                            onClick={() => navigate('/admin/add-voter')}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-blue-50 hover:border-blue-100 transition-all group"
                        >
                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                                <UserPlus size={20} />
                            </div>
                            <span className="text-xs font-bold text-gray-700">Add New Voter</span>
                        </motion.button>
                        <motion.button
                            onClick={() => navigate('/admin/add-candidate')}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-blue-50 hover:border-blue-100 transition-all group"
                        >
                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                                <PlusCircle size={20} />
                            </div>
                            <span className="text-xs font-bold text-gray-700">Register Candidate</span>
                        </motion.button>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-gray-900 p-6 md:p-8 rounded-3xl shadow-xl text-white">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Activity size={18} className="text-blue-400" />
                            System Health
                        </h2>
                        <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                            Operational
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                                    <Clock size={16} className="text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Node Sync</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Mainnet-Sepolia</p>
                                </div>
                            </div>
                            <p className="text-sm font-black text-blue-400">100%</p>
                        </div>

                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                className="bg-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
