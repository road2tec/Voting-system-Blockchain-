import React, { useEffect, useState } from 'react';
import { adminService, voterService } from '../../services/api';
import { Users, CheckCircle2, XCircle, Search, Filter, Vote } from 'lucide-react';
import { motion } from 'framer-motion';

const Voters = () => {
    const [voters, setVoters] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const [voterRes, candRes] = await Promise.all([
                adminService.getVoters(),
                voterService.getCandidates()
            ]);
            setVoters(voterRes.data);
            setCandidates(candRes.data);
        } catch (error) {
            console.error("Failed to load voters:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCandidateName = (id) => {
        const cand = candidates.find(c => Number(c.blockchainId) === Number(id));
        return cand ? cand.name : `ID: ${id}`;
    };

    const filteredVoters = voters.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && voters.length === 0) return <div className="text-gray-400 font-bold">Loading User Directory...</div>;

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Voter Registry</h2>
                    <p className="text-gray-500 text-sm font-medium italic">Live monitoring of participant status and activity.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 font-bold text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    REAL-TIME UPDATES ACTIVE
                </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email or area..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Participant</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Identity</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 text-center">Status</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 text-center">Vote Log</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredVoters.map((v) => (
                                <tr key={v._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                                {v.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{v.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{v.area}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="text-xs font-medium text-gray-500">{v.email}</p>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {v.isVerified ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                                                <CheckCircle2 size={12} /> Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                                                <XCircle size={12} /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {v.hasVoted ? (
                                            <div className="space-y-1">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                    <Vote size={12} /> Cast
                                                </span>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                                    For: {getCandidateName(v.votedCandidateId)}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Awaiting...</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Voters;
