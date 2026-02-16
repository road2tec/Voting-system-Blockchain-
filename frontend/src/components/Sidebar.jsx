import React from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    FileText,
    PlusCircle,
    UserCheck,
    Activity,
    Vote,
    User,
    LogOut,
    Shield,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { currentUser, logoutUser } = useAuth();

    const getLinks = () => {
        switch (currentUser?.role) {
            case 'superadmin':
                return [
                    { name: 'Dashboard', path: '/superadmin/dashboard', icon: LayoutDashboard },
                    { name: 'Manage Elections', path: '/superadmin/election', icon: Settings },
                    { name: 'Admin Management', path: '/superadmin/admins', icon: Users },
                    { name: 'Add Admin', path: '/superadmin/create-admin', icon: PlusCircle },
                    { name: 'Voter Directory', path: '/superadmin/voters', icon: UserCheck },
                    { name: 'Analytics', path: '/superadmin/analytics', icon: BarChart3 },
                    { name: 'Live Results', path: '/results', icon: Vote },
                    { name: 'System Logs', path: '/superadmin/logs', icon: FileText },
                ];
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
                    { name: 'Candidate Management', path: '/admin/add-candidate', icon: PlusCircle },
                    { name: 'Voter Verification', path: '/admin/verify-voters', icon: UserCheck },
                    { name: 'Voter List', path: '/admin/voter-list', icon: Users },
                    { name: 'Live Monitor', path: '/admin/live-monitor', icon: Activity },
                ];
            case 'voter':
                return [
                    { name: 'Dashboard', path: '/voter/dashboard', icon: LayoutDashboard },
                    { name: 'Active Election', path: '/voter/vote', icon: Vote },
                    { name: 'Results', path: '/results', icon: BarChart3 },
                    { name: 'Profile', path: '/voter/profile', icon: User },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <div className={`h-screen w-64 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50 overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg text-white shadow-lg shadow-blue-500/20">
                            <Vote size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tight">
                                BlockVote
                            </h1>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">
                                {currentUser?.role}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-4 md:py-3.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <link.icon size={20} className={`transition-colors ${isActive ? 'text-blue-600' : 'group-hover:text-blue-600'}`} />
                                    <span className="font-bold text-sm">{link.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-50">
                    <button
                        onClick={logoutUser}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
