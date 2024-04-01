"use strict";
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
