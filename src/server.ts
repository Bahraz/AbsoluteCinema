import dotenv from 'dotenv';
import app from './app';
import { connectDB } from '@config/db'; // ✅ poprawny import

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(); // ✅ tu używamy funkcji
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})();
