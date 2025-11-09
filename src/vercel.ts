import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

let initialized = false;

const handler = async (req: any, res: any) => {
  if (!initialized) {
    await connectDB();
    initialized = true;
  }
  const expressHandler = serverless(app);
  return expressHandler(req, res);
};

export default handler;
