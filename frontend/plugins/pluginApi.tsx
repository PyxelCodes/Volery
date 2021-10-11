import React from "react"
import messages from "../modules/stores/messages"
import { SnowflakeUtil } from "./snowflake/SnowflakeUtil"
import VoleryModules from "./VoleryModules"
import WebpackModules from "./webpackmodules"

export class VoleryApi {
    get VoleryModules() { return VoleryModules }
    get SnowflakeUtil() { return SnowflakeUtil }

    // stores
    get MessageStore() { return messages }

    plugins = []

    async loadPlugin(id: string) {
        if(this.plugins.findIndex(x => x.name == id) > -1) throw new Error(`Plugin '${id}' is already loaded`);

        let plugin = await window.pluginLoader.loadPlugin(id);

        this.plugins.push(plugin);

        plugin.plugin();

    } // handled by /public/pluginloader.js

    insertComponent(component: React.FC | React.Component, domNode: HTMLElement) {
        let childNode = document.createElement('div');
        domNode.appendChild(childNode)
        window.VoleryApi.VoleryModules.ReactDOM.render(component, childNode)
    }

    test () {
        window.VoleryApi.insertComponent(() => { return <p className="fuck"> test </p> }, document.body)
    }

    constructor() {
        let script = document.createElement('script')
        script.src = '/pluginloader.js';
        document.head.appendChild(script);
    }
}