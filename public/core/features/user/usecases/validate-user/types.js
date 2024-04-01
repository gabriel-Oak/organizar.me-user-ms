"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="eb1ab5dd-8c26-5788-9ec1-e3595701925e")}catch(e){}}();

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
//# debugId=eb1ab5dd-8c26-5788-9ec1-e3595701925e
