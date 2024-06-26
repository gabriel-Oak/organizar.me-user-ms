import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../../../utils/decorators/controller/controller';
import HttpError from '../../../utils/errors/http-error';
import { IAuthenticateUserUsecase, LoginPayload } from '../usecases/authenticate-user/types';
import { IDecodeUserTokenUsecase } from '../usecases/decode-user-token/types';
import { IInsertUserUsecase } from '../usecases/insert-user/types';
import { ISignUserTokenUsecase } from '../usecases/sign-user-token/types';
import { IValidateUserUsecase } from '../usecases/validate-user/types';
import privateRoute from '../../../utils/decorators/controller/private-route';
import { ChangePasswordBody, IChangePasswordUsecase } from '../usecases/change-password/types';
import { IUpdateUserUsecase, updateUserProps } from '../usecases/update-user/types';
import Post from '../../../utils/decorators/controller/post';
import Get from '../../../utils/decorators/controller/get';
import Patch from '../../../utils/decorators/controller/patch';
import { inject } from 'inversify';
import { IRemoveUserUsecase } from '../usecases/remove-user/types';
import Del from '../../../utils/decorators/controller/del';
import { IListUsersUsecase, ListUsersIncompleteResult } from '../usecases/list-users/types';
import User, { UserProps } from '../entities/user';

@Controller('/user')
export default class UserController {
  constructor(
    @inject('IValidateUserUsecase')
    private readonly validateUser: IValidateUserUsecase,

    @inject('IInsertUserUsecase')
    private readonly insertUser: IInsertUserUsecase,

    @inject('ISignUserTokenUsecase')
    private readonly signUserToken: ISignUserTokenUsecase,

    @inject('IAuthenticateUserUsecase')
    private readonly authenticateUser: IAuthenticateUserUsecase,

    @inject('IDecodeUserTokenUsecase')
    private readonly decodeUserToken: IDecodeUserTokenUsecase,

    @inject('IChangePasswordUsecase')
    private readonly changePassword: IChangePasswordUsecase,

    @inject('IUpdateUserUsecase')
    private readonly updateUser: IUpdateUserUsecase,

    @inject('IRemoveUserUsecase')
    private readonly removeUser: IRemoveUserUsecase,

    @inject('IListUsersUsecase')
    private readonly listUsers: IListUsersUsecase
  ) { }

  @Get('/list')
  async list(req: FastifyRequest, reply: FastifyReply) {
    const userIds = (req.query as any)?.userIds || '';
    const result = await this.listUsers.execute(userIds.split(','));

    if (result.isError) {
      const error = new HttpError({
        ...result.error,
        statusCode: result.error.type === 'list-user-validation'
          ? 400
          : 500
      });
      return await reply.code(error.statusCode).send(error);
    }

    return await reply.code(
      result.success instanceof ListUsersIncompleteResult ? 207 : 200
    ).send(result.success);
  }

  @Post('/new')
  async new(req: FastifyRequest, reply: FastifyReply) {
    const payload = req.body as Omit<UserProps, 'id'>;
    const validate = this.validateUser.execute(payload);
    if (validate.isError) {
      const error = new HttpError({
        ...validate.error,
        statusCode: 400
      });
      return await reply.code(error.statusCode).send(error);
    }

    const insertResult = await this.insertUser.execute(payload);
    if (insertResult.isError) {
      const error = new HttpError(insertResult.error);
      if (insertResult.error.type === 'insert-user-already-exist') error.statusCode = 409;
      return await reply.code(error.statusCode).send(error);
    }

    const { success: user } = insertResult;
    const auth = this.signUserToken.execute(user);
    return await reply.send({ auth, user });
  }

  @Post('/authenticate')
  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    const payload = req.body as LoginPayload;
    const authResult = await this.authenticateUser.execute(payload);
    if (authResult.isError) {
      const error = new HttpError({
        ...authResult.error,
        statusCode: {
          'authenticate-user-not-found': 404,
          'authenticate-user-wrong-password': 403,
          'authenticate-invalid': 400
        }[String(authResult.error.type)] ?? 500
      });
      return await reply.code(error.statusCode).send(error);
    }

    const { success: user } = authResult;
    const auth = this.signUserToken.execute(user);
    return await reply.send({ user, auth });
  }

  @Get('/decode')
  @privateRoute()
  async decode(req: FastifyRequest, reply: FastifyReply, user: User) {
    return await reply.send(user);
  }

  @Patch('/change-password')
  @privateRoute()
  async changeUserPassword(req: FastifyRequest, reply: FastifyReply, user: User) {
    const { body } = req as { body: ChangePasswordBody };
    const result = await this.changePassword.execute({
      ...body,
      userId: user.id as unknown as string
    });
    if (!result.isError) return await reply.send({ message: result.success });

    const error = new HttpError(result.error)
    if (result.error.type === 'change-password-invalid-pass') {
      error.statusCode = 400;
    }
    return await reply.code(error.statusCode).send(error);
  }

  @Patch('/update-user')
  @privateRoute()
  async update(req: FastifyRequest, reply: FastifyReply, user: User) {
    const { body } = req as { body: updateUserProps };
    const result = await this.updateUser.execute(user, body);
    if (!result.isError) return await reply.send();

    const error = new HttpError(result.error);
    if (result.error.type === 'update-user-invalid-pass') error.statusCode = 403;
    return await reply.code(error.statusCode).send(error);
  }

  @Del('/remove')
  @privateRoute()
  async remove(_: FastifyRequest, reply: FastifyReply, user: User) {
    const result = await this.removeUser.execute(user);
    if (!result.isError) return await reply.send();

    const error = new HttpError(result.error);
    return await reply.code(error.statusCode).send(error);
  }
}
