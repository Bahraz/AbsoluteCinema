// //--web piszemy w danym jezyku w ktorym robimy strone a api zawsze w angielskim bo jest niewidoczne dla izytkownika

import express from 'express';
import { PageController } from '../controllers/pageController.js';

export const router = new express.Router();
const pageController = new PageController();

router.get('/', (req, res) => pageController.home(req, res));
router.get('/profile', (req, res) => pageController.home(req, res));
// router.get('/logout', (req, res) => userController.logout(req, res));
router.use(pageController.notFound);

// //--wszystko co jest tu pageController to zawsze controller albo w node czasem nazywane actions/akcja
