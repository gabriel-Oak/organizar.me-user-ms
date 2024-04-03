"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6381372d-4c70-583e-8526-79fc605ad05f")}catch(e){}}();

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
const inversify_1 = require("inversify");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const types_1 = require("./types");
const types_2 = require("../../../../utils/types");
let ListUsersUsecase = class ListUsersUsecase {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async execute(userIds) {
        if (!userIds?.length)
            return new types_2.Left(new types_1.ListUsersValidationError());
        const usersResult = await this.datasource.findManyByIds(userIds);
        if (usersResult.isError)
            return usersResult;
        const users = usersResult.success;
        if (users.length < userIds.length) {
            return new types_2.Right(new types_1.ListUsersIncompleteResult({
                users,
                usersNotFound: userIds.filter((userId) => !users
                    .find(({ id }) => id === userId))
            }));
        }
        return new types_2.Right(new types_1.ListUsersCompleteResult(users));
    }
};
ListUsersUsecase = __decorate([
    (0, injectable_1.default)('IListUsersUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], ListUsersUsecase);
exports.default = ListUsersUsecase;
//# sourceMappingURL=list-users.js.map
//# debugId=6381372d-4c70-583e-8526-79fc605ad05f
