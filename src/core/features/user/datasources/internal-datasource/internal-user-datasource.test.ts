import { mock, mockReset } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import UserSchema from '../../schemas/user-schema';
import { ILoggerService } from '../../../../utils/services/logger-service/types';
import InternalUserDatasource from './internal-user-datasource';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import { Left, Right } from '../../../../utils/types';
import { ObjectId } from 'mongodb';
import User from '../../entities/user';

describe('InternalUserDatasource Tests', () => {
  const repositoryMock = mock<Repository<UserSchema>>();
  const loggerMock = mock<ILoggerService>();
  const userMock = new UserSchema();

  const datasource: IInternalUserDatasource = new InternalUserDatasource(
    repositoryMock,
    loggerMock
  );

  beforeEach(() => {
    mockReset(repositoryMock);
    mockReset(loggerMock);
  });

  it('Should find users by ids', async () => {
    repositoryMock.findBy.mockImplementation(async () => [userMock]);
    const result = await datasource.findManyByIds(['132123']);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown[]>).success[0]).toBeInstanceOf(User);
  });

  it('Should handle error finding by ids', async () => {
    repositoryMock.findBy.mockRejectedValue(Error('HOLLY COW'));
    const result = await datasource.findManyByIds(['132123']);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should find user by email', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    const result = await datasource.findByEmail('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(UserSchema);
  });

  it('Should handle error finding by email', async () => {
    repositoryMock.findOneBy.mockRejectedValue(Error('HOLLY CHEAT'));
    const result = await datasource.findByEmail('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should find user by id', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    const result = await datasource.findById(new ObjectId('660b3b8193fa2af84dc04cd6'));

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(UserSchema);
  });

  it('Should handle error finding by id', async () => {
    repositoryMock.findOneBy.mockRejectedValue(Error('HOLLY CHEAT'));
    const result = await datasource.findById(new ObjectId('660b3b8193fa2af84dc04cd6'));

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should save user', async () => {
    repositoryMock.save.mockImplementation(async (u) => u as UserSchema);
    const result = await datasource.save(userMock);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(UserSchema);
  });

  it('Should handle error saving user', async () => {
    repositoryMock.save.mockRejectedValue(Error('Ugly user'));
    const result = await datasource.save(userMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should update user', async () => {
    repositoryMock.update.mockImplementation(async () => null as any);
    const result = await datasource.update(userMock);

    expect(result).toBeInstanceOf(Right);
  });

  it('Should handle error updating user', async () => {
    repositoryMock.update.mockRejectedValue(Error('Ugly user'));
    const result = await datasource.update(userMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should remove user', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    repositoryMock.remove.mockImplementation(async (u: UserSchema) => u);
    const result = await datasource.remove(new ObjectId('660b3b8193fa2af84dc04cd6'));

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(UserSchema);
  });

  it('Should handle error removing user', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => null);
    const result = await datasource.remove(new ObjectId('660b3b8193fa2af84dc04cd6'));

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });
});
