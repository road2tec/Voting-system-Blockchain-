import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, ChevronDown, LogOut, User, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
    const { currentUser, logoutUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Dashboard';
        if (path.includes('create-admin')) return 'Manage Admins';
        if (path.includes('election')) return 'Election Control';
        if (path.includes('analytics')) return 'System Analytics';
        if (path.includes('logs')) return 'System Logs';
        if (path.includes('add-candidate')) return 'Candidate Management';
        if (path.includes('verify-voters')) return 'Voter Management';
        if (path.includes('live-monitor')) return 'Live Monitor';
        if (path.includes('vote')) return 'Active Election';
        if (path.includes('profile')) return 'My Profile';
        if (path.includes('results')) return 'Election Results';
        return 'Overview';
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50/50 relative">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 lg:ml-64`}>
                {/* Top Navbar */}
                <header className="h-20 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-800">{getPageTitle()}</h2>
                            <p className="text-[10px] md:text-xs text-gray-400 font-medium whitespace-nowrap">Welcome back, {currentUser?.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar - Hidden on small screens */}
                        <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search data..."
                                className="bg-transparent border-none outline-none text-sm w-48 text-gray-700"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-100"></div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-sm">
                                    {currentUser?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left hidden xl:block">
                                    <p className="text-sm font-bold text-gray-800 leading-none">{currentUser?.name}</p>
                                    <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mt-1">{currentUser?.role}</p>
                                </div>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50"
                                    >
                                        <div className="px-5 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-sm font-bold text-gray-800">{currentUser?.name}</p>
                                            <p className="text-xs text-gray-400 truncate mt-0.5">{currentUser?.email}</p>
                                        </div>

                                        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                            <User size={18} />
                                            <span>My Profile</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                            <Settings size={18} />
                                            <span>Calculations</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                            <HelpCircle size={18} />
                                            <span>Help Center</span>
                                        </button>

                                        <div className="h-px bg-gray-50 my-2"></div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={18} />
                                            <span className="font-bold">Logout Session</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
