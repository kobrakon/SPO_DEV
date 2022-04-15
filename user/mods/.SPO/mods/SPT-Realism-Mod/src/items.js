"use strict";

const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const config = require("../config/config.js");

class Items {

    static loadItems() {

        if (config.realism == true) {
            //Adjust Thermal stim to compensate for lower base temp
            globalDB.Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature.Value = -3;
        }

        if (config.allExamined == true) {
            for (let i in itemDB) {
                let fileData = itemDB[i];
                fileData._props.ExaminedByDefault = true;
            }

            if (config.logEverything == true) {
                Logger.info("All items examined");
            }
        }
        if (config.logEverything == true) {
            Logger.info("Items loaded");
        }
    }
}

module.exports = Items; 