import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

let initialized = false;

async function bootstrap() {
  if (!initialized) {
    await connectDB();
    initialized = true;
  }
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  const expressHandler = serverless(app);
  return expressHandler(req, res);
}
