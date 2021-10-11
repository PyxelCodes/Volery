import use from "./moduleloader";
import { VoleryApi } from "./pluginApi"
import WebpackModules from "./webpackmodules";


export const setupPluginApi = () => {
    window.VoleryApi = new VoleryApi();
    window.use = use;
}


declare global {
    interface Window {
        VoleryApi: VoleryApi;
        use: (moduleId: string) => any;

        pluginLoader: {
            loadPlugin(id: string): Promise<{ name: string, author: string, version: string, plugin: Function }>
        }
    }
}