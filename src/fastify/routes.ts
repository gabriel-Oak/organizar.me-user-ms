import { FastifyInstance } from 'fastify';
// import createUserController from '../core/features/user/controller';
import HttpError from '../core/utils/errors/http-error';
import buildRoutes from '../core/utils/controller/build-routes';
import userControllers from '../core/features/user';
import healthControllers from '../core/features/health';

const createRouter = (app: FastifyInstance) => {
  buildRoutes(app, [
    ...userControllers,
    ...healthControllers
  ]);

  app.get('/*', (req, res) => res.code(404).send(new HttpError({
    message: 'Error, looks like the route you are looking for has been removed or doesn\'t exists',
    statusCode: 404,
    meta: req.url
  })));
}

export default createRouter;
