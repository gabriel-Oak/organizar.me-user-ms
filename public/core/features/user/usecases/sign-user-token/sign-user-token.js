"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e6cc04c9-415b-5f2c-8538-01fa0ba07ba3")}catch(e){}}();

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
const user_schema_1 = __importDefault(require("../../schemas/user-schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../../../utils/constants");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const inversify_1 = require("inversify");
let SignUserTokenUsecase = class SignUserTokenUsecase {
    constructor(chage) {
        this.chage = chage;
    }
    execute(user) {
        const newUser = new user_schema_1.default({ ...user, password: undefined });
        void this.chage.set(`user:${user.id.toString()}`, newUser.getProps());
        return jsonwebtoken_1.default.sign(newUser.getProps(), constants_1.JWT_SECRET, { expiresIn: '24h' });
    }
};
SignUserTokenUsecase = __decorate([
    (0, injectable_1.default)('ISignUserTokenUsecase'),
    __param(0, (0, inversify_1.inject)('ICacheService')),
    __metadata("design:paramtypes", [Object])
], SignUserTokenUsecase);
exports.default = SignUserTokenUsecase;
//# sourceMappingURL=sign-user-token.js.map
//# debugId=e6cc04c9-415b-5f2c-8538-01fa0ba07ba3
