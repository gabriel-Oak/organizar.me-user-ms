import 'reflect-metadata';
import './config';
import '../core/utils/services/index';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { env } from 'process';
import createApp from './app';
import createContainer from '../core/utils/decorators/container';
import { ILoggerService } from '../core/utils/services/logger-service/types';
import { SENTRY_DSN } from '../core/utils/constants';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0
});

export default async function startServer() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const port = env.PORT ?? 3001;

  const app = await createApp();
  await app.listen({ port: +port, host: '0.0.0.0' })
    .catch((e) => logger.error('Error starting server', e));

  logger.info(`Server started at port ${port}`);
  return app;
}
