import { FastifyInstance } from 'fastify';
import { SYMBOL_CONTROLLER } from './decorators/symbols';
import registerController from './register-controller';
import { ICreateController } from './types';

export default function buildRoutes(
  app: FastifyInstance,
  controllersFactory: ICreateController<object>[]
) {
  controllersFactory.forEach((createController) => {
    const controller = createController();
    let path: string;
    if (Reflect.hasMetadata(SYMBOL_CONTROLLER, controller.constructor)) {
      path = Reflect.getMetadata(SYMBOL_CONTROLLER, controller.constructor);
    } else {
      const t = /^(.+?)(Controller)?$/.exec(controller.constructor.name);
      if (t && t?.length > 0) {
        const [, p] = t;
        path = `/${p}`;
      } else {
        path = `/${controller.constructor.name}`;
      }
    }
    path = path[0].toLocaleLowerCase() + path.substring(1).replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
    registerController(path, controller, app);
  });
}
