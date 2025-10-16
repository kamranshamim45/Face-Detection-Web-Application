import api from './api';

const faceService = {
  detectFaces: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/facedetect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/facedetect/history');
    return response.data;
  },

  deleteHistory: async (id) => {
    const response = await api.delete(`/facedetect/history/${id}`);
    return response.data;
  },
};

export default faceService;
