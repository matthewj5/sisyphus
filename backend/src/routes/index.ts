import { Router } from 'express';
import { validateTaskController } from '../controllers/validationController.js';
import { notifyHellController, getStatusController } from '../controllers/notificationController.js';
import { validate, validateTaskSchema, notifyHellSchema } from '../middleware/validators.js';

const router = Router();

// Status endpoint
router.get('/status', getStatusController);

// Task validation endpoint
router.post('/validate-task', validate(validateTaskSchema), validateTaskController);

// Hell notification endpoint
router.post('/notify-hell', validate(notifyHellSchema), notifyHellController);

export default router;
