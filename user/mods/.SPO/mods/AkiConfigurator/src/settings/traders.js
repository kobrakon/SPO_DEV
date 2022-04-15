/*
エレシュキガル
*/

"use strict";

class traders {
    static applyValues() {
        const insurance = InsuranceConfig;
        const inventory = InventoryConfig;
        const repair = RepairConfig;
        const trader = TraderConfig;
        
        const config = require('../../config/config.json')

        for(const options in insurance)
        {
            insurance[options] = config["Traders values"].Insurances[options]
        }

        for(const options in inventory)
        {
            inventory[options] = config["Traders values"].Trading[options]
        }

        for(const options in repair)
        {
            repair[options] = config["Traders values"].Repair[options]
        }

        for(const options in trader)
        {
            trader[options] = config["Traders values"].Traders[options]
        }
    }
}

module.exports = traders;