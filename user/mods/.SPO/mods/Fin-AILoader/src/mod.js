/* mod.j
* license: NCSA
* copyright: Fin
* website: Nada
* authors:
* - Fin
*/

const config = require("../config/config.json")
const baseAI = require(`../aiTemplate/${config.aiTemplateName}`)

const database = DatabaseServer.tables
const itemdb = DatabaseServer.tables.templates.items
const handbook = DatabaseServer.tables.templates.handbook
const locations = DatabaseServer.tables.locations
const botTypes = DatabaseServer.tables.bots.types
const modFolder = `${ModLoader.getModPath(module.filename.split("\\")[module.filename.split("\\").length - 3])}`

class AILoader
{
    constructor()
    {
        this.modname = "Fin-AILoader";
        Logger.info(`Loading: ${this.modname}`);
		while (ModLoader.onLoad[this.modname])
		{
			console.log(`The mod name ${this.modname} is already taken. Modifying mod name.`)
			this.modname += "_Alt"
		}
		HttpRouter.onStaticRoute["/client/languages"][this.modname] = AILoader.runOnGameStart
		ModLoader.onLoad[this.modname] = this.load.bind(this)
    }
	
	static runOnGameStart()
	{
		if (config.DEBUGGING_print_current_AI_settings)
			AILoader.printAIDifficulties()
		return HttpResponse.getBody(DatabaseServer.tables.locales.languages);
	}
	
	static printAIDifficulties()
	{
		for (let bot in botTypes)
		{
			var fs = require('fs');
				fs.writeFile(modFolder + "debug/" + bot +".json", JSON.stringify(botTypes[bot].difficulty, null, 4), function (err) {
			  if (err) throw err;
			});
		}
	}

    load()
    {
		// let a = JsonUtil.clone(baseAI)
		// for (let cat in a)
			// for (let set in a[cat])
				// for (let each in a[cat][set][0])
					// if (typeof(1) == typeof(a[cat][set][0][each]) && a[cat][set][1] != 1)
					// {
						// let val = a[cat][set][0][each]
						// a[cat][set][0][each] = Math.round(val * a[cat][set][1] * 1000) / 1000
					// }
		// for (let cat in botTypes.pmcbot.difficulty.hard)
		// {
			// if (!a[cat])
				// a[cat] = {}
			// for (let set in botTypes.pmcbot.difficulty.hard[cat])
				// if (!a[cat][set])
					// a[cat][set] = [[botTypes.pmcbot.difficulty.hard[cat][set]],1]
		// }
		// for (let cat in a)
			// for (let set in a[cat])
				// a[cat][set] = a[cat][set][0]
		// console.log(a)
		// var fs = require('fs');
			// fs.writeFile(modFolder + "aiTemplate/progress.json", JSON.stringify(a, null, 4), function (err) {
		  // if (err) throw err;
		// });
		// console.log(b)
		this.main()
    }

	
	//Rounds bot stats.
	static roundAllBotStats()
	{
		for (let bot in botTypes)
			for (let diff in botTypes[bot].difficulty)
			{
				for (let cat in botTypes[bot].difficulty[diff])
					for (let statName in botTypes[bot].difficulty[diff][cat])
					{
						let stat = botTypes[bot].difficulty[diff][cat][statName]
						let origStat = stat
						if (typeof(stat) == "number")
						{
							if (Math.sqrt(stat * stat) < 1) //Any pure decimals
							{
								let strStat = (stat * 1).toString()
								if (strStat.charAt(0) == "-")
									strStat = strStat.slice(1)
								let count = 0
								for (let i = 0; i < strStat.length; i++)
									if (!(strStat[i] == "0" || strStat[i] == "."))
										{stat = (Math.round((stat + Number.EPSILON) * (Math.pow(10, i + 1))) / Math.pow(10, i + 1));break} //Round it to three relevant decimals
							}
							else
							{
								let decimal = stat - Math.floor(stat) //Separate the decimal from the rest
								if (decimal > 0) //round the decimal to 3 places, then add it back to the rest
									stat = (Math.round((decimal + Number.EPSILON) * (Math.pow(10, 3))) / Math.pow(10, 3)) + Math.floor(stat)
							}
							botTypes[bot].difficulty[diff][cat][statName] = stat
							//console.log(`${statName} ${stat}`)
						}
					}
			}
	}

