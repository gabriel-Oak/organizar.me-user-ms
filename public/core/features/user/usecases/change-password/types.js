"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1fc1f706-5e72-5c5e-820a-bffc0c9f50d6")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordInvalidOldPassError = exports.ChangePasswordInvalidPassError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class ChangePasswordInvalidPassError extends base_error_1.default {
    constructor(message) {
        super(message ?? 'Invalid passwords informed, check if its spelled right and try again');
        this.type = 'change-password-invalid-pass';
    }
}
exports.ChangePasswordInvalidPassError = ChangePasswordInvalidPassError;
class ChangePasswordInvalidOldPassError extends ChangePasswordInvalidPassError {
    constructor() {
        super('Invalid old password, check if its spelled right and try again');
    }
}
exports.ChangePasswordInvalidOldPassError = ChangePasswordInvalidOldPassError;
//# sourceMappingURL=types.js.map
//# debugId=1fc1f706-5e72-5c5e-820a-bffc0c9f50d6
