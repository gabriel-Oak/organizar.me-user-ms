import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import UserSchema from '../../schemas/user-schema';

export interface LoginPayload {
  email: string;
  password: string;
}

export class AuthenticateInvalidError extends BaseError {
  public readonly type = 'authenticate-invalid';
  constructor() { super('Oh não parece que você não informou um email ou uma senha'); }
}

export class AuthenticateUserNotFoundError extends BaseError {
  public readonly type = 'authenticate-user-not-found';
  constructor() { super('Desculpe não conseguimos encontrar um usuário com esse email =/'); }
}

export class AuthenticateUserWrongPasswordError extends BaseError {
  public readonly type = 'authenticate-user-wrong-password';
  constructor() { super('Senha errada, tente de novo por favor'); }
}

export type authenticateUserErrors = InternalUserDatasourceError
| AuthenticateUserNotFoundError
| AuthenticateUserWrongPasswordError
| AuthenticateInvalidError;

export interface IAuthenticateUserUsecase {
  execute: (payload: LoginPayload) => Promise<Either<authenticateUserErrors, UserSchema>>
}
