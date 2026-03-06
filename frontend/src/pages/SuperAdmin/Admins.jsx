import React, { useEffect, useState } from 'react';
import { superAdminService } from '../../services/api';
import { Shield, ShieldCheck, Mail, Calendar, Search, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const res = await superAdminService.getAdmins();
            setAdmins(res.data);
        } catch (error) {
            console.error("Failed to load admins:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAdmins = admins.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && admins.length === 0) return <div className="text-gray-400 font-bold">Accessing Governance Registry...</div>;

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">System Administrators</h2>
                    <p className="text-gray-500 text-sm font-medium">Global governance and administrative oversight logs.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/superadmin/create-admin"
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all font-bold text-sm"
                    >
                        <PlusCircle size={18} />
                        Create New Admin
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 font-bold text-xs">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        GOVERNANCE FEED LIVE
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search administrators..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAdmins.length === 0 ? (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Administrators Found</h3>
                            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8 font-medium">
                                Start by creating your first departmental administrator to manage specific college branches.
                            </p>
                            <Link
                                to="/superadmin/create-admin"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 font-bold hover:scale-105 transition-all text-sm"
                            >
                                <PlusCircle size={18} />
                                Create First Admin
                            </Link>
                        </div>
                    ) : filteredAdmins.map((admin) => (
                        <motion.div
                            key={admin._id}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Shield size={64} className="text-indigo-600" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">
                                    {admin.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-gray-900">{admin.name}</h3>
                                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                                        {admin.department || 'General Admin'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mt-2">
                                <div className="flex items-center gap-3 text-gray-500">
                                    <Mail size={14} />
                                    <span className="text-xs font-bold">{admin.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-500">
                                    <Calendar size={14} />
                                    <span className="text-xs font-bold">Created: {new Date(admin.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active</span>
                                </div>
                                <ShieldCheck size={16} className="text-indigo-400 opacity-50" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admins;
