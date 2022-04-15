/*
エレシュキガル
*/

"use strict";

class raids
{
    static applyValues()
    {
        const inraid = InraidConfig
        const locations = LocationConfig
        const config = require('../../config/config.json')

        locations.allowLootOverlay = config["Raids values"]["Loot values"].allowLootOverlay;
        for (const map in config["Raids values"]["Loot values"].limits) {
            locations.limits[map] = config["Raids values"]["Loot values"].limits[map]
        }

        for (const map in config["Raids values"]['Loot values'].looseLootMultiplier) {
            locations.looseLootMultiplier[map] = config['Raids values']['Loot values'].looseLootMultiplier[map]
        }

        for (const map in config["Raids values"]['Loot values'].looseLootMultiplier) {
            locations.staticLootMultiplier[map] = config['Raids values']['Loot values'].staticLootMultiplier[map]
        }

        for(const options in inraid){
            inraid[options] = config["Raids values"][options]
        }
    }
}

module.exports = raids;