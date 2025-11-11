import express from 'express';
import { actorController } from '@controllers/actorController';

const router = express.Router();

// Endpoint do zarządzania aktorami.
router.get('/show', (req, res) => actorController.showActors(req, res));

export default router;

