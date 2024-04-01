import { FastifyInstance } from 'fastify';
import createContainer from '../src/core/utils/decorators/container';
import { ILoggerService } from '../src/core/utils/services/logger-service/types';
import startServer from '../src/fastify/server';

export default async function handler(req: any, reply: any) {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const app = await startServer()
    .catch((error) => logger.error(error.message ?? error, error)) as FastifyInstance;

  app.server.emit('request', req, reply);
}
