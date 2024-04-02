"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fc1484d4-0601-5fea-93f6-ffd8fcbb3674")}catch(e){}}();

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
const types_2 = require("./types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../../../utils/constants");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
let DecodeUserTokenUsecase = class DecodeUserTokenUsecase {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    async execute(token) {
        try {
            const decodedUser = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
            const userResult = await this.userDatasource.findById(new mongodb_1.ObjectId(decodedUser._id));
            if (userResult.isError || userResult.success) {
                return userResult;
            }
            return new types_1.Left(new types_2.DecodeUserNotFoundError());
        }
        catch (_) {
            return new types_1.Left(new types_2.DecodeUserInvalidTokenError());
        }
    }
};
DecodeUserTokenUsecase = __decorate([
    (0, injectable_1.default)('IDecodeUserTokenUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], DecodeUserTokenUsecase);
exports.default = DecodeUserTokenUsecase;
//# sourceMappingURL=decode-user-token.js.map
//# debugId=fc1484d4-0601-5fea-93f6-ffd8fcbb3674
