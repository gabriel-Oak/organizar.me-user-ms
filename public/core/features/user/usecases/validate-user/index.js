"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_user_1 = __importDefault(require("./validate-user"));
const createValidateUserUsecase = () => new validate_user_1.default();
exports.default = createValidateUserUsecase;
