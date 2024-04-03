import { IRemoveUserUsecase } from './types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import User from '../../entities/user';

@Injectable('IRemoveUserUsecase')
export default class RemoveUserUsecase implements IRemoveUserUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly datasource: IInternalUserDatasource
  ) { }

  async execute(user: User) {
    const result = await this.datasource.remove(user.id!);
    return result;
  }
}
