"use strict";
const Ammo = require("./ammo.js");
const Armor = require("./armor.js");
const Bots = require("./bots.js");
const Items = require("./items.js");
const Player = require("./player.js");
const Traders = require("./traders.js");
const WeaponsGlobals = require("./weapons_globals.js");
const AttatchmentsBase = require("./attatchments_base.js");
const Flea = require("./fleamarket.js");
const Medical = require("./meds");
const config = require("../config/config.js");
const Helper = require("./helper.js");
const BotGen = require("./bot_generation.js");


class Main {
    static loadMain() {
        if (config.bot_changes == true) {
            BotGen.botModGeneration();
            BotGen.botLootGen();
            Bots.loadBots();
        }
        if (config.trader_changes == true) {
            Traders.loadTraders();
        }
        if (config.realism == true) {
            Ammo.loadAmmo();
            Armor.loadArmor();
            Bots.setBotHealth();
        }
        if (config.med_changes == true) {
            Medical.loadMeds();
        }

        WeaponsGlobals.loadGlobalWeps();
        Player.loadPlayer();
        AttatchmentsBase.loadAttRestrict();
        Items.loadItems();
        Flea.loadFlea();
    }

    static checkProfile(url, info, sessionID) { //thank you Katto for the method fetching player profile, with permission :) Taken from their Server Value Modifier mod!
        let pmcData = ProfileController.getPmcProfile(sessionID);
        try {
            var healthProp = pmcData?.Health;
            var hydroProp = pmcData?.Health?.Hydration;
            
            Main.checkLVL(pmcData);
            return HttpResponse.nullResponse();
        } catch (e) {
            Logger.error("Realism mod: error checking player profile" + e)
            return HttpResponse.nullResponse();
        }
    }

    static runAtProfileCreation(url, info, sessionID) {
        let pmcData = ProfileController.getPmcProfile(sessionID);
        try {
            Main.checkMeds(pmcData, pmcData.Info.Experience);
            Main.correctNewHealth(pmcData);
            if (config.logEverything == true) {
                Logger.info("Realism mod: function ran at profile creation");
            }
            return HttpResponse.nullResponse();
        } catch (e) {
            Logger.error("Realism mod: Error running after new profile creation" + e)
            return HttpResponse.nullResponse();
        }
    }

    static checkMeds(pmcData, pmcEXP) {
        if (config.med_changes == true) {
            Helper.correctMedItems(pmcData, pmcEXP);
            pmcData.Health.Hydration.Maximum = Player.hydration;
            pmcData.Health.Energy.Maximum = Player.energy;
            if (pmcData.Info.Experience == 0) {
                pmcData.Health.Hydration.Current = Player.hydration;
                pmcData.Health.Energy.Current = Player.energy;
                Logger.info("Realism mod: new profile meds and hydration/energy adjusted");
            }
            if (config.logEverything == true) {
                Logger.info("Realism mod: meds adjusted");
            }        
        }
    }

    static correctNewHealth(pmcData) {
        if (config.realism == true) {
            pmcData.Health.BodyParts["Head"].Health.Maximum = Player.headHealth;
            pmcData.Health.BodyParts["Chest"].Health.Maximum = Player.chestHealth;
            pmcData.Health.BodyParts["Stomach"].Health.Maximum = Player.stomaHealth;
            pmcData.Health.BodyParts["LeftArm"].Health.Maximum = Player.armHealth;
            pmcData.Health.BodyParts["RightArm"].Health.Maximum = Player.armHealth;
            pmcData.Health.BodyParts["LeftLeg"].Health.Maximum = Player.legHealth;
            pmcData.Health.BodyParts["RightLeg"].Health.Maximum = Player.legHealth;
            pmcData.Health.BodyParts["Head"].Health.Current = Player.headHealth;
            pmcData.Health.BodyParts["Chest"].Health.Current = Player.chestHealth;
            pmcData.Health.BodyParts["Stomach"].Health.Current = Player.stomaHealth;
            pmcData.Health.BodyParts["LeftArm"].Health.Current = Player.armHealth;
            pmcData.Health.BodyParts["RightArm"].Health.Current = Player.armHealth;
            pmcData.Health.BodyParts["LeftLeg"].Health.Current = Player.legHealth;
            pmcData.Health.BodyParts["RightLeg"].Health.Current = Player.legHealth;
            pmcData.Health.Temperature.Current = Player.tempCurr;
            pmcData.Health.Temperature.Maximum = Player.tempMax;
            Logger.info("Realism mod: new profile health has been adjusted");
        }
    }

    static runAtRaidEnd(url, info, sessionID) {
        let pmcData = ProfileController.getPmcProfile(sessionID);
        try {
            Main.checkLVL(pmcData);
            if (config.logEverything == true) {
                Logger.info("Realism mod: function ran at raid end");
            }
            return HttpResponse.nullResponse();
        } catch (e) {
            Logger.error("Realism mod: Error configuring bots" + e)
            return HttpResponse.nullResponse();
        }
    }

    static checkLVL(pmcData) {
        var property = pmcData?.Info?.Level;
        if (property === undefined) {
            if (config.bot_changes == true) {
                Bots.botConfig1();
                Logger.info("Realism mod: Bots have been set to default (tier 1)");
                if (config.logEverything == true) {
                    Logger.info("Realism mod: Bots have been reconfigured");
                }
            }
            if (config.tiered_flea == true) {
                Flea.flea1_4();
                Logger.info("Realism mod: Fleamarket tier set to default (tier 0)");
            }
        }
        if (property !== undefined) {
            if (config.bot_changes == true) {
                if (pmcData.Info.Level >= 0 && pmcData.Info.Level <= 8) {
                    Bots.botConfig1();
                    Logger.info("Realism mod: Bots have been set to tier 1");
                }
                if (pmcData.Info.Level >= 9 && pmcData.Info.Level <= 15) {
                    Bots.botConfig1_5();
                    Logger.info("Realism mod: Bots have been set to tier 1_5");
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
                if (config.logEverything == true) {
                    Logger.info("Realism mod: Bots have been reconfigured");
                }
            }
            if (config.tiered_flea == true) {
                if (pmcData.Info.Level >= 0 && pmcData.Info.Level <= 4) {
                    Flea.flea1_4();
                    Logger.info("Realism mod: Fleamarket locked at tier 0");
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
}
module.exports = Main;