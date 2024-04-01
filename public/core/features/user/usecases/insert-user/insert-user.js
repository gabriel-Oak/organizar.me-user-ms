"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0df7e9ec-830c-5ef8-b3ef-9dad19a41f68")}catch(e){}}();

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
const types_1 = require("../../../../utils/types");
const user_model_1 = __importDefault(require("../../models/user-model"));
const types_2 = require("./types");
let InsertUserUsecase = class InsertUserUsecase {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    async execute(user) {
        const existResult = await this.userDatasource.findByEmail(user.email);
        if (existResult.isError)
            return existResult;
        if (existResult.success)
            return new types_1.Left(new types_2.InsertUserAlreadyExist());
        const userResult = await this.userDatasource.save(new user_model_1.default(user));
        return userResult;
    }
};
InsertUserUsecase = __decorate([
    (0, injectable_1.default)('IInsertUserUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], InsertUserUsecase);
exports.default = InsertUserUsecase;
//# sourceMappingURL=insert-user.js.map
//# debugId=0df7e9ec-830c-5ef8-b3ef-9dad19a41f68
