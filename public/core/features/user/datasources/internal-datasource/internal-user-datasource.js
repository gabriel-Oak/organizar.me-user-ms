"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8f813b67-516f-5616-9510-3a1da0aacde3")}catch(e){}}();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const types_1 = require("../../../../utils/types");
const typeorm_1 = require("typeorm");
const user_schema_1 = __importDefault(require("../../schemas/user-schema"));
const types_2 = require("./types");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const user_1 = __importDefault(require("../../entities/user"));
let InternalUserDatasource = class InternalUserDatasource {
    constructor(userRepository, logger, dataSource) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.dataSource = dataSource;
    }
    async findManyByIds(userIds) {
        try {
            const users = await this.dataSource
                .getMongoRepository(user_schema_1.default)
                .find({
                where: {
                    _id: { $in: userIds.map((userId) => new mongodb_1.ObjectId(userId)) }
                }
            });
            return new types_1.Right(users.map((user) => new user_1.default(user.getProps())));
        }
        catch (e) {
            console.log(e);
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, desculpe, tivemos um problema buscando por (${userIds.join(', ')})`, { ...e, userIds });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.userRepository.findOneBy({ email });
            return new types_1.Right(user);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, desculpe, tivemos um problema buscando por ${email}`, { ...e, email });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findById(userId) {
        try {
            const user = await this.userRepository.findOneBy({ id: userId });
            return new types_1.Right(user);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Opa, foi mal tivemos um problema buscando pelo usuário ${userId.toString()}`, { ...e, userId });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async save(user) {
        try {
            const result = await this.userRepository.save(user);
            result.password = undefined;
            return new types_1.Right(result);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Opa, foi mal tivemos um problema ao salvar o usuário ${user.name}`, { ...e, user });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async update(user) {
        try {
            await this.userRepository.update(user.id, user);
            return new types_1.Right(null);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Opa, foi mal tivemos um problema para atualizar o usuário ${user.name}`, { ...e, user });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async remove(userId) {
        try {
            const user = await this.userRepository.findOneBy({ id: new mongodb_1.ObjectId(userId) });
            if (!user)
                throw new Error(`Oops, usuário ${userId.toString()} não encontrado, pode já ter sido deletado`);
            const result = await this.userRepository.remove(user);
            return new types_1.Right(result);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Opa, foi mal tivemos um problema ao salvar o usuário ${userId.toString()}`, { ...e, userId });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
};
InternalUserDatasource = __decorate([
    (0, injectable_1.default)('IInternalUserDatasource'),
    __param(0, (0, inversify_1.inject)('Repository<UserSchema>')),
    __param(1, (0, inversify_1.inject)('ILoggerService')),
    __param(2, (0, inversify_1.inject)('DataSource')),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object, typeorm_1.DataSource])
], InternalUserDatasource);
exports.default = InternalUserDatasource;
//# sourceMappingURL=internal-user-datasource.js.map
//# debugId=8f813b67-516f-5616-9510-3a1da0aacde3
