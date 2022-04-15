"use strict";

const config = require("./config/config.json");

class ScavKarma {
    constructor() {
        const mod = require("./package.json");
        Logger.info(`Loading: ${mod.name} v${mod.version}`);
        ModLoader.onLoad[mod.name] = this.load.bind(this);
    }

    load() {
        if (config.enableMod) {
            const PlayerScavController = require("./src/controllers/PlayerScavController");
            ProfileController.generateScav = PlayerScavController.generateScav;
        }
    }
}

module.exports = new ScavKarma();