import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const config = {
	port: process.env.PORT || 3000,
	database: process.env.DATABASE || 'mongodb+srv://root:GRBdLB9aZNZpYx1j@absolutecinema.iqbqe2g.mongodb.net/absolutecinema',
	sessionKeySecret: process.env.SESSION_KEY_SECRET || 'hgfhtrhfg',
};

export const { port, database, sessionKeySecret } = config;
