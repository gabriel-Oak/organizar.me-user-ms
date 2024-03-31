import createLoggerService from '../../services/logger';
import ApiAuthMiddleware from './api-auth-middleware';
import { IApiAuthMiddleware } from './types';

let instance: IApiAuthMiddleware;

const createApiAuthMiddleware = (): IApiAuthMiddleware => {
  if (!instance) {
    instance = new ApiAuthMiddleware(createLoggerService());
  }
  return instance;
}

export default createApiAuthMiddleware;
