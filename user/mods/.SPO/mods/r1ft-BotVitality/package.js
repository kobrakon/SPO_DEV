"use strict";

const pkg = require("./package.json");
const BotVitality = require("./src/BotVitality.js");

class BotVitalityInit
{
    constructor()
    {
        Logger.info(`Loading: ${pkg.author}-${pkg.name} ${pkg.version}`);
        ModLoader.onLoad["r1ft-BotVitality Loaded"] = BotVitality.onLoadMod;
    }
}

module.exports.Mod = new BotVitalityInit();
