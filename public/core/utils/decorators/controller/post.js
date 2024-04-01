"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bc0bbacb-bab2-5fb4-b2af-ca603f70a77c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const Post = (path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_POST, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_POST, [], target.constructor);
        }
        const gets = Reflect.getMetadata(symbols_1.SYMBOL_POST, target.constructor);
        gets.push({
            path,
            action: propertyKey
        });
        Reflect.defineMetadata(symbols_1.SYMBOL_POST, gets, target.constructor);
    };
};
exports.default = Post;
//# sourceMappingURL=post.js.map
//# debugId=bc0bbacb-bab2-5fb4-b2af-ca603f70a77c
