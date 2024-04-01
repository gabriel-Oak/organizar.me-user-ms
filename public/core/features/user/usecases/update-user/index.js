"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c12c3dae-5f4b-56ab-9577-8bf9332da1e9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './update-user';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const update_user_1 = __importDefault(require("./update-user"));
const createUpdateUserUsecase = () => new update_user_1.default((0, internal_datasource_1.default)());
exports.default = createUpdateUserUsecase;
//# sourceMappingURL=index.js.map
//# debugId=c12c3dae-5f4b-56ab-9577-8bf9332da1e9
