import api from './api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email, otp, password) => {
    const response = await api.post('/auth/reset-password', { email, otp, password });
    return response.data;
  },
};

export default authService;
