/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FastifyInstance } from 'fastify';
import { SYMBOL_CONTROLLER } from '../decorators/controller/symbols';
import registerController from './register-controller';
// import { ICreateController } from '../decorators/controller/types';
import createContainer from '../decorators/container';

export default function buildRoutes(
  app: FastifyInstance,
  controllers: any[]
) {
  controllers.forEach((controller) => {
    const controllerInstance: any = createContainer().get<typeof controller>(controller.name);

    let path: string;
    if (Reflect.hasMetadata(SYMBOL_CONTROLLER, controllerInstance.constructor)) {
      path = Reflect.getMetadata(SYMBOL_CONTROLLER, controllerInstance.constructor);
    } else {
      const t = /^(.+?)(Controller)?$/.exec(controllerInstance.constructor.name);
      if (t && t?.length > 0) {
        const [, p] = t;
        path = `/${p}`;
      } else {
        path = `/${controller.name}`;
      }
    }
    path = path[0].toLocaleLowerCase() + path.substring(1).replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
    registerController(path, controllerInstance, app);
  });
}
