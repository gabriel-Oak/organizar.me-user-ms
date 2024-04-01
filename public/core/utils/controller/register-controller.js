"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1e900a44-cb28-5704-9fa6-88607bb4eebe")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decode_user_token_1 = __importDefault(require("../../features/user/usecases/decode-user-token"));
const http_error_1 = __importDefault(require("../errors/http-error"));
const logger_service_1 = __importDefault(require("../services/logger-service"));
const symbols_1 = require("../decorators/controller/symbols");
function registerController(path, controller, app) {
    function processMeta(symbol, method) {
        if (Reflect.hasMetadata(symbol, controller.constructor)) {
            const actions = Reflect.getMetadata(symbol, controller.constructor);
            const privateRoutes = Reflect.getMetadata(symbols_1.SYMBOL_PRIVATE, controller.constructor);
            actions.forEach(({ path: p, action }) => {
                const actionPath = p === '/' ? '' : p;
                app[method](`${path}${actionPath}`, async (req, rep) => {
                    try {
                        let user;
                        if (privateRoutes?.includes(action)) {
                            const decoder = (0, decode_user_token_1.default)();
                            const { auth } = req.headers;
                            const decodeResult = await decoder.execute(String(auth));
                            if (decodeResult.isError) {
                                const error = new http_error_1.default({
                                    message: 'Sorry, you need to specify a valid "auth" header token.',
                                    meta: decodeResult.error,
                                    statusCode: 403
                                });
                                return await rep.code(error.statusCode).send(error);
                            }
                            user = decodeResult.success;
                        }
                        const res = await controller[action](req, rep, user);
                        return res;
                    }
                    catch (e) {
                        const error = new http_error_1.default({
                            message: e.message,
                            meta: e
                        });
                        const logger = (0, logger_service_1.default)();
                        logger.error(error.message, error);
                        await rep.code(error.statusCode).send(error);
                    }
                });
            });
        }
    }
    processMeta(symbols_1.SYMBOL_GET, 'get');
    processMeta(symbols_1.SYMBOL_POST, 'post');
    processMeta(symbols_1.SYMBOL_PATCH, 'patch');
    processMeta(symbols_1.SYMBOL_PUT, 'put');
    processMeta(symbols_1.SYMBOL_DELETE, 'delete');
}
exports.default = registerController;
//# sourceMappingURL=register-controller.js.map
//# debugId=1e900a44-cb28-5704-9fa6-88607bb4eebe
