"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ace69b01-3741-5849-9267-44cf10fc7590")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInvalidPassError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class UpdateUserInvalidPassError extends base_error_1.default {
    constructor() {
        super('A senha está incorreta, tente de novo');
        this.type = 'update-user-invalid-pass';
    }
}
exports.UpdateUserInvalidPassError = UpdateUserInvalidPassError;
//# sourceMappingURL=types.js.map
//# debugId=ace69b01-3741-5849-9267-44cf10fc7590
