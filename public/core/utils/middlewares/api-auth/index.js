"use strict";
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
