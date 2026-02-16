import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const superAdminService = {
    createAdmin: (data) => api.post('/superadmin/create-admin', data),
    getAnalytics: () => api.get('/superadmin/analytics'),
    getLogs: () => api.get('/superadmin/logs'),
    getAdmins: () => api.get('/superadmin/admins'),
    getVoters: () => api.get('/superadmin/voters'),
};

export const adminService = {
    addCandidate: (data) => api.post('/admin/add-candidate', data),
    verifyVoter: (id) => api.post(`/admin/verify-voter/${id}`),
    addVoter: (data) => api.post('/admin/add-voter', data),
    getUnverifiedVoters: () => api.get('/admin/unverified-voters'),
    getStats: () => api.get('/admin/stats'),
    getVoters: () => api.get('/admin/voters'),
};

export const voterService = {
    getCandidates: () => api.get('/voter/candidates'),
    castVote: (data) => api.post('/voter/vote', data),
};

export default api;
