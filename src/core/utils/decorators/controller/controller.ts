import { injectable } from 'inversify';
import { SYMBOL_CONTROLLER } from './symbols';
import createContainer from '../container';

export default function Controller<T extends abstract new (...args: any) => unknown>(path: string) {
  return (
    target: T
  ) => {
    Reflect.defineMetadata(SYMBOL_CONTROLLER, path, target);
    const inject = injectable();
    inject(target);
    const container = createContainer();

    container.bind<T>(target.name).to(target as any).inSingletonScope();
  };
}
