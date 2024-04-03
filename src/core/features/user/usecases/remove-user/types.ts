import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import { Either } from 'src/core/utils/types';
import User from '../../entities/user';

export interface IRemoveUserUsecase {
  execute: (user: User) => Promise<Either<InternalUserDatasourceError, User>>;
}
