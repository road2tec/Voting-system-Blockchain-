import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Wallet, Vote, LogOut, User, LayoutDashboard, ChevronDown, BarChart3, Info, HelpCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const { currentUser, walletAddress, connectWallet, logoutUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setShowProfileMenu(false);
    }, [location]);

    // Handle hash scrolling
    const scrollToSection = (sectionId) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (!currentUser) return '/login';
        switch (currentUser.role) {
            case 'superadmin': return '/superadmin/dashboard';
            case 'admin': return '/admin/dashboard';
            case 'voter': return '/voter/dashboard';
            default: return '/login';
        }
    };

    const navLinks = [
        { name: 'Home', path: '/', type: 'link' },
        { name: 'Features', path: 'features', type: 'scroll', icon: Star },
        { name: 'How It Works', path: 'how-it-works', type: 'scroll', icon: HelpCircle },
        { name: 'About', path: 'about', type: 'scroll', icon: Info },
        { name: 'Results', path: '/results', type: 'link', icon: BarChart3 },
    ];

    if (currentUser) {
        navLinks.push({
            name: currentUser.role === 'voter' ? 'Vote' : 'Dashboard',
            path: getDashboardLink(),
            type: 'link',
            icon: LayoutDashboard
        });
    }

    const isActive = (path) => {
        if (path.startsWith('/')) {
            return location.pathname === path;
        }
        return false;
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen
                ? 'bg-white/90 backdrop-blur-xl border-b border-green-100/50 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Vote size={26} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                                BlockVote
                            </span>
                            <span className="text-[10px] font-semibold text-green-600 tracking-wider uppercase">
                                Secure Election
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            link.type === 'scroll' ? (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.path)}
                                    className="relative px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                                >
                                    {link.name}
                                </button>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${isActive(link.path)
                                        ? 'text-green-700 bg-green-50'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.icon && <link.icon size={16} />}
                                    {link.name}
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full mx-4 mb-1"
                                        />
                                    )}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Wallet Connect */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={connectWallet}
                            className={`hidden xl:flex px-4 py-2 rounded-full text-sm font-semibold transition-all border items-center gap-2 ${walletAddress
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:text-green-600'
                                }`}
                        >
                            <Wallet size={16} className={walletAddress ? 'text-green-600' : 'text-gray-400'} />
                            <span>
                                {walletAddress
                                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                    : 'Connect Wallet'}
                            </span>
                        </motion.button>

                        {/* Auth Buttons / Profile */}
                        {currentUser ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-green-300 hover:shadow-md transition-all bg-white"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-xs font-bold text-gray-800 leading-none">{currentUser.name}</p>
                                        <p className="text-[10px] font-medium text-green-600 uppercase leading-tight mt-0.5">{currentUser.role}</p>
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                                <p className="text-sm font-bold text-gray-800">{currentUser.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                            </div>

                                            <Link
                                                to={getDashboardLink()}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors mx-2 rounded-xl"
                                            >
                                                <LayoutDashboard size={16} />
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={connectWallet}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors mx-2 rounded-xl text-left"
                                            >
                                                <Wallet size={16} />
                                                {walletAddress ? 'Switch Wallet' : 'Connect Wallet'}
                                            </button>

                                            <div className="h-px bg-gray-100 my-2" />

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mx-2 rounded-xl text-left"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 rounded-full text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-green-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-4">
                            {/* User Info Mobile */}
                            {currentUser && (
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                        {currentUser.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{currentUser.name}</p>
                                        <p className="text-xs text-green-600 font-semibold uppercase">{currentUser.role}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                {navLinks.map((link) => (
                                    link.type === 'scroll' ? (
                                        <button
                                            key={link.name}
                                            onClick={() => scrollToSection(link.path)}
                                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all text-left"
                                        >
                                            {link.icon && <link.icon size={20} />}
                                            {link.name}
                                        </button>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${isActive(link.path)
                                                ? 'bg-green-50 text-green-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                                }`}
                                        >
                                            {link.icon && <link.icon size={20} />}
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-3">
                                <button
                                    onClick={connectWallet}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all"
                                >
                                    <Wallet size={20} />
                                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                                </button>

                                {currentUser ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/login"
                                            className="flex items-center justify-center px-4 py-3.5 rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-green-200 hover:bg-green-50 transition-all"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="flex items-center justify-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
