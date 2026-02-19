/**
 * API service for authentication endpoints
 */

import axios from 'axios';

// Base URL configuration from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Signup API - creates new user account
 * @param {string} name - User's name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} API response
 */
export const signup = async (name, email, password) => {
  const response = await apiClient.post('/auth/signup', { name, email, password });
  return response.data;
};

/**
 * Login API - authenticates user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} API response
 */
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Get Profile API - fetches user profile
 * @returns {Promise} API response
 */
export const getProfile = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};

/**
 * Forgot Password API - sends reset link to email
 * @param {string} email - User's email address
 * @returns {Promise} API response
 */
export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Reset Password API - verifies token and updates password
 * @param {string} token - Reset token from URL
 * @param {string} newPassword - New password to set
 * @returns {Promise} API response
 */
export const resetPassword = async (token, newPassword) => {
  const response = await apiClient.post('/auth/reset-password', { 
    token, 
    newPassword 
  });
  return response.data;
};

/**
 * Verify Reset Token API - checks if token is valid
 * @param {string} token - Reset token to verify
 * @returns {Promise} API response
 */
export const verifyResetToken = async (token) => {
  const response = await apiClient.get(`/auth/verify-token/${token}`);
  return response.data;
};
