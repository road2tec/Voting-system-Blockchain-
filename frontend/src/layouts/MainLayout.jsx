import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
            <Navbar />
            <div className="pt-16">
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {children}
                </motion.main>
            </div>

            {/* Background Blobs */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px] animate-gradient-xy opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] animate-gradient-xy opacity-50 animation-delay-2000"></div>
            </div>
        </div>
    );
};

export default MainLayout;
