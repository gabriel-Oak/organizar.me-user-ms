"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2ba73ded-01e5-5dfd-a546-328321d32bad")}catch(e){}}();

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
let RemoveUserUsecase = class RemoveUserUsecase {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async execute(user) {
        const result = await this.datasource.remove(user.id);
        return result;
    }
};
RemoveUserUsecase = __decorate([
    (0, injectable_1.default)('IRemoveUserUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], RemoveUserUsecase);
exports.default = RemoveUserUsecase;
//# sourceMappingURL=remove-user.js.map
//# debugId=2ba73ded-01e5-5dfd-a546-328321d32bad
