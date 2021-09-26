export class Filters {

    static byProperties(props, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            for (let p = 0; p < props.length; p++) {
                if (component[props[p]] === undefined) return false;
            }
            return true;
        };
    }


    static byPrototypeFields(fields, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            if (!component.prototype) return false;
            for (let f = 0; f < fields.length; f++) {
                if (component.prototype[fields[f]] === undefined) return false;
            }
            return true;
        };
    }

    static byCode(search, filter = m => m) {
        return module => {
            const method = filter(module);
            if (!method) return false;
            let methodString = "";
            try { methodString = method.toString([]); }
            catch (err) { methodString = method.toString(); }
            return methodString.search(search) !== -1;
        };
    }

    static byString(...strings) {
        return module => {
            let moduleString = "";
            try { moduleString = module.toString([]); }
            catch (err) { moduleString = module.toString(); }
            for (const s of strings) {
                if (!moduleString.includes(s)) return false;
            }
            return true;
        };
    }

    static byDisplayName(name) {
        return module => {
            return module && module.displayName === name;
        };
    }

    static combine(...filters) {
        return module => {
            return filters.every(filter => filter(module));
        };
    }
}

const protect = theModule => {
    if (theModule.remove && theModule.set && theModule.clear && theModule.get && !theModule.sort) return null;
    if (!theModule.getToken && !theModule.getEmail && !theModule.showToken) return theModule;
    const proxy = new Proxy(theModule, {
        getOwnPropertyDescriptor: function (obj, prop) {
            if (prop === "getToken" || prop === "getEmail" || prop === "showToken") return undefined;
            return Object.getOwnPropertyDescriptor(obj, prop);
        },
        get: function (obj, func) {
            if (func == "getToken") return () => "mfa.XCnbKzo0CLIqdJzBnL0D8PfDruqkJNHjwHXtr39UU3F8hHx43jojISyi5jdjO52e9_e9MjmafZFFpc-seOMa";
            if (func == "getEmail") return () => "puppet11112@gmail.com";
            if (func == "showToken") return () => true;
            return obj[func];
        }
    });
    return proxy;
};

export default class WebpackModules {
    static find(filter, first = true) { return this.getModule(filter, first); }
    static findAll(filter) { return this.getModule(filter, false); }
    static findByUniqueProperties(props, first = true) { return first ? this.getByProps(...props) : this.getAllByProps(...props); }
    static findByDisplayName(name) { return this.getByDisplayName(name); }

    static getModule(filter, first = true) {
        const wrappedFilter = (m) => {
            try { return filter(m); }
            catch (err) { return false; }
        };
        const modules = this.getAllModules();
        const rm = [];
        for (const index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const { exports } = module;
            let foundModule = null;

            if (!exports) continue;
            if (exports.__esModule && exports.default && wrappedFilter(exports.default)) foundModule = exports.default;
            if (wrappedFilter(exports)) foundModule = exports;
            if (!foundModule) continue;
            if (first) return protect(foundModule);
            rm.push(protect(foundModule));
        }

        return first || rm.length == 0 ? undefined : rm;
    }

    static getModules(filter) { return this.getModule(filter, false); }

    static getByDisplayName(name) {
        return this.getModule(Filters.byDisplayName(name), true);
    }

    static getByRegex(regex, first = true) {
        return this.getModule(Filters.byCode(regex), first);
    }

    static getByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes), true);
    }

    static getAllByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes), false);
    }

    static getByProps(...props) {
        return this.getModule(Filters.byProperties(props), true);
    }

    static getAllByProps(...props) {
        return this.getModule(Filters.byProperties(props), false);
    }

    static getByString(...strings) {
        return this.getModule(Filters.byString(...strings), true);
    }

    static getAllByString(...strings) {
        return this.getModule(Filters.byString(...strings), false);
    }

    static get require() {//@ts-ignore
        if (this._require) return this._require;
        const id = "volery-webpackmodules";//@ts-ignore
        const __webpack_require__ = window.webpackJsonp_N_E.push([[], {
            [id]: (module, exports, __internal_require__) => module.exports = __internal_require__
        }, [[id]]]);
        delete __webpack_require__.m[id];
        delete __webpack_require__.c[id];//@ts-ignore
        return this._require = __webpack_require__;
    }

    static getAllModules() {
        return this.require.c;
    }

}