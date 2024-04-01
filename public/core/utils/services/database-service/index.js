"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="dceb52bf-867d-5b1b-98ec-805e53b65905")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const typeorm_1 = require("typeorm");
const constants_1 = require("../../constants");
const user_model_1 = __importDefault(require("../../../features/user/models/user-model"));
const container_1 = __importDefault(require("../../decorators/container"));
const DatabaseService = new typeorm_1.DataSource({
    type: 'mongodb',
    url: constants_1.MONGODB_URI,
    entities: [
        user_model_1.default
    ],
    synchronize: true
});
const initDB = async () => {
    if (!DatabaseService.isInitialized) {
        const logger = (0, container_1.default)().get('ILoggerService');
        logger.info('Initializing connection with database');
        await DatabaseService.initialize()
            .then(() => logger.info('Database initialized successfuly'))
            .catch((error) => {
            logger.error('Database initialize error: ', error);
        });
    }
    return DatabaseService.isInitialized;
};
exports.initDB = initDB;
const container = (0, container_1.default)();
container.bind('Repository<UserModel>')
    .toDynamicValue(() => DatabaseService.getRepository(user_model_1.default));
container.bind('DataSource').toDynamicValue(() => DatabaseService);
container.bind('initDB').toDynamicValue(() => exports.initDB);
exports.default = DatabaseService;
//# sourceMappingURL=index.js.map
//# debugId=dceb52bf-867d-5b1b-98ec-805e53b65905
