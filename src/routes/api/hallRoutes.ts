import express from 'express';
import { hallController } from '@controllers/hallController';

const router = express.Router();

// Endpoint do zarządzania salami.
router.get('/show', (req, res) => hallController.showHall(req, res));
export default router;

