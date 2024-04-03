"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="57c163cb-3ce3-5e28-8962-194065c94f5b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersValidationError = exports.ListUsersIncompleteResult = exports.ListUsersCompleteResult = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class ListUsersCompleteResult {
    constructor(users) {
        Object.assign(this, { users, usersNotFound: [] });
    }
}
exports.ListUsersCompleteResult = ListUsersCompleteResult;
class ListUsersIncompleteResult {
    constructor({ users, usersNotFound }) {
        Object.assign(this, { users, usersNotFound });
    }
}
exports.ListUsersIncompleteResult = ListUsersIncompleteResult;
class ListUsersValidationError extends base_error_1.default {
    constructor() {
        super('Você precisa informar uma lista valida de ids');
        this.type = 'list-user-validation';
    }
}
exports.ListUsersValidationError = ListUsersValidationError;
//# sourceMappingURL=types.js.map
//# debugId=57c163cb-3ce3-5e28-8962-194065c94f5b
