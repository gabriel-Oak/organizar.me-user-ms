"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d0743db3-0f4a-5298-8599-0c397a57114e")}catch(e){}}();

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
//# sourceMappingURL=private-route.js.map
//# debugId=d0743db3-0f4a-5298-8599-0c397a57114e
