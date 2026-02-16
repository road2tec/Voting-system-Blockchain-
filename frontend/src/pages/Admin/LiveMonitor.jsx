import React, { useEffect, useState } from 'react';
import { adminService, voterService } from '../../services/api';
import { Activity, Trophy, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveMonitor = () => {
    const [stats, setStats] = useState({ liveVoteCount: 0, verifiedVoters: 0 });
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const [statsRes, candRes] = await Promise.all([
                adminService.getStats(),
                voterService.getCandidates()
            ]);
            setStats(statsRes.data);
            setCandidates(candRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sortedCandidates = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

    if (loading && candidates.length === 0) return <div>Syncing with blockchain...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Live Election Monitor</h2>
                    <p className="text-gray-500 text-sm font-medium">Real-time vote aggregation from distributed nodes</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 font-bold text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    NODE FEED ACTIVE
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Participation Gauge */}
                <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                    <h3 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-8">Voter Turnout</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="96" cy="96" r="88"
                                fill="transparent"
                                stroke="#F3F4F6"
                                strokeWidth="12"
                            />
                            <motion.circle
                                cx="96" cy="96" r="88"
                                fill="transparent"
                                stroke="#3B82F6"
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 88}
                                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - (stats.liveVoteCount / (stats.verifiedVoters || 1))) }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute">
                            <p className="text-4xl font-black text-gray-800">
                                {stats.verifiedVoters > 0 ? Math.round((stats.liveVoteCount / stats.verifiedVoters) * 100) : 0}%
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirmed</p>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-8">
                        <div>
                            <p className="text-xl font-bold text-gray-800">{stats.liveVoteCount}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Cast</p>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{stats.verifiedVoters}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
                        </div>
                    </div>
                </div>

                {/* Candidate Standings */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-800 font-bold mb-6 flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={20} />
                        Current Standings
                    </h3>
                    <div className="space-y-4">
                        {sortedCandidates.map((cand, i) => (
                            <div key={cand._id} className="flex items-center gap-4">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-bold text-gray-800">{cand.name}</p>
                                        <p className="text-sm font-black text-gray-800">{cand.voteCount || 0} Votes</p>
                                    </div>
                                    <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stats.liveVoteCount > 0 ? ((cand.voteCount || 0) / stats.liveVoteCount) * 100 : 0}%` }}
                                            className={`h-full rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-indigo-400'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMonitor;
