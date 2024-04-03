import UserSchema from '../../schemas/user-schema';

export interface ISignUserTokenUsecase {
  execute: (user: UserSchema) => string;
}
