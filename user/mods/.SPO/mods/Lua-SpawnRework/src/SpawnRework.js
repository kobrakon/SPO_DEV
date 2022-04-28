//Updated by Hosav for SPT-AKI B5+ and v0.5.0+ by Lua

"use strict"

const pkg = require("../package.json")
const helper = require("./patterns/helpfunctions")
const modConfig = require("../config/config.json")
const modName = `${pkg.author}-${pkg.name}`
const locations = DatabaseServer.tables.locations
const bots = DatabaseServer.tables.bots
let isBear = false

class SpawnRework {
    static onLoadMod() {
        Logger.info(`Loading: ${modName} ${pkg.version}`)

        if (bots.types['exusec'] === undefined) {
            Logger.error(`${modName}: Requires at least v12.12 of EFT, Mod Disabled...`)
            return
        }

        if (modConfig.__DEBUG__Generate_bots_on_start == true) {
			SpawnRework.LoadModConfig()
			Logger.debug(`${modName} - Debug Generate Bots Completed`)
		}

        HttpRouter.onStaticRoute["/singleplayer/settings/raid/menu"]["zZZmoreZZz-Lua-SpawnRework"] = SpawnRework.RouteRaidMenu
        HttpRouter.onStaticRoute["/client/weather"]["zZZmoreZZz-Lua-SpawnRework"] = SpawnRework.getPMC
        HttpRouter.onStaticRoute["/client/locations"]["zZZmoreZZz-Lua-SpawnRework"] = SpawnRework.RouteLocations
    }
    
    static getPMC(url, info, sessionID, output)
    {
        SpawnRework.setBotPMC(sessionID)
        return(output)
    }

    static setBotPMC(sessionID)
    {
        let pmcData = ProfileController.getPmcProfile(sessionID)
                
        if (pmcData.Info.Side == "Bear")
        {
            isBear = true
        }
            
        if (pmcData.Info.Side == "Usec")
        {
            isBear = false
        }

    }

    static RouteRaidMenu(url, info, sessionID)
    {
		// Is this hideout already closed?
		if (locations.hideout.base.AveragePlayerLevel !== 0)
			SpawnRework.LoadModConfig()

        return HttpResponse.noBody(InraidConfig.raidMenuSettings)
    }

    static RouteLocations(url, info, sessionID){
		SpawnRework.LoadModConfig()
        return HttpResponse.getBody(LocationController.generateAll())
    }
	
	static LoadModConfig(sessionID) {
        //Load configurations
        let config = SpawnRework.GetModConfig()
        if (config === undefined) {
            return
        }

        //Spawn functions
        SpawnRework.ClearDefaultSpawns()
        SpawnRework.GenerateMapSpawns(config[0], config[0].script_file, config[1])
    }

