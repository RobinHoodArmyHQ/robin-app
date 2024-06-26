import { Env } from '@env';
import axios from 'axios';

import { getToken } from '@/core/auth/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {},
});

// Add authorization header to all requests
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
