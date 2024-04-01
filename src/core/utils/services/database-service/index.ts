/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DataSource, Repository } from 'typeorm'
import {
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASS,
  MONGODB_PORT,
  MONGODB_USER
} from '../../constants';
import UserModel from '../../../features/user/models/user-model';
import createContainer from '../../decorators/container';
import { ILoggerService } from '../logger-service/types';

const DatabaseService = new DataSource({
  type: 'mongodb',
  url: `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin`,
  entities: [
    UserModel
  ],
  synchronize: true
});

export const initDB = async () => {
  if (!DatabaseService.isInitialized) {
    const logger = createContainer().get<ILoggerService>('ILoggerService');
    logger.info('Initializing connection with database');
    await DatabaseService.initialize()
      .then(() => logger.info('Database initialized successfuly'))
      .catch((error) => {
        logger.error('Database initialize error: ', error);
      });
  }
  return DatabaseService.isInitialized;
};

const container = createContainer();

container.bind<Repository<UserModel>>('Repository<UserModel>')
  .toDynamicValue(() => DatabaseService.getRepository(UserModel));
container.bind<DataSource>('DataSource').toDynamicValue(() => DatabaseService);
container.bind<() => Promise<boolean>>('initDB').toDynamicValue(() => initDB);

export default DatabaseService;
