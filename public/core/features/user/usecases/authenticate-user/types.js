"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="20f48bb9-9f35-5f11-9da4-14be146d49f7")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserWrongPasswordError = exports.AuthenticateUserNotFoundError = exports.AuthenticateInvalidError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class AuthenticateInvalidError extends base_error_1.default {
    constructor() {
        super('Oh não parece que você não informou um email ou uma senha');
        this.type = 'authenticate-invalid';
    }
}
exports.AuthenticateInvalidError = AuthenticateInvalidError;
class AuthenticateUserNotFoundError extends base_error_1.default {
    constructor() {
        super('Desculpe não conseguimos encontrar um usuário com esse email =/');
        this.type = 'authenticate-user-not-found';
    }
}
exports.AuthenticateUserNotFoundError = AuthenticateUserNotFoundError;
class AuthenticateUserWrongPasswordError extends base_error_1.default {
    constructor() {
        super('Senha errada, tente de novo por favor');
        this.type = 'authenticate-user-wrong-password';
    }
}
exports.AuthenticateUserWrongPasswordError = AuthenticateUserWrongPasswordError;
//# sourceMappingURL=types.js.map
//# debugId=20f48bb9-9f35-5f11-9da4-14be146d49f7
