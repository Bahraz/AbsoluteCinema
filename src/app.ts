import express from 'express';
import routes from '@routes/routes';

const app = express();

app.use(express.json());

// Jeden główny punkt wejścia dla całego API:
app.use('/api', routes);

export default app;
