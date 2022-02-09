import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../utils/AppError';

interface ITokenPayload {
  iat: number;
  user: {
    id: string;
  }
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não fornecido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { user } = decoded as ITokenPayload;

    request.user = {
      id: user.id
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido', 401);
  }
}