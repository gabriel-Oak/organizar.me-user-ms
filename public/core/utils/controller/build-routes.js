"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../decorators/controller/symbols");
const register_controller_1 = __importDefault(require("./register-controller"));
// import { ICreateController } from '../decorators/controller/types';
const container_1 = __importDefault(require("../decorators/container"));
function buildRoutes(app, controllers) {
    controllers.forEach((controller) => {
        const controllerInstance = (0, container_1.default)().get(controller.name);
        let path;
        if (Reflect.hasMetadata(symbols_1.SYMBOL_CONTROLLER, controllerInstance.constructor)) {
            path = Reflect.getMetadata(symbols_1.SYMBOL_CONTROLLER, controllerInstance.constructor);
        }
        else {
            const t = /^(.+?)(Controller)?$/.exec(controllerInstance.constructor.name);
            if (t && t?.length > 0) {
                const [, p] = t;
                path = `/${p}`;
            }
            else {
                path = `/${controller.name}`;
            }
        }
        path = path[0].toLocaleLowerCase() + path.substring(1).replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
        (0, register_controller_1.default)(path, controllerInstance, app);
    });
}
exports.default = buildRoutes;
