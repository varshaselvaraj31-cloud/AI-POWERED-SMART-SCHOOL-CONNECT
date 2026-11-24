import { Router } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { User } from '../models/index.js';
import { chatWithAI } from '../controllers/ai.controller.js';

const router = Router();

/**
 * Optional authentication middleware.
 * Attaches req.user if a valid token is provided, but does not block unauthenticated requests.
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.school_token) {
      token = req.cookies.school_token;
    }

    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (err) {
    // Graceful fallback for expired/invalid tokens in optional mode
  }
  next();
};

// POST /api/v1/ai/chat
router.post('/chat', optionalAuth, chatWithAI);

export default router;
