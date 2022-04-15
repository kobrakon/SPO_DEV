class reducedProdTime {
    constructor() {
        const config = require("../config/config.json")
        this.mod = require("../package.json")
        if (config.EnableFastProd) {
            Logger.info('PPR: All non-continuous hideout production times reduced to ' + config.percentProd + '% of default values');
        } else {
            Logger.info('PPR: Default production times enabled')
        }
        if (config.EnableFastConst) {
            Logger.info('PPR: All hideout constuction times reduced to ' + config.percentConst + '% of default values');
        } else {
            Logger.info('PPR: Default constuction times enabled');
        }
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

    load() {
        const config = require("../config/config.json")
        const db = DatabaseServer.tables;
        const hideout = db.hideout;

        if(config.EnableFastProd) {
            for (const data in hideout.production)
            {
                let productionData = hideout.production[data];
                    if (productionData.continuous === false && productionData.productionTime >= 10)
                    {
                        productionData.productionTime *= config.percentProd / 100;
                    }
            }
        }

        if(config.EnableFastConst) {
            for (const data in hideout.areas) {
                let areaData = hideout.areas[data];
                for (const i in areaData.stages) {
                    if (areaData.stages[i].constructionTime > 0) {
                        areaData.stages[i].constructionTime *= config.percentConst / 100;
                    }
                }
            }
        }
    }
}
module.exports.Mod = reducedProdTime;