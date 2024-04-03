"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="49534f07-3d9b-5fe5-bd28-c2c00e06cf1b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class ValidateUserError extends base_error_1.default {
    constructor() {
        super(...arguments);
        this.type = 'validate-user';
    }
}
exports.ValidateUserError = ValidateUserError;
//# sourceMappingURL=types.js.map
//# debugId=49534f07-3d9b-5fe5-bd28-c2c00e06cf1b
