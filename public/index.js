"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0c88a72d-3c2e-593a-87e2-1b133f476e96")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./fastify/server"));
const container_1 = __importDefault(require("./core/utils/decorators/container"));
const container = (0, container_1.default)();
const logger = container.get('ILoggerService');
(0, server_1.default)()
    .catch((error) => logger.error(error.message ?? error, error));
//# sourceMappingURL=index.js.map
//# debugId=0c88a72d-3c2e-593a-87e2-1b133f476e96
