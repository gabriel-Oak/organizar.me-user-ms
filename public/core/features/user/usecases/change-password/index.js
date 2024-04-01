"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './change-password';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const change_password_1 = __importDefault(require("./change-password"));
const createChangePasswordUsecase = () => new change_password_1.default((0, internal_datasource_1.default)());
exports.default = createChangePasswordUsecase;
