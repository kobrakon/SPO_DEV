"use strict";

const pkg = require("./package.json");
const BackpackResize = require("./src/BackpackResize.js");

class BackpackResizeInit
{
    constructor()
    {
        Logger.info(`Loading: ${pkg.author}-${pkg.name} ${pkg.version}`);
        ModLoader.onLoad["ZZZ-ZZZ-MUSTBELAST-BackpackResize"] = BackpackResize.onLoadMod;
    }
}

module.exports.Mod = new BackpackResizeInit();
