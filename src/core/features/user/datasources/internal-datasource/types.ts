import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import UserModel from '../../models/user-model';

export class InternalUserDatasourceError extends BaseError {
  public readonly type = 'internal-user-datasource';
}

export interface IInternalUserDatasource {
  findByEmail: (email: string) => Promise<Either<InternalUserDatasourceError, UserModel | null>>;
  findByEmailOrUsername: (query: {
    email: string; username: string;
  }) => Promise<Either<InternalUserDatasourceError, UserModel | null>>;
  findById: (userId: string) => Promise<Either<InternalUserDatasourceError, UserModel | null>>;
  save: (user: UserModel) => Promise<Either<InternalUserDatasourceError, UserModel>>;
  remove: (userId: string) => Promise<Either<InternalUserDatasourceError, UserModel>>;
  update: (user: UserModel) => Promise<Either<InternalUserDatasourceError, null>>;
}
