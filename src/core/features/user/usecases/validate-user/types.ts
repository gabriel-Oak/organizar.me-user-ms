import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { UserSchemaProps } from '../../schemas/user-schema';

export class ValidateUserError extends BaseError {
  public readonly type = 'validate-user';
}
export interface IValidateUserUsecase {
  execute: (user: UserSchemaProps) => Either<ValidateUserError, unknown>;
}
