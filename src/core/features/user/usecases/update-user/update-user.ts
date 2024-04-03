import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import { IUpdateUserUsecase, UpdateUserInvalidPassError, updateUserProps } from './types';
import User from '../../entities/user';

@Injectable('IUpdateUserUsecase')
export default class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly userDatasource: IInternalUserDatasource
  ) {}

  async execute(user: User, payload: updateUserProps) {
    const passIsValid = payload.password && await user.comparePasswords(payload.password);
    if (!passIsValid) return new Left(new UpdateUserInvalidPassError());

    return await this.userDatasource.update(user);
  }
}
