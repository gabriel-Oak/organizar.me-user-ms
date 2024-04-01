"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d98f8ec0-852d-5c29-8b14-325ff37fdc96")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
// Gets all non-builtin properties up the prototype chain.
const getAllProperties = (object) => {
    const properties = new Set();
    do {
        for (const key of Reflect.ownKeys(object)) {
            properties.add([object, key]);
        }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
};
function autoBind(self, { include, exclude } = {}) {
    const filter = (key) => {
        const match = (pattern) => typeof pattern === 'string' ? key === pattern : pattern.test(key);
        if (include) {
            return include.some(match);
        }
        if (exclude) {
            return !exclude.some(match);
        }
        return true;
    };
    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
        if (key === 'constructor' || !filter(key)) {
            continue;
        }
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }
    return self;
}
exports.default = autoBind;
//# sourceMappingURL=auto-bind.js.map
//# debugId=d98f8ec0-852d-5c29-8b14-325ff37fdc96
