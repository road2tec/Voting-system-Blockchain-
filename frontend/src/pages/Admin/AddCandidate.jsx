import React, { useState } from 'react';
import { adminService } from '../../services/api';
import { getContract } from '../../services/contractService';
import { UserPlus, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AddCandidate = () => {
    const { connectWallet, walletAddress } = useAuth();
    const [formData, setFormData] = useState({
        name: '', party: '', manifesto: '', age: '', qualification: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (!walletAddress) {
                await connectWallet();
            }

            const contract = await getContract();

            // 1. Add to Blockchain
            console.log("Adding to blockchain...");
            const tx = await contract.addCandidate(formData.name);
            await tx.wait();
            console.log("Added to blockchain");

            // 2. Get the new candidate ID (length - 1)
            const candidates = await contract.getAllCandidates();
            const blockchainId = candidates.length - 1;

            // 3. Add to Backend
            console.log("Adding to backend...");
            await adminService.addCandidate({ ...formData, blockchainId });

            setMessage('Candidate added successfully!');
            setFormData({ name: '', party: '', manifesto: '', age: '', qualification: '' });
        } catch (error) {
            console.error(error);
            setMessage(`Error: ${error.reason || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Add New Candidate</h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                {message && (
                    <div className={`p-4 mb-6 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Party Affiliation</label>
                        <input
                            type="text"
                            value={formData.party}
                            onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                            <input
                                type="text"
                                value={formData.qualification}
                                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Manifesto</label>
                        <textarea
                            value={formData.manifesto}
                            onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : <><Save size={20} /> Save Candidate</>}
                    </button>
                    {!walletAddress && <p className="text-red-500 text-sm text-center">Please connect wallet to add candidate</p>}
                </form>
            </div>
        </div>
    );
};

export default AddCandidate;
