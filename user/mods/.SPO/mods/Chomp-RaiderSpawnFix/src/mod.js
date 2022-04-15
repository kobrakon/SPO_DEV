"use strict";
const modName = "Chomp-LabsRaiderSpawnFix";

class Mod
{
    constructor()
    {
        Logger.info(`Loading: ${modName} 1.1.0`);
        let changeCount = 0;

        const labsBosses = DatabaseServer.tables.locations.laboratory.base.BossLocationSpawn;
        const reserveBosses = DatabaseServer.tables.locations.rezervbase.base.BossLocationSpawn;

        const spawn1 = labsBosses.find(x => x.TriggerId === "autoId_00008_EXFIL");
        if (spawn1)
        {
            spawn1.TriggerId = "00404";
			spawn1.BossChance = 100;
            changeCount++;
        }

        const spawn2 = labsBosses.find(x => x.TriggerId === "autoId_00010_EXFIL");
        if (spawn2)
        {
            spawn2.TriggerId = "00409";
			spawn2.BossChance = 100;
            changeCount++;
        }

        const spawn3 = reserveBosses.find(x => x.TriggerId === "00457");
        if (spawn3)
        {
            spawn3.TriggerId = "autoId_00632_EXFIL";
			spawn3.BossChance = 100;
            changeCount++;
        }

        const spawn4 = reserveBosses.find(x => x.TriggerId === "00452");
        if (spawn4)
        {
            spawn4.TriggerId = "autoId_00000_D2_LEVER";
			spawn4.BossChance = 100;
            changeCount++;
        }

        Logger.info(`${changeCount} spawn triggers fixed`);
    }
}

module.exports.Mod = Mod;