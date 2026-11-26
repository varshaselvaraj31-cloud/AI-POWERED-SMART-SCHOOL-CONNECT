import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import apiRouter from './routes/index.js';
import healthRoutes from './routes/health.routes.js';
import { notFoundHandler, errorHandler } from './middlewares/index.js';

const app = express();

// ==========================================
// 1. Cross-Origin Resource Sharing (CORS)
// ==========================================
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman), local dev, or deployed frontends
    if (
      !origin ||
      origin === env.CLIENT_URL ||
      env.isDevelopment ||
      origin.includes('github.io') ||
      origin.includes('vercel.app') ||
      origin.includes('onrender.com')
    ) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive for production deployment
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// ==========================================
// 2. Request Parsing Middlewares
// ==========================================
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ==========================================
// 3. Request Logging (Development)
// ==========================================
if (env.isDevelopment) {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// ==========================================
// 4. Base & Health Check Endpoints
// ==========================================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to AI-Powered Smart School Connect API Server',
    version: '1.0.0',
    documentation: `${env.API_PREFIX}/health`,
    endpoints: {
      health: '/health',
      apiV1Health: `${env.API_PREFIX}/health`,
    },
  });
});

// Direct top-level health check endpoint
app.use('/health', healthRoutes);

// Mount versioned API routes (/api/v1)
app.use(env.API_PREFIX, apiRouter);

// ==========================================
// 5. Error Handling Middlewares
// ==========================================
// 404 Route Not Found
app.use(notFoundHandler);

// Centralized Global Error Handler
app.use(errorHandler);

export default app;
