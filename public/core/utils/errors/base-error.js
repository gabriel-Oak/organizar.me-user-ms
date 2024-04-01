"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cc3eeeb4-0a72-5875-9ca6-a8f75951bfcf")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, meta) {
        super();
        this.message = message;
        this.meta = meta;
    }
}
exports.default = BaseError;
//# sourceMappingURL=base-error.js.map
//# debugId=cc3eeeb4-0a72-5875-9ca6-a8f75951bfcf
