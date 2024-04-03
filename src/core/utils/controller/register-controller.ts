import { FastifyInstance } from 'fastify';
import UserSchema from '../../features/user/schemas/user-schema';
import { IDecodeUserTokenUsecase, decodeUserTokenErrors } from '../../features/user/usecases/decode-user-token/types';
import HttpError from '../errors/http-error';
import createLoggerService from '../services/logger-service';
import { Either } from '../types';
import { SYMBOL_DELETE, SYMBOL_GET, SYMBOL_PATCH, SYMBOL_POST, SYMBOL_PRIVATE, SYMBOL_PUT } from '../decorators/controller/symbols';
import { controllerAction, IControllerActionMeta } from '../decorators/controller/types';
import createContainer from '../decorators/container';

export default function registerController(
  path: string,
  controller: object,
  app: FastifyInstance
) {
  function processMeta(
    symbol: symbol,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete'
  ) {
    if (Reflect.hasMetadata(symbol, controller.constructor)) {
      const actions = Reflect.getMetadata(
        symbol,
        controller.constructor
      ) as IControllerActionMeta[];
      const privateRoutes = Reflect.getMetadata(
        SYMBOL_PRIVATE,
        controller.constructor
      ) as string[];

      actions.forEach(({ path: p, action }) => {
        const actionPath = p === '/' ? '' : p
        app[method](`${path}${actionPath}`, async (req, rep) => {
          try {
            let user: UserSchema;
            if (privateRoutes?.includes(action)) {
              const decoder = createContainer().get<IDecodeUserTokenUsecase>('IDecodeUserTokenUsecase');
              const { auth } = req.headers;
              const decodeResult: Either<decodeUserTokenErrors, UserSchema> = await decoder.execute(String(auth));

              if (decodeResult.isError) {
                const error = new HttpError({
                  message: 'Desculpe, você precisa estar autenticado para acessar esse recurso.',
                  meta: decodeResult.error,
                  statusCode: 403
                });
                return await rep.code(error.statusCode).send(error);
              }

              user = decodeResult.success;
            }

            const res = await (controller as Record<string, controllerAction>)[action](req, rep, user!);
            return res;
          } catch (e) {
            const error = new HttpError({
              message: (e as any).message,
              meta: e
            });

            const logger = createLoggerService();
            logger.error(error.message, error);
            await rep.code(error.statusCode).send(error);
          }
        });
      });
    }
  }

  processMeta(SYMBOL_GET, 'get');
  processMeta(SYMBOL_POST, 'post');
  processMeta(SYMBOL_PATCH, 'patch');
  processMeta(SYMBOL_PUT, 'put');
  processMeta(SYMBOL_DELETE, 'delete');
}
