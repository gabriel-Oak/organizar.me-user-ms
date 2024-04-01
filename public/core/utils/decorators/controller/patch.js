"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="58a3ea78-3b15-539e-9da2-50b104d4f04a")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const Patch = (path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_PATCH, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_PATCH, [], target.constructor);
        }
        const gets = Reflect.getMetadata(symbols_1.SYMBOL_PATCH, target.constructor);
        gets.push({
            path,
            action: propertyKey
        });
        Reflect.defineMetadata(symbols_1.SYMBOL_PATCH, gets, target.constructor);
    };
};
exports.default = Patch;
//# sourceMappingURL=patch.js.map
//# debugId=58a3ea78-3b15-539e-9da2-50b104d4f04a
