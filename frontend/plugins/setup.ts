import { VoleryApi } from "./pluginApi"
import WebpackModules from "./webpackmodules";


export const setupPluginApi = () => {
    window.VoleryApi = new VoleryApi();

    console.log(WebpackModules.getByProps('createElement', 'cloneElement'))
}


declare global {
    interface Window {
        VoleryApi: VoleryApi;
    }
}