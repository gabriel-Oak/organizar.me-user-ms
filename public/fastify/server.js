"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f7addbc6-e036-5eec-bdc8-eb7a917621d6")}catch(e){}}();

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./config");
require("../core/utils/services/index");
const Sentry = __importStar(require("@sentry/node"));
const profiling_node_1 = require("@sentry/profiling-node");
const process_1 = require("process");
const app_1 = __importDefault(require("./app"));
const container_1 = __importDefault(require("../core/utils/decorators/container"));
const constants_1 = require("../core/utils/constants");
Sentry.init({
    dsn: constants_1.SENTRY_DSN,
    integrations: [
        (0, profiling_node_1.nodeProfilingIntegration)()
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0
});
async function startServer() {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    const port = process_1.env.PORT ?? 3001;
    const app = await (0, app_1.default)();
    await app.listen({ port: +port, host: '0.0.0.0' })
        .catch((e) => logger.error('Error starting server', e));
    logger.info(`Server started at port ${port}`);
    return app;
}
exports.default = startServer;
//# sourceMappingURL=server.js.map
//# debugId=f7addbc6-e036-5eec-bdc8-eb7a917621d6
