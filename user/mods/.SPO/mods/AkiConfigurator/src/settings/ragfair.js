/*
エレシュキガル
*/

"use strict";

class ragfair
{
    static applyValues()
    {
        const ragfair = RagfairConfig
        const config = require('../../config/config.json')

        for(const options in ragfair.sell){
            ragfair.sell[options] = config["FleaMarket configuration"].sell[options]
        }

        for(const options in ragfair.dynamic){
            ragfair.dynamic[options] = config["FleaMarket configuration"].dynamic[options]
        }

        const traderList = config["FleaMarket configuration"].traders
        for (const trader in config["FleaMarket configuration"].traders) {
            switch (trader) {
                case "EnablePraporOffers":
                    ragfair.traders["54cb50c76803fa8b248b4571"] = traderList.EnablePraporOffers
                    break;
                case "EnableTheRapistOffers":
                    ragfair.traders["54cb57776803fa99248b456e"] = traderList.EnableTheRapistOffers;
                    break;
                case "EnableFenceOffers":
                    ragfair.traders["579dc571d53a0658a154fbec"] = traderList.EnableFenceOffers;
                    break;
                case "EnableSkierOffers":
                    ragfair.traders["58330581ace78e27b8b10cee"] = traderList.EnableSkierOffers;
                    break;
                case "EnablePeacekeeperOffers":
                    ragfair.traders["5935c25fb3acc3127c3d8cd9"] = traderList.EnablePeacekeeperOffers;
                    break;
                case "EnableMechanicOffers":
                    ragfair.traders["5a7c2eca46aef81a7ca2145d"] = traderList.EnableMechanicOffers;
                    break;
                case "EnableRagmanOffers":
                    ragfair.traders["5ac3b934156ae10c4430e83c"] = traderList.EnableRagmanOffers;
                    break;
                case "EnableJaegerOffers":
                    ragfair.traders["54cb50c76803fa8b248b4571"] = traderList.EnableJaegerOffers;
                    break;
                case "EnableAllAvailableOffers":
                    ragfair.traders["ragfair"] = traderList.EnableAllAvailableOffers;
                    break;
                default:
                    ragfair.traders[trader] = traderList[trader]
                    break;
            }
        }
    }
}

module.exports = ragfair;