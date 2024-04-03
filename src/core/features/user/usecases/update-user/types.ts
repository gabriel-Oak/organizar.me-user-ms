import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import UserSchema, { UserSchemaProps } from '../../schemas/user-schema';

export class UpdateUserInvalidPassError extends BaseError {
  public readonly type = 'update-user-invalid-pass';

  constructor() {
    super('A senha está incorreta, tente de novo');
  }
}

export type updateUserErrors = UpdateUserInvalidPassError | InternalUserDatasourceError;

export type updateUserSchemaProps = Partial<Omit<UserSchemaProps, 'id'>>;

export interface IUpdateUserUsecase {
  execute: (user: UserSchema, payload: updateUserSchemaProps) => Promise<Either<updateUserErrors, null>>;
}
