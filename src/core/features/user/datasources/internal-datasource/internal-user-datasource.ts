import { ILoggerService } from '../../../../utils/services/logger-service/types';
import { Either, Left, Right } from '../../../../utils/types';
import { DataSource, Repository } from 'typeorm';
import UserSchema from '../../schemas/user-schema';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import Injectable from '../../../../utils/decorators/injectable';
import { inject } from 'inversify';
import { ObjectId } from 'mongodb';
import User from '../../entities/user';

@Injectable('IInternalUserDatasource')
export default class InternalUserDatasource implements IInternalUserDatasource {
  constructor(
    @inject('Repository<UserSchema>')
    private readonly userRepository: Repository<UserSchema>,

    @inject('ILoggerService')
    private readonly logger: ILoggerService,

    @inject('DataSource')
    private readonly dataSource: DataSource
  ) { }

  async findManyByIds(userIds: string[]) {
    try {
      const users: UserSchema[] = await this.dataSource
        .getMongoRepository(UserSchema)
        .find({
          where: {
            _id: { $in: userIds.map((userId) => new ObjectId(userId)) }
          }
        });

      return new Right(users.map((user) => new User(user.getProps())));
    } catch (e: any) {
      console.log(e);

      const error = new InternalUserDatasourceError(
        e.message || `Oops, desculpe, tivemos um problema buscando por (${userIds.join(', ')})`,
        { ...e, userIds }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return new Right(user ? new User(user?.getProps()) : null);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Oops, desculpe, tivemos um problema buscando por ${email}`,
        { ...(e as any), email }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findById(userId: string) {
    try {
      const user = await this.userRepository.findOneBy({
        _id: new ObjectId(userId)
      } as any);
      return new Right(user ? new User(user.getProps()) : null);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema buscando pelo usuário ${userId}`,
        { ...(e as any), userId }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async save(user: User): Promise<Either<InternalUserDatasourceError, User>> {
    try {
      const result = await this.userRepository.save(new UserSchema({
        ...user,
        id: undefined
      }));
      result.password = undefined;
      return new Right(new User({
        ...result,
        id: result.id?.toString()
      }));
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema ao salvar o usuário ${user.name}`,
        { ...(e as any), user }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async update(user: User) {
    try {
      await this.userRepository.update(user.id!, user);
      return new Right(null);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema para atualizar o usuário ${user.name}`,
        { ...(e as any), user }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async remove(userId: string) {
    try {
      const user = await this.userRepository.findOneBy({ _id: new ObjectId(userId) } as any);
      if (!user) throw new Error(`Oops, usuário ${userId.toString()} não encontrado, pode já ter sido deletado`);

      const result = await this.userRepository.remove(user);
      return new Right(new User({
        ...result,
        id: result.id?.toString()
      }));
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema ao salvar o usuário ${userId}`,
        { ...(e as any), userId }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }
}
