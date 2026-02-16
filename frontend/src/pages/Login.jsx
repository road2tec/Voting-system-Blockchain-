import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, User, Lock, ArrowRight, AlertCircle, Vote, CheckCircle2 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useAuth();

    // Success message from registration
    const successMsg = location.state?.message;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await loginUser(email, password);

            if (result.success) {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData.role === 'superadmin') {
                    navigate('/superadmin/dashboard');
                } else if (userData.role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (userData.role === 'voter') {
                    navigate('/voter/dashboard');
                }
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-b from-white to-gray-50 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100"
                >
                    <div className="text-center mb-8 md:mb-10">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-white shadow-xl"
                        >
                            <Vote size={32} className="md:size-10" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Voter Login</h2>
                        <p className="text-sm md:text-base text-gray-500 mt-2 font-medium">Access your secure voting dashboard</p>
                    </div>

                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-4 rounded-r-xl flex items-center gap-3"
                        >
                            <CheckCircle2 size={24} className="flex-shrink-0" />
                            <span className="font-bold text-sm">{successMsg}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-r-xl flex items-center gap-3"
                            >
                                <AlertCircle size={24} className="flex-shrink-0" />
                                <span className="font-bold text-sm">{error}</span>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Institutional Email</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="voter@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Security Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all flex justify-center items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Secure Sign In <ArrowRight size={22} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 font-medium">
                        New to the platform?{' '}
                        <Link to="/register" className="text-blue-600 font-black hover:text-indigo-700 transition-colors">
                            Enroll Now
                        </Link>
                    </p>

                    <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4 items-start">
                        <Lock className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                        <p className="text-xs text-indigo-800 font-bold leading-relaxed">
                            <span className="block mb-1 text-[10px] uppercase tracking-tighter">System Notice:</span>
                            This portal is strictly for authorized personnel and verified voters. Unauthorized access attempts are logged and reported.
                        </p>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default Login;
