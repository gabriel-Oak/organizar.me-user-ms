import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import UserSchema from '../../schemas/user-schema';
import { IUpdateUserUsecase, UpdateUserInvalidPassError, updateUserSchemaProps } from './types';

@Injectable('IUpdateUserUsecase')
export default class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly userDatasource: IInternalUserDatasource
  ) {}

  async execute(user: UserSchema, payload: updateUserSchemaProps) {
    const passIsValid = payload.password && await user.comparePasswords(payload.password);
    if (!passIsValid) return new Left(new UpdateUserInvalidPassError());

    user.updateProps(payload);
    return await this.userDatasource.update(user);
  }
}
