import { FastifyInstance } from 'fastify';
import createContainer from '../core/utils/decorators/container';
import { ILoggerService } from '../core/utils/services/logger-service/types';
import startServer from '../fastify/server';

export default async function handler(req: any, reply: any) {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const app = await startServer()
    .catch((error: any) => logger.error(error.message ?? error, error)) as FastifyInstance;

  app.server.emit('request', req, reply);
}
