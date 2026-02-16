import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VerifyVoter = () => {
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVoters();
    }, []);

    const loadVoters = async () => {
        try {
            const res = await adminService.getUnverifiedVoters();
            setVoters(res.data);
        } catch (error) {
            console.error("Error loading voters", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        try {
            await adminService.verifyVoter(id);
            setVoters(voters.filter(v => v._id !== id));
        } catch (error) {
            alert('Verification failed');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pending Verifications</h1>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : voters.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-2xl shadow-lg">
                    <h3 className="text-xl text-gray-500">No pending verifications</h3>
                </div>
            ) : (
                <div className="grid gap-4">
                    {voters.map((voter) => (
                        <motion.div
                            key={voter._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{voter.name}</h3>
                                <p className="text-gray-500">{voter.email}</p>
                                <div className="flex gap-2 mt-1 text-sm bg-gray-50 p-1 rounded-md">
                                    <span className="font-semibold text-gray-600">Area:</span> {voter.area || 'N/A'}
                                </div>
                            </div>
                            <button
                                onClick={() => handleVerify(voter._id)}
                                className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-colors flex items-center gap-2"
                            >
                                <CheckCircle size={18} /> Verify
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerifyVoter;
