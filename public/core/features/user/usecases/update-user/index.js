"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './update-user';
const internal_datasource_1 = __importDefault(require("../../datasources/internal-datasource"));
const update_user_1 = __importDefault(require("./update-user"));
const createUpdateUserUsecase = () => new update_user_1.default((0, internal_datasource_1.default)());
exports.default = createUpdateUserUsecase;
