import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import { IListUsersUsecase, ListUsersCompleteResult, ListUsersIncompleteResult, ListUsersValidationError } from './types';
import { Left, Right } from '../../../../utils/types';

@Injectable('IListUsersUsecase')
export default class ListUsersUsecase implements IListUsersUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly datasource: IInternalUserDatasource
  ) { }

  async execute(userIds: string[]) {
    if (!userIds?.length) return new Left(new ListUsersValidationError());

    const usersResult = await this.datasource.findManyByIds(userIds);
    if (usersResult.isError) return usersResult;

    const users = usersResult.success;
    if (users.length < userIds.length) {
      return new Right(new ListUsersIncompleteResult({
        users,
        usersNotFound: userIds.filter((userId) => !users
          .find(({ id }) => id === userId))
      }));
    }

    return new Right(new ListUsersCompleteResult(users));
  }
}
