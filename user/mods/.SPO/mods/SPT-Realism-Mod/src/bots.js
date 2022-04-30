"use strict";

const DB = DatabaseServer.tables;
const botDB = DB.bots.types;
const botConfPMC = BotConfig.pmc;

const rmBotConfig = require("../db/bots/botconfig.json");
const config = require("../config/config.js");
const scavLO = require("../db/bots/loadouts/scavLO.json");
const bearLO = require("../db/bots/loadouts/bearLO.json");
const usecLO = require("../db/bots/loadouts/usecLO.json");
const commonStats = require("../db/bots/common.json");
const emptyArray = require("../db/emptyarray.json");
const arrays = require("./arrays.js");

const scavBase = botDB["assault"];
const usecBase = botDB["usec"];
const bearBase = botDB["bear"];

const botHealth = arrays.bot_list;

class Bots {
    static loadBots() {
        //remove PMC bullet blacklist
        botConfPMC.cartridgeBlacklist = rmBotConfig.cartridgeBlacklist;

        //use different item blacklist
        botConfPMC.dynamicLoot.blacklist = rmBotConfig.blacklist;

        //Set bot loudouts to tier 1 as default
        this.botConfig1();

        if (config.logEverything == true) {
            Logger.info("Bots Loaded");
        }
    }

    static setBotHealth(){
        //Set bot health
        scavBase.health.BodyParts = commonStats.scavHealth.BodyParts
        scavBase.health.Temperature = commonStats.health.Temperature;

        botHealth.forEach(setHealth);
        function setHealth(bot) {
            bot.health.BodyParts = commonStats.health.BodyParts;
            bot.health.Temperature = commonStats.health.Temperature;
        }
        if (config.logEverything == true) {
            // Logger.info("USEC chest health =" +usecBase.health.BodyParts[0].Chest.min);
            Logger.info("Bot Health Set");
        }
    }

    static botConfig1() {
    
        //Set bot armor and weapon min durability
        BotConfig.durability.pmc = rmBotConfig.durability1.pmc
        BotConfig.durability.pmcbot = rmBotConfig.durability1.pmcbot
        BotConfig.durability.boss = rmBotConfig.durability1.boss
        BotConfig.durability.follower = rmBotConfig.durability1.follower
        BotConfig.durability.assault = rmBotConfig.durability1.assault
        BotConfig.durability.cursedassault = rmBotConfig.durability1.cursedassault
        BotConfig.durability.marksman = rmBotConfig.durability1.marksman
        BotConfig.durability.exusec = rmBotConfig.durability1.exusec
        BotConfig.durability.sectantpriest = rmBotConfig.durability1.sectantpriest
        BotConfig.durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc1.dynamicLoot.moneyStackLimits;
        botConfPMC.dynamicLoot.spawnLimits = rmBotConfig.pmc1.dynamicLoot.spawnLimits;

        //adjust PMC max loot in rubles
        botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;

        //adjust PMC hostile chance
        botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc1.chanceSameSideIsHostilePercent;

        //set bot faction spawn ratio
        botConfPMC.types = rmBotConfig.pmc1.types;

        //set pmc difficulty
        //botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;

        //set loot N value
        botConfPMC.lootNValue = rmBotConfig.lootNValue1;

        //set max bots
        BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.2;
        
        this.scavLoad1();
        this.usecLoad1();
        this.bearLoad1();

        if (config.logEverything == true) {
            Logger.info("botConfig1 loaded");
        }
    }

    static botConfig1_5() {

        //Set bot armor and weapon min durability
        BotConfig.durability.pmc = rmBotConfig.durability1.pmc
        BotConfig.durability.pmcbot = rmBotConfig.durability1.pmcbot
        BotConfig.durability.boss = rmBotConfig.durability1.boss
        BotConfig.durability.follower = rmBotConfig.durability1.follower
        BotConfig.durability.assault = rmBotConfig.durability1.assault
        BotConfig.durability.cursedassault = rmBotConfig.durability1.cursedassault
        BotConfig.durability.marksman = rmBotConfig.durability1.marksman
        BotConfig.durability.exusec = rmBotConfig.durability1.exusec
        BotConfig.durability.sectantpriest = rmBotConfig.durability1.sectantpriest
        BotConfig.durability.sectantwarrior = rmBotConfig.durability1.sectantwarrior

        //adjust PMC money stack limits and adjust PMC item spawn limits
        botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc1.dynamicLoot.moneyStackLimits;
        botConfPMC.dynamicLoot.spawnLimits = rmBotConfig.pmc1.dynamicLoot.spawnLimits;

        //adjust PMC max loot in rubles
        botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc1.maxBackpackLootTotalRub;
        botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc1.maxPocketLootTotalRub;
        botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc1.maxVestLootTotalRub;

        //adjust PMC hostile chance
        botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc1.chanceSameSideIsHostilePercent;

        //set bot faction spawn ratio
        botConfPMC.types = rmBotConfig.pmc1.types;

        //set pmc difficulty
        //botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;

        //set loot N value
        botConfPMC.lootNValue = rmBotConfig.lootNValue1;

        //set max bots
        BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.1;
                
        this.scavLoad1();
        this.usecLoad1_5();
        this.bearLoad1_5();

        if (config.logEverything == true) {
            Logger.info("botConfig1_5 loaded");
        }
    }

