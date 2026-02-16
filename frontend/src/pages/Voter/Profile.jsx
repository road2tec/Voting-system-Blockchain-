import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Building, GraduationCap, MapPin, ShieldCheck, Fingerprint, ExternalLink } from 'lucide-react';

const Profile = () => {
    const { currentUser } = useAuth();

    const infoItems = [
        { label: 'Full Legal Name', value: currentUser?.name, icon: User },
        { label: 'System Email', value: currentUser?.email, icon: Mail },
        { label: 'Voting Area', value: currentUser?.area, icon: Building },
        { label: 'Role Designation', value: currentUser?.role, icon: MapPin },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 md:p-8">
                    <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 font-bold text-[9px] md:text-[10px] tracking-widest uppercase">
                        <ShieldCheck size={14} />
                        Identity Verified
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-white">
                            {currentUser?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-50 text-blue-600">
                            <Fingerprint size={20} />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{currentUser?.name}</h2>
                        <p className="text-gray-500 font-medium">Verified Citizen Registry</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {infoItems.map((item, i) => (
                        <div key={i} className="space-y-1.5 md:space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <item.icon size={12} />
                                {item.label}
                            </div>
                            <p className="text-base md:text-lg font-bold text-gray-800 bg-gray-50 px-4 md:px-5 py-2.5 md:py-3 rounded-2xl border border-gray-100/50">
                                {item.value || "Not Specified"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl shadow-xl text-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Fingerprint size={20} className="text-blue-400" />
                        </div>
                        <h4 className="font-bold">Blockchain Public Address</h4>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink size={18} />
                    </button>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl font-mono text-xs break-all text-gray-400 leading-relaxed">
                    0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-4">
                    Generated upon registration • Sync status: Verified
                </p>
            </div>
        </div>
    );
};

export default Profile;
