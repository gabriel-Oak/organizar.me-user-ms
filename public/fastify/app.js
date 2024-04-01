"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = __importDefault(require("./routes"));
const database_service_1 = require("../core/utils/services/database-service");
const middie_1 = __importDefault(require("@fastify/middie"));
const api_auth_1 = __importDefault(require("../core/utils/middlewares/api-auth"));
const createApp = async () => {
    const app = (0, fastify_1.default)();
    void app.register(cors_1.default);
    await app.register(middie_1.default);
    app.addHook('preHandler', (0, api_auth_1.default)().execute);
    await (0, database_service_1.initDB)();
    (0, routes_1.default)(app);
    return await app;
};
exports.default = createApp;
