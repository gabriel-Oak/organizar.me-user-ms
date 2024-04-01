"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="453eed53-9380-5143-8ca8-546f3315b301")}catch(e){}}();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const types_1 = require("../../../../utils/types");
const types_2 = require("./types");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
let ValidateUserUsecase = class ValidateUserUsecase {
    execute(user) {
        try {
            const userSchema = zod_1.z.object({
                name: zod_1.z.string().min(3).max(250),
                email: zod_1.z.string().email(),
                password: zod_1.z.string().min(6).max(20)
            });
            userSchema.parse(user);
            return new types_1.Right(null);
        }
        catch (e) {
            let message = (e.errors).reduce((prev, current, index) => `${prev}${!index ? ' ' : ', '}${(current).path.join(', ')}`, 'Desculpe, você precisa informar um');
            message += ' válido';
            return new types_1.Left(new types_2.ValidateUserError(message + '.', e));
        }
    }
};
ValidateUserUsecase = __decorate([
    (0, injectable_1.default)('IValidateUserUsecase')
], ValidateUserUsecase);
exports.default = ValidateUserUsecase;
//# sourceMappingURL=validate-user.js.map
//# debugId=453eed53-9380-5143-8ca8-546f3315b301
