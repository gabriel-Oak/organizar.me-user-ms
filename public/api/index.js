"use strict";
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
