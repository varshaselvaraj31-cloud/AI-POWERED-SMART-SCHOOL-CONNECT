import { BaseAIAdapter, GeminiAdapter } from './adapters/index.js';
import { SCHOOL_PROMPTS } from './prompts/index.js';

/**
 * Main AI Engine Facade for Smart School Connect.
 */
class AIService {
  constructor(adapter = new GeminiAdapter()) {
    this.adapter = adapter;
  }

  setAdapter(adapter) {
    this.adapter = adapter;
  }

  async chat(message, history = [], options = {}) {
    const role = options.role || 'student';
    const userName = options.userName || 'User';

    // Format prompt incorporating user context if provided
    let contextPrompt = `User Name: ${userName}\nRole: ${role}\nMessage: ${message}`;
    if (history && history.length > 0) {
      const recentHistory = history.slice(-4).map((h) => `${h.sender}: ${h.text}`).join('\n');
      contextPrompt = `Previous Conversation:\n${recentHistory}\n\n${contextPrompt}`;
    }

    const response = await this.adapter.generateText(contextPrompt, { role, ...options });
    return response;
  }

  async analyzeStudentPerformance(studentName, gradesData, attendanceRate) {
    const prompt = SCHOOL_PROMPTS.STUDENT_PERFORMANCE_ANALYSIS(studentName, gradesData, attendanceRate);
    return this.adapter.generateText(prompt);
  }

  async generateAttendanceAlert(studentName, absences, subject) {
    const prompt = SCHOOL_PROMPTS.ATTENDANCE_ANOMALY_ALERT(studentName, absences, subject);
    return this.adapter.generateText(prompt);
  }
}

export const aiService = new AIService();
export { BaseAIAdapter, GeminiAdapter, SCHOOL_PROMPTS };
export default aiService;
