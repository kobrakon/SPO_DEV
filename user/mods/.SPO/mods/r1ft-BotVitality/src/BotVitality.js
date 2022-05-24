"use strict";

class BotVitality {
    static onLoadMod() 
    {
        const database = DatabaseServer.tables;
        const bots = database.bots.types;

        for (const id in bots) {
            if (bots[id].skills != null && bots[id].skills !== undefined) {
                if (bots[id].skills.Common != null && bots[id].skills.Common !== undefined) {
                    if (bots[id].skills.Common.Vitality != null && bots[id].skills.Common.Vitality !== undefined) {
                        bots[id].skills.Common.Vitality.max = 5100;
                        bots[id].skills.Common.Vitality.min = 5100;
                    } else {
                        bots[id].skills.Common.Vitality = {};
                        bots[id].skills.Common.Vitality.max = 5100;
                        bots[id].skills.Common.Vitality.min = 5100;
                    }
                } else {
                    bots[id].skills.Common = {};
                    bots[id].skills.Common.Vitality = {};
                    bots[id].skills.Common.Vitality.max = 5100;
                    bots[id].skills.Common.Vitality.min = 5100;
                }
            }
        }
    }
}

module.exports = BotVitality;