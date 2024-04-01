import 'reflect-metadata';
import './fastify/config';
import './core/utils/services/index';
import startServer from './fastify/server';
import createContainer from './core/utils/decorators/container';
import { ILoggerService } from './core/utils/services/logger-service/types';

const container = createContainer();
const logger = container.get<ILoggerService>('ILoggerService');
startServer()
  .catch((error) => logger.error(error.message ?? error, error));
