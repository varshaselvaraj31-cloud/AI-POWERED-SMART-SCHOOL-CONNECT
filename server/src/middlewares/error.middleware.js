import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Centralized global error handling middleware.
 * Formats errors into a unified JSON structure for consistent client responses.
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    error = new ApiError(
      409,
      `An account with this ${field === 'email' ? 'email address' : field} ("${value}") already exists. Please use a different ${field} or sign in.`
    );
  }

  // If error is not an instance of custom ApiError, standardize it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(env.isDevelopment && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};

export default errorHandler;
