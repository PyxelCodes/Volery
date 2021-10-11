export class ModuleNotFound extends Error {
    code: string;
    constructor(moduleName: string) {
        super()
        this.message = `Cannot find VoleryModule '${moduleName}'`;
        this.code = 'VOLERY_MODULE_NOT_FOUND'
    }
}

export default function use(moduleId) {
    if (typeof moduleId !== 'string') throw new TypeError('The "moduleId" argument must be of type string. Recieved ' + typeof moduleId)
    let module = window.VoleryApi[moduleId];

    if (module) return module;

    throw new ModuleNotFound(moduleId);
}