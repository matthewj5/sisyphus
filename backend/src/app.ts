import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json({ limit: '50mb' })); // For parsing JSON bodies with base64 images

// API routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Serve static files from frontend/dist (after error handler so API errors work)
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// Handle client-side routing - serve index.html for all remaining routes
app.use((_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

export default app;
