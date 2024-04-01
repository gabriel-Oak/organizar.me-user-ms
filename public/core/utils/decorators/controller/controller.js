"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="07b817c5-bc45-56c1-99ab-e9283fef8379")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const symbols_1 = require("./symbols");
const container_1 = __importDefault(require("../container"));
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata(symbols_1.SYMBOL_CONTROLLER, path, target);
        const inject = (0, inversify_1.injectable)();
        inject(target);
        const container = (0, container_1.default)();
        container.bind(target.name).to(target).inSingletonScope();
    };
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map
//# debugId=07b817c5-bc45-56c1-99ab-e9283fef8379
