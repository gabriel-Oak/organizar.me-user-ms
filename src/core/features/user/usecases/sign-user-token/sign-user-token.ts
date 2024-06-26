import { ISignUserTokenUsecase } from './types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../utils/constants';
import { ICacheService } from '../../../../utils/services/cache-service/types';
import Injectable from '../../../../utils/decorators/injectable';
import { inject } from 'inversify';
import User from '../../entities/user';

@Injectable('ISignUserTokenUsecase')
export default class SignUserTokenUsecase implements ISignUserTokenUsecase {
  constructor(
    @inject('ICacheService')
    private readonly chage: ICacheService
  ) { }

  execute(user: User) {
    const { email, name, id } = user;
    void this.chage.set(`user:${user.id!}`, {
      email, name, id
    });

    return jwt.sign({
      email, name, id
    }, JWT_SECRET, { expiresIn: '24h' });
  }
}
