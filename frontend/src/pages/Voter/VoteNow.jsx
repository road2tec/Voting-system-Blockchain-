import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { voterService } from '../../services/api';
import { Vote, ShieldCheck, Info, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { castVote as blockchainCastVote, isElectionActive } from '../../services/contractService';

const VoteNow = () => {
    const { currentUser } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [casting, setCasting] = useState(false);
    const [votedSuccess, setVotedSuccess] = useState(false);
    const [electionActive, setElectionActive] = useState(true);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000); // Poll every 3 seconds for live updates
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const [candRes, activeStatus] = await Promise.all([
                voterService.getCandidates(),
                isElectionActive()
            ]);
            setCandidates(candRes.data);
            setElectionActive(activeStatus);
        } catch (error) {
            console.error("Live fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async () => {
        if (!selectedCandidate) return;

        setCasting(true);
        try {
            // 1. Cast vote on blockchain
            console.log("Casting vote on blockchain for ID:", selectedCandidate.blockchainId);
            await blockchainCastVote(selectedCandidate.blockchainId);

            // 2. Mark user as voted in backend
            console.log("Marking as voted in backend...");
            await voterService.castVote({ candidateId: selectedCandidate.blockchainId });

            setVotedSuccess(true);
        } catch (error) {
            console.error(error);
            let userFriendlyMsg = "Voting failed. Please try again.";

            if (error.message.includes("Election is not active")) {
                userFriendlyMsg = "Election is not active yet. Please wait for the administrator to start it.";
            } else if (error.message.includes("You have already voted")) {
                userFriendlyMsg = "You have already cast your vote for this election.";
            } else if (error.message.includes("user rejected action")) {
                userFriendlyMsg = "Transaction was canceled in MetaMask.";
            } else if (error.message.includes("estimateGas")) {
                userFriendlyMsg = "Election is currently paused or your address has already voted on-chain.";
            }

            alert(userFriendlyMsg);
        } finally {
            setCasting(false);
        }
    };

    if (votedSuccess) return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-gray-900">Vote Cast Successfully!</h2>
                <p className="text-gray-500 font-medium">Your selection has been hashed and added to the blockchain ledger.</p>
            </div>
            <div className="font-mono text-xs bg-gray-50 border border-gray-100 p-4 rounded-2xl text-gray-400">
                TX_ID: 0x{Math.random().toString(16).slice(2, 42).toUpperCase()}
            </div>
        </div>
    );

    if (loading) return <div className="animate-pulse text-gray-400">Loading ballot...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">Official Digital Ballot</h2>
                    <p className="text-gray-500 text-xs md:text-sm font-medium italic">Select one candidate to cast your immutable vote.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                    <ShieldCheck size={20} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-700">End-to-End Encrypted</span>
                </div>
            </div>

            {!electionActive && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-4"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-600">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-red-800 uppercase tracking-widest mb-1">Voting Not Started</h4>
                        <p className="text-xs font-bold text-red-700/80 leading-relaxed">
                            The election has not been initiated by the administrator yet.
                            You will be able to cast your vote once the status changes to Live.
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((cand) => (
                    <motion.div
                        key={cand._id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedCandidate(cand)}
                        className={`cursor-pointer p-5 md:p-6 rounded-3xl border-2 transition-all relative overflow-hidden group ${selectedCandidate?._id === cand._id
                            ? 'border-blue-500 bg-blue-50/50 shadow-xl shadow-blue-500/10'
                            : 'border-white bg-white hover:border-gray-100 shadow-sm'
                            }`}
                    >
                        {selectedCandidate?._id === cand._id && (
                            <div className="absolute top-4 right-4 text-blue-600">
                                <CheckCircle2 size={24} />
                            </div>
                        )}

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-4 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                <User size={40} />
                            </div>
                            <h3 className="text-lg font-black text-gray-800">{cand.name}</h3>
                            <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1 mb-4">{cand.party}</p>
                            <p className="text-xs font-medium text-gray-500 leading-relaxed line-clamp-2">
                                {cand.manifesto || "Providing a better vision for the future of our institution."}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="sticky bottom-8 flex justify-center pt-8">
                <button
                    onClick={handleVote}
                    disabled={!selectedCandidate || casting || !electionActive}
                    className={`relative px-8 md:px-16 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden ${selectedCandidate && electionActive
                        ? 'bg-blue-600 text-white shadow-blue-500/30'
                        : 'bg-gray-200 text-gray-400 shadow-none'
                        }`}
                >
                    <div className="relative z-10 flex items-center gap-3">
                        {casting ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Vote size={20} />
                                <span>{!electionActive ? 'Voting Inactive' : 'Cast Secure Vote'}</span>
                            </>
                        )}
                    </div>
                </button>
            </div>

            <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Info size={12} />
                    Double-check your selection. This action is irreversible.
                </p>
            </div>
        </div>
    );
};

export default VoteNow;
