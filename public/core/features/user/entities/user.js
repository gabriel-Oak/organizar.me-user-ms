"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2223f9c6-492c-5709-b404-3319cdbbabef")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ id, name, email, password }) {
        Object.assign(this, {
            id,
            name,
            email,
            password
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map
//# debugId=2223f9c6-492c-5709-b404-3319cdbbabef
