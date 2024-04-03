import { Either, Left } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import UserSchema, { UserSchemaProps } from '../../schemas/user-schema';
import { DecodeUserInvalidTokenError, DecodeUserNotFoundError, decodeUserTokenErrors, IDecodeUserTokenUsecase } from './types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../utils/constants';
import Injectable from '../../../../utils/decorators/injectable';
import { inject } from 'inversify';
import { ObjectId } from 'mongodb';

@Injectable('IDecodeUserTokenUsecase')
export default class DecodeUserTokenUsecase implements IDecodeUserTokenUsecase {
  constructor(
    @inject('IInternalUserDatasource')
    private readonly userDatasource: IInternalUserDatasource
  ) { }

  async execute(token: string) {
    try {
      const decodedUser = jwt.verify(token, JWT_SECRET) as Omit<UserSchemaProps, 'id'> & { id: string };
      const userResult = await this.userDatasource.findById(new ObjectId(decodedUser.id));

      if (userResult.isError || userResult.success) {
        return userResult as unknown as Either<decodeUserTokenErrors, UserSchema>;
      }

      return new Left(new DecodeUserNotFoundError());
    } catch (_) {
      return new Left(new DecodeUserInvalidTokenError());
    }
  }
}
