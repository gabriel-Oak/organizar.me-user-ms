"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7d36efc8-7c2c-5614-989b-4b22d6111bb9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("../core/utils/decorators/container"));
const server_1 = __importDefault(require("../fastify/server"));
async function handler(req, reply) {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    const app = await (0, server_1.default)()
        .catch((error) => logger.error(error.message ?? error, error));
    app.server.emit('request', req, reply);
}
exports.default = handler;
//# sourceMappingURL=index.js.map
//# debugId=7d36efc8-7c2c-5614-989b-4b22d6111bb9
