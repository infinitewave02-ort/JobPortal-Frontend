import api from '../api/axios';

export const uploadResume = (formData) => api.post('/api/resumes/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const getResumes = () => api.get('/api/resumes');
export const getResume = (id) => api.get(`/api/resumes/${id}`);
export const deleteResume = (id) => api.delete(`/api/resumes/${id}`);
