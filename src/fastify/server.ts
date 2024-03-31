import { env } from 'process';
import createApp from './app';
import createLoggerService from '../core/utils/services/logger-service';

export default async function startServerF() {
  const logger = createLoggerService();
  const port = env.PORT ?? 8080;
  const app = await createApp();
  await app.listen({ port: +port, host: '0.0.0.0' })
    .catch((e) => logger.error('Error starting server', e));

  logger.info(`Server started at port ${port}`);
  return app;
}
