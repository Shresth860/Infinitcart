import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  signup: (email: string, password: string, name: string) =>
    api.post('/api/auth/signup', { email, password, name }),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id: string) => api.get(`/api/products/${id}`),
  create: (product: ProductInput) => api.post('/api/products', product),
  update: (id: string, product: ProductInput) => api.put(`/api/products/${id}`, product),
  delete: (id: string) => api.delete(`/api/products/${id}`),
};

// Cart API
export const cartAPI = {
  add: (customerId: string, productId: string, quantity: number) =>
    api.post('/api/cart/add', { customerId, productId, quantity }),
  get: (customerId: string) => api.get(`/api/cart/${customerId}`),
  remove: (itemId: string) => api.delete(`/api/cart/${itemId}`),
};

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface Product extends ProductInput {
  id: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface User {
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export default api;