	//This function is used when the value will vary by bot difficulty. Values can theoretically be infinitely low or infinitely high
	//value is an array of all possible values
	static changeStat(type, value, difficulty, botCat, multiplier)
	{
		if (multiplier == undefined)
			multiplier = 1
		let setValue
		let debug = false
		if (value.length == 1)
		{
			if (typeof(value[0]) == "number")
				botCat[type] = value[0] * multiplier
			else
				botCat[type] = value[0]
			if (debug)
				console.log(`${type} = ${botCat[type]}`)
			return
		}
		
		let exceptions = ["VisibleDistance", "PART_PERCENT_TO_HEAL", "HearingSense", "AIMING_TYPE"] //Distance is on here because there's a config value to modify that on its own, same with hearing
		if (!exceptions.includes(type) && typeof(value[0]) == "number")//Some values don't work with this system. Things with unusual caps, like visible angle.
		{
			//These values must be whole numbers
			let decimalExceptions = ["BAD_SHOOTS_MIN", "BAD_SHOOTS_MAX", "MIN_SHOOTS_TIME", "MAX_SHOOTS_TIME"]
			
			let divisor = 100
			
			if (Math.trunc(difficulty) != difficulty && !decimalExceptions.includes(type)) //If it's not a whole number.. ..Oh boy. We're getting into a rabbit hole now, aren't we?
			{
				let newValues = [value[0]] //An array with the lowest possible value as its starting point
				for (let val = 0; val < value.length - 1; val++)
				{
					let difference = value[val + 1] - value[val]
					for (let i = 0; i < divisor; i++)
						newValues.push(newValues[(val * divisor) + i] + (difference / divisor))
				}
				value = newValues
				difficulty = Math.round(difficulty * divisor)
			}
			else if (Math.trunc(difficulty) != difficulty && decimalExceptions.includes(type))
			{
				difficulty = Math.round(difficulty)
			}
			let numValues = value.length - 1 //This should allow for variations in the size of the difficulty setting arrays.
			
			if (debug)
			{
				console.log(value[0])
				console.log(value[Math.round(value.length * 0.1)])
				console.log(value[Math.round(value.length * 0.2)])
				console.log(value[Math.round(value.length * 0.3)])
				console.log(value[Math.round(value.length * 0.4)])
				console.log(value[Math.round(value.length * 0.5)])
				console.log(value[Math.round(value.length * 0.6)])
				console.log(value[Math.round(value.length * 0.7)])
				console.log(value[Math.round(value.length * 0.8)])
				console.log(value[Math.round(value.length * 0.9)])
				console.log(value[Math.round(value.length * 1) - 1])
				console.log(`
			difficulty: ${difficulty}
			numValues: ${numValues}`)
			}
			//Should allow for a smooth transition into difficulties greater than the standard 0-5 range
			if (difficulty > numValues)
			{
				if (value[(numValues - 1)] - value[numValues] < 0) //going up
					{setValue = value[numValues] + ((value[numValues] - value[(numValues - 1)]) * (difficulty - numValues))
					if(setValue > 100 && type.slice(-4) == "_100")
						setValue = 100}
				else if (value[numValues] == 0)
					setValue = 0
				else
					setValue = value[numValues] * Math.pow((value[numValues] / value[(numValues - 1)]) , difficulty - numValues)
			}
			else if (difficulty < 0)
			{
				if (value[1] - value[0] < 0) //going up
					setValue = value[0] + ((value[0] - value[1]) * (difficulty * -1))
				else if (value[0] <= 0)
					setValue = 0
				else
				{
					setValue = value[0] * Math.pow((value[0] / value[(1)]) , difficulty * -1)
				}
			}
			else
				setValue = value[difficulty]
			if (Math.round(value[numValues]) == value[numValues]) //If all values are integers, keep it that way
				if (value.find(i => Math.round[value[i]] == value[i]))
				{
					//console.log(value)
					setValue = Math.round(setValue)
				}
		}
		else
		{
			let numValues = value.length - 1
			difficulty = Math.round(difficulty)
			if (difficulty > numValues)
				difficulty = numValues
			if (difficulty < 0)
				difficulty = 0
			setValue = value[difficulty]
		}
		botCat[type] = setValue * multiplier
		if (debug)
			console.log(`${type} = ${setValue}`)
	}

    static changeAI(botDiff, difficulty, botName)
    {
		for (let category in baseAI)
			if (botDiff[category])
				for (let setting in baseAI[category])
				{
					if (botDiff[category][setting])
						AILoader.changeStat(setting, baseAI[category][setting].length == 2 ? baseAI[category][setting][0] : baseAI[category][setting], difficulty, botDiff[category], baseAI[category][setting].length == 2 ? baseAI[category][setting][1] : undefined)
				}
			else
				botDiff[category] = {}
			
		if (botDiff.Scattering.WorkingScatter > botDiff.Scattering.MaxScatter)
			botDiff.Scattering.WorkingScatter = botDiff.Scattering.MaxScatter * 0.9
		if (botDiff.Scattering.MinScatter > botDiff.Scattering.WorkingScatter)
			botDiff.Scattering.MinScatter = botDiff.Scattering.WorkingScatter * 0.9
		//Squares and square roots
		//THIS IS AN INCOMPLETE LIST
		botDiff.Shoot.FAR_DIST_ENEMY_SQR = botDiff.Shoot.FAR_DIST_ENEMY * botDiff.Shoot.FAR_DIST_ENEMY
		botDiff.Grenade.MIN_DIST_NOT_TO_THROW_SQR = botDiff.Grenade.MIN_DIST_NOT_TO_THROW * botDiff.Grenade.MIN_DIST_NOT_TO_THROW
		botDiff.Grenade.MIN_THROW_GRENADE_DIST_SQRT = botDiff.Grenade.MIN_THROW_GRENADE_DIST * botDiff.Grenade.MIN_THROW_GRENADE_DIST //This looks like it should be a square root: but default values are the square of MIN_THROW_GRENADE_DIST??
		botDiff.Grenade.RUN_AWAY_SQR = botDiff.Grenade.RUN_AWAY * botDiff.Grenade.RUN_AWAY
		botDiff.Grenade.ADD_GRENADE_AS_DANGER_SQR = botDiff.Grenade.ADD_GRENADE_AS_DANGER * botDiff.Grenade.ADD_GRENADE_AS_DANGER
		botDiff.Mind.MAX_AGGRO_BOT_DIST_SQR = botDiff.Mind.MAX_AGGRO_BOT_DIST * botDiff.Mind.MAX_AGGRO_BOT_DIST
		botDiff.Scattering.DIST_FROM_OLD_POINT_TO_NOT_AIM_SQRT = Math.sqrt(botDiff.Scattering.DIST_FROM_OLD_POINT_TO_NOT_AIM)
	}

