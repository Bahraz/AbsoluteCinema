import express from 'express';
// import path from 'path';
import './db/mongoose.js';
import { router as webRouter } from './routes/web.js';
import { router as apiRouter } from './routes/api.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { sessionKeySecret } from './config.js';
import { requireAuth } from './middleware/auth.js';
import helmet from 'helmet';
import { rateLimiter } from './middleware/rateLimiter.js';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet()); //helmet blokuje linki wiec trzeba je tu dodac
app.use(rateLimiter);

app.use(
	session({
		secret: sessionKeySecret,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 2, //2 day i usuwa
		},
		resave: false,
	})
);

app.use(cookieParser());

//middleware - po Schema, przed zapisem czyli pomiedzy Controllerem itp
app.use('/profile', requireAuth); //zabezpiecza wszystkie profile ze musisz byc zalogowany

//router
app.use('/api', apiRouter);
app.use(webRouter);
