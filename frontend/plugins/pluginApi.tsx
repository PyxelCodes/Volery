import React from "react"
import { SnowflakeUtil } from "./snowflake/SnowflakeUtil"
import VoleryModules from "./VoleryModules"
import WebpackModules from "./webpackmodules"

export class VoleryApi {
    get VoleryModules() { return VoleryModules }
    get SnowflakeUtil() { return SnowflakeUtil }

    plugins = []

    loadPlugin(id: string) {

    }

    insertComponent(component: React.FC | React.Component, domNode: HTMLElement) {
        let childNode = document.createElement('div');
        domNode.appendChild(childNode)
        window.VoleryApi.VoleryModules.ReactDOM.render(component, childNode)
    }

    test () {
        window.VoleryApi.insertComponent(() => { return <p className="fuck"> test </p> }, document.body)
    }

    constructor() {
        this.loadPlugin('test')
    }
}