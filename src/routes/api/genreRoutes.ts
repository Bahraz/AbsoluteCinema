import express from 'express';
import { genreController } from '@controllers/genreController';

const router = express.Router();

// Endpoint do zarządzania gatunkami.
router.get('/show', (req, res) => genreController.showGenres(req, res));

export default router;


