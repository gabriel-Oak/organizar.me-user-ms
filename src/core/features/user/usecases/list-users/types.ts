import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import User from '../../entities/user';

export interface ListUsersResult {
  users: User[];
  usersNotFound: string[];
}

export class ListUsersCompleteResult implements ListUsersResult {
  users!: User[];
  usersNotFound!: string[];

  constructor(users: User[]) {
    Object.assign(this, { users, usersNotFound: [] });
  }
}

export class ListUsersIncompleteResult implements ListUsersResult {
  users!: User[];
  usersNotFound!: string[];

  constructor({ users, usersNotFound }: ListUsersResult) {
    Object.assign(this, { users, usersNotFound });
  }
}

export class ListUsersValidationError extends BaseError {
  public readonly type = 'list-user-validation';

  constructor() {
    super('Você precisa informar uma lista valida de ids');
  }
}

export type listUsersErrors = ListUsersValidationError | InternalUserDatasourceError;
export type listUsersResult = ListUsersCompleteResult | ListUsersIncompleteResult;

export interface IListUsersUsecase {
  execute: (userIds: string[]) => Promise<Either<listUsersErrors, listUsersResult>>;
}
