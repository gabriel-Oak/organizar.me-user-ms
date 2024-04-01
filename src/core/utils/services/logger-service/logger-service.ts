/* eslint-disable @typescript-eslint/restrict-template-expressions */
import winston, { Logger } from 'winston';
import { ILoggerService } from './types';
import Injectable from '../../decorators/injectable';
import { inject } from 'inversify';
import * as Sentry from '@sentry/node';

@Injectable('ILoggerService')
export default class LoggerService implements ILoggerService {
  constructor(
    @inject('Logger') private readonly logger: Logger
  ) {
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
        format: this.format
      }));
    }
  }

  protected format = winston.format.printf(({ level, message }) => {
    const payload = `${new Date().toLocaleString('pt-BR')} [${level.toUpperCase()}]: ${message.message ||
      message.error ||
      message}`;
    if (level === 'error') Sentry.captureException(payload);
    else Sentry.captureMessage(payload);

    return payload;
  });

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
