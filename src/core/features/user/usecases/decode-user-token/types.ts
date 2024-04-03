import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import UserSchema from '../../schemas/user-schema';

export class DecodeUserInvalidTokenError extends BaseError {
  public readonly type = 'decode-user-invalid-token';
  constructor() {
    super('Desculpe, formato do token inválido, tente de novo');
  }
}

export class DecodeUserNotFoundError extends BaseError {
  public readonly type = 'decode-user-not-found';
  constructor() {
    super('Usuário não encontrado, tente entrar de novo');
  }
}

export type decodeUserTokenErrors = DecodeUserInvalidTokenError
| DecodeUserNotFoundError
| InternalUserDatasourceError

export interface IDecodeUserTokenUsecase {
  execute: (token: string) => Promise<Either<decodeUserTokenErrors, UserSchema>>;
}
