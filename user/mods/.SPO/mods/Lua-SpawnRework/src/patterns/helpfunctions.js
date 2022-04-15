module.exports = {
    //Return a array with spawn locations with or without chances
    //(obj, string)
    //type: "with_chance","without_chance"
    generate_info_array:
    function generate_info_array(info, type){
        let chance_array = []
        //Location array with chances
        if (type === "with_chance"){
            for (let [loc_name, chance] of Object.entries(info)){
                for (let count = chance; count > 0; count--) {
                    chance_array.push(loc_name)
                }
            }
        }
        //Location array without chances. Can be used to instant spawn waves without overlapping location at raid start.
        else if (type === "without_chance"){
            for (let [loc_name, chance] of Object.entries(info)){
                if (chance > 0) chance_array.push(loc_name)
            }
        }

        return chance_array
    },

    add_boss_type_spawn_simple:
    function add_boss_type_spawn_simple(map_base, name, chance, spawn_location, difficulty, escort_type, escort_difficulty, escort_amount, spawn_time){
        if (spawn_location == undefined){
            spawn_location = ""
        }
        
        let boss_template = {
            "BossName": name,
			"BossChance": chance,
			"BossZone": spawn_location,
			"BossPlayer": false,
			"BossDifficult": difficulty,
			"BossEscortType": escort_type,
			"BossEscortDifficult": escort_difficulty,
			"BossEscortAmount": escort_amount,
			"Time": spawn_time
        }

        map_base.BossLocationSpawn.push(boss_template)
        return map_base
    },

    add_boss_type_spawn_complete:
    function add_boss_type_spawn_complete(map_base, name, chance, spawn_location, difficulty, escort_type, escort_difficulty, escort_amount, spawn_time, trigger_id, trigger_name, supports){
        if (spawn_location == undefined){
            spawn_location = ""
        }
        
        let boss_template = {
            "BossName": name,
			"BossChance": chance,
			"BossZone": spawn_location,
			"BossPlayer": false,
			"BossDifficult": difficulty,
			"BossEscortType": escort_type,
			"BossEscortDifficult": escort_difficulty,
			"BossEscortAmount": escort_amount,
			"Time": spawn_time,
            "TriggerId": trigger_id,
            "TriggerName": trigger_name,
            "Supports":supports
        }

        map_base.BossLocationSpawn.push(boss_template)
        return map_base
    },

    add_trigger_type_spawn:
    function add_trigger_type_spawn(map_base, name, chance, spawn_location, difficulty, escort_type, escort_difficulty, escort_amount, spawn_time, trigger_id, trigger_name, supports){
        if (spawn_location == undefined){
            spawn_location = ""
        }
        
        let boss_template = {
            "BossName": name,
			"BossChance": chance,
			"BossZone": spawn_location,
			"BossPlayer": false,
			"BossDifficult": difficulty,
			"BossEscortType": escort_type,
			"BossEscortDifficult": escort_difficulty,
			"BossEscortAmount": escort_amount,
			"Time": spawn_time,
            "TriggerId": trigger_id,
            "TriggerName": trigger_name,
            "Supports":supports
        }

        map_base.BossLocationSpawn.push(boss_template)
        return map_base
    },

    //Remove boss spawn location from other bots' spawn location
    remove_boss_loc:
    function remove_boss_loc(map_configs, spawn_location){
        for (let [key,value] of Object.entries(map_configs.wave_settings)){
            if (key !== "triggered_raider_waves"){
                if (map_configs.wave_settings[key].spawn_locations != undefined){
                    delete map_configs.wave_settings[key].spawn_locations[spawn_location]
                }
            }
        }

        return map_configs
    },

    add_wave_type_spawn:
    function add_wave_type_spawn(map_base, current_wave, spawn_time, slot_min, slot_max, spawn_location, difficulty, wild_spawn_type){
        if (spawn_location == undefined){
            spawn_location = ""
        }

        // trying to fix wave slots by lowering the number otherwise it won't spawn exact amount of slots :shrug:
        if (slot_min === slot_max) {
            // Make the wave spawns only two not three or one (bSG maGic)
            if (slot_min === 2) slot_max = 1
            else if (slot_min > 2) slot_min = --slot_max // higher than 2 slots will be spawn one more bot, reduce it
        }

        let wave_template = {
            "number": current_wave,
			"time_min": spawn_time,
			"time_max": spawn_time,
			"slots_min": slot_min,
			"slots_max": slot_max,
			"SpawnPoints": spawn_location,
			"BotSide": "Savage",
			"BotPreset": difficulty,
			"WildSpawnType": wild_spawn_type,
			"isPlayers": false
        }
        if (current_wave > 0)
           map_base.waves.push(wave_template)
        else
            map_base.waves.unshift(wave_template)

        return map_base
    },

    location_name_translate:
    function location_name_translate(maps){
        for (let i=0; i<maps.length; i++){
            if (maps[i] === "customs"){
                maps[i] = "bigmap"
            }
            else if(maps[i] === "reserve"){
                maps[i] = "rezervbase"
            }
            else if(maps[i] === "factory_day"){
                maps[i] = "factory4_day"
            }
            else if(maps[i] === "factory_night"){
                maps[i] = "factory4_night"
            }
        }
        return maps
    },

    readFile:
    function readFile(filePath) {
        if (VFS.exists(filePath) === true) {
            return( JsonUtil.deserialize( VFS.readFile(filePath) ) )
        }
        else {
            return undefined
        }
    }
}