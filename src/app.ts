import config from '../config';
import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import noteRoutes from './routes/note.routes';
import healthRoutes from './routes/health.routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const { MONGO_URI } = config;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: true,
  });
});

app.use('/', noteRoutes);
app.use('/health', healthRoutes);

mongoose
  .connect(MONGO_URI)
  .catch((error) => console.error('MongoDB Connection Error:', error));

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error) => {
  console.error('MongoDB Connection Error', error);
});

export default app;
