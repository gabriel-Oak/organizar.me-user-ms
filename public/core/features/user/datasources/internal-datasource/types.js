"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c48ba600-e1de-53c1-b7e7-a235688299c9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalUserDatasourceError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class InternalUserDatasourceError extends base_error_1.default {
    constructor() {
        super(...arguments);
        this.type = 'internal-user-datasource';
    }
}
exports.InternalUserDatasourceError = InternalUserDatasourceError;
//# sourceMappingURL=types.js.map
//# debugId=c48ba600-e1de-53c1-b7e7-a235688299c9
