import { Env } from '@env';
import axios from 'axios';

import { getToken } from '@/core/auth/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {},
});

// Add authorization header to all requests
client.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    console.log('[API CLIENT] Request Error: ', error);
    return Promise.reject(error);
  }
);

// Response interceptor to log API responses
client.interceptors.response.use(
  (response) => {
    console.log('[API CLIENT] Response: ', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('[API CLIENT] Response Body: ', error.response.data);
      console.log('[API CLIENT] Response Status: ', error.response.status);
      console.log('[API CLIENT] Response Headers: ', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('[API CLIENT] Request: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('[API CLIENT] Error: ', error.message);
    }

    // console.log(error.config);

    return Promise.reject(error);
  }
);
