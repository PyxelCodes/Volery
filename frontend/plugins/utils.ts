

export default class Utilities {
    static memoizeObject(object) {
        const proxy = new Proxy(object, {
            get: function (obj, mod) {
                if (!obj.hasOwnProperty(mod)) return undefined;
                if (Object.getOwnPropertyDescriptor(obj, mod).get) {
                    const value = obj[mod];
                    delete obj[mod];
                    obj[mod] = value;
                }
                return obj[mod];
            },
            set: function (obj, mod, value) {
                if (obj.hasOwnProperty(mod)) return;
                obj[mod] = value;
                return obj[mod];
            }
        });

        Object.defineProperty(proxy, "hasOwnProperty", {
            value: function (prop) {
                return this[prop] !== undefined;
            }
        });

        return proxy;
    }
}