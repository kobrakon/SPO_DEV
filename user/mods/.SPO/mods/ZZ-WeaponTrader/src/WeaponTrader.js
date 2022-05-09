"use strict";

class WeaponTrader {

    modName = "WeaponTrader";

    constructor() {
        Logger.info(`Loading: WeaponTrader`);
        ModLoader.onLoad[this.modName] = this.init.bind(this);
        SaveServer.onLoad[this.modName] = this.loadProfile.bind(this);
        SaveServer.onSave[this.modName] = this.saveCallback.bind(this);
    }

    init() {
        this.config = JsonUtil.deserialize((VFS.readFile(__dirname + "/../conf.json")));
    }

    loadProfile(sessionID) {
        let profiles = SaveServer.profiles[sessionID];
        const originalProfiles = JsonUtil.clone(profiles);
        try {
            let builds = profiles.weaponbuilds;
            let assort = DatabaseServer.tables.traders[this.config.traderId].assort;

            for (let buildName in builds) {
                let preItems = builds[buildName].items;
                let id = preItems[0]._id;
                let tpl = preItems[0]._tpl;

                if (!assort.loyal_level_items[id]) {
                    assort.loyal_level_items[id] = this.config.traderLevel;

                    preItems[0] = {
                        "_id": id,
                        "_tpl": tpl,
                        "parentId": "hideout",
                        "slotId": "hideout",
                        "upd": {
                            "StackObjectsCount": 2,
                            "UnlimitedCount": false,
                            "BuyRestrictionMax": 2,
                            "BuyRestrictionCurrent": 0
                        },
                        "preWeapon": true
                    };

                    let preItemsObj = JsonUtil.clone(preItems);
                    for (let preItemObj of preItemsObj) {
                        assort.items.push(preItemObj);
                    }

                    // Roubles
                    const currency = "5449016a4bdc2d6f028b456f";
                    const price = RagfairServer.getDynamicOfferPrice(preItemsObj, currency);
                    let offerRequire = [
                        {
                            "count": price,
                            "_tpl": currency
                        }
                    ];

                    if (this.config.dynamicBarter) {
                        offerRequire[0].count = Math.round(offerRequire[0].count * RandomUtil.getFloat(this.config.dynamicPriceMinMultiple, this.config.dynamicPriceMaxMultiple));
                        assort.barter_scheme[id] = [offerRequire];
                    } else {
                        assort.barter_scheme[id] = [
                            [
                                {
                                    "count": this.config.barterCnt,
                                    "_tpl": this.config.barterId
                                }
                            ]
                        ]
                    }
                }
            }
            
            return profiles;
        } catch (e) {
            Logger.error(`Sorry, there are some errors. \n${e.stack}`)
            return originalProfiles;
        }
    }

    saveCallback(sessionId) {
        return this.loadProfile(sessionId);
    }

}

module.exports = WeaponTrader;