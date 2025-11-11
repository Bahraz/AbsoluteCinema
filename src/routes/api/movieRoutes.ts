import express from 'express';
import { movieController } from '@controllers/movieController';

const router = express.Router();

// Endpoint do zarządzania filmami.
router.get('/show', (req, res) => movieController.showMovies(req, res));
router.get('/details/:title', (req, res) => movieController.showMovieDetails(req, res));
router.get('/search', (req, res) => {
    return (res.send('Not implemented'));
});

export default router;

