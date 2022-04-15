/*
エレシュキガル
*/

"use strict";

const main = require("./src/init");


class AKIConfigurator {
    constructor() {
        const mod = require("./package.json")
        Logger.info(`Loading: ${mod.name} : ${mod.version}`);
        ModLoader.onLoad["AKI-Configurator"] = main.initialization;
    }
}

module.exports = new AKIConfigurator();