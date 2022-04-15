"use strict";

const pkg = require("./package.json");
const modName = `${pkg.author}-${pkg.name}`;
const TheGachaBox = require("./src/thegachabox.js");

class Mod {
    constructor() {
        ModLoader.onLoad[`zZZmoreZZz-${modName}`] = TheGachaBox.onLoadMod;
    }
}

module.exports.Mod = new Mod();