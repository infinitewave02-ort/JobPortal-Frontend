import api from '../api/axios';

export const getNotifications = () => api.get('/api/notifications');
export const markAllAsRead = () => api.patch('/api/notifications/read-all');
