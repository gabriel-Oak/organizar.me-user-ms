import fastify from 'fastify';
import cors from '@fastify/cors';
import createRouter from './routes';
import { initDB } from '../core/utils/services/database-service';
import middie from '@fastify/middie';
import createApiAuthMiddleware from '../core/utils/middlewares/api-auth';

const createApp = async () => {
  const app = fastify();
  void app.register(cors);

  await app.register(middie);
  app.addHook('preHandler', createApiAuthMiddleware().execute);

  await initDB();
  createRouter(app);

  return await app;
}

export default createApp;
