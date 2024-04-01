"use strict";
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
