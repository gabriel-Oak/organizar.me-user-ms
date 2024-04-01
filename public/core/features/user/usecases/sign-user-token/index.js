"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="12fd82d5-502f-5801-a88e-8c0a9005c82b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  './sign-user-token';
const cache_service_1 = __importDefault(require("../../../../utils/services/cache-service"));
const sign_user_token_1 = __importDefault(require("./sign-user-token"));
const createSignUserTokenUsecase = () => new sign_user_token_1.default((0, cache_service_1.default)());
exports.default = createSignUserTokenUsecase;
//# sourceMappingURL=index.js.map
//# debugId=12fd82d5-502f-5801-a88e-8c0a9005c82b
