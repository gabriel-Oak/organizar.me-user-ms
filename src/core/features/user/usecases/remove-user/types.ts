import UserSchema from '../../schemas/user-schema';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import { Either } from 'src/core/utils/types';

export interface IRemoveUserUsecase {
  execute: (user: UserSchema) => Promise<Either<InternalUserDatasourceError, UserSchema>>;
}
