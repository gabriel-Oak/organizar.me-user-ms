"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="00c84649-c991-52b5-8d48-a09b0643c45b")}catch(e){}}();

// import './internal-user-datasource';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const internal_user_datasource_1 = __importDefault(require("./internal-user-datasource"));
const database_service_1 = __importDefault(require("../../../../utils/services/database-service"));
const user_schema_1 = __importDefault(require("../../schemas/user-schema"));
const logger_service_1 = __importDefault(require("../../../../utils/services/logger-service"));
let instance;
const createInternalUserDatasource = () => {
    if (!instance) {
        instance = new internal_user_datasource_1.default(database_service_1.default.getRepository(user_schema_1.default), (0, logger_service_1.default)());
    }
    return instance;
};
exports.default = createInternalUserDatasource;
//# sourceMappingURL=index.js.map
//# debugId=00c84649-c991-52b5-8d48-a09b0643c45b
