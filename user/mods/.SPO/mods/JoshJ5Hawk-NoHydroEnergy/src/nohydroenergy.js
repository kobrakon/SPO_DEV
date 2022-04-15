// package.js
// license: NCSA
// copyright: JoshJ5Hawk
// website: https://www.guilded.gg/senkospub
// name: NoHydroEnergy
// description: Removes Natural Hydration and Energy Loss
// version: 1.2.0
// author/(s):
// - JoshJ5Hawk

"use strict";

class NoHydroEnergy
{
	
	
    constructor()
    {
        ModLoader.onLoad["JoshJ5Hawk-NoHydroEnergy"] = this.load.bind(this);
        Logger.info(`Loading: NoHydroEnergy`);
    }
    load()
    {
		const config = require("../config/config.json");
		
        const modPath = ModLoader.getModPath("JoshJ5Hawk-NoHydroEnergy");
		
		DatabaseServer.tables.globals.config.Health.Effects.Existence.HydrationDamage = config.values.hydration;
		DatabaseServer.tables.globals.config.Health.Effects.Existence.EnergyDamage = config.values.energy;
		DatabaseServer.tables.globals.config.Health.Effects.Regeneration.Hydration = config.values.hydrationRegen;
		DatabaseServer.tables.globals.config.Health.Effects.Regeneration.Energy = config.values.energyRegen;
    }
}

module.exports.Mod = NoHydroEnergy;