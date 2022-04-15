const Everything = require("./src/OneJSToRuleThemAll.js");
let config;
class ModLoadApplier 
{
    constructor() 
	{
		try {
			config = require('./Loader/loader.json');
		}
		catch (e)
		{
				Logger.error("SVM is lacking loader file or there is an error, mod is disabled");
				Logger.error("If it's Syntax error, edit it manually in loader.json or/and edit values with GFVE properly");
				Logger.error("If it can't find module(loader), run GFVE and create it, duh");
				Logger.log(e.message);
				return
		}
				this.mod = "GhostFenixx - Server Value Modifier 1.4.6";
				Logger.info(`Loading: ${this.mod}`);
				ModLoader.onLoad["KMCSVM"] = Everything.load;
	}
}
module.exports = new ModLoadApplier();