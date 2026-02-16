import React, { useEffect, useState } from 'react';
import { getContract } from '../../services/contractService';
import { voterService } from '../../services/api'; // Corrected import
import { useAuth } from '../../context/AuthContext'; // Corrected import
import { motion } from 'framer-motion';
import { Vote, CheckCircle, AlertTriangle } from 'lucide-react';

const VoterDashboard = () => {
    const { currentUser, walletAddress, connectWallet } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [txHash, setTxHash] = useState('');

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            // First try to get from Access DB (Metadata) for rich info
            // Fallback to contract if needed, or combine both
            // For now, let's fetch from basic service
            const res = await voterService.getCandidates();
            setCandidates(res.data);

            // Check if voted
            if (currentUser.hasVoted) {
                setHasVoted(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (blockchainId) => {
        if (!currentUser.isVerified) {
            alert('You are not verified yet!');
            return;
        }

        if (!walletAddress) {
            await connectWallet();
            // Need to return and click again basically, or handle flow better
            return;
        }

        setVoting(true);
        try {
            const contract = await getContract();
            const tx = await contract.vote(blockchainId);
            console.log("Vote TX:", tx.hash);
            await tx.wait();

            setTxHash(tx.hash);
            setHasVoted(true);

            // Notify backend
            await voterService.castVote();
        } catch (error) {
            console.error(error);
            alert(`Voting failed: ${error.reason || error.message}`);
        } finally {
            setVoting(false);
        }
    };

    if (loading) return <div>Loading candidates...</div>;

    if (hasVoted) {
        return (
            <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto mt-10">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Vote Cast Successfully!</h2>
                <p className="text-gray-500 mb-8">Thank you for participating in the election.</p>
                {txHash && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 break-all text-sm font-mono text-gray-600">
                        TX: {txHash}
                    </div>
                )}
            </div>
        );
    }

    if (!currentUser.isVerified) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg flex items-start gap-4 mx-auto max-w-3xl">
                <AlertTriangle className="text-yellow-600" size={24} />
                <div>
                    <h3 className="font-bold text-yellow-800 text-lg">Verification Pending</h3>
                    <p className="text-yellow-700 mt-1">
                        Your account is currently under review. You cannot cast a vote until an admin verifies your identity.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Cast Your Vote</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((cand) => (
                    <motion.div
                        key={cand._id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div className="h-32 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                        <div className="p-6 -mt-12 relative z-10">
                            <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center text-3xl font-bold text-gray-800 mb-4">
                                {cand.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{cand.name}</h3>
                            <p className="text-green-600 font-medium mb-4">{cand.party}</p>

                            <p className="text-gray-500 text-sm mb-6 line-clamp-3">{cand.manifesto}</p>

                            <button
                                onClick={() => handleVote(cand.blockchainId)}
                                disabled={voting}
                                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${voting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-500/30'
                                    }`}
                            >
                                <Vote size={20} /> {voting ? 'Confirming...' : 'Vote Now'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VoterDashboard;