    static botConfig2() {
        
            //Set bot armor and weapon min durability
            BotConfig.durability.pmc = rmBotConfig.durability2.pmc
            BotConfig.durability.pmcbot = rmBotConfig.durability2.pmcbot
            BotConfig.durability.boss = rmBotConfig.durability2.boss
            BotConfig.durability.follower = rmBotConfig.durability2.follower
            BotConfig.durability.assault = rmBotConfig.durability2.assault
            BotConfig.durability.cursedassault = rmBotConfig.durability2.cursedassault
            BotConfig.durability.marksman = rmBotConfig.durability2.marksman
            BotConfig.durability.exusec = rmBotConfig.durability2.exusec
            BotConfig.durability.sectantpriest = rmBotConfig.durability2.sectantpriest
            BotConfig.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior

            //adjust PMC money stack limits and adjust PMC item spawn limits
            botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc2.dynamicLoot.moneyStackLimits;
            botConfPMC.dynamicLoot.spawnLimits = rmBotConfig.pmc2.dynamicLoot.spawnLimits;

            //adjust PMC max loot in rubles
            botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
            botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
            botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;

            //adjust PMC hostile chance
            botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc2.chanceSameSideIsHostilePercent;

            //set bot faction spawn ratio
            botConfPMC.types = rmBotConfig.pmc2.types;

            //set pmc difficulty
            //botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;

            //set loot N value
            botConfPMC.lootNValue = rmBotConfig.lootNValue2;

            //set max bots
            BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.1;
        


            this.scavLoad2();
            this.usecLoad2();
            this.bearLoad2();
        if (config.logEverything == true) {
          Logger.info("botConfig2 loaded");
        }

    }

    static botConfig2_5() {

            //Set bot armor and weapon min durability
            BotConfig.durability.pmc = rmBotConfig.durability2.pmc
            BotConfig.durability.pmcbot = rmBotConfig.durability2.pmcbot
            BotConfig.durability.boss = rmBotConfig.durability2.boss
            BotConfig.durability.follower = rmBotConfig.durability2.follower
            BotConfig.durability.assault = rmBotConfig.durability2.assault
            BotConfig.durability.cursedassault = rmBotConfig.durability2.cursedassault
            BotConfig.durability.marksman = rmBotConfig.durability2.marksman
            BotConfig.durability.exusec = rmBotConfig.durability2.exusec
            BotConfig.durability.sectantpriest = rmBotConfig.durability2.sectantpriest
            BotConfig.durability.sectantwarrior = rmBotConfig.durability2.sectantwarrior

            //adjust PMC money stack limits and adjust PMC item spawn limits
            botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc2.dynamicLoot.moneyStackLimits;
            botConfPMC.dynamicLoot.spawnLimits = rmBotConfig.pmc2.dynamicLoot.spawnLimits;

            //adjust PMC max loot in rubles
            botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc2.maxBackpackLootTotalRub;
            botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc2.maxPocketLootTotalRub;
            botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc2.maxVestLootTotalRub;

            //adjust PMC hostile chance
            botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc2.chanceSameSideIsHostilePercent;

            //set bot faction spawn ratio
            botConfPMC.types = rmBotConfig.pmc2.types;

            //set pmc difficulty
            botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;

            //set loot N value
            botConfPMC.lootNValue = rmBotConfig.lootNValue2;

            //set max bots
            BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.1;
        
            this.scavLoad2();
            this.usecLoad2_5();
            this.bearLoad2_5();
            if (config.logEverything == true) {
                Logger.info("botConfig2_5 loaded");
        }

    }

