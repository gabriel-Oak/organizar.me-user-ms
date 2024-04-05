"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="04eedf4f-2970-50d4-b3c5-452c03cd17c7")}catch(e){}}();

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
const types_2 = require("./types");
let UpdateUserUsecase = class UpdateUserUsecase {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    async execute(user, payload) {
        const passIsValid = payload.password && await user.comparePasswords(payload.password);
        if (!passIsValid)
            return new types_1.Left(new types_2.UpdateUserInvalidPassError());
        delete payload.password;
        Object.assign(user, payload);
        return await this.userDatasource.update(user);
    }
};
UpdateUserUsecase = __decorate([
    (0, injectable_1.default)('IUpdateUserUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], UpdateUserUsecase);
exports.default = UpdateUserUsecase;
//# sourceMappingURL=update-user.js.map
//# debugId=04eedf4f-2970-50d4-b3c5-452c03cd17c7
