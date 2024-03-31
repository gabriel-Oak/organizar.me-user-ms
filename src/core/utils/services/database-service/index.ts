/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DataSource } from 'typeorm'
import {
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASS,
  MONGODB_PORT,
  MONGODB_USER
} from '../../constants';
import createLoggerService from '../logger';
import UserModel from '../../../features/user/models/user-model';

const DatabaseService = new DataSource({
  type: 'mongodb',
  url: `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin`,
  entities: [
    UserModel
  ],
  synchronize: true
});

const logger = createLoggerService();

DatabaseService.initialize()
  .then(() => logger.info('Database initialized successfuly'))
  .catch((error) => logger.error('Database initialize error', error))

export default DatabaseService;
