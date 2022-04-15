/*
エレシュキガル
*/

"use strict";

class bots
{
    static applyValues()
    {
        const bots = BotConfig;
        const config = require('../../config/config.json');

        const pmcsConfig = config.Bots.pmc.types
        for (const bot in pmcsConfig) {
            switch (bot) {
                default:
                    bots.pmc.types[bot] = pmcsConfig[bot]
                    break;
            }
        }

        for(const options in config.Bots.pmc){
            switch(options){
                case "types":
                    break;
                default:
                    bots.pmc[options] = config.Bots.pmc[options]
                    break;
            }
        }

        for (const bot in config.Bots.MaximumLoadoutsAmount) {
            bots.presetBatch[bot] = config.Bots.MaximumLoadoutsAmount[bot]
        }
    }
}

module.exports = bots;