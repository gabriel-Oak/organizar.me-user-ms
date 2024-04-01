"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './authenticate-user';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const authenticate_user_1 = __importDefault(require("./authenticate-user"));
const createAuthenticateUserUsecase = () => new authenticate_user_1.default((0, internal_datasource_1.default)());
exports.default = createAuthenticateUserUsecase;
