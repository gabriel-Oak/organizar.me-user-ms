import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import UserModel, { UserProps } from '../../models/user-model';

export class UpdateUserInvalidPassError extends BaseError {
  public readonly type = 'update-user-invalid-pass';

  constructor() {
    super('A senha está incorreta, tente de novo');
  }
}

export type updateUserErrors = UpdateUserInvalidPassError
| InternalUserDatasourceError;

export type updateUserProps = Partial<Omit<UserProps, 'id'>>;

export interface IUpdateUserUsecase {
  execute: (user: UserModel, payload: updateUserProps) => Promise<Either<updateUserErrors, null>>;
}