    static botConfig3() {

            //Set bot armor and weapon min durability
            BotConfig.durability.pmc = rmBotConfig.durability3.pmc
            BotConfig.durability.pmcbot = rmBotConfig.durability3.pmcbot
            BotConfig.durability.boss = rmBotConfig.durability3.boss
            BotConfig.durability.follower = rmBotConfig.durability3.follower
            BotConfig.durability.assault = rmBotConfig.durability3.assault
            BotConfig.durability.cursedassault = rmBotConfig.durability3.cursedassault
            BotConfig.durability.marksman = rmBotConfig.durability3.marksman
            BotConfig.durability.exusec = rmBotConfig.durability3.exusec
            BotConfig.durability.sectantpriest = rmBotConfig.durability3.sectantpriest
            BotConfig.durability.sectantwarrior = rmBotConfig.durability3.sectantwarrior

            //adjust PMC money stack limits and adjust PMC item spawn limits
            botConfPMC.dynamicLoot.moneyStackLimits = rmBotConfig.pmc3.dynamicLoot.moneyStackLimits;
            botConfPMC.dynamicLoot.spawnLimits = rmBotConfig.pmc3.dynamicLoot.spawnLimits;

            //adjust PMC max loot in rubles
            botConfPMC.maxBackpackLootTotalRub = rmBotConfig.pmc3.maxBackpackLootTotalRub;
            botConfPMC.maxPocketLootTotalRub = rmBotConfig.pmc3.maxPocketLootTotalRub;
            botConfPMC.maxVestLootTotalRub = rmBotConfig.pmc3.maxVestLootTotalRub;

            //adjust PMC hostile chance
            botConfPMC.chanceSameSideIsHostilePercent = rmBotConfig.pmc3.chanceSameSideIsHostilePercent;

            //set bot faction spawn ratio
            botConfPMC.types = rmBotConfig.pmc3.types;

            //set pmc difficulty
            botConfPMC.difficulty = rmBotConfig.pmc3.difficulty;

            //set loot N value
            botConfPMC.lootNValue = rmBotConfig.lootNValue3;

            //set max bots
            BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.0;
        
            this.scavLoad3();
            this.usecLoad3();
            this.bearLoad3();

        if (config.logEverything == true) {
           Logger.info("botConfig3 loaded");
        }
    }

