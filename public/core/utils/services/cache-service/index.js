"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("../../constants");
const logger_service_1 = __importDefault(require("../logger-service"));
const cache_service_1 = __importDefault(require("./cache-service"));
const container_1 = __importDefault(require("../../decorators/container"));
let instance;
const createCacheService = () => {
    if (!instance) {
        instance = new cache_service_1.default(new ioredis_1.default({
            port: +constants_1.REDIS_PORT,
            host: constants_1.REDIS_HOST,
            password: constants_1.REDIS_PASS,
            keyPrefix: 'cache'
        }), (0, logger_service_1.default)());
    }
    return instance;
};
exports.default = createCacheService;
(0, container_1.default)().bind('RedisClient')
    .toDynamicValue(() => new ioredis_1.default({
    port: +constants_1.REDIS_PORT,
    host: constants_1.REDIS_HOST,
    password: constants_1.REDIS_PASS,
    keyPrefix: 'cache'
}));
