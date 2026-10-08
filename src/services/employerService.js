import api from '../api/axios';

export const getCompanyProfile = () => api.get('/api/employers/profile');
export const updateCompanyProfile = (data) => api.put('/api/employers/profile', data);
export const uploadCompanyLogo = (formData) => api.post('/api/employers/logo', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
