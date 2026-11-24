import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import aiRoutes from './ai.routes.js';
import assignmentRoutes from './assignment.routes.js';

const router = Router();

// ── Health Check ─────────────────────────────────────────────────────────────
router.use('/health', healthRoutes);

// ── Authentication ───────────────────────────────────────────────────────────
router.use('/auth', authRoutes);

// ── AI Engine & Chatbot ───────────────────────────────────────────────────────
router.use('/ai', aiRoutes);

// ── Assignments & Broadcast Notifications ─────────────────────────────────────
router.use('/assignments', assignmentRoutes);

export default router;

