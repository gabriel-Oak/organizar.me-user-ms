import 'reflect-metadata';
import { mock, mockReset } from 'jest-mock-extended';
import { IInternalUserDatasource, InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import { DecodeUserInvalidTokenError, DecodeUserNotFoundError, IDecodeUserTokenUsecase } from './types';
import DecodeUserTokenDatasource from './decode-user-token';
import { Left, Right } from '../../../../utils/types';
import UserSchema from '../../schemas/user-schema';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../utils/constants';

describe('DecodeUserTokenUsecase Test', () => {
  const userDatasourceMock = mock<IInternalUserDatasource>();
  const usecase: IDecodeUserTokenUsecase = new DecodeUserTokenDatasource(userDatasourceMock);
  const token = jwt.sign({
    email: 'ooo',
    _id: '660b3b8193fa2af84dc04cd6',
    name: 'ooo'
  }, JWT_SECRET);

  beforeEach(() => {
    mockReset(userDatasourceMock);
  });

  it('Should invalid token error', async () => {
    const result = await usecase.execute('ihoujfessfdihuj.hisudfdfsu');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(DecodeUserInvalidTokenError);
  });

  it('Should return user not found error', async () => {
    userDatasourceMock.findById.mockImplementation(async () => new Right(null));
    const result = await usecase.execute(token);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(DecodeUserNotFoundError);
  });

  it('Should return datasource error', async () => {
    userDatasourceMock.findById.mockImplementation(async () => new Left(new InternalUserDatasourceError('')));
    const result = await usecase.execute(token);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should decode succefuly', async () => {
    userDatasourceMock.findById.mockImplementation(async () => new Right(new UserSchema()));
    const result = await usecase.execute(token);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(UserSchema);
  });
});
