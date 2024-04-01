"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="632ee306-e543-5021-aad1-0fa02a29a754")}catch(e){}}();

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
//# sourceMappingURL=api-auth-middleware.js.map
//# debugId=632ee306-e543-5021-aad1-0fa02a29a754
