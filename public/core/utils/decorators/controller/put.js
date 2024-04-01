"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b32346d4-eb3c-5992-a719-7fa3360b55a7")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const Put = (path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_PUT, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_PUT, [], target.constructor);
        }
        const gets = Reflect.getMetadata(symbols_1.SYMBOL_PUT, target.constructor);
        gets.push({
            path,
            action: propertyKey
        });
        Reflect.defineMetadata(symbols_1.SYMBOL_PUT, gets, target.constructor);
    };
};
exports.default = Put;
//# sourceMappingURL=put.js.map
//# debugId=b32346d4-eb3c-5992-a719-7fa3360b55a7
