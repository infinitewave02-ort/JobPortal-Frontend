import api from '../api/axios';

export const getCandidates = (params = {}) => api.get('/api/candidates', { params });
export const getOpenToWorkCandidates = () => api.get('/api/candidates/open-to-work');
