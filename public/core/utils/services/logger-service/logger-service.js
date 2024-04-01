"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5925b933-2a8a-55d9-b738-e0a81f0de7e2")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const winston_1 = __importStar(require("winston"));
const injectable_1 = __importDefault(require("../../decorators/injectable"));
const inversify_1 = require("inversify");
const Sentry = __importStar(require("@sentry/node"));
let LoggerService = class LoggerService {
    constructor(logger) {
        this.logger = logger;
        this.format = winston_1.default.format.printf(({ level, message }) => {
            const payload = `${new Date().toLocaleString('pt-BR')} [${level.toUpperCase()}]: ${message.message ||
                message.error ||
                message}`;
            if (level === 'error')
                Sentry.captureException(payload);
            else
                Sentry.captureMessage(payload);
            return payload;
        });
        if (process.env.NODE_ENV !== 'production') {
            logger.add(new winston_1.default.transports.Console({
                format: this.format
            }));
        }
    }
    info(message, data) {
        let payload = message;
        if (data)
            payload += `: ${JSON.stringify(data, null, 2)}`;
        this.logger.info(payload, data);
    }
    error(message, data) {
        let payload = message;
        if (data)
            payload += `: ${JSON.stringify(data, null, 2)}`;
        this.logger.error(payload, data);
    }
    warn(message, data) {
        let payload = message;
        if (data)
            payload += `: ${JSON.stringify(data, null, 2)}`;
        this.logger.warn(payload, data);
    }
    debug(message, data) {
        let payload = message;
        if (data)
            payload += `: ${JSON.stringify(data, null, 2)}`;
        this.logger.debug(payload, data);
    }
};
LoggerService = __decorate([
    (0, injectable_1.default)('ILoggerService'),
    __param(0, (0, inversify_1.inject)('Logger')),
    __metadata("design:paramtypes", [winston_1.Logger])
], LoggerService);
exports.default = LoggerService;
//# sourceMappingURL=logger-service.js.map
//# debugId=5925b933-2a8a-55d9-b738-e0a81f0de7e2
