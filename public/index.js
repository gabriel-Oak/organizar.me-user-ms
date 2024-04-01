"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./fastify/config");
require("./core/utils/services/index");
const server_1 = __importDefault(require("./fastify/server"));
const container_1 = __importDefault(require("./core/utils/decorators/container"));
const container = (0, container_1.default)();
const logger = container.get('ILoggerService');
(0, server_1.default)()
    .catch((error) => logger.error(error.message ?? error, error));
