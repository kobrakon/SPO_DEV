'use strict'

class MarkItemsFIR {
    constructor() {
        this.mod = "orbitas-MarkItemsFIR";
        Logger.log(`${this.mod}: loaded`);
        InraidController.markFoundItems = this.customMarkItem.bind(this);
    }

    customMarkItem(pmcData, profile, isPlayerScav) {
        
		Logger.log(`${this.mod}: running replacement script`);
		
		for (const item of profile.Inventory.items)
        {
            if ("upd" in item)
            {
                item.upd.SpawnedInSession = true;
            }
            else
            {
                item.upd = { "SpawnedInSession": true };
            }
        }

        return profile;
		
    }
}

module.exports.MarkItemsFIR = new MarkItemsFIR();