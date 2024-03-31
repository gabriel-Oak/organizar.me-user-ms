/* eslint-disable @typescript-eslint/restrict-template-expressions */
import winston, { Logger } from 'winston';
import { ILoggerService } from './types';

export default class LoggerService implements ILoggerService {
  constructor(
    private readonly logger: Logger
  ) {
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
        format: this.format
      }));
    }
  }

  protected format = winston.format.printf(({ level, message }) => `${new Date().toLocaleString('pt-BR')} [${level.toUpperCase()}]: ${message.message ||
    message.error ||
    message}`);

  info(message: string, data?: unknown) {
    let payload = message;
    if (data) payload += `: ${JSON.stringify(data, null, 2)}`
    this.logger.info(payload, data);
  }

  error(message: string, data?: unknown) {
    let payload = message;
    if (data) payload += `: ${JSON.stringify(data, null, 2)}`
    this.logger.error(payload, data);
  }

  warn(message: string, data?: unknown) {
    let payload = message;
    if (data) payload += `: ${JSON.stringify(data, null, 2)}`
    this.logger.warn(payload, data);
  }

  debug(message: string, data?: unknown) {
    let payload = message;
    if (data) payload += `: ${JSON.stringify(data, null, 2)}`
    this.logger.debug(payload, data);
  }
}
