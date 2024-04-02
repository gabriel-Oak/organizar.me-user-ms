"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="10ab3ec1-9f32-547d-8946-5030233789de")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import createUserController from '../core/features/user/controller';
const http_error_1 = __importDefault(require("../core/utils/errors/http-error"));
const build_routes_1 = __importDefault(require("../core/utils/controller/build-routes"));
const user_1 = __importDefault(require("../core/features/user"));
const health_1 = __importDefault(require("../core/features/health"));
const createRouter = (app) => {
    (0, build_routes_1.default)(app, [
        ...user_1.default,
        ...health_1.default
    ]);
    app.get('/*', (req, res) => res.code(404).send(new http_error_1.default({
        message: 'Erro, parece que a rota pela qual você está procurando não existe ou foi movida',
        statusCode: 404,
        meta: req.url
    })));
};
exports.default = createRouter;
//# sourceMappingURL=routes.js.map
//# debugId=10ab3ec1-9f32-547d-8946-5030233789de
