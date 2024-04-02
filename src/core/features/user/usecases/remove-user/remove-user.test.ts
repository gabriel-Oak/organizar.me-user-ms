import { mock, mockReset } from 'jest-mock-extended';
import UserModel from '../../models/user-model';
import { IInternalUserDatasource, InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import RemoveUserUsecase from './remove-user';
import { IRemoveUserUsecase } from './types';
import { Left, Right } from '../../../../utils/types';

describe('RemoveUserUsecase Tests', () => {
  const datasourceMock = mock<IInternalUserDatasource>();
  const usecase: IRemoveUserUsecase = new RemoveUserUsecase(datasourceMock);
  const payloadMock = mock<UserModel>({ name: 'test' });

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should return InternalUserDatasourceError', async () => {
    datasourceMock.remove
      .mockImplementation(async () => new Left(new InternalUserDatasourceError('OH OH')));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should remove successfully', async () => {
    datasourceMock.remove
      .mockImplementation(async () => new Right(payloadMock));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Right);
  });
});
