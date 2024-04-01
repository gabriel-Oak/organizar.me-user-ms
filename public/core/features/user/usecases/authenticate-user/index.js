"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6fb10c7c-508a-57ef-aa48-e81d3f91eeb4")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './authenticate-user';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const authenticate_user_1 = __importDefault(require("./authenticate-user"));
const createAuthenticateUserUsecase = () => new authenticate_user_1.default((0, internal_datasource_1.default)());
exports.default = createAuthenticateUserUsecase;
//# sourceMappingURL=index.js.map
//# debugId=6fb10c7c-508a-57ef-aa48-e81d3f91eeb4
