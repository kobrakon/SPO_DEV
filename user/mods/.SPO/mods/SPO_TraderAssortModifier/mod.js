"use strict";

class Mod 
{
	constructor() 
	{
		Logger.info("Loading TraderAssortModifier...");

		require("./src/TraderAssortModifier.js");
    }
}

module.exports.Mod = new Mod();