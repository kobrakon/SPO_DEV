"use strict";

const Main = require("./src/main.js");

class Mod {
		constructor() {//builds the mod
			Logger.info("Loading: Realism Mod");
			ModLoader.onLoad["RealismMod-main"] = Main.loadMain;
			HttpRouter.onStaticRoute["/client/game/version/validate"]["RealismMod"] = Main.checkProfile;
			HttpRouter.onStaticRoute["/raid/profile/save"]["pmc"] = Main.loadBotConfig;

		}	
}

module.exports.Mod = new Mod();