"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const app_1 = __importDefault(require("./app"));
const container_1 = __importDefault(require("../core/utils/decorators/container"));
async function startServer() {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    const port = process_1.env.PORT ?? 8080;
    const app = await (0, app_1.default)();
    await app.listen({ port: +port, host: '0.0.0.0' })
        .catch((e) => logger.error('Error starting server', e));
    logger.info(`Server started at port ${port}`);
    return app;
}
exports.default = startServer;
