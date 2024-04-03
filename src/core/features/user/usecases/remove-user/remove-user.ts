import { IRemoveUserUsecase } from './types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import UserSchema from '../../schemas/user-schema';
import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';

@Injectable('IRemoveUserUsecase')
export default class RemoveUserUsecase implements IRemoveUserUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly datasource: IInternalUserDatasource
  ) { }

  async execute(user: UserSchema) {
    const result = await this.datasource.remove(user.id!);
    return result;
  }
}
