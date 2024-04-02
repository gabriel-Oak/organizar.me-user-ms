"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d19907ce-2fb4-5f8b-bfa7-9ead7566c653")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordInvalidOldPassError = exports.ChangePasswordInvalidPassError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class ChangePasswordInvalidPassError extends base_error_1.default {
    constructor(message) {
        super(message ?? 'As senhas não batem, verifique se as digitou corretamente');
        this.type = 'change-password-invalid-pass';
    }
}
exports.ChangePasswordInvalidPassError = ChangePasswordInvalidPassError;
class ChangePasswordInvalidOldPassError extends ChangePasswordInvalidPassError {
    constructor() {
        super('A senha informada está incorreta');
    }
}
exports.ChangePasswordInvalidOldPassError = ChangePasswordInvalidOldPassError;
//# sourceMappingURL=types.js.map
//# debugId=d19907ce-2fb4-5f8b-bfa7-9ead7566c653
