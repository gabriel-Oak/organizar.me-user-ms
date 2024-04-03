import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types'
import User, { UserProps } from '../../entities/user';

export class InsertUserAlreadyExist extends BaseError {
  public readonly type = 'insert-user-already-exist';

  constructor() {
    super('Um usuário com esse email já existe, tente um email diferente');
  }
}

export type insertUserErrors = InternalUserDatasourceError
| InsertUserAlreadyExist;

export interface IInsertUserUsecase {
  execute: (user: Omit<UserProps, 'id'>) => Promise<Either<insertUserErrors, User>>;
}
