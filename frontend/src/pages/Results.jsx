import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { voterService } from '../services/api';

const Results = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
        const interval = setInterval(fetchResults, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchResults = async () => {
        try {
            const res = await voterService.getCandidates();

            // Mocking colors for now
            const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

            const formattedData = res.data.map((cand, idx) => ({
                name: cand.name,
                party: cand.party,
                votes: cand.voteCount || 0,
                color: colors[idx % colors.length]
            }));

            setData(formattedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!data.length && !loading) return <div className="text-center mt-20">No results yet.</div>;
    if (loading) return <div className="text-center mt-20">Loading results...</div>;

    const winner = data.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);

    return (
        <div className="pb-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Election Results</h1>
                <p className="text-gray-500">Real-time vote counting from the blockchain</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="md:col-span-2 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 h-[400px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#4b5563', fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="votes" radius={[0, 4, 4, 0]} barSize={32}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-yellow-100 to-amber-100 p-8 rounded-2xl shadow-xl border border-yellow-200 flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Trophy size={120} />
                    </div>
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-yellow-400/50">
                        <Trophy size={40} />
                    </div>
                    <h3 className="text-gray-600 font-semibold mb-1">Current Leader</h3>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{winner?.name || 'N/A'}</h2>
                    <div className="text-4xl font-extrabold text-yellow-600">{winner?.votes || 0} <span className="text-lg font-medium text-yellow-600/70">Votes</span></div>
                </motion.div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Detailed Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] md:min-w-0">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Candidate</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Affiliation</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500">Votes</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500">Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => {
                                const total = data.reduce((acc, curr) => acc + curr.votes, 0);
                                const percentage = total > 0 ? ((item.votes / total) * 100).toFixed(1) : 0;

                                return (
                                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{item.party || 'Independent'}</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-800">{item.votes}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                                {percentage}%
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Results;
