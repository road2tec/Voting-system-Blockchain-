import React, { useState } from 'react';
import { superAdminService } from '../../services/api';
import { UserPlus } from 'lucide-react';

const CreateAdmin = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', area: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await superAdminService.createAdmin(formData);
            setMessage('Admin created successfully!');
            setFormData({ name: '', email: '', password: '', area: '' });
        } catch (error) {
            setMessage('Error creating admin');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Create New Admin</h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                {message && (
                    <div className={`p-4 mb-6 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Voting Area / Constituency</label>
                        <input
                            type="text"
                            placeholder="e.g. Pune North, Mumbai Central, etc."
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Access Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                    >
                        <UserPlus size={20} /> Create Admin Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAdmin;
