import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { UserProps } from '../../models/user-model';

export class ValidateUserError extends BaseError {
  public readonly type = 'validate-user';
}
export interface IValidateUserUsecase {
  execute: (user: UserProps) => Either<ValidateUserError, unknown>;
}
