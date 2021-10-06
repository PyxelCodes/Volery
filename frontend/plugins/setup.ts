import { VoleryApi } from "./pluginApi"
import WebpackModules from "./webpackmodules";


export const setupPluginApi = () => {
    window.VoleryApi = new VoleryApi();

}


declare global {
    interface Window {
        VoleryApi: VoleryApi;
    }
}