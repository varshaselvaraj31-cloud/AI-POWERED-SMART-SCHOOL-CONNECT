import apiClient from './api.js';

/**
 * Authentication Service for AI-Powered Smart School Connect.
 * Connects directly to backend REST endpoints.
 */
export const authService = {
  /**
   * Login user with credentials
   *@param {{ idNumber: string, password: string, rememberMe?: boolean }} credentials
   */
  async login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Register a new Student
   * @param {object} studentData
   */
  async registerStudent(studentData) {
    return apiClient.post('/auth/register/student', studentData);
  },

  /**
   * Register a new Teacher
   * @param {object} teacherData
   */
  async registerTeacher(teacherData) {
    return apiClient.post('/auth/register/teacher', teacherData);
  },

  /**
   * Register a new Parent
   * @param {object} parentData
   */
  async registerParent(parentData) {
    return apiClient.post('/auth/register/parent', parentData);
  },

  /**
   * Request password reset link
   * @param {{ email: string }} payload
   */
  async forgotPassword(payload) {
    return apiClient.post('/auth/forgot-password', payload);
  },

  /**
   * Logout user by clearing local session
   */
  logout() {
    localStorage.removeItem('school_token');
    localStorage.removeItem('school_user');
  },
};

export default authService;
