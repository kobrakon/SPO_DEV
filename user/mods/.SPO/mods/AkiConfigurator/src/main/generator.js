/*
エレシュキガル
*/

"use strict";

class generator {
    static createConfig() {
        const mod = require("../../package.json");
        this.firstRun = true;
        let config = null;
        let dailyConfig = null
        /*
            Generate the whole configuration on first run
            This way the default values are always up to date to AKI.
        */

        //Is this the first time the mod is ran ?
        if (VFS.exists(`${ModLoader.getModPath(mod.name)}config/config.json`)) {
            this.firstRun = false;
            Logger.success("[AKI-Configurator] - Config file found");
        } else {
            Logger.warning(
                "First time AKI-Configurator is run, generating the config file..."
            );
        }

        if (this.firstRun) {
            //The default file type must be an object
            config = {
                "Server values": {
                    "Enable Christmas Gifts": false,
                    "HTTP": {},
                    "Health": {},
                    "Hideout": {}
                },
                "Raids values": {
                    "Loot values": {}
                },
                "Traders values": {
                    "Traders": {},
                    "Repair": {},
                    "Insurances": {},
                    "Trading": {},
                },
                "FleaMarket configuration": {},
                "Bots": {},
                "Weather values": {}
            };
            dailyConfig = {}

            //We will have to gather every config that exists atm and throw them together into the object
            const bots = BotConfig;
            const health = HealthConfig;
            const hideout = HideoutConfig;
            const http = HttpConfig;
            const inraid = InraidConfig;
            const insurance = InsuranceConfig;
            const inventory = InventoryConfig;
            const location = LocationConfig;
            const quest = QuestConfig;
            const ragfair = RagfairConfig;
            const repair = RepairConfig;
            const trader = TraderConfig;
            const weather = WeatherConfig;

            //Sorting the bots config now
            Object.assign(config["Bots"], bots)

            //Sorting the health config
            Object.assign(config["Server values"]["Health"], health)

            //Sorting the hideout values
            Object.assign(config["Server values"]["Hideout"], hideout)

            //Sorting the http values
            Object.assign(config["Server values"]["HTTP"], http)

            //Sorting the inraid values
            Object.assign(config["Raids values"], inraid)

            //Sorting insurance values
            Object.assign(config["Traders values"]["Insurances"], insurance)

            //Sorting inventory values
            Object.assign(config["Traders values"]["Trading"], inventory)

            //Sorting location values
            Object.assign(config["Raids values"]["Loot values"], location)

            //Sorting quest values
            Object.assign(dailyConfig, quest)

            //Sorting ragfair values
            Object.assign(config["FleaMarket configuration"], ragfair)

            //Sorting repair values
            Object.assign(config["Traders values"]["Repair"], repair)

            //Sorting trader values
            Object.assign(config["Traders values"]["Traders"], trader)

            //Weather values
            Object.assign(config["Weather values"], weather)


            //Some personnal changes for end-user
            config["FleaMarket configuration"].traders = {
                "EnablePraporOffers": true,
                "EnableTheRapistOffers": true,
                "EnableFenceOffers": false,
                "EnableSkierOffers": true,
                "EnablePeacekeeperOffers": true,
                "EnableMechanicOffers": true,
                "EnableRagmanOffers": true,
                "EnableJaegerOffers": true,
                "EnableAllAvailableOffers": false
            }
        }

        //Write the config in the folder
        if (config) {
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/config.json`,
                JsonUtil.serialize(config, true)
            );
            VFS.writeFile(
                `${ModLoader.getModPath(mod.name)}config/dailyConfig.json`,
                JsonUtil.serialize(dailyConfig, true)
            );
            return true
        }
    }
    static isConfigGenerated() {
        const mod = require("../../package.json");
        if (VFS.exists(`${ModLoader.getModPath(mod.name)}config/config.json`)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = generator;