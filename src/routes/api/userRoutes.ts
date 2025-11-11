import express from 'express';
import { userController } from '@controllers/userController';

const router = express.Router();


// Endpoint do zarządzania użytkownikami.

router.get('/show', (req, res) => userController.showUsers(req, res));
router.post('/register', (req, res) => userController.register(req, res));

router.post('/', (req, res) => res.json({ message: 'POST user - placeholder' }));
router.put('/:id', (req, res) => res.json({ message: `PUT user ${req.params.id} - placeholder` }));
router.delete('/:id', (req, res) => res.json({ message: `DELETE user ${req.params.id} - placeholder` }));

export default router;
