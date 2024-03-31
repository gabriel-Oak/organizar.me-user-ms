import { FastifyReply, FastifyRequest } from 'fastify';

export interface IApiAuthMiddleware {
  execute: (
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<void>;
}
