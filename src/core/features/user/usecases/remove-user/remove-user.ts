import { IRemoveUserUsecase } from './types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import UserModel from '../../models/user-model';
import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';

@Injectable('IRemoveUserUsecase')
export default class RemoveUserUsecase implements IRemoveUserUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly datasource: IInternalUserDatasource
  ) { }

  async execute(user: UserModel) {
    const result = await this.datasource.remove(user._id!);
    return result;
  }
}
