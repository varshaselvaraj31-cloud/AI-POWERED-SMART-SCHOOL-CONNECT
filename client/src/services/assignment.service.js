import apiClient from './api.js';

export const assignmentService = {
  // Fetch all assignments with optional grade filtering
  getAssignments: async (targetGrade) => {
    const params = targetGrade ? { targetGrade } : {};
    const res = await apiClient.get('/assignments', { params });
    return res.data || [];
  },

  // Broadcast / create new assignment (Admin or Teacher)
  createAssignment: async (payload) => {
    const res = await apiClient.post('/assignments', payload);
    return res.data;
  },

  // Delete assignment
  deleteAssignment: async (id) => {
    const res = await apiClient.delete(`/assignments/${id}`);
    return res;
  },

  // Get Admin Directory Stats
  getDirectoryStats: async () => {
    const res = await apiClient.get('/assignments/admin/directory-stats');
    return res.data;
  },
};

export default assignmentService;
