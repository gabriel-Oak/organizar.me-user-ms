"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9e665c92-ddd4-5d0c-bb89-96b2648da287")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const Del = (path) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_DELETE, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_DELETE, [], target.constructor);
        }
        const gets = Reflect.getMetadata(symbols_1.SYMBOL_DELETE, target.constructor);
        gets.push({
            path,
            action: propertyKey
        });
        Reflect.defineMetadata(symbols_1.SYMBOL_DELETE, gets, target.constructor);
    };
};
exports.default = Del;
//# sourceMappingURL=del.js.map
//# debugId=9e665c92-ddd4-5d0c-bb89-96b2648da287
