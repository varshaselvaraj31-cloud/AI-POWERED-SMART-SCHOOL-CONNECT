import { Router } from 'express';
import {
  createAssignment,
  getAssignments,
  deleteAssignment,
  getDirectoryStats,
} from '../controllers/assignment.controller.js';

const router = Router();

// Assignment endpoints
router.get('/', getAssignments);
router.post('/', createAssignment);
router.delete('/:id', deleteAssignment);

// Admin Central Directory Overview
router.get('/admin/directory-stats', getDirectoryStats);

export default router;
