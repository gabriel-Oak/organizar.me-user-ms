"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6aad211e-60b4-57fb-8458-04275e54e2df")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './insert-user';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const insert_user_1 = __importDefault(require("./insert-user"));
const createInsertUserUsecase = () => new insert_user_1.default((0, internal_datasource_1.default)());
exports.default = createInsertUserUsecase;
//# sourceMappingURL=index.js.map
//# debugId=6aad211e-60b4-57fb-8458-04275e54e2df
