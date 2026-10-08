import api from '../api/axios';

export const createApplication = (data) => api.post('/api/applications', data);
export const getMyApplications = () => api.get('/api/applications/my');
export const updateApplicationStatus = (id, data) => api.patch(`/api/applications/${id}/status`, data);
