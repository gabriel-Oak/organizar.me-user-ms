import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import User from '../../entities/user';

export class InternalUserDatasourceError extends BaseError {
  public readonly type = 'internal-user-datasource';
}

export interface IInternalUserDatasource {
  findByEmail: (email: string) => Promise<Either<InternalUserDatasourceError, User | null>>;
  findById: (userId: string) => Promise<Either<InternalUserDatasourceError, User | null>>;
  save: (user: User) => Promise<Either<InternalUserDatasourceError, User>>;
  remove: (userId: string) => Promise<Either<InternalUserDatasourceError, User>>;
  update: (user: User) => Promise<Either<InternalUserDatasourceError, null>>;
  findManyByIds: (userIds: string[]) => Promise<Either<InternalUserDatasourceError, User[]>>;
}
