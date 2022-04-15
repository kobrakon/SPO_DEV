"use strict";

// require("../Lib.js");

const fs = require('fs');
const path = require('path');

const configDir = "../config/config.json";
let config = (fs.existsSync(path.resolve(__dirname, configDir))) ? JSON.parse(fs.readFileSync(path.resolve(__dirname, configDir))) : {};

class TraderAssortModifier
{
    constructor()
    {
        this.configureAssortments();

        HttpRouter.onDynamicRoute["/client/trading/api/getTraderAssort/"].aki = this.getTraderAssort.bind(this);
    }

    configureAssortments()
    {
        for (const trader in DatabaseServer.tables.traders)
        {
            if (trader != "ragfair" && trader != TraderHelper.TRADER.Fence)
            {
                if (!(trader in config))
                {
                    config[trader] = {};
                    config[trader]["name"] = DatabaseServer.tables.traders[trader].base.nickname;
                    config[trader]["currentItemIndex"] = 0;
                    config[trader]["currentBarterIndex"] = 0;
                    config[trader]["assort"] = DatabaseServer.tables.traders[trader].assort;
                    config[trader].assort.items = [config[trader].assort.items];
                    config[trader].assort.barter_scheme = [config[trader].assort.barter_scheme];
                }
            }
        }

        config = this.updateJsonFile(configDir, config);
    }

    updateJsonFile(dir, newData)
    {
        let data = JsonUtil.serialize(JsonUtil.clone(newData), true);
        fs.writeFileSync(path.resolve(__dirname, dir), data);

        return JSON.parse(fs.readFileSync(path.resolve(__dirname, dir)));
    }

    getTraderAssort(url, info, sessionID)
    {
        const traderID = url.replace("/client/trading/api/getTraderAssort/", "");
        TraderController.updateTraders();
        return HttpResponse.getBody(this.getAssort(sessionID, traderID));
    }

    getAssort(sessionID, traderId)
    {
        if (traderId === TraderHelper.TRADER.Fence)
        {
            const trader = DatabaseServer.tables.traders[traderId].base;

            // By the time this method is called the nextResupply variable was already updated, so the old condition
            // of checking nextResupply < currentTime was always false. By using the refreshAssort we can make sure
            // that after the update happened this refresh was actually needed, and the next time the client requests
            // the update a freshly generated assortment is sent.
            if (!TraderController.fenceAssort || trader.refreshAssort) {
                Logger.info("Fence assortment is being generated");
                TraderController.fenceAssort = TraderController.generateFenceAssort(sessionID);
                RagfairServer.generateTraderOffers(traderId);
                // refreshAssort is reset back to false and we await again until the update() makes this condition happen
                trader.refreshAssort = false;
            }

            return TraderController.fenceAssort;
        }

        const traderData = JsonUtil.clone(DatabaseServer.tables.traders[traderId]);
        let configData = JsonUtil.clone(config[traderId].assort);

        const itemIndex = config[traderId].currentItemIndex++;
        const barterIndex = config[traderId].currentBarterIndex++;

        if (config[traderId].currentItemIndex >= config[traderId].assort.items.length) {
            config[traderId].currentItemIndex = 0;
        }

        if (config[traderId].currentBarterIndex >= config[traderId].assort.barter_scheme.length) {
            config[traderId].currentBarterIndex = 0;
        }

        configData.items = config[traderId].assort.items[itemIndex];
        configData.barter_scheme = config[traderId].assort.barter_scheme[barterIndex];

        let result = configData;

        // strip items (1 is min level, 4 is max level)
        result = TraderController.stripLoyaltyAssort(sessionID, traderId, result);

        // strip quest result
        if ("questassort" in traderData) {
            result = TraderController.stripQuestAssort(sessionID, traderId, result);
        }

        return result;
    }
}

module.exports.GooderBots = new TraderAssortModifier();