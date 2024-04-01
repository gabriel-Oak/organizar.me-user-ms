"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bbb64aae-1dca-54b1-a9d9-046c06e37035")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let container = new inversify_1.Container();
const createContainer = () => {
    if (!container)
        container = new inversify_1.Container();
    return container;
};
exports.default = createContainer;
//# sourceMappingURL=container.js.map
//# debugId=bbb64aae-1dca-54b1-a9d9-046c06e37035
