/* mod.js
 * license: NCSA
 * copyright: Fin
 * website: Nada
 * authors:
 * - Fin
 */

const config = require("../config/config.json")
const database = DatabaseServer.tables
const itemdb = database.templates.items
const handbook = database.templates.handbook

const locations = database.locations
const botTypes = database.bots.types

//		core_f.packager.onLoad > ModLoader.onLoad
//		common_f.logger.logInfo > Logger.info
//		common_f.logger.logError > Logger.error
//		database_f.server > database

class Mod
{
    constructor()
    {
        this.modname = "Fin's Choking Hazard";
        Logger.info(`Loading: ${this.modname}`);
		if (!ModLoader.onLoad[this.modname])
			ModLoader.onLoad[this.modname] = this.load.bind(this);
		else
		{
			this.modname += "_Alt"
			ModLoader.onLoad[this.modname] = this.load.bind(this)
		}
    }

    load()
    {
		Logger.info("Fin's Choking Hazard: Adjusting shotgun chokes")
		this.fixChokes()
		this.customChokes()
		Logger.info("Fin's Choking Hazard: Choking complete")
    }
	
	fixChokes()
	{
		let shotgunPrintout = []
		let barrelPrintout = {}
		for (let id in itemdb)
		{
			if (itemdb[id]._props && itemdb[id]._props.ShotgunDispersion)
				itemdb[id]._props.shotgunDispersion = itemdb[id]._props.ShotgunDispersion
			if (config.print_shotgun_names_and_IDs_on_server_startup && itemdb[id]._props && itemdb[id]._props.weapClass == "shotgun")
				shotgunPrintout.push(`${DatabaseServer.tables.locales.global.en.templates[id].ShortName}'s id = ${itemdb[id]._id}, and its spread is ${itemdb[id]._props.shotgunDispersion}`)
		}
		if (config.print_shotgun_names_and_IDs_on_server_startup)
		{
			console.log("")
			Logger.info("Shotgun information:")
			console.log(shotgunPrintout)
		}
		if (config.print_barrel_names_and_IDs_for_these_weapon_IDs.filter(i => i != "enter_id_here").length > 0)
		{
			console.log("")
			Logger.info("Barrel information:")	
		}
		for (let entry in config.print_barrel_names_and_IDs_for_these_weapon_IDs)
		{
			let id = config.print_barrel_names_and_IDs_for_these_weapon_IDs[entry]
			if (id == "enter_id_here")
				continue
			else if (!itemdb[id])
				Logger.error(`Entry with id ${id} has no valid barrels.`)
			let barrelSlot = itemdb[id]._props.Slots.find(i => i._name == "mod_barrel")
			if (!barrelSlot)
				continue
			console.log("")
			Logger.info(`Barrel information for item with id ${id}:`)
			for (let barrel in barrelSlot._props.filters[0].Filter)
			{
				let barrelID = barrelSlot._props.filters[0].Filter[barrel]
				if (itemdb[barrelID])
					console.log(`${DatabaseServer.tables.locales.global.en.templates[barrelID].ShortName}'s id = ${itemdb[barrelID]._id}, and its spread is ${itemdb[barrelID]._props.shotgunDispersion}`)
			}
		}
	}
	
	customChokes()
	{
		for (let id in config.itemIDs_and_spread)
		{
			if (id == "enter_id_here")
				continue
			else if (!itemdb[id] || !itemdb[id]._props)
				Logger.error(`Fin's Choking Hazard: The id ${id} is invalid. Please re-check your config entry.`)
			else
			{
				itemdb[id]._props.shotgunDispersion = config.itemIDs_and_spread[id]
				itemdb[id]._props.ShotgunDispersion = config.itemIDs_and_spread[id]
			}
		}
	}
}

module.exports.Mod = Mod;
