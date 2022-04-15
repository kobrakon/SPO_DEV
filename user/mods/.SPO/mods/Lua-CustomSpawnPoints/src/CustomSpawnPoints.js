"use strict";

const defaultSpawnParms = {};

class CustomSpawnPoints
{
    constructor()
    {
        this.mod = "Lua-CustomSpawnPoints";
		let version = "1.4.2";
		if (require("../config/config.json").Enabled === false)
		{
			version += " (Disabled)";
		}
		Logger.info(`Loading: ${this.mod}: ${version}`);

        if (DatabaseServer.tables.bots.types["bosstagilla"] === undefined)
        {
            Logger.error(`${this.mod}: This mod requires at least "EFT v0.12.11" and "AKI v2.0.0" to function, Disabled... `);
            return;
        }

        this.GetToWork();
        HttpRouter.onStaticRoute["/client/locations"]["Lua-CustomSpawnPoints"] = this.updateBind.bind(this);
    }

    updateBind(url, info, sessionID)
    {
        this.GetToWork();
        return HttpResponse.getBody(LocationController.generateAll());
    }

    GetToWork()
    {
        const modConfig = require("../config/config.json");
        if (modConfig.Enabled === false)
        {
            return;
        }

        // DEBUG9
        if (modConfig.DEBUG.NoFallDamage === true)
        {
            DatabaseServer.tables.globals.config.Health.Falling.SafeHeight = 99999;
        }

        if (modConfig.DEBUG.UnlimitedStamina === true)
        {
            DatabaseServer.tables.globals.config.Stamina.Capacity = 99999;
            DatabaseServer.tables.globals.config.Stamina.OxygenCapacity = 99999;
        }
        // END OF 99999

        let updatedList = "";
        let readMe = false;
        let spawnPointsPath = `${ModLoader.getModPath(this.mod)}config/spawnpoints/`;
        let dirsList = VFS.getDirs(spawnPointsPath);
        let totalSpawnPoints = { "Default": { "Bot": 0, "Player": 0, "Boss": 0 }, "Custom": { "Bot": 0, "Player": 0, "Boss": 0 } };

        // Check Disabled Folders List
        let disableList = (modConfig.DisableFolderList !== undefined && modConfig.DisableFolderList.trim().length > 0) ? modConfig.DisableFolderList.split(",").map(item => item.trim()) : undefined;
        for (let folderIndex = 0; folderIndex < dirsList.length; folderIndex++)
        {
            // Remove Empty Folder
            if (VFS.getFiles(`${spawnPointsPath}${dirsList[folderIndex]}`).length === 0)
            {
                dirsList.splice(folderIndex--, 1);
                continue;
            }

            // Remove Disabled Folder
            for (let index in disableList)
            {
                if (disableList[index].toLowerCase() === dirsList[folderIndex].toLowerCase())
                {
                    dirsList.splice(folderIndex--, 1);
                    break;
                }
            }
        }
        dirsList.unshift("default");

        for (let map in DatabaseServer.tables.locations)
        {
            if (map.toLowerCase() === "base")
            {
                continue;
            }

            let mapBase = DatabaseServer.tables.locations[map].base;
            if (mapBase.Locked === true)
            {
                continue;
            }

            let addedSpawnPoints = false;
            let newSpawnPointParams = [];
            let currentSpawnPoints = { "Default": { "Bot": 0, "Player": 0, "Boss": 0 }, "Custom": { "Bot": 0, "Player": 0, "Boss": 0 } };
		
			// DEBU9
            if (modConfig.DEBUG.UnlimitedRaidTime === true)
            {
                mapBase.escape_time_limit = 99999;
            }

            if (defaultSpawnParms[map] === undefined && mapBase.SpawnPointParams !== undefined)
            {
                defaultSpawnParms[map] = JsonUtil.clone(mapBase.SpawnPointParams);
            }

            if (defaultSpawnParms[map] !== undefined)
            {
                newSpawnPointParams = JsonUtil.clone(defaultSpawnParms[map]);

                for (let key = 0; key < newSpawnPointParams.length; key++)
                {
                    let values = newSpawnPointParams[key];
                    for (let categoryIndex = 0; categoryIndex < values.Categories.length; categoryIndex++)
                    {
                        switch(values.Categories[categoryIndex])
                        {
                            case "Bot":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Bot[map] || false) === true)
                                {
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Bot++;
                                }

                                break;
                            }

                            case "Player":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Player[map] || false) === true)
                                {
                                    values.Infiltration = "";
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Player++;
                                }

                                break;
                            }

