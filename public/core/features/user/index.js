"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9f8a5bc1-e9c6-5d1d-bb53-bbfb63665bf0")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./datasources");
require("./usecases");
const controller_1 = __importDefault(require("./controller"));
const userControllers = [controller_1.default];
exports.default = userControllers;
//# sourceMappingURL=index.js.map
//# debugId=9f8a5bc1-e9c6-5d1d-bb53-bbfb63665bf0
