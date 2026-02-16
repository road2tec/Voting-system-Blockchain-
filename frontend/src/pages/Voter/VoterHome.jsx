import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { voterService } from '../../services/api';
import { ShieldCheck, Calendar, Info, Clock, CheckCircle2, AlertCircle, ChevronRight, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const VoterHome = () => {
    const { currentUser } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const res = await voterService.getCandidates();
            setCandidates(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="animate-pulse text-gray-400">Loading your voter profile...</div>;

    return (
        <div className="space-y-6 md:space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 transition-all">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Citizen Dashboard</h2>
                    <p className="text-sm text-gray-500 font-medium">Empowering your voice through blockchain security.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Election Session</span>
                        <span className="text-sm font-bold text-gray-800">General Election 2026</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Calendar size={20} />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status Cards */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Verification Status */}
                        <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 md:gap-5">
                            <div className={`p-4 rounded-2xl ${currentUser?.isVerified ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                {currentUser?.isVerified ? <ShieldCheck size={28} /> : <AlertCircle size={28} />}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ID Verification</p>
                                <h3 className="text-xl font-bold text-gray-800">{currentUser?.isVerified ? 'Verified' : 'Pending'}</h3>
                                <p className="text-[10px] font-bold text-gray-400 mt-1">Identity Confirmed on Ledger</p>
                            </div>
                        </div>

                        {/* Voting Status */}
                        <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 md:gap-5">
                            <div className={`p-4 rounded-2xl ${currentUser?.hasVoted ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                {currentUser?.hasVoted ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Participation</p>
                                <h3 className="text-xl font-bold text-gray-800">{currentUser?.hasVoted ? 'Vote Cast' : 'Not Voted'}</h3>
                                <p className="text-[10px] font-bold text-gray-400 mt-1">{currentUser?.hasVoted ? 'Receipt #0x82...3B' : 'Action Required'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Instructions / Info */}
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black">Ready to shape the future?</h3>
                                <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-md">
                                    Your vote is end-to-end encrypted and stored on a decentralized ledger. Ensure you have reviewed all candidate manifestos before proceeding.
                                </p>
                                <Link
                                    to={currentUser?.isVerified && !currentUser?.hasVoted ? "/voter/vote" : "#"}
                                    className={`inline-flex items-center gap-3 px-8 py-3.5 bg-white text-indigo-700 rounded-2xl font-black text-sm shadow-lg hover:shadow-indigo-500/20 transition-all group ${(!currentUser?.isVerified || currentUser?.hasVoted) && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    Proceed to Ballot
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <Vote size={64} className="text-white opacity-80" />
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Info size={14} className="text-blue-500" />
                            Election Guidelines
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Keep your login credentials secure at all times.",
                                "Once cast, a vote cannot be altered or removed.",
                                "Verification requires a valid institutional identity.",
                                "System auto-logs all access attempts for audit."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-3 text-sm font-medium text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="text-orange-600" size={18} />
                            <h4 className="text-[10px] font-black text-orange-800 uppercase tracking-widest">Support</h4>
                        </div>
                        <p className="text-xs font-bold text-orange-700/80 leading-relaxed">
                            Facing issues with verification? Contact your local administrator or the system helpline at support@blockvote.edu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterHome;
