import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';

export class ChangePasswordInvalidPassError extends BaseError {
  public readonly type = 'change-password-invalid-pass';

  constructor(message?: string) {
    super(message ?? 'As senhas não batem, verifique se as digitou corretamente');
  }
}

export class ChangePasswordInvalidOldPassError extends ChangePasswordInvalidPassError {
  constructor() {
    super('A nova senha não pode ser igual a anterior');
  }
}

export type changePasswordErrors = InternalUserDatasourceError
| ChangePasswordInvalidPassError
| ChangePasswordInvalidOldPassError;

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordPayload extends ChangePasswordBody {
  userId: string;
}

export interface IChangePasswordUsecase {
  execute: (payload: ChangePasswordPayload) => Promise<Either<changePasswordErrors, string>>
}
