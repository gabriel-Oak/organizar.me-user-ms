"use strict";
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
