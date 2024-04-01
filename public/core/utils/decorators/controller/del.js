"use strict";
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
