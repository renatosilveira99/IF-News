import 'reflect-metadata'
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import { routes } from './routes';

import swaggerFile from './swagger.json';
import AppError from './utils/AppError';

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
      message:
        `Internal server error - ${error.message}`,
      requestBody: request.file,
    });
  }
);

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'IF News Server - online' });
})

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('Server is running on port 3333');
}); 