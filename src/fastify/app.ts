import fastify from 'fastify';
import cors from '@fastify/cors';
import createRouter from './routes';
import DatabaseService from '../core/utils/services/database-service';
import middie from '@fastify/middie';
import createApiAuthMiddleware from '../core/utils/middlewares/api-auth';

const createApp = async () => {
  const app = fastify();
  void app.register(cors);

  await app.register(middie);
  app.addHook('preHandler', createApiAuthMiddleware().execute);

  void DatabaseService.initialize();
  createRouter(app);

  return await app;
}

export default createApp;
