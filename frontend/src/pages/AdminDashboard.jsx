import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { Plus, Trash2, Save, Calendar } from 'lucide-react';

const AdminDashboard = () => {
    const [electionTitle, setElectionTitle] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState('');

    const addCandidate = () => {
        if (newCandidate.trim()) {
            setCandidates([...candidates, { name: newCandidate }]);
            setNewCandidate('');
        }
    };

    const removeCandidate = (index) => {
        const newCandidates = [...candidates];
        newCandidates.splice(index, 1);
        setCandidates(newCandidates);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Create and manage elections</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <Plus className="mr-2 text-green-600" /> Create New Election
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Election Title</label>
                            <input
                                type="text"
                                value={electionTitle}
                                onChange={(e) => setElectionTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="e.g. Student Council Election 2024"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input type="date" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input type="date" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Candidates</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newCandidate}
                                    onChange={(e) => setNewCandidate(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addCandidate()}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Candidate Name"
                                />
                                <button
                                    onClick={addCandidate}
                                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium transition-colors"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="space-y-2">
                                {candidates.map((cand, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                    >
                                        <span className="font-medium text-gray-700">{cand.name}</span>
                                        <button onClick={() => removeCandidate(idx)} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2">
                                <Save size={20} /> Deploy Election to Blockchain
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