	//diffVar should be an array (Or a list..? Dunno. Doesn't matter. Put it in square brackets either way) of four ints, one for each difficulty level
	static changeForAllDifficulties(mainBot, diffMod, botName)
	{
		//Cycle through all four difficulties for the given bot type, and assign them their difficulty number
		let botDiff = mainBot.difficulty.easy
		AILoader.changeAI(botDiff, diffMod, botName)
		mainBot.difficulty.normal = JsonUtil.clone(mainBot.difficulty.easy)
		mainBot.difficulty.hard = JsonUtil.clone(mainBot.difficulty.easy)
		mainBot.difficulty.impossible = JsonUtil.clone(mainBot.difficulty.easy)
	}
	
	static fillEmptyDifficultySlots()
	{
		//Doing this manually for now. Make it programatic later.
		let problemBots = ["followergluharsnipe", "assaultgroup"]
		for (let bot in botTypes)
			if (!botTypes[bot].difficulty || !botTypes[bot].difficulty.easy || !botTypes[bot].difficulty.easy.Lay)
				problemBots.push(bot)
		let solutionBot = "pmcbot"
		for (let bot in problemBots)
			if (botTypes[problemBots[bot]])
				botTypes[problemBots[bot]] = JsonUtil.clone(botTypes[solutionBot])
	}
	
	static setDifficulty()
	{
		if (!DatabaseServer.tables.bots.types.assaultgroup)
			DatabaseServer.tables.bots.types.assaultgroup = JsonUtil.clone(botTypes.pmcbot)

		AILoader.generateDifficultyLevels()

		AILoader.roundAllBotStats()
	}

	main()
	{
		AILoader.fillEmptyDifficultySlots()
		//All actual assignment of difficulty values has been moved into this function
		AILoader.setDifficulty()
	}
	
	static siftForPMCs()
	{
		for (let bot in config.aiChanges.botDifficulties)
			if (bot == "bear" && !config.aiChanges.botDifficulties[BotConfig.pmc.bearType])
				config.aiChanges.botDifficulties[BotConfig.pmc.bearType] = config.aiChanges.botDifficulties[bot]
			else if (bot == "usec" && !config.aiChanges.botDifficulties[BotConfig.pmc.usecType])
				config.aiChanges.botDifficulties[BotConfig.pmc.usecType] = config.aiChanges.botDifficulties[bot]
		for (let bot in config.aiChanges.botsToLeaveUnchanged)
			if (config.aiChanges.botsToLeaveUnchanged[bot] == "bear"
			&& !config.aiChanges.botsToLeaveUnchanged.includes(BotConfig.pmc.bearType))
				config.aiChanges.botsToLeaveUnchanged.push(BotConfig.pmc.bearType)
			else if (config.aiChanges.botsToLeaveUnchanged[bot] == "usec"
			&& !config.aiChanges.botsToLeaveUnchanged.includes(BotConfig.pmc.usecType))
				config.aiChanges.botsToLeaveUnchanged.push(BotConfig.pmc.usecType)
	}
	
	static generateDifficultyLevels()
	{
		let diffSet;
		let diffMod;
		database.globals.config.FinsDifficultyTemplate = JsonUtil.clone(baseAI)
		for (let bot in botTypes)
		{
			if (config.aiChanges.botsToLeaveUnchanged.includes(bot))
				continue
			else if (config.aiChanges.botDifficulties[bot])
				diffMod = config.aiChanges.botDifficulties[bot]
			else if (!bot.toLowerCase().includes("boss"))
				diffMod = config.aiChanges.overallAIDifficultyMod
			else
				continue
			let botName = bot
			bot = botTypes[bot]
			AILoader.changeForAllDifficulties(bot, diffMod, botName)
		}
	}
}

var incompatibleSlots = []
var problemMods = []

//I now know this is Javascript. Huzzah! Thanks Pomaranczowy, this mod's fungus-like expansion is now partially your fault!

module.exports.AILoader = AILoader;