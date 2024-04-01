import { FastifyReply } from 'fastify';
import { FastifyRequestType } from 'fastify/types/type-provider';
import UserModel from '../../../features/user/models/user-model';

export type controllerAction = (req: FastifyRequestType, resp: FastifyReply, user?: UserModel) => (
  unknown | Promise<unknown>
);

export interface IControllerActionMeta {
  path: string,
  action: string
}

export type ICreateController<T> = () => T;
