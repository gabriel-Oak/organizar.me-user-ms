"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ed04622b-9e8d-5f79-8faa-c3a73cbb9ab2")}catch(e){}}();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("../../../utils/constants");
let UserSchema = class UserSchema {
    constructor(props) {
        Object.assign(this, props);
    }
    async hashPassword() {
        if (this.password &&
            !this.password.includes('$2a$12$') &&
            this.password.length < 60) {
            this.password = await (0, bcryptjs_1.hash)(this.password + constants_1.JWT_SECRET, 12);
        }
    }
    async comparePasswords(candidatePassword) {
        if (!this.password)
            return false;
        return await (0, bcryptjs_1.compare)(candidatePassword + constants_1.JWT_SECRET, this.password);
    }
    getProps() {
        return {
            id: this.id?.toString(),
            name: this.name,
            email: this.email
        };
    }
    updateProps(props) {
        Object.assign(this, {
            name: props.name ?? this.name,
            email: props.email ?? this.email
        });
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectId)
], UserSchema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: false,
        nullable: false
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserSchema.prototype, "hashPassword", null);
UserSchema = __decorate([
    (0, typeorm_1.Entity)('user'),
    __metadata("design:paramtypes", [Object])
], UserSchema);
exports.default = UserSchema;
//# sourceMappingURL=user-schema.js.map
//# debugId=ed04622b-9e8d-5f79-8faa-c3a73cbb9ab2
