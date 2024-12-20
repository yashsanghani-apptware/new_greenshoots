declare module 'agsiri-common' {
  export const logger: any;
  export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    constructor(message: string, statusCode: number, isOperational?: boolean);
  }
  export function errorHandler(err: AppError, req: any, res: any, next: any): void;
  export const i18nMiddleware: any;
  export const i18next: any;
  export const monitoringApp: any;
}

