import express from 'express';
import userRoutes from '@routes/api/userRoutes';
import movieRoutes from '@routes/api/movieRoutes';
import actorRoutes from '@routes/api/actorRoutes';
import hallRoutes from '@routes/api/hallRoutes';
import genreRoutes from '@routes/api/genreRoutes';

const router = express.Router();

// Montujemy podścieżki dla api:
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/actors', actorRoutes);
router.use('/halls', hallRoutes);
router.use('/genres', genreRoutes);

export default router;
