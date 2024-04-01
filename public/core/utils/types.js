"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="643b4717-24b5-533f-a811-e1f0868ef024")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Left = void 0;
class Left {
    constructor(error) {
        this.isError = true;
        this.error = error;
    }
}
exports.Left = Left;
class Right {
    constructor(success) {
        this.isError = false;
        this.success = success;
    }
}
exports.Right = Right;
//# sourceMappingURL=types.js.map
//# debugId=643b4717-24b5-533f-a811-e1f0868ef024
