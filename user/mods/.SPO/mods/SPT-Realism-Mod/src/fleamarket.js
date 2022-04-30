"use strict";
const DB = DatabaseServer.tables;
const globalDB = DB.globals.config;
const itemDB = DB.templates.items;
const config = require("../config/config.js");
const fleaConfig = RagfairConfig;
const customFleaConfig = require("../db/traders/ragfair/blacklist.json")

class Fleamarket {

    static loadFlea() {

        if (config.flea_changes == true && config.tiered_flea != true) {

            //custom blacklist
            fleaConfig.dynamic.blacklist.custom = customFleaConfig.blacklist.custom;

            fleaConfig.dynamic.offerItemCount.min = 0;
            fleaConfig.dynamic.offerItemCount.max = 2;

            fleaConfig.dynamic.price.min = 2;
            fleaConfig.dynamic.price.max = 3.5;

            fleaConfig.dynamic.endTimeSeconds.min = 300;
            fleaConfig.dynamic.endTimeSeconds.max = 800;

            fleaConfig.dynamic.condition.conditionChance = 0.99;
            fleaConfig.dynamic.condition.min = 0.50;
            fleaConfig.dynamic.condition.max = 0.90;

            fleaConfig.dynamic.nonStackableCount.min = 1
            fleaConfig.dynamic.nonStackableCount.max = 1

            fleaConfig.dynamic.stackablePercent.min = 15
            fleaConfig.dynamic.stackablePercent.max = 100

            globalDB.RagFair.minUserLevel = 30;

            if (config.logEverything == true) {
                Logger.info("Tiered flea disabled");
            }
        }

        if (config.tiered_flea == true) {

            //custom blacklist
            fleaConfig.dynamic.blacklist.custom = customFleaConfig.blacklist.custom;

            fleaConfig.dynamic.offerItemCount.min = 1;
            fleaConfig.dynamic.offerItemCount.max = 2;

            fleaConfig.dynamic.price.min = 1.5;
            fleaConfig.dynamic.price.max = 3.5;

            fleaConfig.dynamic.endTimeSeconds.min = 300;
            fleaConfig.dynamic.endTimeSeconds.max = 800;

            fleaConfig.dynamic.condition.conditionChance = 0.99;
            fleaConfig.dynamic.condition.min = 0.50;
            fleaConfig.dynamic.condition.max = 0.95;

            fleaConfig.dynamic.nonStackableCount.min = 1
            fleaConfig.dynamic.nonStackableCount.max = 1

            fleaConfig.dynamic.stackablePercent.min = 20
            fleaConfig.dynamic.stackablePercent.max = 95

            globalDB.RagFair.minUserLevel = 1;

            if (config.logEverything == true) {
                Logger.info("Tiered flea enabled");
            }
        }


        if (config.logEverything == true) {
            Logger.info("Fleamarket loaded");
        }
    }

    static flea1_4() {
        RagfairServer.offers = []
        this.canSellAll(false);
        RagfairCallbacks.load();
    }

