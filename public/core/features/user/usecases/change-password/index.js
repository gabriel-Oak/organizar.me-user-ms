"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7c3b8a62-358c-5826-bbd6-148fab73f643")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './change-password';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const change_password_1 = __importDefault(require("./change-password"));
const createChangePasswordUsecase = () => new change_password_1.default((0, internal_datasource_1.default)());
exports.default = createChangePasswordUsecase;
//# sourceMappingURL=index.js.map
//# debugId=7c3b8a62-358c-5826-bbd6-148fab73f643
