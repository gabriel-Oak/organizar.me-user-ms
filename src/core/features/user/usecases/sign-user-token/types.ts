import UserModel from '../../models/user-model';

export interface ISignUserTokenUsecase {
  execute: (user: UserModel) => string;
}
