"use strict";
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
