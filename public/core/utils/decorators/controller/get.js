"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="51b7ca18-6653-51c4-982e-7b6cbb83b33a")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const Get = (path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_GET, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_GET, [], target.constructor);
        }
        const gets = Reflect.getMetadata(symbols_1.SYMBOL_GET, target.constructor);
        gets.push({
            path,
            action: propertyKey
        });
        Reflect.defineMetadata(symbols_1.SYMBOL_GET, gets, target.constructor);
    };
};
exports.default = Get;
//# sourceMappingURL=get.js.map
//# debugId=51b7ca18-6653-51c4-982e-7b6cbb83b33a
