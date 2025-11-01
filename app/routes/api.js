//web piszemy w danym jezyku w ktorym robimy strone a api zawsze w angielskim bo jest niewidoczne dla izytkownika

import express from 'express';
import { UserController } from '../controllers/userController.js';
import { requireAuthApi } from '../middleware/apiAuth.js';

export const router = new express.Router();
const userController = new UserController();

router.get('/test', (req, res) => userController.showUsers(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/logout', (req, res) => userController.logout(req, res));
router.post('/profile/edit', requireAuthApi, (req, res) =>
	userController.edit(req, res)
);
router.delete('/profile/delete/:name', requireAuthApi, (req, res) =>
	userController.delete(req, res)
);
// router.get('/profile/edit/:email', (req, res) => userController.edit(req, res));  --/jesli parametr + w userController
//wszystko co jest tu pageController to zawsze controller albo w node czasem nazywane actions/akcja

//-- POSTMAN BODY>RAW>JSON
// {
//      "name": "test",         <- w cudzysłowach key zawsze => "name"
//      "password": "test123"   <- na koncu bez przecinka
// }
