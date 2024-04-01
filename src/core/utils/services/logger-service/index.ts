import { Logger, createLogger } from 'winston';
import LoggerService from './logger-service';
import { ILoggerService } from './types';
import createContainer from '../../decorators/container';

createContainer().bind<Logger>('Logger')
  .toDynamicValue(() => createLogger());

let instance: ILoggerService;
const createLoggerService = (): ILoggerService => {
  if (!instance) instance = new LoggerService(createLogger());
  return instance;
};

export default createLoggerService;
