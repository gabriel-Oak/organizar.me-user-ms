import UserModel from '../../models/user-model';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import { Either } from 'src/core/utils/types';

export interface IRemoveUserUsecase {
  execute: (user: UserModel) => Promise<Either<InternalUserDatasourceError, UserModel>>;
}
