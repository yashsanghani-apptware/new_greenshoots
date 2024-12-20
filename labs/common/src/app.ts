import express, { Request, Response, NextFunction } from 'express';
import './config';
import logger from './logger';
import { AppError, errorHandler } from './exceptions';
import i18next, { i18nMiddleware } from './i18n';
import monitoringApp from './monitoring';

const app = express();

app.use(i18nMiddleware);

app.get('/', (req, res) => {
  res.send(i18next.t('welcome'));
});

// Test route to simulate an error
app.get('/test-error', (req, res) => {
  throw new Error('Test error handling');
});

// Optional fallthrough error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 500;
  res.end(err.message + '\n');
});

app.use((req, res, next) => {
  throw new AppError('Not Found', 404);
});

app.use(errorHandler);

app.use('/monitoring', monitoringApp);

export default app;

