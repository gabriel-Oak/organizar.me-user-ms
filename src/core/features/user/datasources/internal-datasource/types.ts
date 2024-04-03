import { ObjectId } from 'typeorm';
import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import UserSchema from '../../schemas/user-schema';
import User from '../../entities/user';

export class InternalUserDatasourceError extends BaseError {
  public readonly type = 'internal-user-datasource';
}

export interface IInternalUserDatasource {
  findByEmail: (email: string) => Promise<Either<InternalUserDatasourceError, UserSchema | null>>;
  findById: (userId: ObjectId) => Promise<Either<InternalUserDatasourceError, UserSchema | null>>;
  save: (user: UserSchema) => Promise<Either<InternalUserDatasourceError, UserSchema>>;
  remove: (userId: ObjectId) => Promise<Either<InternalUserDatasourceError, UserSchema>>;
  update: (user: UserSchema) => Promise<Either<InternalUserDatasourceError, null>>;
  findManyByIds: (userIds: string[]) => Promise<Either<InternalUserDatasourceError, User[]>>;
}
