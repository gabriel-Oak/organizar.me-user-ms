// import './internal-user-datasource';

import { IInternalUserDatasource } from './types';
import InternalUserDatasource from './internal-user-datasource';
import DatabaseService from '../../../../utils/services/database-service';
import UserModel from '../../models/user-model';
import createLoggerService from '../../../../utils/services/logger-service';

let instance: IInternalUserDatasource;

const createInternalUserDatasource = (): IInternalUserDatasource => {
  if (!instance) {
    instance = new InternalUserDatasource(
      DatabaseService.getRepository(UserModel),
      createLoggerService()
    );
  }
  return instance;
}

export default createInternalUserDatasource;
