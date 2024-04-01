import { ILoggerService } from '../../../../utils/services/logger-service/types';
import { Left, Right } from '../../../../utils/types';
import { Repository, ObjectId } from 'typeorm';
import UserModel from '../../models/user-model';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import Injectable from '../../../../utils/decorators/injectable';
import { inject } from 'inversify';

@Injectable('IInternalUserDatasource')
export default class InternalUserDatasource implements IInternalUserDatasource {
  constructor(
    @inject('Repository<UserModel>') private readonly userRepository: Repository<UserModel>,
    @inject('ILoggerService') private readonly logger: ILoggerService
  ) { }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Oops, sorry got an error searching for ${email}`,
        { ...(e as any), email }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findById(userId: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId as unknown as ObjectId });
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as any).message || `Opa, foi mal tivemos um problema buscando pelo usuário ${userId}`,
        { ...(e as any), userId }
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async save(user: UserModel) {
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

  async update(user: UserModel) {
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
      const user = await this.userRepository.findOneBy({ id: userId as unknown as ObjectId });
      if (!user) throw new Error(`Oops, usuário ${userId} não encontrado, pode já ter sido deletado`);

      const result = await this.userRepository.remove(user);
      return new Right(result);
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
