"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4ab5b16f-07a8-5f4c-b540-f27582bf16af")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __importDefault(require("./base-error"));
class HttpError extends base_error_1.default {
    constructor(props) {
        const { message, statusCode, meta } = props ?? {};
        const defaultMessage = 'Tivemos algum problema desconhecido';
        const defaultStatusCode = 500;
        super(message ?? defaultMessage, process.env.NODE_ENV !== 'production' ? meta : undefined);
        this.type = 'http-error';
        this.toString = () => `${this.statusCode}: ${this.message}${this.meta
            ? ` | \n${JSON.stringify(this.meta)}`
            : ''}`;
        this.statusCode = statusCode ?? defaultStatusCode;
    }
}
exports.default = HttpError;
//# sourceMappingURL=http-error.js.map
//# debugId=4ab5b16f-07a8-5f4c-b540-f27582bf16af
