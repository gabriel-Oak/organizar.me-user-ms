"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const PrivateRoute = () => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(symbols_1.SYMBOL_PRIVATE, target.constructor)) {
            Reflect.defineMetadata(symbols_1.SYMBOL_PRIVATE, [], target.constructor);
        }
        const privateRoutes = Reflect.getMetadata(symbols_1.SYMBOL_PRIVATE, target.constructor);
        privateRoutes.push(propertyKey);
        Reflect.defineMetadata(symbols_1.SYMBOL_PRIVATE, privateRoutes, target.constructor);
    };
};
exports.default = PrivateRoute;
