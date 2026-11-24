import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables reliably from server/.env regardless of execution CWD
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback for current working directory

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_school_connect',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',

  // JWT Configuration – loaded from .env, never hardcoded
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_dev_secret_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_COOKIE_EXPIRES_IN: Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7,

  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default env;
