import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, Globe, Users, Key, Vote, CheckCircle,
    UserCheck, Lock, BarChart3, Zap, Award, ArrowRight, UserPlus,
    Mail, Phone, MapPin, Github, Twitter, Linkedin, ChevronDown,
    Star, TrendingUp, Clock, Shield
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "How does department-wise administration work?",
            a: "Our system assigns specific administrators to oversee individual departments (e.g., Computer Science, Mechanical). These admins are responsible for verifying student eligibility and managing candidates within their department."
        },
        {
            q: "Is account creation open to the public?",
            a: "No. To maintain strict security and eligibility, student accounts are onboarded and verified by designated department administrators. This prevents unauthorized registrations and ensures only valid stakeholders can participate."
        },
        {
            q: "What makes this system tamper-proof?",
            a: "Every vote is anchored to an Ethereum-based blockchain ledger. Once a vote is cast, it is hashed and permanently recorded, making it cryptographically impossible to alter or delete without breaking the entire chain's integrity."
        },
        {
            q: "How can I verify the election results?",
            a: "Any authorized stakeholder can view the live, candidate-wise results directly aggregated from the blockchain nodes. This provides real-time auditability and eliminates manual counting errors."
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [90, 0, 90],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="text-center max-w-5xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs md:text-sm font-semibold shadow-lg"
                    >
                        🚀 Powered by Ethereum Blockchain Technology
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight px-2"
                    >
                        College <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 animate-gradient-x">Student Council</span><br className="hidden md:block" /> via Blockchain
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        A tamper-proof, decentralized ledger for department-specific elections. Ensuring every student's vote is immutable and every result is transparent.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center gap-4 flex-wrap mb-12"
                    >
                        <Link to="/login" className="w-full sm:w-auto group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex justify-center items-center gap-2">
                            Enter Voting Portal
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-700 border-2 border-blue-600 font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all flex justify-center items-center gap-2">
                            <UserPlus size={20} />
                            Secure Enrollment
                        </Link>
                        <Link to="/results" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg border border-gray-200 shadow-sm hover:bg-gray-200 hover:scale-105 transition-all flex justify-center items-center gap-2">
                            <BarChart3 size={20} />
                            Live Results
                        </Link>
                    </motion.div>

                    {/* Animated Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                    >
                        {[
                            { icon: Shield, number: '100%', label: 'Secure', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                            { icon: TrendingUp, number: '0', label: 'Tampering', bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' },
                            { icon: Clock, number: '24/7', label: 'Available', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
                            { icon: Star, number: '5.0', label: 'Rating', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor} mb-3 mx-auto`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</div>
                                <div className="text-gray-500 font-medium mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for secure, transparent, and efficient elections</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Blockchain Immutability", desc: "Every vote is anchored to the Ethereum ledger. Once cast, it can never be altered, deleted, or disputed.", gradient: "from-blue-600 to-indigo-700" },
                            { icon: Lock, title: "Cryptographic Privacy", desc: "State-of-the-art encryption ensures that while the vote count is public, your specific identity choice remains private.", gradient: "from-blue-600 to-cyan-700" },
                            { icon: Users, title: "Departmental Administration", desc: "Unique governance model where administrators manage specific college departments for targeted oversight.", gradient: "from-indigo-600 to-purple-700" },
                            { icon: BarChart3, title: "Live Node Verification", desc: "Results are aggregated in real-time directly from blockchain nodes, eliminating manual counting errors.", gradient: "from-blue-600 to-teal-700" },
                            { icon: Shield, title: "Master Super-Admin Control", desc: "Centralized election lifecycle management ensures that only authorized officers can start or end voting sessions.", gradient: "from-indigo-700 to-blue-800" },
                            { icon: UserCheck, title: "Verified Students Only", desc: "Rigorous onboarding ensures that every participant is a verified student within their respective department.", gradient: "from-blue-700 to-indigo-900" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple, secure, and transparent voting in 4 easy steps</p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 z-0"></div>

                        {[
                            { step: '01', icon: UserCheck, title: 'Departmental Enrollment', desc: 'Department administrators verify and onboard students within their specific academic branch.', color: 'from-blue-600 to-indigo-700' },
                            { step: '02', icon: Vote, title: 'Secure Voting', desc: 'Eligible voters cast their ballots through a cryptographically secured interface.', color: 'from-blue-700 to-cyan-700' },
                            { step: '03', icon: Lock, title: 'Blockchain Anchor', desc: 'Each vote is permanently hashed and recorded as an immutable transaction.', color: 'from-indigo-600 to-purple-700' },
                            { step: '04', icon: BarChart3, title: 'Global Transparency', desc: 'Real-time results are verified against a decentralized ledger for auditability.', color: 'from-blue-700 to-indigo-900' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative z-10"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto shadow-lg`}
                                    >
                                        {item.step}
                                    </motion.div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                                    <p className="text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Provide Section */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Provide</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive solutions for modern democratic processes</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { icon: Zap, title: 'Lightning Fast', desc: 'Vote in seconds with our optimized blockchain infrastructure. No waiting, no delays.', gradient: 'from-yellow-500 to-orange-600' },
                            { icon: Award, title: 'Certified Secure', desc: 'Built with industry-standard security protocols and audited smart contracts.', gradient: 'from-blue-500 to-indigo-600' },
                            { icon: Users, title: 'Multi-Role Support', desc: 'Separate dashboards for Super Admins, Admins, and Voters with role-specific features.', gradient: 'from-blue-500 to-teal-600' },
                            { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Comprehensive analytics and reporting tools for election administrators.', gradient: 'from-purple-500 to-pink-600' }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                                className="flex gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                                    <service.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">Everything you need to know about our platform</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-gray-900 text-left">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="text-blue-600" size={24} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Securing the Future of Governance</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Our College Blockchain Voting System is engineered for campus trust. By combining Ethereum's immutable ledger with a granular three-tier governance model, we ensure that student council elections are beyond reproach.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Super-Admins hold the master key to the election lifecycle, while Departmental Admins provide local oversight for specific branches and years. This decentralized yet organized approach ensures that student verification is rigorous, candidate management is transparent, and results are instantly verifiable by the entire student body.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {[
                                { label: '🛡️ Immutable', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
                                { label: '⚖️ Auditable', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' },
                                { label: '🏘️ Dept-Based', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
                                { label: '✅ Decentralized', bgColor: 'bg-purple-100', textColor: 'text-purple-700' }
                            ].map((badge, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className={`px-6 py-3 ${badge.bgColor} ${badge.textColor} rounded-full font-semibold shadow-lg`}
                                >
                                    {badge.label}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 relative overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Join thousands of organizations using blockchain technology for secure, transparent elections.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link to="/login" className="group px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                                Access Portal
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <Link to="/results" className="px-8 py-4 rounded-xl bg-blue-700 text-white font-bold text-lg border-2 border-blue-500 hover:bg-blue-800 hover:scale-105 transition-all">
                                View Live Results
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <h3 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                BlockVote
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Secure, transparent, and decentralized voting powered by blockchain technology.
                            </p>
                            <div className="flex gap-3">
                                {[Twitter, Github, Linkedin].map((Icon, idx) => (
                                    <motion.a
                                        key={idx}
                                        href="#"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['Features', 'How It Works', 'Services', 'About Us'].map((link, idx) => (
                                    <li key={idx}>
                                        <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <ArrowRight size={16} className="opacity-0 hover:opacity-100 transition-opacity" />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                {[
                                    { label: 'Login Portal', to: '/login' },
                                    { label: 'Results', to: '/results' },
                                    { label: 'Documentation', to: '#' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link to={item.to} className="hover:text-blue-400 transition-colors">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Mail size={18} className="text-blue-400" />
                                    <span>support@blockvote.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={18} className="text-blue-400" />
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin size={18} className="text-blue-400 mt-1" />
                                    <span>123 Blockchain Ave<br />Crypto City, BC 12345</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2026 BlockVote. All rights reserved. Built with ❤️ using Blockchain Technology.
                        </p>
                        <div className="flex gap-6 text-sm">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
                                <a key={idx} href="#" className="hover:text-blue-400 transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </MainLayout>
    );
};

export default Home;
