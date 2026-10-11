import api from '../api/axios';

export const getMessagesBetweenUsers = (otherUserId, params = {}) =>
  api.get(`/api/messages/${otherUserId}`, { params });

export const sendMessage = (data) =>
  api.post('/api/messages', data);

export const getConversations = (params = {}) =>
  api.get('/api/messages/conversations', { params });

export const deleteMessage = (messageId) =>
  api.delete(`/api/messages/${messageId}`);

// Alias for convenience
export const getMessages = (otherUserId, params = {}) =>
  getMessagesBetweenUsers(otherUserId, params);

