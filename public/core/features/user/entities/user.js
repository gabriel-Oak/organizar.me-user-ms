"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="19cc2618-b279-5aba-ae49-597fd327288a")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("../../../utils/constants");
class User {
    constructor({ id, name, email, password }) {
        Object.assign(this, {
            id,
            name,
            email,
            password
        });
    }
    async comparePasswords(candidatePassword) {
        if (!this.password)
            return false;
        return await (0, bcryptjs_1.compare)(candidatePassword + constants_1.JWT_SECRET, this.password);
    }
    async hashPassword() {
        if (this.password &&
            !this.password.includes('$2a$12$') &&
            this.password.length < 60) {
            this.password = await (0, bcryptjs_1.hash)(this.password + constants_1.JWT_SECRET, 12);
        }
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map
//# debugId=19cc2618-b279-5aba-ae49-597fd327288a
