import React, { useState } from 'react';
import { Play, Square } from 'lucide-react';

// Note: In a real app, this would interact with the Smart Contract via a service
// For now, we'll simulate the state
const ElectionControl = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleElection = async () => {
        setLoading(true);
        // Simulate contract call
        setTimeout(() => {
            setIsActive(!isActive);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Election Control</h1>

            <div className={`p-8 rounded-2xl shadow-xl transition-all ${isActive ? 'bg-blue-50 border-2 border-blue-500' : 'bg-red-50 border-2 border-red-500'}`}>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Status: <span className={isActive ? 'text-blue-600' : 'text-red-600'}>
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {isActive
                            ? "Voting is currently open. Voters can cast their votes."
                            : "Voting is closed. No votes can be cast."}
                    </p>
                </div>

                <button
                    onClick={toggleElection}
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 w-full transition-all ${isActive
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
                        } shadow-lg`}
                >
                    {loading ? (
                        <span>Processing...</span>
                    ) : (
                        <>
                            {isActive ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                            {isActive ? 'Stop Election' : 'Start Election'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ElectionControl;
