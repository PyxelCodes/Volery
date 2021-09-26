import { VoleryApi } from "./pluginApi"
import WebpackModules from "./webpackmodules";


export const setupPluginApi = () => {
    window.VoleryApi = VoleryApi;

    console.log(WebpackModules.getByProps('createElement', 'cloneElement'))
}


declare global {
    interface Window {
        VoleryApi: typeof VoleryApi;
    }
}