    static GenerateMapSpawns(patternConfig, script_file, maps) {
        let behaviorRole = patternConfig.spawns.pmc_behavior_role.toLowerCase()
	
        if (!bots.types[behaviorRole]) {
            Logger.error(`${modName} - PMC Behavior Role "${patternConfig.spawns.pmc_behavior_role}" doesn't exsist, changing to "pmcBot"...`)
            behaviorRole = "pmcbot"
        }
		locations.hideout.base.AveragePlayerLevel = 0

		// AI Config
        BotConfig.maxBotCap = patternConfig.spawns.max_alive_bots
        BotConfig.chanceSameSideIsHostilePercent = patternConfig.spawns.chanceSameSideIsHostilePercent
        BotConfig.showTypeInNickname = patternConfig.spawns.showTypeInNickname

        // AI Type Cloning
        bots.types["assaultgroup"] = JsonUtil.clone(bots.types[behaviorRole])

        if (patternConfig.usec_default_enemy) {
            const role = BotConfig.usecType.toLowerCase()
            for (let diff in bots.types[role].difficulty) {
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_BEAR = patternConfig.usec_default_enemy.DEFAULT_ENEMY_BEAR
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_USEC = patternConfig.usec_default_enemy.DEFAULT_ENEMY_USEC
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_SAVAGE = patternConfig.usec_default_enemy.DEFAULT_ENEMY_SAVAGE
                bots.types[role].difficulty[diff].Mind.ENEMY_BY_GROUPS_PMC_PLAYERS = patternConfig.usec_default_enemy.ENEMY_BY_GROUPS_PMC_PLAYERS
                bots.types[role].difficulty[diff].Mind.ENEMY_BY_GROUPS_SAVAGE_PLAYERS = patternConfig.usec_default_enemy.ENEMY_BY_GROUPS_SAVAGE_PLAYERS
            }
        }
        if (patternConfig.bear_default_enemy) {
            const role = BotConfig.bearType.toLowerCase()
            for (let diff in bots.types[role].difficulty) {
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_BEAR = patternConfig.bear_default_enemy.DEFAULT_ENEMY_BEAR
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_USEC = patternConfig.bear_default_enemy.DEFAULT_ENEMY_USEC
                bots.types[role].difficulty[diff].Mind.DEFAULT_ENEMY_SAVAGE = patternConfig.bear_default_enemy.DEFAULT_ENEMY_SAVAGE
                bots.types[role].difficulty[diff].Mind.ENEMY_BY_GROUPS_PMC_PLAYERS = patternConfig.bear_default_enemy.ENEMY_BY_GROUPS_PMC_PLAYERS
                bots.types[role].difficulty[diff].Mind.ENEMY_BY_GROUPS_SAVAGE_PLAYERS = patternConfig.bear_default_enemy.ENEMY_BY_GROUPS_SAVAGE_PLAYERS
            }
        }        
        // Set Bot USEC Chance
       
                
        if (isBear)
        {
            patternConfig.spawns.pmc_usec_chance = 100
            BotConfig.pmc.isUsec = patternConfig.spawns.pmc_usec_chance
        }
            
        if (!isBear)
        {
            patternConfig.spawns.pmc_usec_chance = 0
            BotConfig.pmc.isUsec = patternConfig.spawns.pmc_usec_chance
        }


        // Set PMC Config
        BotConfig.pmc.types = {"assaultGroup": 100, "cursedAssault": 100}

        let map_base
        maps = helper.location_name_translate(maps)
        const scriptFile = require(`./patterns/${script_file}`)
        for (let map_name of maps) {
            if (map_name === "usec_default_enemy" || map_name === "bear_default_enemy")
                continue

            switch(map_name) {
                case "bigmap": 
                    map_base = JsonUtil.clone(locations[map_name].base)
                    locations[map_name].base = scriptFile.generate_bot(patternConfig.spawns.customs, map_base, map_name)
                break
                case "rezervbase": 
                    map_base = JsonUtil.clone(locations[map_name].base)
                    locations[map_name].base = scriptFile.generate_bot(patternConfig.spawns.reserve, map_base, map_name)
                break
                case "factory4_day": 
                    map_base = JsonUtil.clone(locations[map_name].base)
                    locations[map_name].base = scriptFile.generate_bot(patternConfig.spawns.factory_day, map_base, map_name)
                break
                case "factory4_night": 
                    map_base = JsonUtil.clone(locations[map_name].base)
                    locations[map_name].base = scriptFile.generate_bot(patternConfig.spawns.factory_night, map_base, map_name)
                break
				default:
                    if (locations[map_name] === undefined || locations[map_name].base.Enabled === false || locations[map_name].base.Locked === true) {
                        Logger.error(`${modName} - Pattern config has map "${map_name}" but map not available in SPT, Skipping...`)
                        break
                    }
                    map_base = JsonUtil.clone(locations[map_name].base)
                    locations[map_name].base = scriptFile.generate_bot(patternConfig.spawns[map_name], map_base, map_name)
                break
            }
        }

		Logger.info(`Max Alive Bots: ${BotConfig.maxBotCap} | PMC AI Behavior Type: "${behaviorRole.toUpperCase()}"`, "white", "yellow")
        Logger.success("Generated new bot spawns.")
    }

    static ClearDefaultSpawns(){
		locations.hideout.base.AveragePlayerLevel = 10
		for (const map in locations) {
			if (map.toLowerCase() === "base" || map.toLowerCase() === "hideout")
				continue

            //Clear wave spawn
			locations[map].base.waves = []

            //Clear boss spawn
			locations[map].base.BossLocationSpawn = []
		}
    }

    static GetModConfig() {
        let spawn_pattern = modConfig.default_pattern

        if (modConfig.use_random_patterns === true && modConfig.random_patterns !== undefined && Object.keys(modConfig.random_patterns).length > 0) {
            let pattern_list = helper.generate_info_array(modConfig.random_patterns, "with_chance")
            spawn_pattern = pattern_list[RandomUtil.getInt(0, pattern_list.length-1)]
        }
        let config_file = helper.readFile(`${ModLoader.getModPath(modName)}config/patterns/${spawn_pattern}.json`)
        if (config_file === undefined) {
            Logger.error(`${modName} - Spawn Pattern "${spawn_pattern}" doesn't exists, Check the config file, Mod Disabled...`)
            return undefined
        }

        let maps = []
        for (let [key, value] of Object.entries(config_file.spawns)){
			if (typeof(value) !== "object")
				continue

            maps.push(key)
        }

		Logger.success(`Loaded spawn patter: ${spawn_pattern}. Good Luck!`)
        return [config_file, maps]
    }
}

module.exports = SpawnRework
