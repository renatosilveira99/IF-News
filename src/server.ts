import 'dotenv/config';
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import { routes } from './routes';

import swaggerFile from './swagger.json';
import AppError from './utils/AppError';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ status: 'error', message: error.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
}); 