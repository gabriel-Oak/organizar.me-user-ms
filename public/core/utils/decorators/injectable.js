"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b680b405-ed02-5e38-9697-2a632658489b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const container_1 = __importDefault(require("./container"));
function Injectable(type) {
    return (target) => {
        const inject = (0, inversify_1.injectable)();
        inject(target);
        const container = (0, container_1.default)();
        container.bind(type).to(target).inSingletonScope();
        return target;
    };
}
exports.default = Injectable;
//# sourceMappingURL=injectable.js.map
//# debugId=b680b405-ed02-5e38-9697-2a632658489b
