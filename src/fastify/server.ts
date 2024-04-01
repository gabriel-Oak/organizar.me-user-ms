import { env } from 'process';
import createApp from './app';
import createContainer from '../core/utils/decorators/container';
import { ILoggerService } from '../core/utils/services/logger-service/types';

export default async function startServerF() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const port = env.PORT ?? 8080;

  const app = await createApp();
  await app.listen({ port: +port, host: '0.0.0.0' })
    .catch((e) => logger.error('Error starting server', e));

  logger.info(`Server started at port ${port}`);
  return app;
}
