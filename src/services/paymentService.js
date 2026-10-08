import api from '../api/axios';

export const getPlans = () => api.get('/api/plans');
export const createPayment = (data) => api.post('/api/payments/create', data);
export const verifyPayment = (data) => api.post('/api/payments/verify', data);
