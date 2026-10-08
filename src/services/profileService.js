import api from '../api/axios';

// ── New User Profile endpoints (JWT-protected) ──
export const getUserProfile = () => api.get('/api/users/profile');
export const updateUserProfile = (data) => api.put('/api/users/profile', data);
export const uploadProfileImage = (formData) => api.put('/api/users/profile/image', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// ── Legacy Employee Profile endpoints ──
export const getProfile = () => api.get('/api/profile');
export const updateProfile = (data) => api.put('/api/profile', data);
export const updateBasicProfile = (data) => api.put('/api/profile/basic', data);
export const updateProfessionalProfile = (data) => api.put('/api/profile/professional', data);
export const setOpenToWork = (status) => api.patch('/api/profile/open-to-work', { isOpenToWork: status });
export const uploadAvatar = (formData) => api.post('/api/profile/avatar', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
