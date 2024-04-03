import 'reflect-metadata';
import { mock, mockReset } from 'jest-mock-extended';
import { IInternalUserDatasource, InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import ListUsersUsecase from './list-users';
import { IListUsersUsecase, ListUsersCompleteResult, ListUsersIncompleteResult, ListUsersValidationError } from './types';
import { Left, Right } from '../../../../utils/types';
import User from '../../entities/user';

describe('ListUsersUsecase', () => {
  const datasourceMock = mock<IInternalUserDatasource>();
  const usecase: IListUsersUsecase = new ListUsersUsecase(datasourceMock);
  const payloadMock = ['660b3b8193fa2af84dc04cd6', '660b3b8193fa2af84dc04cd7'];

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should return datasource error', async () => {
    datasourceMock.findManyByIds
      .mockImplementation(async () => new Left(new InternalUserDatasourceError('OH OH')));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should return complete users result', async () => {
    datasourceMock.findManyByIds.mockImplementation(async () => new Right([
      mock<User>({ id: '660b3b8193fa2af84dc04cd6' }),
      mock<User>({ id: '660b3b8193fa2af84dc04cd7' })
    ]));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(ListUsersCompleteResult);
  });

  it('Should return incomplete users result', async () => {
    datasourceMock.findManyByIds.mockImplementation(async () => new Right([
      mock<User>({ id: '660b3b8193fa2af84dc04cd6' })
    ]));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(ListUsersIncompleteResult);
    expect((result as Right<ListUsersIncompleteResult>).success.usersNotFound)
      .toEqual(['660b3b8193fa2af84dc04cd7']);
  });

  it('Should return validation error', async () => {
    const result = await usecase.execute([]);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<ListUsersValidationError>).error)
      .toBeInstanceOf(ListUsersValidationError);
  });
});
