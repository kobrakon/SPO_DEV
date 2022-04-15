/*
ルカイジュ
*/

"use strict";

//// New Items ////
const { AmmoPouchScript } = require("./AmmoPouchScript.js");

const conf = require("../config/config.json");
const pack = require("../package.json");
const KaijuApi = require("../../Kaiju-api/api");
const debug = conf.Debug.Enable;
KaijuApi.DebugCheck(debug);

class AmmoPouch {
    constructor() {
        this.mod = "LeKaiju-Orbitas-AmmoPouch";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.Start.bind(this);
    }

    Start() {
        //Server database variables
        const database = DatabaseServer.tables;
        const item = database.templates.items;
        KaijuApi.DebugMessage(`----------${pack.author}: ${pack.name}: ${pack.version} Debug Start----------`);

        //// General ////
        if (conf.NewItems["Ammo Pouch"].Enable) {
            const V = conf.NewItems["Ammo Pouch"]["Internal Height"];
            const H = conf.NewItems["Ammo Pouch"]["Internal Width"];
            AmmoPouchScript(H, V);
        }

        KaijuApi.DebugMessage(`----------${pack.author}: ${pack.name}: ${pack.version} Debug End----------`);
    }
}

module.exports.Mod = AmmoPouch;