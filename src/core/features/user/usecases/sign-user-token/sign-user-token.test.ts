import 'reflect-metadata';
import { ISignUserTokenUsecase } from './types';
import SignUserTokenUsecase from './sign-user-token';
import { mock, mockReset } from 'jest-mock-extended';
import { ICacheService } from '../../../../utils/services/cache-service/types';
import User from '../../entities/user';

describe('SignUserUsecase Tests', () => {
  const cacheMock = mock<ICacheService>();
  const usecase: ISignUserTokenUsecase = new SignUserTokenUsecase(cacheMock);

  beforeEach(() => {
    mockReset(cacheMock);
  });

  it('Should sign token', () => {
    const token = usecase.execute(new User({
      email: 'olha@gmail.com',
      name: 'Hello World',
      password: 'oyuweyfyewf7yisdfiuhsdf',
      id: 'dfssdfsdfdsf'
    }));

    expect(typeof token).toBe('string');
    const segments = token.split('.');
    expect(segments.length).toBe(3);
  });
});
