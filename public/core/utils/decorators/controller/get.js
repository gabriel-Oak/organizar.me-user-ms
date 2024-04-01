"use strict";
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
