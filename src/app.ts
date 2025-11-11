import express from 'express';
import routes from '@routes/routes.js';

const app = express();

app.use(express.json());

// Jeden główny punkt wejścia dla całego API:
app.get('/', (req, res) => res.send('Welcome to Absolute Cinema API'));
app.use('/api', routes);

export default app;
