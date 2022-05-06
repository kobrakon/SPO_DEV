"use strict";

const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const config = require("../config/config.js");
const meds = require("../db/items/med_items.json");
const buffs = require("../db/items/buffs.json");
const buffDB = globalDB.Health.Effects.Stimulator.Buffs;

class Health {

    static loadMeds() {

        for (const buffName in buffs) {
            buffDB[buffName] = buffs[buffName]
        }

        // for (const buffName in buffs) {
        //     console.log(buffName);
        //     for (var i = 0; i < buffs[buffName].length; i++) {
        //         console.log(buffs[buffName]);
        //     }
        // }
        // Logger.info("============================================");
        // for (const buffName in buffDB) {
        //     Logger.info(buffName);
        // }
        // for (var i = 0; i < buffConf.Buffs_analgin.length; i++) {
        //     console.log(buffConf.Buffs_analgin[i]);
        // }

        if (config.realism == true) {
            //Adjust Thermal stim to compensate for lower base temp
            globalDB.Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature.Value = -3;
        }
        for (let i in itemDB) {
            let fileData = itemDB[i];
            ///Pain Meds//
            //Analgin
            if (fileData._id === "544fb37f4bdc2dee738b4567") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.analgin.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.analgin.StimulatorBuffs;
                fileData._props.effects_damage = meds.analgin.effects_damage;
                fileData._props.effects_health = meds.analgin.effects_health;
            }
            //Ibuprofen
            if (fileData._id === "5af0548586f7743a532b7e99") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.ibuprofen.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.ibuprofen.StimulatorBuffs;
                fileData._props.effects_damage = meds.ibuprofen.effects_damage;
                fileData._props.effects_health = meds.ibuprofen.effects_health;
            }
            //Morphine
            if (fileData._id === "544fb3f34bdc2d03748b456a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.morphine.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.morphine.StimulatorBuffs;
                fileData._props.effects_damage = meds.morphine.effects_damage;
                fileData._props.effects_health = meds.morphine.effects_health;
            }
            ///Medicines///
            //Augmentin
            if (fileData._id === "590c695186f7741e566b64a2") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.augmentin.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.augmentin.StimulatorBuffs;
                fileData._props.effects_damage = meds.augmentin.effects_damage;
                fileData._props.effects_health = meds.augmentin.effects_health;
            }
            ///Bandages///
            //Aeseptic Bandage
            if (fileData._id === "544fb25a4bdc2dfb738b4567") {
                fileData._parent = "5448f39d4bdc2d0a728b4568";
                fileData._props.MaxHpResource = meds.aeseptic.MaxHpResource;
                fileData._props.effects_damage = meds.aeseptic.effects_damage;
                fileData._props.effects_health = meds.aeseptic.effects_health;
            }
            //Army Bandage
            if (fileData._id === "5751a25924597722c463c472") {
                fileData._parent = "5448f39d4bdc2d0a728b4568";
                fileData._props.MaxHpResource = meds.army.MaxHpResource;
                fileData._props.effects_damage = meds.army.effects_damage;
                fileData._props.effects_health = meds.army.effects_health;
            }
            ///Tourniquets///
            //CAT
            if (fileData._id === "60098af40accd37ef2175f27") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.CAT.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.CAT.StimulatorBuffs;
                fileData._props.effects_damage = meds.CAT.effects_damage;
                fileData._props.effects_health = meds.CAT.effects_health;
            }
            //Esmarch
            if (fileData._id === "5e831507ea0a7c419c2f9bd9") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.esmarch.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.esmarch.StimulatorBuffs;
                fileData._props.effects_damage = meds.esmarch.effects_damage;
                fileData._props.effects_health = meds.esmarch.effects_health;
            }
            //Calok
            if (fileData._id === "5e8488fa988a8701445df1e4") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.calok.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.calok.StimulatorBuffs;
                fileData._props.effects_damage = meds.calok.effects_damage;
                fileData._props.effects_health = meds.calok.effects_health;
            }
            ///Splints///
            //Immobilizing Splint
            if (fileData._id === "544fb3364bdc2d34748b456a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.immobo.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.immobo.StimulatorBuffs;
                fileData._props.effects_damage = meds.immobo.effects_damage;
                fileData._props.effects_health = meds.immobo.effects_health;
            }
            //Alu Splint
            if (fileData._id === "5af0454c86f7746bf20992e8") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.alu.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.alu.StimulatorBuffs;
                fileData._props.effects_damage = meds.alu.effects_damage;
                fileData._props.effects_health = meds.alu.effects_health;
                fileData._props.StimulatorBuffs = meds.alu.StimulatorBuffs;
            }
            ///Medkits///
            //AI-2
            if (fileData._id === "5755356824597772cb798962") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds["AI-2"].hpResourceRate;
                fileData._props.MaxHpResource = meds["AI-2"].MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_AI-2";
                fileData._props.effects_damage = meds["AI-2"].effects_damage;
                fileData._props.effects_health = meds["AI-2"].effects_health;
            }
            //CAR
            if (fileData._id === "590c661e86f7741e566b646a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds.CAR.hpResourceRate;
                fileData._props.MaxHpResource = meds.CAR.MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_CAR";
                fileData._props.effects_damage = meds.CAR.effects_damage;
                fileData._props.effects_health = meds.CAR.effects_health;
            }
            //Salewa
            if (fileData._id === "544fb45d4bdc2dee738b4568") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds.salewa.hpResourceRate;
                fileData._props.MaxHpResource = meds.salewa.MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_salewa";
                fileData._props.effects_damage = meds.salewa.effects_damage;
                fileData._props.effects_health = meds.salewa.effects_health;
            }
            //IFAK
            if (fileData._id === "590c678286f77426c9660122") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds.IFAK.hpResourceRate;
                fileData._props.MaxHpResource = meds.IFAK.MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_IFAK";
                fileData._props.effects_damage = meds.IFAK.effects_damage;
                fileData._props.effects_health = meds.IFAK.effects_health;
            }
            //AFAK
            if (fileData._id === "60098ad7c2240c0fe85c570a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds.AFAK.hpResourceRate;
                fileData._props.MaxHpResource = meds.AFAK.MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_AFAK";
                fileData._props.effects_damage = meds.AFAK.effects_damage;
                fileData._props.effects_health = meds.AFAK.effects_health;
            }
            //Grizzly
            if (fileData._id === "590c657e86f77412b013051d") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.hpResourceRate = meds.grizzly.hpResourceRate;
                fileData._props.MaxHpResource = meds.grizzly.MaxHpResource;
                fileData._props.StimulatorBuffs = "Buffs_regen_grizzly";
                fileData._props.effects_damage = meds.grizzly.effects_damage;
                fileData._props.effects_health = meds.grizzly.effects_health;
            }
            ///Smeary stuff///
            //Vaseline
            if (fileData._id === "5755383e24597772cb798966") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.vaseline.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.vaseline.StimulatorBuffs;
                fileData._props.effects_damage = meds.vaseline.effects_damage;
                fileData._props.effects_health = meds.vaseline.effects_health;
            }
            //GoldenStar
            if (fileData._id === "5751a89d24597722aa0e8db0") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.golden.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.golden.StimulatorBuffs;
                fileData._props.effects_damage = meds.golden.effects_damage;
                fileData._props.effects_health = meds.golden.effects_health;
            }
            ///Surgery///
            //CMS
            if (fileData._id === "5d02778e86f774203e7dedbe") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.cms.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.cms.StimulatorBuffs;
                fileData._props.effects_damage = meds.cms.effects_damage;
            }//Surv12
            if (fileData._id === "5d02797c86f774203f38e30a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = meds.surv12.MaxHpResource;
                fileData._props.StimulatorBuffs = meds.surv12.StimulatorBuffs;
                fileData._props.effects_damage = meds.surv12.effects_damage;
            }
        }
        if (config.logEverything == true) {
            Logger.info("Meds loaded");
        }
    }
}

module.exports = Health; 