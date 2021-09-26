import React from "react"
import VoleryModules from "./VoleryModules"
import WebpackModules from "./webpackmodules"

export class VoleryApi {
    get VoleryModules() { return VoleryModules }

    plugins = []

    loadPlugin(id: string) {

    }

    constructor() {
        this.loadPlugin('test')
    }
}