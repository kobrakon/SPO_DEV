"use strict";

const SpawnRework = require("./src/SpawnRework.js");

class Mod {
    constructor() {
        ModLoader.onLoad["zZZmoreZZz-Lua-SpawnRework"] = SpawnRework.onLoadMod;
    }
}

module.exports.Mod = new Mod();