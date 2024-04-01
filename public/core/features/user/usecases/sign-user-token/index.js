"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  './sign-user-token';
const cache_service_1 = __importDefault(require("../../../../utils/services/cache-service"));
const sign_user_token_1 = __importDefault(require("./sign-user-token"));
const createSignUserTokenUsecase = () => new sign_user_token_1.default((0, cache_service_1.default)());
exports.default = createSignUserTokenUsecase;
