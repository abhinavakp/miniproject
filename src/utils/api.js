import axios from 'axios';

const API_URL = import.meta.env.MODE === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const subjectAPI = {
    getAll: (params) => api.get('/subjects', { params }),
    add: (data) => api.post('/subjects', data),
};

export const pyqAPI = {
    getAll: () => api.get('/pyqs'),
    getBySubject: (subjectId) => api.get(`/pyqs/${subjectId}`),
    upload: (formData) => api.post('/pyqs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/pyqs/${id}`),
};

export const aiAPI = {
    chat: (data) => api.post('/ai/chat', data),
    analyzePDF: (formData) => api.post('/ai/analyze-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    summarize: (data) => api.post('/ai/summarize', data),
};

export const syllabusAPI = {
    getBySubject: (subjectId) => api.get(`/syllabus/${subjectId}`),
};

export default api;
