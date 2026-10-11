import api from '../api/axios';

export const getAdminDashboard = () => api.get('/api/admin/dashboard');
export const getAdminEmployees = () => api.get('/api/admin/employees');
export const getAdminEmployers = () => api.get('/api/admin/employers');
export const getAdminJobs = () => api.get('/api/admin/jobs');
export const getAdminPayments = () => api.get('/api/admin/payments');
export const getAdminUsers = () => api.get('/api/admin/users');

export const approveEmployer = (id) => api.patch(`/api/admin/employers/${id}/approve`);
export const updateEmployerStatus = (id, status) => api.patch(`/api/admin/employers/${id}/status`, { status });
export const deleteEmployer = (id) => api.delete(`/api/admin/employers/${id}`);
export const deleteEmployee = (id) => api.delete(`/api/admin/employees/${id}`);

export const approveJob = (id) => api.patch(`/api/admin/jobs/${id}/approve`);
export const updateJobStatus = (id, status) => api.patch(`/api/admin/jobs/${id}/status`, { status });
export const getAdminJobDetails = (id) => api.get(`/api/admin/jobs/${id}`);
export const deleteJob = (id) => api.delete(`/api/admin/jobs/${id}`);

export const adminLogin = (credentials) => api.post('/api/admin/login', credentials);
export const getAdminProfile = () => api.get('/api/admin/profile');
export const updateAdminProfile = (data) => api.put('/api/admin/profile', data);
export const updatePaymentStatus = (id, status) => api.patch(`/api/admin/payments/${id}/status`, { status });


