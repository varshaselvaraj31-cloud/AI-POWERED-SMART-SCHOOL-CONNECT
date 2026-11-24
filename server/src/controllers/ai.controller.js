import { aiService } from '../ai/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Controller to handle conversational AI interactions.
 * Accepts user prompt, previous history, and contextual role.
 */
export const chatWithAI = asyncHandler(async (req, res, next) => {
  const { message, history, role: requestedRole } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return next(new ApiError(400, 'A valid prompt message is required.'));
  }

  // Derive role and user identity from token if available, or request body
  const role = req.user?.role || requestedRole || 'student';
  const userName = req.user?.name || req.user?.email?.split('@')[0] || (role === 'teacher' ? 'Faculty Member' : 'Student');

  const reply = await aiService.chat(message.trim(), history || [], {
    role,
    userName,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        reply,
        role,
        timestamp: new Date().toISOString(),
      },
      'AI response generated successfully'
    )
  );
});

export default { chatWithAI };
