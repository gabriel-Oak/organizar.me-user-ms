import 'reflect-metadata';
import { mock, mockReset } from 'jest-mock-extended';
import { Left, Right } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import ChangePasswordUsecase from './change-password';
import { ChangePasswordInvalidOldPassError, ChangePasswordInvalidPassError, IChangePasswordUsecase } from './types';
import User from '../../entities/user';

describe('ChangePasswordUsecase Tests', () => {
  const userDatasourceMock = mock<IInternalUserDatasource>();
  const userMock = mock<User>({ id: '660b3b8193fa2af84dc04cd6' });
  const payloadMock = {
    userId: userMock.id as unknown as string,
    oldPassword: 'dsuihfi',
    newPassword: 'dsiufuis'
  }
  const usecase: IChangePasswordUsecase = new ChangePasswordUsecase(userDatasourceMock);

  beforeEach(() => {
    mockReset(userDatasourceMock);
    mockReset(userMock);
    userDatasourceMock.findById.mockImplementation(async () => new Right(userMock));
  });

  it('Should validate wrong payload', async () => {
    const result = await usecase.execute({ user: userMock } as any);
    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error)
      .toBeInstanceOf(ChangePasswordInvalidPassError);
  });

  it('Should validate wrong old payload', async () => {
    userMock.comparePasswords.mockImplementation(async () => false);
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error)
      .toBeInstanceOf(ChangePasswordInvalidOldPassError);
  });

  it('Should update user password', async () => {
    userMock.comparePasswords.mockImplementation(async () => true);
    userDatasourceMock.update.mockImplementation(async () => new Right(null));
    const result = await usecase.execute(payloadMock);

    expect(result).toBeInstanceOf(Right);
  });
});
