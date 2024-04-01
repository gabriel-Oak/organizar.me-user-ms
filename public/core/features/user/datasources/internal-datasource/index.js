"use strict";
// import './internal-user-datasource';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const internal_user_datasource_1 = __importDefault(require("./internal-user-datasource"));
const database_service_1 = __importDefault(require("../../../../utils/services/database-service"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const logger_service_1 = __importDefault(require("../../../../utils/services/logger-service"));
let instance;
const createInternalUserDatasource = () => {
    if (!instance) {
        instance = new internal_user_datasource_1.default(database_service_1.default.getRepository(user_model_1.default), (0, logger_service_1.default)());
    }
    return instance;
};
exports.default = createInternalUserDatasource;
