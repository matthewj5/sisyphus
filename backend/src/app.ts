import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json({ limit: '50mb' })); // For parsing JSON bodies with base64 images

// API routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
