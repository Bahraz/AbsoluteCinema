import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error('❌ Brak ustawionej zmiennej środowiskowej MONGO_URI');
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB połączone pomyślnie');
  } catch (err) {
    console.error('❌ MongoDB błąd połączenia:', err);
    process.exit(1);
  }
};
