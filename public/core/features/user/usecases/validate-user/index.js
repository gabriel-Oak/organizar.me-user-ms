"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d3d35f5a-7310-52bf-bd68-418abbf7c65f")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_user_1 = __importDefault(require("./validate-user"));
const createValidateUserUsecase = () => new validate_user_1.default();
exports.default = createValidateUserUsecase;
//# sourceMappingURL=index.js.map
//# debugId=d3d35f5a-7310-52bf-bd68-418abbf7c65f
