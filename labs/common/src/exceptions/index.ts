import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { statusCode: err.statusCode, stack: err.stack });
  res.status(err.statusCode || 500).json({ message: err.message });
};

export { AppError, errorHandler };

