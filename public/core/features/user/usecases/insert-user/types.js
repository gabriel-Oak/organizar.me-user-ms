"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ded21ce5-62da-5d1a-a8d1-99682096b1ce")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUserAlreadyExist = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class InsertUserAlreadyExist extends base_error_1.default {
    constructor() {
        super('Um usuário com esse email já existe, tente um email diferente');
        this.type = 'insert-user-already-exist';
    }
}
exports.InsertUserAlreadyExist = InsertUserAlreadyExist;
//# sourceMappingURL=types.js.map
//# debugId=ded21ce5-62da-5d1a-a8d1-99682096b1ce
