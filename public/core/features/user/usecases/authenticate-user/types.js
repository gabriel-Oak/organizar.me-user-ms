"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77c53fca-bfb3-5bc6-952f-182460b8ca6c")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserWrongPasswordError = exports.AuthenticateUserNotFoundError = exports.AuthenticateInvalidError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class AuthenticateInvalidError extends base_error_1.default {
    constructor() {
        super('Oh looks like you didn\'t specify an email or a password');
        this.type = 'authenticate-invalid';
    }
}
exports.AuthenticateInvalidError = AuthenticateInvalidError;
class AuthenticateUserNotFoundError extends base_error_1.default {
    constructor() {
        super('Sorry couldn\'t find any user for this email =/');
        this.type = 'authenticate-user-not-found';
    }
}
exports.AuthenticateUserNotFoundError = AuthenticateUserNotFoundError;
class AuthenticateUserWrongPasswordError extends base_error_1.default {
    constructor() {
        super('Wrong password, please try again');
        this.type = 'authenticate-user-wrong-password';
    }
}
exports.AuthenticateUserWrongPasswordError = AuthenticateUserWrongPasswordError;
//# sourceMappingURL=types.js.map
//# debugId=77c53fca-bfb3-5bc6-952f-182460b8ca6c
