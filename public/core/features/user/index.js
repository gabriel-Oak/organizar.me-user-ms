"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./datasources");
require("./usecases");
const controller_1 = __importDefault(require("./controller"));
const userControllers = [controller_1.default];
exports.default = userControllers;
