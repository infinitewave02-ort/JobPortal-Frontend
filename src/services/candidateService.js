import api from '../api/axios';

export const getCandidates = () => api.get('/api/candidates');
export const getOpenToWorkCandidates = () => api.get('/api/candidates/open-to-work');
