import React, { useState } from 'react';
import { Play, Square, Settings, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getContract } from '../../services/contractService';

const ElectionControl = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPhase, setCurrentPhase] = useState('REGISTRATION'); // REGISTRATION, VOTING, RESULTS

    const toggleElection = async () => {
        setLoading(true);
        try {
            const contract = await getContract();
            const tx = await contract.setElectionState(!isActive);
            await tx.wait();
            setIsActive(!isActive);
            if (!isActive) setCurrentPhase('VOTING');
            else setCurrentPhase('RESULTS');
        } catch (error) {
            console.error(error);
            alert("Failed to update election state: " + (error.reason || error.message));
        } finally {
            setLoading(false);
        }
    };

    const phases = [
        { id: 'REGISTRATION', label: 'Candidate Registration', icon: Settings, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'VOTING', label: 'Active Voting Phase', icon: Play, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'RESULTS', label: 'Tallying & Results', icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Governance Control</h2>
                        <p className="text-gray-500 text-sm font-medium">Manage election phases and system-wide accessibility</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            className={`p-6 rounded-2xl border-2 transition-all ${currentPhase === phase.id
                                ? `border-${phase.color.split('-')[1]}-500 ${phase.bg}`
                                : 'border-gray-50 bg-gray-50/50 opacity-60'
                                }`}
                        >
                            <div className={`p-3 rounded-xl bg-white shadow-sm w-fit mb-4 ${currentPhase === phase.id ? phase.color : 'text-gray-400'}`}>
                                <phase.icon size={20} />
                            </div>
                            <h3 className={`text-sm font-black uppercase tracking-widest ${currentPhase === phase.id ? 'text-gray-900' : 'text-gray-400'}`}>
                                {phase.label}
                            </h3>
                            {currentPhase === phase.id && (
                                <div className="mt-4 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full bg-${phase.color.split('-')[1]}-500 animate-pulse`}></div>
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Current Active Stage</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={`p-8 rounded-3xl border border-gray-100 relative overflow-hidden ${isActive ? 'bg-blue-50/30' : 'bg-red-50/30'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-800">Master Switch</h3>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    {isActive ? 'Live' : 'Stopped'}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-md">
                                {isActive
                                    ? "Electronic voting is currently enabled globally. Any verified voter can cast their signature on the blockchain."
                                    : "All voting interfaces are currently locked. System is in read-only mode for historical data audit."}
                            </p>
                        </div>

                        <button
                            onClick={toggleElection}
                            disabled={loading}
                            className={`relative px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 disabled:opacity-50 overflow-hidden group ${isActive
                                ? 'bg-red-500 text-white shadow-red-500/20'
                                : 'bg-blue-600 text-white shadow-blue-500/20'
                                }`}
                        >
                            <div className="relative z-10 flex items-center gap-3">
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {isActive ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                        <span>{isActive ? 'Halting Voting' : 'Initiate Voting'}</span>
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm text-orange-600">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-orange-800 uppercase tracking-widest mb-1">Critical Warning</h4>
                    <p className="text-xs font-bold text-orange-700/80 leading-relaxed">
                        Stopping the election will freeze all incoming transactions and finalize the results. This action is irreversible on the blockchain. Ensure all voting areas and regions have completed their tallies before halting and proceeding to results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ElectionControl;
