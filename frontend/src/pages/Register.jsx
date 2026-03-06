import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ArrowRight, AlertCircle, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        address: '',
        age: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (parseInt(formData.age) < 18) {
            setError('You must be at least 18 years old to vote.');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...userData } = formData;
            const result = await registerUser(userData);

            if (result.success) {
                // Since account is not verified, it might still require login check
                // but the backend sends a token. However, our login logic checks isVerified.
                navigate('/login', { state: { message: 'Registration successful! Your account is pending administrative approval.' } });
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen py-12 bg-gradient-to-b from-white to-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100"
                >
                    <div className="text-center mb-6 md:mb-10">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-white shadow-xl"
                        >
                            <UserPlus size={32} className="md:size-10" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Student Enrollment</h2>
                        <p className="text-sm md:text-base text-gray-500 mt-2 font-medium">Register for secure college elections</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">College Department / Year</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="department"
                                        placeholder="Computer Science"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Age</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="18"
                                        min="18"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Contact Address (Hostel/Res.)</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                                <textarea
                                    name="address"
                                    placeholder="Room No, Hostel Name / Local Address"
                                    rows="2"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800 resize-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Security Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:shadow-lg outline-none transition-all font-medium text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Confirm Security Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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
                                    Processing Onboarding...
                                </>
                            ) : (
                                <>
                                    Request Enrollment <ArrowRight size={22} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 font-medium">
                        Part of an existing board?{' '}
                        <Link to="/login" className="text-blue-600 font-black hover:text-indigo-700 transition-colors">
                            Sign In Here
                        </Link>
                    </p>

                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-start">
                        <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                        <p className="text-xs text-blue-800 font-bold leading-relaxed">
                            <span className="block mb-1 text-[10px] uppercase tracking-tighter">Security Protocol:</span>
                            All student registrations are subject to mandatory departmental verification. You will be able to cast votes only after your student ID and department are confirmed by a designated election officer.
                        </p>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default Register;
