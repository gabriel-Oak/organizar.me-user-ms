"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="92bdeebd-3e81-5b6c-96ac-231d06519612")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = __importDefault(require("../../services/logger-service"));
const api_auth_middleware_1 = __importDefault(require("./api-auth-middleware"));
let instance;
const createApiAuthMiddleware = () => {
    if (!instance) {
        instance = new api_auth_middleware_1.default((0, logger_service_1.default)());
    }
    return instance;
};
exports.default = createApiAuthMiddleware;
//# sourceMappingURL=index.js.map
//# debugId=92bdeebd-3e81-5b6c-96ac-231d06519612
