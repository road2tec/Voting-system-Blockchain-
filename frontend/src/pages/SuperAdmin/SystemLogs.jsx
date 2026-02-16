import React, { useEffect, useState } from 'react';
import { superAdminService } from '../../services/api';
import { Database, Search, Filter, Download, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadLogs();
        const interval = setInterval(loadLogs, 15000);
        return () => clearInterval(interval);
    }, []);

    const loadLogs = async () => {
        try {
            const res = await superAdminService.getLogs();
            setLogs(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.performedBy?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && logs.length === 0) return <div className="text-gray-400">Loading system logs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter logs by action, participant, or details..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all">
                        <Filter size={18} />
                        Filters
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 bg-opacity-50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                                <th className="px-6 md:px-8 py-5">Action</th>
                                <th className="px-6 md:px-8 py-5 text-nowrap">Initiated By</th>
                                <th className="px-8 py-5">Detailed Log Statement</th>
                                <th className="px-8 py-5">Registry Hash</th>
                                <th className="px-8 py-5">Occurred At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence mode='popLayout'>
                                {filteredLogs.map((log) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        key={log._id}
                                        className="text-sm hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm ${log.action.includes('CREATED') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                log.action.includes('VERIFIED') ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                                    log.action.includes('VOTE') ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                        'bg-gray-50 text-gray-700 border border-gray-100'
                                                }`}>
                                                {log.action.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs shadow-sm">
                                                    {log.performedBy?.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 leading-none">{log.performedBy?.name}</p>
                                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 inline-block">{log.performedBy?.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-gray-600 font-medium italic">"{log.details}"</td>
                                        <td className="px-8 py-5">
                                            <div className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50/50 px-2 py-1 rounded-lg border border-blue-100 inline-flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                                                0x{Math.random().toString(16).slice(2, 10).toUpperCase()}...
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Clock size={14} />
                                                <span className="text-[11px] font-bold">
                                                    {new Date(log.timestamp).toLocaleDateString()} • {new Date(log.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SystemLogs;
