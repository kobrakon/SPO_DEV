"use strict";

function removeByteOrderMark(str) {
    return str.replace(/^\ufeff/g, "")
}

function removeQuotesMark(str) {
    return str.replace(/^\"/g, "")
}

function getFactory(sessionID) {
    var profile = SaveServer.profiles[sessionID];
    var hideout = profile.PTTDynamicTravelTime.hideout;
    var hour = removeQuotesMark(profile.PTTDynamicTravelTime.hour);

    if (hideout == "false") {
        if (hour > 5 && hour < 19) {
            Logger.info("=> PTT Dynamic Time Cycle : Factory Night Locked");
            DatabaseServer.tables.locations.factory4_night.base.Locked = true;
            DatabaseServer.tables.locations.factory4_day.base.Locked = false;
        }
        else {
            Logger.info("=> PTT Dynamic Time Cycle : Factory Day Locked");
            DatabaseServer.tables.locations.factory4_night.base.Locked = false;
            DatabaseServer.tables.locations.factory4_day.base.Locked = true;
        }
    }
    else {
        Logger.info("=> PTT Dynamic Time Cycle : Factory Unocked");
        DatabaseServer.tables.locations.factory4_night.base.Locked = false;
        DatabaseServer.tables.locations.factory4_day.base.Locked = false;
    }
}

class PTTDynamicTravelTime {
    static onLoadMod() {
        if (!globalThis.PathToTarkovAPI) {
            Logger.error(`=> ${this.modName}: PathToTarkovAPI not found, are you sure a version of PathToTarkov >= 2.5.0 is installed ?`);
            return;
        }

        HttpRouter.onStaticRoute["/pttdynamictravel/offraidPosition"] = {
            config: PTTDynamicTravelTime.onRequestPosition.bind(this)
        };

        HttpRouter.onStaticRoute["/pttdynamictravel/config"] = {
            config: PTTDynamicTravelTime.onRequestConfig.bind(this)
        };

        HttpRouter.onDynamicRoute["/pttdynamictravel/post/"] = {
            postconfig: PTTDynamicTravelTime.onRequesPostConfig.bind(this)
        };
    }

    static onRequestConfig(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        if (profile.PTTDynamicTravelTime == null) {
            profile.PTTDynamicTravelTime = {};
            profile.PTTDynamicTravelTime.hour = 99;
            profile.PTTDynamicTravelTime.min = 99;
            profile.PTTDynamicTravelTime.hideout = true;
        }

        return HttpResponse.noBody(SaveServer.profiles[sessionID].PTTDynamicTravelTime);
    }

    static onRequestPosition(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        if (profile.PathToTarkov == null) {
            profile.PathToTarkov = {};
            profile.PathToTarkov.mainStashId = "";
            profile.PathToTarkov.offraidPosition = "null";
        }

        return HttpResponse.noBody(SaveServer.profiles[sessionID].PathToTarkov);
    }

    static onRequesPostConfig(url, info, sessionID) {
        var profile = SaveServer.profiles[sessionID];
        const splittedUrl = url.split("/");

        profile.PTTDynamicTravelTime.hour = splittedUrl[splittedUrl.length - 3].toLowerCase();
        profile.PTTDynamicTravelTime.min = splittedUrl[splittedUrl.length - 2].toLowerCase();
        profile.PTTDynamicTravelTime.hideout = splittedUrl[splittedUrl.length - 1].toLowerCase();

        getFactory(sessionID);

        return HttpResponse.noBody(SaveServer.profiles[sessionID].PTTDynamicTravelTime);
    }
}

module.exports = PTTDynamicTravelTime;