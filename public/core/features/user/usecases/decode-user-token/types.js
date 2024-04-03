"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f69a61e9-9990-5c64-b554-abd190c292a7")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeUserNotFoundError = exports.DecodeUserInvalidTokenError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class DecodeUserInvalidTokenError extends base_error_1.default {
    constructor() {
        super('Desculpe, formato do token inválido, tente de novo');
        this.type = 'decode-user-invalid-token';
    }
}
exports.DecodeUserInvalidTokenError = DecodeUserInvalidTokenError;
class DecodeUserNotFoundError extends base_error_1.default {
    constructor() {
        super('Usuário não encontrado, tente entrar de novo');
        this.type = 'decode-user-not-found';
    }
}
exports.DecodeUserNotFoundError = DecodeUserNotFoundError;
//# sourceMappingURL=types.js.map
//# debugId=f69a61e9-9990-5c64-b554-abd190c292a7
