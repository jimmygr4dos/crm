import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { loadModules } from '.';
import { ErrorMiddleware, NotFoundMiddleware } from './shared/middlewares/error.middleware';

dotenv.config();

const app = express();

app.set('port', process.env.NODE_PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => res.send('Service works'));
app.use('/api/v1', loadModules());
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

export default app;
