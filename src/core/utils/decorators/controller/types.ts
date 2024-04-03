import { FastifyReply } from 'fastify';
import { FastifyRequestType } from 'fastify/types/type-provider';
import UserSchema from '../../../features/user/schemas/user-schema';

export type controllerAction = (req: FastifyRequestType, resp: FastifyReply, user?: UserSchema) => (
  unknown | Promise<unknown>
);

export interface IControllerActionMeta {
  path: string,
  action: string
}

export type ICreateController<T> = () => T;