    static flea5_9() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        RagfairCallbacks.load();
    }

    static flea11_14() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellMaps(true);
        RagfairCallbacks.load();
    }

    static flea15_19() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellSMG(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellHelmet(true);
        RagfairCallbacks.load();
    }

    static flea20_24() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellSnip(true);
        RagfairCallbacks.load();
    }

    static flea25_29() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellSnip(true);
        this.canSellFood(true);
        this.canSellGear(true);
        this.canSellAmmo(true);
        RagfairCallbacks.load();
    }

    static flea30_34() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellFood(true);
        this.canSellMeds(true);
        this.canSellGear(true);
        RagfairCallbacks.load();
    }

    static fleaFullUnlock() {
        RagfairServer.offers = []
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellKeys(true);
        this.canSellFood(true);
        this.canSellAR(true);
        this.canSellMods(true);
        this.canSellGear(true);
        RagfairCallbacks.load();
    }

    static canSellAll(bool) {
        this.canSellMeds(bool);
        this.canSellStims(bool);
        this.canSellFood(bool);
        this.canSellArmor(bool);
        this.canSellHelmet(bool);
        this.canSellHelmParts(bool);
        this.canSellGear(bool);
        this.canSellBP(bool);
        this.canSellArm(bool);
        this.canSellKeys(bool);
        this.canSellBarters(bool);
        this.canSellFuel(bool);
        this.canSellInfo(bool);
        this.canSellSpecial(bool);
        this.canSellMaps(bool);
        this.canSellMods(bool);
        this.canSellAR(bool);
        this.canSellSnip(bool);
        this.canSellCarbine(bool);
        this.canSellShotgun(bool);
        this.canSellPistol(bool);
        this.canSellGrenades(bool);
        this.canSellMelee(bool);
        this.canSellDMR(bool);
        this.canSellSMG(bool);
        this.canSellAmmo(bool);
        this.canSellContainer(bool);
        this.canSellPouch(bool);
    }

    static canSellContainer(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5795f317245977243854e041" || itemDB[i]._parent === "5671435f4bdc2d96058b4569") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellPouch(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448bf274bdc2dfc2f8b456a") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellMeds(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448f39d4bdc2d0a728b4568"
                || itemDB[i]._parent === "5448f3a14bdc2d27728b4569"
                || itemDB[i]._parent === "5448f3ac4bdc2dce718b4569"
            ) {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellStims(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448f3a64bdc2d60728b456a") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellFood(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._props.foodUseTime) {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellArmor(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448e54d4bdc2dcc718b4568"
                || itemDB[i]._parent === "5448e5284bdc2dcb718b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellHelmet(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5a341c4086f77401f2541505") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellGear(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5b432be65acfc433000ed01f"
                || itemDB[i]._parent === "5a341c4686f77469e155819e"
                || itemDB[i]._parent === "5a341c4086f77401f2541505"
                || itemDB[i]._parent === "5645bcb74bdc2ded0b8b4578"
                || itemDB[i]._parent === "5448e5724bdc2ddf718b4568"
            ) {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellBP(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448e53e4bdc2d60728b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellArm(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5b3f15d486f77432d0509248") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellHelmParts(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5a2c3a9486f774688b05e574"
                || itemDB[i]._parent === "57bef4c42459772e8d35a53b"
                || itemDB[i]._parent === "57bef4c42459772e8d35a53b") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    static canSellKeys(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5c99f98d86f7745c314214b3"
                || itemDB[i]._parent === "5c164d2286f774194c5e69fa") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellBarters(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "590c745b86f7743cc433c5f2"
                || itemDB[i]._parent === "57864ada245977548638de91"
                || itemDB[i]._parent === "57864bb7245977548b3b66c2"
                || itemDB[i]._parent === "57864a66245977548f04a81f"
                || itemDB[i]._parent === "57864e4c24597754843f8723"
                || itemDB[i]._parent === "57864ee62459775490116fc1"
                || itemDB[i]._parent === "57864c322459775490116fbf"
                || itemDB[i]._parent === "5448ecbe4bdc2d60728b4568"
                || itemDB[i]._parent === "57864a3d24597754843f8721"
                || itemDB[i]._parent === "57864c8c245977548867e7f1"

            ) {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellFuel(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5d650c3e815116009f6201d2") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellMods(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "55818af64bdc2d5b648b4570"
                || itemDB[i]._parent === "55818b164bdc2ddc698b456c"
                || itemDB[i]._parent === "56ea9461d2720b67698b456f"
                || itemDB[i]._parent === "555ef6e44bdc2de9068b457e"
                || itemDB[i]._parent === "55818a594bdc2db9688b456a"
                || itemDB[i]._parent === "55818a684bdc2ddd698b456d"
                || itemDB[i]._parent === "55818a304bdc2db5418b457d"
                || itemDB[i]._parent === "55818a6f4bdc2db9688b456b"
                || itemDB[i]._parent === "550aa4bf4bdc2dd6348b456b"
                || itemDB[i]._parent === "550aa4cd4bdc2dd8348b456c"
                || itemDB[i]._parent === "55818b224bdc2dde698b456f"
                || itemDB[i]._parent === "58d39b0386f77443380bf13c"
                || itemDB[i]._parent === "55818add4bdc2d5b648b456f"
                || itemDB[i]._parent === "550aa4154bdc2dd8348b456b"
                || itemDB[i]._parent === "55818b084bdc2d5b648b4571"
                || itemDB[i]._parent === "5b363e1b5acfc4771e1c5e80"
                || itemDB[i]._parent === "550aa4dd4bdc2dc9348b4569"
                || itemDB[i]._parent === "55818ad54bdc2ddc698b4569"
                || itemDB[i]._parent === "55818acf4bdc2dde698b456b"
                || itemDB[i]._parent === "55818ae44bdc2dde698b456c"
                || itemDB[i]._parent === "55818ac54bdc2d5b648b456e"
                || itemDB[i]._parent === "55818aeb4bdc2ddc698b456a"
                || itemDB[i]._parent === "5448bc234bdc2d3c308b4569"
                || itemDB[i]._parent === "5a74651486f7744e73386dd1"
                || itemDB[i]._parent === "55818a104bdc2db9688b4569"
                || itemDB[i]._parent === "55818afb4bdc2dde698b456d"
                || itemDB[i]._parent === "610720f290b75a49ff2e5e25"
                || itemDB[i]._parent === "5d21f59b6dbe99052b54ef83"
            ) {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellAR(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447a9cd4bdc2dbd208b4567"
                || itemDB[i]._parent === "5422acb9af1c889c16000029"
                || itemDB[i]._parent === "5447bed64bdc2d97278b4568") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellDMR(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b6194bdc2d67278b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellSMG(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b5e04bdc2d62278b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    static canSellMelee(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447e1d04bdc2dff2f8b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellSnip(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b6254bdc2dc3278b4568") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    static canSellCarbine(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b5f14bdc2d61278b4567"
                || itemDB[i]._parent === "5447b5fc4bdc2d87278b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellShotgun(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b6094bdc2dc3278b4567"
                || itemDB[i]._id === "60db29ce99594040e04c4a27") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellPistol(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447b5cf4bdc2d65278b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellGrenades(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "543be6564bdc2df4348b4568") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    static canSellAmmo(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "543be5cb4bdc2deb348b4568"
                || itemDB[i]._parent === "5485a8684bdc2da71d8b4567") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellInfo(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5448ecbe4bdc2d60728b4568") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellSpecial(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "5447e0e74bdc2d3c308b4567"
                || itemDB[i]._parent === "5f4fbaaca5573a5ac31db429"
                || itemDB[i]._parent === "61605ddea09d851a0a0c1bbc") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    static canSellMaps(bool) {
        for (let i in itemDB) {
            if (itemDB[i]._parent === "567849dd4bdc2d150f8b456e") {
                itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

}

module.exports = Fleamarket;