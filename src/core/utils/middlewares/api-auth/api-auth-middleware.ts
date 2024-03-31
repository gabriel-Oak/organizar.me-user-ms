import { FastifyRequest, FastifyReply } from 'fastify';
import { IApiAuthMiddleware } from './types';
import { API_TOKEN } from '../../constants';
import { ILoggerService } from '../../services/logger-service/types';
import HttpError from '../../errors/http-error';
import autoBind from '../../helpers/auto-bind';

export default class ApiAuthMiddleware implements IApiAuthMiddleware {
  constructor(
    private readonly logger: ILoggerService
  ) { autoBind(this); }

  async execute(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const apiToken = request.headers['api-token'];
    if (apiToken !== API_TOKEN) {
      const error = new HttpError({
        statusCode: 401,
        message: 'Acesso não autorizado'
      });

      this.logger.warn('Tentativa de acesso não permitida', {
        ip: request.ip,
        apiToken
      });

      await reply.code(error.statusCode).send(error);
    }
  }
}
