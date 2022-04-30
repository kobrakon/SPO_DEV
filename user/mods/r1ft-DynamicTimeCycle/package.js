"use strict";

const pkg = require("./package.json");
const PTTDynamicTravelTime = require("./src/src.js");

class PTTDynamicTravelTimeInit
{
    constructor()
    {
        Logger.info(`Loading: ${pkg.author}-${pkg.name} ${pkg.version}`);
        ModLoader.onLoad["ZZZ-ZZZ-MUSTBELAST-PTTDynamicTravelTime"] = PTTDynamicTravelTime.onLoadMod;
    }
}

module.exports.Mod = new PTTDynamicTravelTimeInit();
