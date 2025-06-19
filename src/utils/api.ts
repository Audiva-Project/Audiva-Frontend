import axios from 'axios';

// Tạo instance axios cơ bản
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Có thể thêm interceptor nếu cần
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung ở đây nếu muốn
    return Promise.reject(error);
  }
);

export default api;