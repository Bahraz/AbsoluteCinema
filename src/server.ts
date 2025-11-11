import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 3000;

// najpierw łączysz z bazą
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Błąd podczas uruchamiania serwera:', err);
  });
