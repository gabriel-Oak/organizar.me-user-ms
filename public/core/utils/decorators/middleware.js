"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4daa6bcb-9377-5077-8c15-af3e291154fe")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const container_1 = __importDefault(require("./container"));
const ClassMiddleware = () => (target) => {
    const inject = (0, inversify_1.injectable)();
    inject(target);
    const container = (0, container_1.default)();
    container.bind(target).toSelf();
    return target;
};
exports.default = ClassMiddleware;
//# sourceMappingURL=middleware.js.map
//# debugId=4daa6bcb-9377-5077-8c15-af3e291154fe
