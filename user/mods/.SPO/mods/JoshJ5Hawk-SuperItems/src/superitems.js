// superitems.js
// license: NCSA
// copyright: JoshJ5Hawk
// website: https://www.guilded.gg/senkospub
// name: SuperItems
// description: Making a few rediculous Items
// version: 2.0.0
// author/(s):
// - JoshJ5Hawk with help from DigitalBarrito and others on Guilded

"use strict";

class SuperItems
{
	
	
    constructor()
    {
        ModLoader.onLoad["JoshJ5Hawk-SuperItems"] = this.load.bind(this);
        Logger.info(`Loading: SuperItems`);
    }
    load()
    {
        const CoreMod = require("../../CoreMod/src/core.js");
        const config = require("../config/config.json");
		
        const modPath = ModLoader.getModPath("JoshJ5Hawk-SuperItems");
        const db = JsonUtil.deserialize(VFS.readFile(`${modPath}/db.json`));

        //Price Variables
        //const  ifak = parseInt(config.prices.ifak);

        //Logger.info (ifak);


        // Add Items
        for (const itemKey in db.items)
        {
            const path = db.items[itemKey];
            const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
            DatabaseServer.tables.templates.items[item._id] = item;
        }
		
        // Add Handbook Entry
        for (const itemKey in db.templates.handbook)
        {
            const path = db.templates.handbook[itemKey];
            const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
            DatabaseServer.tables.templates.handbook.Items.push(item)
        }
        // Add locales
        for (const langKey in db.locales.en.templates)
        {
            const path = db.locales.en.templates[langKey];
            const lang = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
            DatabaseServer.tables.locales.global.en.templates[langKey] = lang;
        }

        //Add Items to Traders
        if(config.options.addToFlea === true)
        {
            for (const itemKey in db.assort.ragfair.items)
            {
                const path = db.assort.ragfair.items[itemKey];
                const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                DatabaseServer.tables.traders.ragfair.assort.items.push(item);
            }

            for (const itemKey in db.assort.ragfair.loyal_level_items)
            {
                const path = db.assort.ragfair.loyal_level_items[itemKey];
                const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                DatabaseServer.tables.traders.ragfair.assort.loyal_level_items[itemKey] = item;
            }

            for (const itemKey in db.assort.ragfair.barter_scheme)
            {
                const path = db.assort.ragfair.barter_scheme[itemKey];
                const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                DatabaseServer.tables.traders.ragfair.assort.barter_scheme[itemKey] = item;
            }
        }
		
		//Therapist
		CoreMod.CreateTraderAssort("superdog_trade", "superdog", "54cb57776803fa99248b456e", config.prices.dog, "GEIGER", 1, false, 1, 1);
		CoreMod.CreateTraderAssort("superkeytool_trade", "superkeytool", "54cb57776803fa99248b456e", config.prices.keytool, "GAS", 1, false, 1, 1);	
        CoreMod.CreateTraderAssort("superammo_trade", "superammo", "5a7c2eca46aef81a7ca2145d", config.prices.ammo, "TOOL", 1, false, 1, 1);
        CoreMod.CreateTraderAssort("superscav_trade", "superscav", "5ac3b934156ae10c4430e83c", config.prices.scav, "PARA", 1, false, 1, 1);
		//Ragman		
    }
	
	/* const addItemToBots(bot, itemID, amount)
	{
		
	} */
}

module.exports.Mod = SuperItems;