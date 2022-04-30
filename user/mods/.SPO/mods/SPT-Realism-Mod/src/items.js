"use strict";

const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const config = require("../config/config.js");

class Items {

    static loadItems() {
        if (config.all_examined == true) {
            for (let i in itemDB) {
                let fileData = itemDB[i];
                fileData._props.ExaminedByDefault = true;
            }
            if (config.logEverything == true) {
                Logger.info("All Items Examined");
            }
        }
        if(config.remove_inraid_restrictions == true){
            globalDB.RestrictionsInRaid = [];
            if (config.logEverything == true) {
                Logger.info("In-Raid Restrictions Removed");
            }
        }
        if (config.logEverything == true) {
            Logger.info("Items Loaded");
        }
    }
}

module.exports = Items; 