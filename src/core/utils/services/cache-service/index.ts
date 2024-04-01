import Redis, { Redis as RedisClient } from 'ioredis';
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from '../../constants';
import createLoggerService from '../logger-service';
import CacheService from './cache-service';
import { ICacheService } from './types';
import createContainer from '../../decorators/container';

let instance: ICacheService;

const createCacheService = (): ICacheService => {
  if (!instance) {
    instance = new CacheService(new Redis({
      port: +REDIS_PORT!,
      host: REDIS_HOST,
      password: REDIS_PASS,
      keyPrefix: 'cache'
    }), createLoggerService());
  }
  return instance;
}

export default createCacheService;

createContainer().bind<RedisClient>('RedisClient')
  .toDynamicValue(() => new Redis({
    port: +REDIS_PORT!,
    host: REDIS_HOST,
    password: REDIS_PASS,
    keyPrefix: 'cache'
  }));
