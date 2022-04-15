"use strict";

const cfg = require("./config.json");
const database = DatabaseServer.tables;
const livePrice = database.templates.prices;
const handbookTable = database.templates.handbook;
const therapist = DatabaseServer.tables.traders["54cb57776803fa99248b456e"].base
const ragman = DatabaseServer.tables.traders["5ac3b934156ae10c4430e83c"].base
const jaeger = DatabaseServer.tables.traders["5c0647fdd443bc2504c2d371"].base
const mechanic = DatabaseServer.tables.traders["5a7c2eca46aef81a7ca2145d"].base
const prapor = DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].base
const peacekeeper = DatabaseServer.tables.traders["5935c25fb3acc3127c3d8cd9"].base
const skier = DatabaseServer.tables.traders["58330581ace78e27b8b10cee"].base
const fence = DatabaseServer.tables.traders["579dc571d53a0658a154fbec"].base
const tradersArr = [therapist, ragman, jaeger, mechanic, prapor, peacekeeper, skier, fence];

class Mod
{
    name = "KcY-SeeItemValue";
    version = "1.2.0";
    static price = "";

    constructor()
    {
        Logger.info(`Loading: ${this.name} : ${this.version}`);
        ModLoader.onLoad[this.name] = this.init.bind(this);
    }

    init()
    {
        this.onLoadMod();
    }

    onLoadMod()
    {
        HttpRouter.onDynamicRoute["/cwx/seeitemvalue/"] = {
            ItemValueMod: this.onRequestConfig.bind(this)
        };
    }

    onRequestConfig(url, info, sessionID)
    {
        const splittedUrl = url.split("/");
        const id = splittedUrl[splittedUrl.length - 1].toLowerCase();

        return HttpResponse.noBody(this.getIdPrice(id));
    }

    getIdPrice(id)
    {
        let sPrice = 1;
        let sMutli = 1;
        let parentId = "";

        // if TraderPrice in cfg is False get price from flea AVG
        if(cfg.TraderPrice === false)
        {
            const result = livePrice[id];
            if(typeof result != `undefined`)
            {
                return result;
            }
            // will still default to Handbook if no price is found for flea AVG
        }
        // if TraderPrice in cfg is True get price from handbook
        // as traders have a modifier, avg is 0.54, closest we can get without checking against each trader
        // thanks to TEOA for this info
        for(let i in handbookTable.Items)
        {
            if(handbookTable.Items[i].Id === id)
            {
                parentId = handbookTable.Items[i].ParentId;
                sMutli = this.getBestTraderMulti(parentId);
                sPrice = handbookTable.Items[i].Price;
                let result = parseInt(sPrice*sMutli);

                return result;
            } 
        }
        return sPrice;
    }

    getBestTraderMulti(parentId)
    {
        let traderSellCat = "";
        let traderMulti = 0.54;
        let traderName = ""; // could be used later to be passed back to module to show trader and price
        let altTraderSellCat = "";
        
        for(let i in handbookTable.Categories)
        {
            if(handbookTable.Categories[i].Id === parentId)
            {
                traderSellCat = handbookTable.Categories[i].Id;
                altTraderSellCat = handbookTable.Categories[i].ParentId;
                break;
            }
        }

        for(let iter = 0; iter < 8; iter++)
        {
            if(tradersArr[iter].sell_category.includes(traderSellCat))
            {
                traderMulti = (100 - tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = tradersArr[iter].nickname;
                return traderMulti;
            }
        }

        for(let iter = 0; iter < 8; iter++)
        {
            if(tradersArr[iter].sell_category.includes(altTraderSellCat))
            {
                traderMulti = (100 - tradersArr[iter].loyaltyLevels[0].buy_price_coef) / 100;
                traderName = tradersArr[iter].nickname;
                return traderMulti;
            }
        }
        return cfg.TraderMultiplier;
    }
}

module.exports.Mod = Mod;