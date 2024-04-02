import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left, Right } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import { ChangePasswordInvalidOldPassError, ChangePasswordInvalidPassError, ChangePasswordPayload, IChangePasswordUsecase } from './types';
import { ObjectId } from 'mongodb';

@Injectable('IChangePasswordUsecase')
export default class ChangePasswordUsecase implements IChangePasswordUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly userDatasource: IInternalUserDatasource
  ) { }

  async execute(payload: ChangePasswordPayload) {
    if (!payload.newPassword || !payload.oldPassword) {
      return new Left(new ChangePasswordInvalidPassError());
    }

    const userResult = await this.userDatasource.findById(new ObjectId(payload.userId));
    if (userResult.isError) return userResult;
    if (!userResult.success) return new Left(new ChangePasswordInvalidPassError());
    const { success: user } = userResult;

    const oldPassIsValid = await user.comparePasswords(payload.oldPassword);
    if (!oldPassIsValid) return new Left(new ChangePasswordInvalidOldPassError());

    user.password = payload.newPassword;
    await user.hashPassword();
    const insertResult = await this.userDatasource.update(user);
    if (insertResult.isError) return insertResult;

    return new Right('Senha atualizada com sucesso!');
  }
}
