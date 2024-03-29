import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types'
import UserModel, { UserProps } from '../../models/user-model';

export class InsertUserAlreadyExist extends BaseError {
  public readonly type = 'insert-user-already-exist';

  constructor() {
    super('UserModel already exist, try a different email or usernal');
  }
}

export type insertUserErrors = InternalUserDatasourceError
| InsertUserAlreadyExist;

export interface IInsertUserUsecase {
  execute: (user: Omit<UserProps, 'id'>) => Promise<Either<insertUserErrors, UserModel>>;
}
