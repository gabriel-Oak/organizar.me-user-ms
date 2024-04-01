"use strict";
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
const controller_1 = __importDefault(require("../../../utils/decorators/controller/controller"));
const http_error_1 = __importDefault(require("../../../utils/errors/http-error"));
const user_model_1 = __importDefault(require("../models/user-model"));
const private_route_1 = __importDefault(require("../../../utils/decorators/controller/private-route"));
const post_1 = __importDefault(require("../../../utils/decorators/controller/post"));
const get_1 = __importDefault(require("../../../utils/decorators/controller/get"));
const patch_1 = __importDefault(require("../../../utils/decorators/controller/patch"));
const put_1 = __importDefault(require("../../../utils/decorators/controller/put"));
const inversify_1 = require("inversify");
let UserController = class UserController {
    constructor(validateUser, insertUser, signUserToken, authenticateUser, decodeUserToken, changePassword, updateUser) {
        this.validateUser = validateUser;
        this.insertUser = insertUser;
        this.signUserToken = signUserToken;
        this.authenticateUser = authenticateUser;
        this.decodeUserToken = decodeUserToken;
        this.changePassword = changePassword;
        this.updateUser = updateUser;
    }
    async new(req, reply) {
        const payload = req.body;
        const validate = this.validateUser.execute(payload);
        if (validate.isError) {
            const error = new http_error_1.default({
                ...validate.error,
                statusCode: 400
            });
            return await reply.code(error.statusCode).send(error);
        }
        const insertResult = await this.insertUser.execute(payload);
        if (insertResult.isError) {
            const error = new http_error_1.default(insertResult.error);
            if (insertResult.error.type === 'insert-user-already-exist')
                error.statusCode = 409;
            return await reply.code(error.statusCode).send(error);
        }
        const { success: user } = insertResult;
        const auth = this.signUserToken.execute(user);
        return await reply.send({ auth, user });
    }
    async authenticate(req, reply) {
        const payload = req.body;
        const authResult = await this.authenticateUser.execute(payload);
        if (authResult.isError) {
            const error = new http_error_1.default({
                ...authResult.error,
                statusCode: {
                    'authenticate-user-not-found': 404,
                    'authenticate-user-wrong-password': 403,
                    'authenticate-invalid': 400
                }[String(authResult.error.type)] ?? 500
            });
            return await reply.code(error.statusCode).send(error);
        }
        const { success: user } = authResult;
        const auth = this.signUserToken.execute(user);
        return await reply.send({ user, auth });
    }
    async decode(req, reply) {
        const { auth } = req.headers;
        const result = await this.decodeUserToken.execute(String(auth));
        if (!result.isError)
            return await reply.send(result.success.getProps());
        const error = new http_error_1.default({
            ...result.error,
            statusCode: {
                'decode-user-invalid-token': 400,
                'decode-user-not-found': 404
            }[String(result.error.type)] ?? 500
        });
        return await reply.code(error.statusCode).send(error);
    }
    async changeUserPassword(req, reply, user) {
        const { body } = req;
        const result = await this.changePassword.execute({
            ...body,
            userId: user.id
        });
        if (!result.isError)
            return await reply.send({ message: result.success });
        const error = new http_error_1.default(result.error);
        if (result.error.type === 'change-password-invalid-pass') {
            error.statusCode = 400;
        }
        return await reply.code(error.statusCode).send(error);
    }
    async update(req, reply, user) {
        const { body } = req;
        const result = await this.updateUser.execute(user, body);
        if (!result.isError)
            return await reply.send();
        const error = new http_error_1.default(result.error);
        if (result.error.type === 'update-user-invalid-pass')
            error.statusCode = 403;
        return await reply.code(error.statusCode).send(error);
    }
};
__decorate([
    (0, post_1.default)('/new'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "new", null);
__decorate([
    (0, post_1.default)('/authenticate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "authenticate", null);
__decorate([
    (0, get_1.default)('/decode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "decode", null);
__decorate([
    (0, patch_1.default)('/change-password'),
    (0, private_route_1.default)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_model_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserPassword", null);
__decorate([
    (0, put_1.default)('/update-user'),
    (0, private_route_1.default)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_model_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, controller_1.default)('/user'),
    __param(0, (0, inversify_1.inject)('IValidateUserUsecase')),
    __param(1, (0, inversify_1.inject)('IInsertUserUsecase')),
    __param(2, (0, inversify_1.inject)('ISignUserTokenUsecase')),
    __param(3, (0, inversify_1.inject)('IAuthenticateUserUsecase')),
    __param(4, (0, inversify_1.inject)('IDecodeUserTokenUsecase')),
    __param(5, (0, inversify_1.inject)('IChangePasswordUsecase')),
    __param(6, (0, inversify_1.inject)('IUpdateUserUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], UserController);
exports.default = UserController;