    static botTest() {
        scavBase.inventory.equipment.FirstPrimaryWeapon = emptyArray.empty;
        usecBase.inventory.equipment.FirstPrimaryWeapon = emptyArray.empty;
        bearBase.inventory.equipment.FirstPrimaryWeapon = emptyArray.empty;

        scavBase.inventory.equipment.Holster = emptyArray.empty;
        usecBase.inventory.equipment.Holster = emptyArray.empty;
        bearBase.inventory.equipment.Holster = emptyArray.empty;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static scavLoad1() {
        scavBase.inventory.equipment = scavLO.scavLO1.inventory.equipment;
        scavBase.inventory.items = scavLO.scavLO1.inventory.items;
        scavBase.inventory.mods = scavLO.scavLO1.inventory.mods;
        scavBase.chances = scavLO.scavLO1.chances;
        scavBase.generation = scavLO.scavLO1.generation;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static scavLoad2() {
        scavBase.inventory.equipment = scavLO.scavLO2.inventory.equipment;
        scavBase.inventory.items = scavLO.scavLO2.inventory.items;
        scavBase.inventory.mods = scavLO.scavLO2.inventory.mods;
        scavBase.chances = scavLO.scavLO2.chances;
        scavBase.generation = scavLO.scavLO2.generation;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static scavLoad3() {
        scavBase.inventory.equipment = scavLO.scavLO3.inventory.equipment;
        scavBase.inventory.items = scavLO.scavLO3.inventory.items;
        scavBase.inventory.mods = scavLO.scavLO3.inventory.mods;
        scavBase.chances = scavLO.scavLO3.chances;
        scavBase.generation = scavLO.scavLO3.generation;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static usecLoad1() {
        usecBase.inventory.equipment = usecLO.usecLO1.inventory.equipment;
        usecBase.inventory.items = usecLO.usecLO1.inventory.items;
        usecBase.inventory.mods = usecLO.usecLO1.inventory.mods;
        usecBase.chances = usecLO.usecLO1.chances;
        usecBase.generation = usecLO.usecLO1.generation;
        usecBase.appearance.body = usecLO.usecLO1.appearance.body;
        usecBase.appearance.feet = usecLO.usecLO1.appearance.feet;
        usecBase.experience.level = usecLO.usecLO1.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static usecLoad1_5() {
        usecBase.inventory.equipment = usecLO.usecLO1_5.inventory.equipment;
        usecBase.inventory.items = usecLO.usecLO1_5.inventory.items;
        usecBase.inventory.mods = usecLO.usecLO1_5.inventory.mods;
        usecBase.chances = usecLO.usecLO1_5.chances;
        usecBase.generation = usecLO.usecLO1_5.generation;
        usecBase.appearance.body = usecLO.usecLO1_5.appearance.body;
        usecBase.appearance.feet = usecLO.usecLO1_5.appearance.feet;
        usecBase.experience.level = usecLO.usecLO1_5.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static usecLoad2() {
        usecBase.inventory.equipment = usecLO.usecLO2.inventory.equipment;
        usecBase.inventory.items = usecLO.usecLO2.inventory.items;
        usecBase.inventory.mods = usecLO.usecLO2.inventory.mods;
        usecBase.chances = usecLO.usecLO2.chances;
        usecBase.generation = usecLO.usecLO2.generation;
        usecBase.appearance.body = usecLO.usecLO2.appearance.body;
        usecBase.appearance.feet = usecLO.usecLO2.appearance.feet;
        usecBase.experience.level = usecLO.usecLO2.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static usecLoad2_5() {
        usecBase.inventory.equipment = usecLO.usecLO2_5.inventory.equipment;
        usecBase.inventory.items = usecLO.usecLO2_5.inventory.items;
        usecBase.inventory.mods = usecLO.usecLO2_5.inventory.mods;
        usecBase.chances = usecLO.usecLO2_5.chances;
        usecBase.generation = usecLO.usecLO2_5.generation;
        usecBase.appearance.body = usecLO.usecLO2_5.appearance.body;
        usecBase.appearance.feet = usecLO.usecLO2_5.appearance.feet;
        usecBase.experience.level = usecLO.usecLO2_5.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static usecLoad3() {
        usecBase.inventory.equipment = usecLO.usecLO3.inventory.equipment;
        usecBase.inventory.items = usecLO.usecLO3.inventory.items;
        usecBase.inventory.mods = usecLO.usecLO3.inventory.mods;
        usecBase.chances = usecLO.usecLO3.chances;
        usecBase.generation = usecLO.usecLO3.generation;
        usecBase.appearance.body = usecLO.usecLO3.appearance.body;
        usecBase.appearance.feet = usecLO.usecLO3.appearance.feet;
        usecBase.experience.level = usecLO.usecLO3.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }


    static bearLoad1() {

        bearBase.inventory.equipment = bearLO.bearLO1.inventory.equipment;
        bearBase.inventory.items = bearLO.bearLO1.inventory.items;
        bearBase.inventory.mods = bearLO.bearLO1.inventory.mods;
        bearBase.chances = bearLO.bearLO1.chances;
        bearBase.generation = bearLO.bearLO1.generation;
        bearBase.appearance.body = bearLO.bearLO1.appearance.body;
        bearBase.appearance.feet = bearLO.bearLO1.appearance.feet;
        bearBase.experience.level = bearLO.bearLO1.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static bearLoad1_5() {

        bearBase.inventory.equipment = bearLO.bearLO1_5.inventory.equipment;
        bearBase.inventory.items = bearLO.bearLO1_5.inventory.items;
        bearBase.inventory.mods = bearLO.bearLO1_5.inventory.mods;
        bearBase.chances = bearLO.bearLO1_5.chances;
        bearBase.generation = bearLO.bearLO1_5.generation;
        bearBase.appearance.body = bearLO.bearLO1_5.appearance.body;
        bearBase.appearance.feet = bearLO.bearLO1_5.appearance.feet;
        bearBase.experience.level = bearLO.bearLO1_5.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static bearLoad2() {
        bearBase.inventory.equipment = bearLO.bearLO2.inventory.equipment;
        bearBase.inventory.items = bearLO.bearLO2.inventory.items;
        bearBase.inventory.mods = bearLO.bearLO2.inventory.mods;
        bearBase.chances = bearLO.bearLO2.chances;
        bearBase.generation = bearLO.bearLO2.generation;
        bearBase.appearance.body = bearLO.bearLO2.appearance.body;
        bearBase.appearance.feet = bearLO.bearLO2.appearance.feet;
        bearBase.experience.level = bearLO.bearLO2.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static bearLoad2_5() {
        bearBase.inventory.equipment = bearLO.bearLO2_5.inventory.equipment;
        bearBase.inventory.items = bearLO.bearLO2_5.inventory.items;
        bearBase.inventory.mods = bearLO.bearLO2_5.inventory.mods;
        bearBase.chances = bearLO.bearLO2_5.chances;
        bearBase.generation = bearLO.bearLO2_5.generation;
        bearBase.appearance.body = bearLO.bearLO2_5.appearance.body;
        bearBase.appearance.feet = bearLO.bearLO2_5.appearance.feet;
        bearBase.experience.level = bearLO.bearLO2_5.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }

    static bearLoad3() {
        bearBase.inventory.equipment = bearLO.bearLO3.inventory.equipment;
        bearBase.inventory.items = bearLO.bearLO3.inventory.items;
        bearBase.inventory.mods = bearLO.bearLO3.inventory.mods;
        bearBase.chances = bearLO.bearLO3.chances;
        bearBase.generation = bearLO.bearLO3.generation;
        bearBase.appearance.body = bearLO.bearLO3.appearance.body;
        bearBase.appearance.feet = bearLO.bearLO3.appearance.feet;
        bearBase.experience.level = bearLO.bearLO3.experience.level;

        if (config.logEverything == true) {
            Logger.info("botTest loaded");
        }
    }  
}

module.exports = Bots; 