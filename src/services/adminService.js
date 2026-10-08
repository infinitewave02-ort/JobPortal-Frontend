import api from '../api/axios';

export const getAdminDashboard = () => api.get('/api/admin/dashboard');
export const getAdminUsers = () => api.get('/api/admin/users');
export const getAdminEmployers = () => api.get('/api/admin/employers');
export const getAdminJobs = () => api.get('/api/admin/jobs');
export const getAdminPayments = () => api.get('/api/admin/payments');
