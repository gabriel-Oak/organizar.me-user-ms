"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './decode-user-token';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const decode_user_token_1 = __importDefault(require("./decode-user-token"));
const createDecodeUserTokenUsecase = () => new decode_user_token_1.default((0, internal_datasource_1.default)());
exports.default = createDecodeUserTokenUsecase;