                            case "Boss":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === true)
                                {
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Boss++;
                                }
                            }
                        }
                    }

                    if (values.Categories.length === 0)
                    {
                        newSpawnPointParams.splice(key--, 1);
                    }
                }
            }

            for (let folderIndex in dirsList)
            {
                let filePath = folderIndex > 0 ? `${spawnPointsPath}${dirsList[folderIndex]}/${map}.json` : `${spawnPointsPath}${map}.json`;
                let config = (VFS.exists(filePath) === true) ? JsonUtil.deserialize(VFS.readFile(filePath)) : undefined;

                // Write json config or skips if spawn zone is empty
                if (config === undefined)
                {
                    if (folderIndex > 0) continue;

                    let lists = "";
                    let keys = "";
                    let infiltrations = "";
                    let infiltrationsArr = [];
                    let spawnZones = [];
                    let openZones = [];

                    // OpenZones
                    if (mapBase.OpenZones.includes(",") === false)
                    {
                        openZones.push(mapBase.OpenZones);
                    }
                    else
                    {
                        let arr = mapBase.OpenZones.split(",").map(item => item.trim());

                        for (let index in arr)
                        {
                            let zoneName = arr[index];

                            if (spawnZones.findIndex(item => item === zoneName) === -1)
                            {
                                spawnZones.push(zoneName);
                            }
                        }
                    }

                    // Waves
                    for (let [_, values] of Object.entries(mapBase.waves))
                    {
                        if (values.SpawnPoints === undefined || values.SpawnPoints.length < 1)
                        {
                            continue;
                        }

                        if (spawnZones.findIndex(item => item === values.SpawnPoints) === -1)
                        {
                            spawnZones.push(values.SpawnPoints);
                        }
                    }

                    // Bosses
                    for (let [_, values] of Object.entries(mapBase.BossLocationSpawn))
                    {
                        if (values.BossZone === undefined || values.BossZone.length < 1)
                        {
                            continue;
                        }

                        if (values.BossZone.includes(",") === false)
                        {
                            if (spawnZones === undefined || spawnZones.findIndex(item => item === values.BossZone) === -1)
                            {
                                spawnZones.push(values.BossZone);
                            }
                        }
                        else
                        {
                            let arr = values.BossZone.split(",").map(item => item.trim());

                            for (let index in arr)
                            {
                                let zoneName = arr[index];

                                if (spawnZones.findIndex(item => item === zoneName) === -1)
                                {
                                    spawnZones.push(zoneName);
                                }
                            }
                        }
                    }

                    // SpawnPointParams
                    for (let [_, values] of Object.entries(defaultSpawnParms[map]))
                    {
                        // Infiltration for Player Spawn Points
                        if (values.Infiltration !== undefined && values.Infiltration.length > 1 && infiltrationsArr.findIndex(item => item === values.Infiltration) === -1)
                        {
                            infiltrationsArr.push(values.Infiltration);
                        }

                        // Spawn Zone
                        if (values.BotZoneName !== undefined && values.BotZoneName.length > 0 && spawnZones.findIndex(item => item === values.BotZoneName) === -1)
                        {
                            spawnZones.push(values.BotZoneName);
                        }
                    }

                    // Format Infiltration Lists
                    for (let index in infiltrationsArr)
                    {
                        if (index > 0)
                        {
                            infiltrations += `, ${infiltrationsArr[index]}`;
                        }
                        else
                        {
                            infiltrations = infiltrationsArr[index];
                        }
                    }

                    // Format Spawn Zone Lists
                    for (let index in spawnZones)
                    {
                        if (index > 0)
                        {
                            lists += `, ${spawnZones[index]}`;
                            keys += `,\n\n\t"${spawnZones[index]}": [\n\t]`;
                        }
                        else
                        {
                            lists = spawnZones[index];
                            keys += `"${spawnZones[index]}": [\n\t]`;
                        }
                    }

                    if (lists.length > 0)
                    {
                        readMe = true;
                        VFS.writeFile(filePath, `{\n\t"SpawnZone Available List": "${lists}",\n\t"Infiltration Available List": "${infiltrations}",\n\n\t${keys}\n}`);
                        Logger.log(`${this.mod}: Config Created "${filePath.replace("user/mods/Lua-CustomSpawnPoints/", "")}" `, "yellow", "blue");
                    }
                    else
                    {
                        continue;
                    }
                }
                else
                {
                    if (config["SpawnZone Available List"] === undefined)
                    {
                        Logger.error(`${this.mod}: ${map} has no "SpawnZone Available List", delete the config file to re-generate the file... `);
                        continue;
                    }

                    if (config["Infiltration Available List"] === undefined)
                    {
                        Logger.error(`${this.mod}: ${map} has no "Infiltration Available List", delete the config file to re-generate the file... `);
                        continue;
                    }

                    let spawnZone = config["SpawnZone Available List"].split(",").map(item => item.trim());
                    let infiltrations = config["Infiltration Available List"].split(",").map(item => item.trim());
                    for (let [zoneName, values] of Object.entries(config))
                    {
                        if (zoneName === "SpawnZone Available List" || zoneName === "Infiltration Available List" || Object.keys(values).length === 0)
                        {
                            continue;
                        }

                        // Checking SpawnZone Name
                        let foundZone = false;
                        for (let index in spawnZone)
                        {
                            if (spawnZone[index] === zoneName)
                            {
                                foundZone = true;
                                break;
                            }
                        }

                        if (foundZone === false)
                        {
                            if (spawnZone.length === 1)
                            {
                                zoneName = spawnZone[0];
                                Logger.warning(`${this.mod}: ${map} has non-exsist spawn zone "${zoneName}", Fixed to "${spawnZone[0]}" `);
                            }
                            else
                            {
                                Logger.error(`${this.mod}: ${map} has non-exsist spawn zone "${zoneName}", Skipping... `);
                                continue;
                            }
                        }

                        for (let index in config[zoneName])
                        {
                            let zoneConfig = config[zoneName][index];
                            let bSkip = false;

                            // Checking Infiltration
                            if (zoneConfig.Infiltration.length <= 1)
                            {
                                for (let index in zoneConfig.Categories)
                                {
                                    if (zoneConfig.Categories[index] === "Player")
                                    {
                                        if (infiltrations.length === 1)
                                        {
                                            zoneConfig.Infiltration = infiltrations[0];
                                            Logger.warning(`${this.mod}: ${map} has "${zoneConfig.Categories[index]}" spawn zone in "${zoneName}" but [Infiltration] has empty value, Fixed value to "${infiltrations[0]}" `);
                                        }
                                        else
                                        {
                                            Logger.error(`${this.mod}: ${map} has "${zoneConfig.Categories[index]}" spawn zone in "${zoneName}" but [Infiltration] has empty value, Skipping... `);
                                            bSkip = true;
                                            break;
                                        }
                                    }
                                }

                                if (bSkip) continue;
                            }
                            else
                            {
                                foundZone = false;
                                for (let index in infiltrations)
                                {
                                    if (infiltrations[index] === zoneConfig.Infiltration)
                                    {
                                        foundZone = true;
                                        break;
                                    }
                                }

                                if (foundZone === false)
                                {
                                    Logger.error(`${this.mod}: ${map} has non-exsist infiltration "${zoneConfig.Infiltration}" in "${zoneName}", Skipping... `);
                                    continue;
                                }
                            }

                            /* Validate and Fix Parameters - Start */
                            if (zoneConfig.Position === undefined || typeof(zoneConfig.Sides) !== "object" || zoneConfig.Position.length !== 3)
                            {
                                Logger.error(`${this.mod}: ${map} has bad Position values [${zoneConfig.Position[0]}, ${zoneConfig.Position[1]}, ${zoneConfig.Position[2]}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.Rotation === undefined || typeof(zoneConfig.Rotation) !== "number" || zoneConfig.Rotation < 0 || zoneConfig.Rotation > 360)
                            {
                                Logger.error(`${this.mod}: ${map} has bad Rotation value ${zoneConfig.Rotation} in "${zoneName}", Fixed value to 90.0 `);
                                zoneConfig.Rotation = 90.0;
                                continue;
                            }

                            if (zoneConfig.Sides === undefined || typeof(zoneConfig.Sides) !== "object")
                            {
                                Logger.error(`${this.mod}: ${map} has bad Sides value [${zoneConfig.Sides}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.Categories === undefined || typeof(zoneConfig.Categories) !== "object")
                            {
                                Logger.error(`${this.mod}: ${map} has bad Categories value [${zoneConfig.Categories}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.DelayToCanSpawnSec === undefined || typeof(zoneConfig.DelayToCanSpawnSec) !== "number" || zoneConfig.DelayToCanSpawnSec < 0)
                            {
                                Logger.error(`${this.mod}: ${map} has bad DelayToCanSpawnSec value ${zoneConfig.DelayToCanSpawnSec} in "${zoneName}", Fixed value to 1 `);
                                zoneConfig.DelayToCanSpawnSec = 1;
                            }

                            if (zoneConfig.ColliderRadius === undefined || typeof(zoneConfig.ColliderRadius) !== "number" || zoneConfig.ColliderRadius < 0)
                            {
                                Logger.error(`${this.mod}: ${map} has bad ColliderRadius value ${zoneConfig.ColliderRadius} in "${zoneName}", Fixed value to 0.0 `);
                                zoneConfig.ColliderRadius = 0.0;
                            }
                            /* Validate and Fix Parameters - End */

                            // New Playgrounds
                            newSpawnPointParams.push({
                                "Id": HashUtil.generate(),
                                "Position": {
                                    "x": zoneConfig.Position[0],
                                    "y": zoneConfig.Position[1],
                                    "z": zoneConfig.Position[2]
                                },
                                "Rotation": zoneConfig.Rotation,
                                "Sides": zoneConfig.Sides,
                                "Categories": zoneConfig.Categories,
                                "Infiltration": zoneConfig.Infiltration,
                                "DelayToCanSpawnSec": zoneConfig.DelayToCanSpawnSec,
                                "ColliderParams": {
                                    "_parent": "SpawnSphereParams",
                                    "_props": {
                                        "Center": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "Radius": zoneConfig.ColliderRadius
                                    }
                                },
                                "BotZoneName": zoneName
                            });
                            addedSpawnPoints = true;
                            for (let index in zoneConfig.Categories)
                            {
                                switch(zoneConfig.Categories[index])
                                {
                                    case "Bot": currentSpawnPoints.Custom.Bot++; break;
                                    case "Player": currentSpawnPoints.Custom.Player++; break;
                                    case "Boss": currentSpawnPoints.Custom.Boss++;
                                }
                            }
                            if (modConfig.DEBUG.PrintAddedSpawnPoints === true)
                            {
                                Logger.debug(`${dirsList[folderIndex]}: ${map} @ "${zoneName}" [${zoneConfig.Position[0]}, ${zoneConfig.Position[1]}, ${zoneConfig.Position[2]}] for "${zoneConfig.Sides}" and "${zoneConfig.Categories}" with ${zoneConfig.ColliderRadius} ColliderRadius\nComment: "${zoneConfig.Comment}" `);
                            }
                        }
                    }
                }
            }

            let foundSpawn = [false, false]; // Bot, Player
            for (let [_, values] of Object.entries(newSpawnPointParams))
            {
                if (values.Categories.includes("Bot") === true) foundSpawn[0] = true;
                if (values.Categories.includes("Player") === true) foundSpawn[1] = true;
                if (foundSpawn.includes(false) === false) break;
            }

            // Check missing spawn points from default spawn points
            if (foundSpawn.includes(false) === true)
            {
                if (foundSpawn[0] === false) Logger.error(`${this.mod}: No spawn point for "Bot" in "${map}"... `);
                if (foundSpawn[1] === false) Logger.error(`${this.mod}: No spawn point for "Player" in "${map}"... `);

                for (let key in defaultSpawnParms[map])
                {
                    // Find same default spawn point
                    let currentSpawnPointParms;
                    for (let newKey in newSpawnPointParams)
                    {
                        if (defaultSpawnParms[map][key].Id === newSpawnPointParams[newKey].Id)
                        {
                            currentSpawnPointParms = newSpawnPointParams[newKey];
                            break;
                        }
                    }

                    if (currentSpawnPointParms === undefined)
                    {
                        let spawnPoint;
                        currentSpawnPointParms = defaultSpawnParms[map][key];
                        if (foundSpawn[0] === false && currentSpawnPointParms.Categories.includes("Bot") === true)
                        {
                            spawnPoint = {...currentSpawnPointParms};
                            spawnPoint.Categories = ["Bot"];
                            currentSpawnPoints.Default.Bot++;
    
                            if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === false && currentSpawnPointParms.Categories.includes("Boss") === true)
                            {
                                spawnPoint.Categories.push("Boss");
                                currentSpawnPoints.Default.Boss++;
                            }
                        }
    
                        if (foundSpawn[1] === false && currentSpawnPointParms.Infiltration.length > 1 && currentSpawnPointParms.Categories.includes("Player") === true)
                        {
                            if (spawnPoint === undefined)
                            {
                                spawnPoint = {...currentSpawnPointParms};
                                spawnPoint.Categories = ["Player"];
                            }
                            else
                            {
                                spawnPoint.Categories.push("Player");
                            }
                            currentSpawnPoints.Default.Player++;
                        }
    
                        if (spawnPoint !== undefined) newSpawnPointParams.push(spawnPoint);
                    }
                    else
                    {
                        let defaultSpawnPoint = defaultSpawnParms[map][key];
                        if (foundSpawn[0] === false && defaultSpawnPoint.Categories.includes("Bot") === true)
                        {
                            currentSpawnPointParms.Categories.push("Bot");
                            currentSpawnPoints.Default.Bot++;
    
                            if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === false && currentSpawnPointParms.Categories.includes("Boss") === false && defaultSpawnPoint.Categories.includes("Boss") === true)
                            {
                                currentSpawnPointParms.Categories.push("Boss");
                                currentSpawnPoints.Default.Boss++;
                            }
                        }
    
                        if (foundSpawn[1] === false && defaultSpawnPoint.Infiltration.length > 1 && defaultSpawnPoint.Categories.includes("Player") === true)
                        {
                            currentSpawnPointParms.Categories.push("Player");
                            currentSpawnPointParms.Infiltration = defaultSpawnPoint.Infiltration;
                            currentSpawnPoints.Default.Player++;
                        }
                    }
                }

                if (foundSpawn[0] === false)
                {
                    if (currentSpawnPoints.Default.Bot === 0)
                    {
                        Logger.error(`${this.mod}: No spawn point for "Bot" in default spawn points list, Skipping...\n  >>  (You have to add Custom or Default Spawn Points) `);
                    }
                    else
                    {
                        foundSpawn[0] = true;
                        Logger.warning(`${this.mod}: Recovered "Bot" default spawn points: ${currentSpawnPoints.Default.Bot} `);
                    }
                }

                if (foundSpawn[1] === false)
                {
                    if (currentSpawnPoints.Default.Player === 0)
                    {
                        Logger.error(`${this.mod}: No spawn point for "Player" in default spawn points list, Skipping...\n  >>  (You have to add Custom or Default Spawn Points) `);
                    }
                    else
                    {
                        foundSpawn[1] = true;
                        Logger.warning(`${this.mod}: Recovered "Player" default spawn points: ${currentSpawnPoints.Default.Player} `);
                    }
                }

                if (foundSpawn.includes(false) === true) continue;
            }
    
            if (addedSpawnPoints)
            {
                if (updatedList.length > 0)
                {
                    if (updatedList.includes(map) === false)
                    {
                        updatedList += `, ${map}`;
                    }
                }
                else
                {
                    updatedList = map;
                }
            }

            if (modConfig.PrintMapLoadLogs === true)
            {
                Logger.log(`[${map}]${this.GetSpace(map, 16)}Custom Spawn Points      Bot: ${currentSpawnPoints.Custom.Bot},${this.GetSpace(currentSpawnPoints.Custom.Bot, 5)}Player: ${currentSpawnPoints.Custom.Player},${this.GetSpace(currentSpawnPoints.Custom.Player, 5)}Boss: ${currentSpawnPoints.Custom.Boss} `, "white", "cyan");
                Logger.log(`[${map}]${this.GetSpace(map, 16)}Default Spawn Points     Bot: ${currentSpawnPoints.Default.Bot},${this.GetSpace(currentSpawnPoints.Default.Bot, 5)}Player: ${currentSpawnPoints.Default.Player},${this.GetSpace(currentSpawnPoints.Default.Player, 5)}Boss: ${currentSpawnPoints.Default.Boss} \n`, "white", "cyan");
            }

            totalSpawnPoints.Default.Bot += currentSpawnPoints.Default.Bot;
            totalSpawnPoints.Default.Player += currentSpawnPoints.Default.Player;
            totalSpawnPoints.Default.Boss += currentSpawnPoints.Default.Boss;
            totalSpawnPoints.Custom.Bot += currentSpawnPoints.Custom.Bot;
            totalSpawnPoints.Custom.Player += currentSpawnPoints.Custom.Player;
            totalSpawnPoints.Custom.Boss += currentSpawnPoints.Custom.Boss;
            mapBase.SpawnPointParams = newSpawnPointParams;
        }

        if (updatedList.length > 0)
        {
            Logger.log(`${this.mod}: Custom Spawn Points    Bot: ${totalSpawnPoints.Custom.Bot},${this.GetSpace(totalSpawnPoints.Custom.Bot, 5)}Player: ${totalSpawnPoints.Custom.Player},${this.GetSpace(totalSpawnPoints.Custom.Player, 5)}Boss: ${totalSpawnPoints.Custom.Boss} `, "white", "blue");
            Logger.log(`${this.mod}: Default Spawn Points   Bot: ${totalSpawnPoints.Default.Bot},${this.GetSpace(totalSpawnPoints.Default.Bot, 5)}Player: ${totalSpawnPoints.Default.Player},${this.GetSpace(totalSpawnPoints.Default.Player, 5)}Boss: ${totalSpawnPoints.Default.Boss} `, "white", "blue");
			Logger.log(`${this.mod}: Successfully Loaded ${dirsList.length-1} Presets for "${updatedList}" `, "white", "blue");
        }
        else
        {
            Logger.log(`${this.mod}: Default Spawn Points   Bot: ${totalSpawnPoints.Default.Bot},${this.GetSpace(totalSpawnPoints.Default.Bot, 5)}Player: ${totalSpawnPoints.Default.Player},${this.GetSpace(totalSpawnPoints.Default.Player, 5)}Boss: ${totalSpawnPoints.Default.Boss} `, "white", "blue");
        }

        if (readMe)
        {
            Logger.log(`${this.mod}: Check out "!Readme/example.json" for how to make Custom Spawn Points! `, "white", "magenta");
        }
    }

    GetSpace(str, line)
    {
        if (typeof(str) === "number") str = str.toString();
        else if (typeof(str) !== "string") return " ";
        let space = "";
        for (let i = 0; i < line-str.length; i++) space += " ";
        return space;
    }
}

module.exports.Mod = CustomSpawnPoints;