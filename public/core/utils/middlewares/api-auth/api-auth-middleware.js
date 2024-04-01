"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const http_error_1 = __importDefault(require("../../errors/http-error"));
const auto_bind_1 = __importDefault(require("../../helpers/auto-bind"));
class ApiAuthMiddleware {
    constructor(logger) {
        this.logger = logger;
        (0, auto_bind_1.default)(this);
    }
    async execute(request, reply) {
        const apiToken = request.headers['api-token'];
        if (apiToken !== constants_1.API_TOKEN) {
            const error = new http_error_1.default({
                statusCode: 401,
                message: 'Acesso não autorizado'
            });
            this.logger.warn('Tentativa de acesso não permitida', {
                ip: request.ip,
                apiToken
            });
            await reply.code(error.statusCode).send(error);
        }
    }
}
exports.default = ApiAuthMiddleware;
