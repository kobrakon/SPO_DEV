"use strict";
const Ammo = require("./ammo.js");
const Armor = require("./armor.js");
const Bots = require("./bots.js");
const Items = require("./items.js");
const Player = require("./player.js");
const Traders = require("./traders.js");
const Weapons = require("./weapons.js");
const Attatchments = require("./attatchments.js");
const Flea = require("./fleamarket.js");
const config = require("../config/config.js");

class Main {

    static loadMain() {


        if (config.botChanges == true) {
            Bots.callToOverride();
            Bots.loadBots();
        }
        if (config.traderChanges == true) {
            Traders.loadTraders();
        }
        if (config.recoilChanges == true) {
            Weapons.LoadWeps();
        }
        if (config.realism == true) {
            Ammo.loadAmmo();
            Armor.loadArmor();
        }

        Player.loadPlayer();
        Attatchments.LoadAtts();
        Items.loadItems();
        Flea.loadFlea();

    }


    static checkProfile(url, info, sessionID) { //thank you Katto for the method fetching player profile, with permission :) Taken from their Server Value Modifier mod!
        let pmcData = ProfileController.getPmcProfile(sessionID);
        try {

            Main.checkLVL(pmcData);

            if (config.realism == true) {

            }

            return HttpResponse.nullResponse();
        } catch (e) {
            Logger.error("Realism mod: error checking player profile, ensure that a profile is created before using this mod" + e)
            return HttpResponse.nullResponse();
        }
    }

    static loadBotConfig(url, info, sessionID) {
        let pmcData = ProfileController.getPmcProfile(sessionID);
        try {
            Main.checkLVL(pmcData);
            Logger.info("Realism mod: Player health has been adjusted");
            return HttpResponse.nullResponse();
        } catch (e) {
            Logger.error("Realism mod: Error configuring bots" + e)
            return HttpResponse.nullResponse();
        }
    }

    static checkLVL(pmcData) {
        if (config.botChanges == true) {
            if (pmcData.Info.Level >= 0 && pmcData.Info.Level <= 8) {
                Bots.botConfig1();
                Logger.info("Realism mod: Bots have been set to tier 1");
            }
    
            if (pmcData.Info.Level >= 9 && pmcData.Info.Level <= 15) {
                Bots.botConfig1_5();
                Logger.info("Realism mod: Bots have been adjusted to tier 1_5");
            }
    
            if (pmcData.Info.Level >= 16 && pmcData.Info.Level <= 22) {
                Bots.botConfig2();
                Logger.info("Realism mod: Bots have been adjusted to tier 2");
            }
    
            if (pmcData.Info.Level >= 23 && pmcData.Info.Level <= 29) {
                Bots.botConfig2_5();
                Logger.info("Realism mod: Bots have been adjusted to tier 2_5");
            }
    
            if (pmcData.Info.Level >= 30 && pmcData.Info.Level <= 100) {
                Bots.botConfig3();
                Logger.info("Realism mod: Bots have been adjusted to tier 3");
            }
        }

        if (config.fleaChanges == true) {
            if (pmcData.Info.Level >= 0 && pmcData.Info.Level <= 4) {
                Flea.flea1_4();
                Logger.info("Realism mod: Fleamarket locked");
            }

            if (pmcData.Info.Level >= 5 && pmcData.Info.Level <= 9) {
                Flea.flea5_9();
                Logger.info("Realism mod: Fleamarket tier 1 unlocked");
            }

            if (pmcData.Info.Level >= 10 && pmcData.Info.Level <= 14) {
                Flea.flea11_14();
                Logger.info("Realism mod: Fleamarket tier 2 unlocked");
            }

            if (pmcData.Info.Level >= 15 && pmcData.Info.Level <= 19) {
                Flea.flea15_19();
                Logger.info("Realism mod: Fleamarket tier 3 unlocked");
            }

            if (pmcData.Info.Level >= 20 && pmcData.Info.Level <= 24) {
                Flea.flea20_24();
                Logger.info("Realism mod: Fleamarket tier 4 unlocked");
            }

            if (pmcData.Info.Level >= 25 && pmcData.Info.Level <= 29) {
                Flea.flea25_29();
                Logger.info("Realism mod: Fleamarket tier 5 unlocked");
            }

            if (pmcData.Info.Level >= 30 && pmcData.Info.Level <= 34) {
                Flea.flea30_34();
                Logger.info("Realism mod: Fleamarket tier 6 unlocked");
            }

            if (pmcData.Info.Level >= 35 && pmcData.Info.Level <= 100) {
                Flea.fleaFullUnlock();
                Logger.info("Realism mod: Fleamarket unlocked");
            }
        }
    }


}
module.exports = Main;