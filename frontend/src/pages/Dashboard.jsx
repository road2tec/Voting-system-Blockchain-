import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const elections = [
        { id: 1, title: 'Student Council President', status: 'Active', endDate: '2023-12-31' },
        { id: 2, title: 'Regional Representative Election', status: 'Upcoming', endDate: '2024-01-15' },
    ];

    return (
        <MainLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Voter Dashboard</h1>
                <p className="text-gray-500">Manage your voting activities</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elections.map((election) => (
                    <motion.div
                        key={election.id}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${election.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {election.status}
                            </div>
                            <Clock size={18} className="text-gray-400" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">{election.title}</h3>

                        <div className="flex items-center text-gray-500 text-sm mb-6">
                            <Calendar size={16} className="mr-2" />
                            <span>Ends: {election.endDate}</span>
                        </div>

                        <button className={`w-full py-2 rounded-lg font-semibold transition-colors ${election.status === 'Active' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                            {election.status === 'Active' ? 'Vote Now' : 'Coming Soon'}
                        </button>
                    </motion.div>
                ))}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
