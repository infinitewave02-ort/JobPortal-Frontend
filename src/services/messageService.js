import api from '../api/axios';

export const getMessages = () => api.get('/api/messages');
export const sendMessage = (data) => api.post('/api/messages', data);
