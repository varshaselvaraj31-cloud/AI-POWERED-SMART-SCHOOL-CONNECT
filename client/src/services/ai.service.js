import apiClient from './api.js';

/**
 * Service to interact with the backend AI Assistant endpoint.
 */
export const aiService = {
  /**
   * Send a chat prompt to the AI engine.
   * @param {string} message - User query
   * @param {Array<{sender: 'user'|'ai', text: string}>} history - Previous messages
   * @param {string} role - 'student' | 'teacher' | 'parent'
   * @returns {Promise<{reply: string, role: string, timestamp: string}>}
   */
  async sendMessage(message, history = [], role = 'student') {
    try {
      const response = await apiClient.post('/ai/chat', {
        message,
        history,
        role,
      });
      return response.data;
    } catch (error) {
      console.error('[AI Service Error]:', error);
      throw error;
    }
  },
};

export default aiService;
