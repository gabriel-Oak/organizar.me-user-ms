import { ILoggerService } from '../../../../utils/services/logger-service/types';
import { Left, Right } from '../../../../utils/types';
import { In, Repository } from 'typeorm';
import UserSchema from '../../schemas/user-schema';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import Injectable from '../../../../utils/decorators/injectable';
import { inject } from 'inversify';
import { ObjectId } from 'mongodb';
import User from '../../entities/user';

@Injectable('IInternalUserDatasource')
export default class InternalUserDatasource implements IInternalUserDatasource {
  constructor(
    @inject('Repository<UserSchema>') private readonly userRepository: Repository<UserSchema>,
    @inject('ILoggerService') private readonly logger: ILoggerService
  ) { }

  async findManyByIds(userIds: string[]) {
    try {
      const users = await this.userRepository.findBy({ id: In(userIds) });
      return new Right(users.map((user) => new User(user.getProps())));
    } catch (e: any) {
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
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Oops, desculpe, tivemos um problema buscando por ${email}`,
        { ...(e as any), email }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findById(userId: ObjectId) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema buscando pelo usuário ${userId.toString()}`,
        { ...(e as any), userId }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async save(user: UserSchema) {
    try {
      const result = await this.userRepository.save(user);
      result.password = undefined;
      return new Right(result);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema ao salvar o usuário ${user.name}`,
        { ...(e as any), user }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async update(user: UserSchema) {
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

  async remove(userId: ObjectId) {
    try {
      const user = await this.userRepository.findOneBy({ id: new ObjectId(userId) });
      if (!user) throw new Error(`Oops, usuário ${userId.toString()} não encontrado, pode já ter sido deletado`);

      const result = await this.userRepository.remove(user);
      return new Right(result);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema ao salvar o usuário ${userId.toString()}`,
        { ...(e as any), userId }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }
}
