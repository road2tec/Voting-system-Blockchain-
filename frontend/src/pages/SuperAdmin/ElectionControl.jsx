import React, { useState, useEffect } from 'react';
import { Play, Square, Activity, ShieldAlert } from 'lucide-react';
import { isElectionActive, getContractWithSigner } from '../../services/contractService';
import { motion } from 'framer-motion';

const ElectionControl = () => {
    console.log("ElectionControl: Rendering component...");
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("ElectionControl: Initializing status check...");
        const checkStatus = async () => {
            try {
                const status = await isElectionActive();
                console.log("ElectionControl: Live state from contract:", status);
                setIsActive(status);
                setError(null);
            } catch (err) {
                console.error("ElectionControl: Status check failed", err);
                setError("Blockchain connection error. Check Ganache/MetaMask.");
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 4000);
        return () => clearInterval(interval);
    }, []);

    const toggleElection = async () => {
        setLoading(true);
        try {
            const contract = await getContractWithSigner();
            const tx = await contract.setElectionState(!isActive);
            console.log("Transaction sent:", tx.hash);
            await tx.wait();
            setIsActive(!isActive);
            alert(`Election ${!isActive ? 'Started' : 'Stopped'} Successfully!`);
        } catch (error) {
            console.error("Blockchain Toggle Error:", error);
            let msg = "Action failed";
            if (error.message.includes("estimateGas") || error.message.includes("revert")) {
                msg = "Permission Denied: Only the Contract Owner (the account that deployed the contract) can start/stop the election. Please switch to the correct account in MetaMask.";
            } else {
                msg = error.reason || error.message || msg;
            }
            alert("Blockchain Error: " + msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Election Lifecycle Control</h1>
                    <p className="text-gray-500 font-medium">Manage the global state of the voting process.</p>
                </div>
                {loading && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                        <Activity size={14} className="animate-pulse" />
                        Syncing Node
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 text-amber-700">
                    <ShieldAlert size={20} />
                    <span className="text-xs font-bold">{error}</span>
                </div>
            )}

            <div className={`p-8 md:p-12 rounded-[2.5rem] shadow-xl transition-all duration-500 border-2 ${isActive ? 'bg-blue-50/50 border-blue-500 shadow-blue-500/10' : 'bg-red-50/50 border-red-500 shadow-red-500/10'}`}>
                <div className="text-center mb-10">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 ${isActive ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                        {isActive ? <Activity size={14} className="animate-pulse" /> : <ShieldAlert size={14} />}
                        {isActive ? 'Election is LIVE' : 'Voting Inactive'}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Current Status: <span className={isActive ? 'text-blue-600' : 'text-red-600'}>
                            {isActive ? 'Active' : 'Closed'}
                        </span>
                    </h2>

                    <p className="text-gray-500 font-semibold max-w-md mx-auto">
                        {isActive
                            ? "Cryptographic voting is currently open to all verified student accounts."
                            : "All blockchain voting gates are currently locked. Participants cannot cast votes."}
                    </p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={toggleElection}
                        disabled={loading}
                        className={`group relative px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl active:scale-95 flex items-center gap-4 ${isActive
                            ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/30'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30'
                            } disabled:opacity-50`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {isActive ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                <span>{isActive ? 'Terminate Election' : 'Initialize Election'}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                    <ShieldAlert size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-1">Administrative Warning</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Starting or stopping an election generates a transaction on the blockchain.
                        This action is permanent and will be logged in the system's audit trail.
                        Ensure all candidates are registered before initialization.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ElectionControl;
