"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b8778c36-aa94-5d79-9a8c-bbaa76bf8fe5")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger_service_1 = __importDefault(require("./logger-service"));
const container_1 = __importDefault(require("../../decorators/container"));
(0, container_1.default)().bind('Logger')
    .toDynamicValue(() => (0, winston_1.createLogger)());
let instance;
const createLoggerService = () => {
    if (!instance)
        instance = new logger_service_1.default((0, winston_1.createLogger)());
    return instance;
};
exports.default = createLoggerService;
//# sourceMappingURL=index.js.map
//# debugId=b8778c36-aa94-5d79-9a8c-bbaa76bf8fe5
