"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f6e62349-93bb-517b-98fd-495d84b307bd")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './decode-user-token';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const decode_user_token_1 = __importDefault(require("./decode-user-token"));
const createDecodeUserTokenUsecase = () => new decode_user_token_1.default((0, internal_datasource_1.default)());
exports.default = createDecodeUserTokenUsecase;
//# sourceMappingURL=index.js.map
//# debugId=f6e62349-93bb-517b-98fd-495d84b307bd
