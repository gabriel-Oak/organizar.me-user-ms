"use strict";
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
        message: 'Error, looks like the route you are looking for has been removed or doesn\'t exists',
        statusCode: 404,
        meta: req.url
    })));
};
exports.default = createRouter;
