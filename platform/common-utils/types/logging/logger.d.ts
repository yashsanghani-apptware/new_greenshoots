declare module '@agsiri/common-utils/logging/logger' {
  import { Logger } from 'winston';
  import { ExpressLoggerOptions } from 'express-winston';

  export const logger: Logger;
  export const expressLogger: ExpressLoggerOptions;
}

