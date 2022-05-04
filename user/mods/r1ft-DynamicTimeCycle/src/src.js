"use strict";

const config = require("../cfg/config.json")
var isDead = false;

function removeQuotesMark(str) {
    return str.replace(/^\"/g, "")
}

function getFactory(sessionID) {
    var profile = SaveServer.profiles[sessionID];
    var hideout = profile.DynamicTimeCycle.hideout;
    var hour = removeQuotesMark(profile.DynamicTimeCycle.hour);
    if (!DatabaseServer.tables.locations.factory4_night.base.Locked || !DatabaseServer.tables.locations.factory4_day.base.Locked) {
        if (hideout == "false") {
            if (hour > 5 && hour < 19) {
                Logger.info("=> Dynamic Time Cycle : Factory Night Locked");
                DatabaseServer.tables.locations.factory4_night.base.Locked = true;
                DatabaseServer.tables.locations.factory4_day.base.Locked = false;
            }
            else {
                Logger.info("=> Dynamic Time Cycle : Factory Day Locked");
                DatabaseServer.tables.locations.factory4_night.base.Locked = false;
                DatabaseServer.tables.locations.factory4_day.base.Locked = true;
            }
        }
        else {
            Logger.info("=> Dynamic Time Cycle : Factory Unocked");
            DatabaseServer.tables.locations.factory4_night.base.Locked = false;
            DatabaseServer.tables.locations.factory4_day.base.Locked = false;
        }
    }
}

class DynamicTimeCycle {
    static onLoadMod() {
        var pttEnabled = config.PTTEnabled
        if (pttEnabled) {
            if (!globalThis.PathToTarkovAPI) {
                Logger.error(`=> Dynamic Time Cycle: PathToTarkovAPI not found Disabling PTT Options`);
                pttEnabled = false;
            }
        }

        HttpRouter.onStaticRoute["/dynamictimecycle/offraidPosition"] = {
            config: DynamicTimeCycle.onRequestPosition.bind(this)
        };

        HttpRouter.onStaticRoute["/dynamictimecycle/deathcount"] = {
            config: DynamicTimeCycle.onRequestDeath.bind(this)
        };

        HttpRouter.onStaticRoute["/dynamictimecycle/ptt"] = {
            config: DynamicTimeCycle.onRequestPTT.bind(this)
        };

        HttpRouter.onStaticRoute["/dynamictimecycle/config"] = {
            config: DynamicTimeCycle.onRequestConfig.bind(this)
        };

        HttpRouter.onDynamicRoute["/dynamictimecycle/post/"] = {
            postconfig: DynamicTimeCycle.onRequesPostConfig.bind(this)
        };

    }

    static onRequestDeath(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        var stats = profile.characters.pmc.Stats;
        var deaths = 0;
        if (stats) {
            if (stats.SessionCounters) {
                if (stats.SessionCounters.Items) {
                    let len = stats.SessionCounters.Items.length;
                    for (let i = 0; i < len; i++) {
                        let keylen = stats.SessionCounters.Items[i].Key.length
                        for (let k = 0; k < keylen; k++) {
                            if (stats.SessionCounters.Items[i].Key[k] == "Deaths") {
                                deaths = stats.SessionCounters.Items[i].Value;
                                Logger.info("=> Dynamic Time Cycle : Deaths " + deaths);
                                return HttpResponse.noBody(deaths);
                            }
                        }
                    }
                }
            }
        }

        Logger.info("=> Dynamic Time Cycle : No Session Data");
        return HttpResponse.noBody(deaths);
    }

    static onRequestConfig(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        if (profile.DynamicTimeCycle == null) {
            profile.DynamicTimeCycle = {};
            profile.DynamicTimeCycle.hour = 99;
            profile.DynamicTimeCycle.min = 99;
            profile.DynamicTimeCycle.hideout = true;
        }

        Logger.info("=> Dynamic Time Cycle : Returning Config");
        return HttpResponse.noBody(SaveServer.profiles[sessionID].DynamicTimeCycle);
    }

    static onRequestPTT(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        if (profile.PathToTarkov == null) {
            Logger.info("=> Dynamic Time Cycle : PTT Not Available");
            return HttpResponse.noBody(false);
        }

        Logger.info("=> Dynamic Time Cycle : PTT Available");
        return HttpResponse.noBody(true);
    }

    static onRequestPosition(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        if (profile.PathToTarkov == null) {
            profile.PathToTarkov = {};
            profile.PathToTarkov.mainStashId = "";
            profile.PathToTarkov.offraidPosition = "null";
        }

        Logger.info("=> Dynamic Time Cycle : Returning PTT Config Offraid POS = " + profile.PathToTarkov.offraidPosition);
        return HttpResponse.noBody(profile.PathToTarkov.offraidPosition);
    }

    static onRequesPostConfig(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        const splittedUrl = url.split("/");

        profile.DynamicTimeCycle.hour = splittedUrl[splittedUrl.length - 3].toLowerCase();
        profile.DynamicTimeCycle.min = splittedUrl[splittedUrl.length - 2].toLowerCase();
        profile.DynamicTimeCycle.hideout = splittedUrl[splittedUrl.length - 1].toLowerCase();

        getFactory(sessionID);

        Logger.info("=> Dynamic Time Cycle : Updating Config");
        return HttpResponse.noBody(profile.DynamicTimeCycle);
    }
}

module.exports = DynamicTimeCycle;