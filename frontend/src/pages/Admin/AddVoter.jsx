import React, { useState } from 'react';
import { adminService } from '../../services/api';
import { UserPlus, Save, AlertCircle } from 'lucide-react';

const AddVoter = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', department: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await adminService.addVoter(formData);
            setMessage('Student added and verified successfully!');
            setFormData({ name: '', email: '', password: '', department: '' });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Error adding voter');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Add New Student</h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                {message && (
                    <div className="p-4 mb-6 rounded-lg bg-blue-50 text-blue-600 flex items-center gap-2">
                        <UserPlus size={20} /> {message}
                    </div>
                )}
                {error && (
                    <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-600 flex items-center gap-2">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">College Department / Branch</label>
                            <input
                                type="text"
                                placeholder="e.g. Computer Science"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 italic bg-blue-50 p-3 rounded-lg border border-blue-100">
                        * Students added by Admin are automatically verified and can start voting immediately.
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Adding...' : <><UserPlus size={20} /> Create Student Account</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVoter;
