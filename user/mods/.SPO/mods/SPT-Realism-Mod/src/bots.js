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
const emptyArray = require("../db/emptyarray.json")

const scavBase = botDB["assault"];
const usecBase = botDB["usec"];
const bearBase = botDB["bear"];
const botHealth =
    [botDB["followerbully"],
    botDB["followergluharassault"],
    botDB["followergluharscout"],
    botDB["followergluharsecurity"],
    botDB["followergluharsnipe"],
    botDB["followerkojaniy"],
    botDB["followersanitar"],
    botDB["followertagilla"],
    botDB["usec"],
    botDB["bear"],
    botDB["sectantwarrior"],
    botDB["marksman"],
    botDB["cursedassault"],
    botDB["sectantpriest"],
    botDB["bosstagilla"],
    botDB["bosssanitar"],
    botDB["bosskojaniy"],
    botDB["bosskilla"],
    botDB["bossgluhar"],
    botDB["bossbully"],
    botDB["pmcbot"],
    botDB["exusec"]
    ];

const EquipmentSlots = {
    Headwear: "Headwear",
    Earpiece: "Earpiece",
    FaceCover: "FaceCover",
    ArmorVest: "ArmorVest",
    Eyewear: "Eyewear",
    ArmBand: "ArmBand",
    TacticalVest: "TacticalVest",
    Pockets: "Pockets",
    Backpack: "Backpack",
    SecuredContainer: "SecuredContainer",
    FirstPrimaryWeapon: "FirstPrimaryWeapon",
    SecondPrimaryWeapon: "SecondPrimaryWeapon",
    Holster: "Holster",
    Scabbard: "Scabbard"
};

class Bots {
    static loadBots() {

        //Set bot health
        scavBase.health.BodyParts = commonStats.scavHealth.BodyParts
        scavBase.health.Temperature = commonStats.health.Temperature;

        botHealth.forEach(setHealth);
        function setHealth(bot) {
            bot.health.BodyParts = commonStats.health.BodyParts;
            bot.health.Temperature = commonStats.health.Temperature;
        }

        //remove PMC bullet blacklist
        botConfPMC.cartridgeBlacklist = rmBotConfig.cartridgeBlacklist;

        //use different item blacklist
        botConfPMC.dynamicLoot.blacklist = rmBotConfig.blacklist;

        //Set bot loudouts to tier 1 as default
        this.botConfig1();

        if (config.logEverything == true) {
            Logger.info("Bots loaded");
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
        botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;

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
        botConfPMC.difficulty = rmBotConfig.pmc1.difficulty;

        //set loot N value
        botConfPMC.lootNValue = rmBotConfig.lootNValue1;

        //set max bots
        BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.1;
                
        this.scavLoad1();
        this.usecLoad1_5();
        this.bearLoad1_5();

        if (config.logEverything == true) {
            Logger.info("botConfig1 loaded");
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
            botConfPMC.difficulty = rmBotConfig.pmc2.difficulty;

            //set loot N value
            botConfPMC.lootNValue = rmBotConfig.lootNValue2;

            //set max bots
            BotConfig.maxBotCap = rmBotConfig.maxBotCap *= 1.1;
        


            this.scavLoad2();
            this.usecLoad2();
            this.bearLoad2();
        if (config.logEverything == true) {
          Logger.info("botConfig3 loaded");
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
                Logger.info("botConfig3 loaded");
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

    static callToOverride() {
        BotGenerator.generateLoot = Bots.myLootGen;
        BotGenerator.generateInventory = Bots.myInventoryGen;

        if (config.logEverything == true) {
            Logger.info("AKI generateLoot and generateInventory overrided");
        }
    }

    static myInventoryGen(templateInventory, equipmentChances, generation, botRole, isPmc) {

        // Generate base inventory with no items
        BotGenerator.inventory = BotGenerator.generateInventoryBase();

        // Go over all defined equipment slots and generate an item for each of them
        const excludedSlots = [
            EquipmentSlots.FirstPrimaryWeapon,
            EquipmentSlots.SecondPrimaryWeapon,
            EquipmentSlots.Holster,
            EquipmentSlots.ArmorVest
        ];

        for (const equipmentSlot in templateInventory.equipment) {
            // Weapons have special generation and will be generated seperately; ArmorVest should be generated after TactivalVest
            if (excludedSlots.includes(equipmentSlot)) {
                continue;
            }
            BotGenerator.generateEquipment(equipmentSlot, templateInventory.equipment[equipmentSlot], templateInventory.mods, equipmentChances, botRole);
        }

        // ArmorVest is generated afterwards to ensure that TacticalVest is always first, in case it is incompatible
        BotGenerator.generateEquipment(EquipmentSlots.ArmorVest, templateInventory.equipment.ArmorVest, templateInventory.mods, equipmentChances, botRole);

        // Roll weapon spawns and generate a weapon for each roll that passed
        const shouldSpawnPrimary = RandomUtil.getIntEx(100) <= equipmentChances.equipment.FirstPrimaryWeapon;
        const weaponSlotSpawns = [
            {
                slot: EquipmentSlots.FirstPrimaryWeapon,
                shouldSpawn: shouldSpawnPrimary
            },
            { // Only roll for a chance at secondary if primary roll was successful
                slot: EquipmentSlots.SecondPrimaryWeapon,
                shouldSpawn: shouldSpawnPrimary ? RandomUtil.getIntEx(100) <= equipmentChances.equipment.SecondPrimaryWeapon : false
            },
            { // Roll for an extra pistol, unless primary roll failed - in that case, pistol is guaranteed
                slot: EquipmentSlots.Holster,
                shouldSpawn: shouldSpawnPrimary ? RandomUtil.getIntEx(100) <= equipmentChances.equipment.Holster : true
            }
        ];

        for (const weaponSlot of weaponSlotSpawns) {
            if (weaponSlot.shouldSpawn && Object.keys(templateInventory.equipment[weaponSlot.slot]).length) {
                BotGenerator.generateWeapon(
                    weaponSlot.slot,
                    templateInventory.equipment[weaponSlot.slot],
                    templateInventory.mods,
                    equipmentChances.mods,
                    generation.items.magazines,
                    botRole,
                    isPmc);
            }
        }

        BotGenerator.generateLoot(templateInventory.items, generation.items, isPmc, botRole);

        return JsonUtil.clone(BotGenerator.inventory);
    }


    static myLootGen(lootPool, itemCounts, isPmc, botRole) {
        // Flatten all individual slot loot pools into one big pool, while filtering out potentially missing templates
        const lootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const specialLootTemplates = [];

        for (const [slot, pool] of Object.entries(lootPool)) {
            if (!pool || !pool.length) {
                continue;
            }
            let poolItems = {};
            switch (slot.toLowerCase()) {
                case "specialloot":
                    poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.clientItems.data[lootTpl]);
                    specialLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "pockets":
                    poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.clientItems.data[lootTpl]);
                    pocketLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "tacticalvest":
                    poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.clientItems.data[lootTpl]);
                    vestLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.clientItems.data[lootTpl]);
                    lootTemplates.push(...poolItems.filter(x => !!x));
            }
        }

        // Sort all items by their worth
        lootTemplates.sort((a, b) => BotGenerator.compareByValue(a, b));
        pocketLootTemplates.sort((a, b) => BotGenerator.compareByValue(a, b));
        specialLootTemplates.sort((a, b) => BotGenerator.compareByValue(a, b));
        vestLootTemplates.sort((a, b) => BotGenerator.compareByValue(a, b));

        const specialLootItems = specialLootTemplates.filter(template =>
            !("ammoType" in template._props)
            && !("ReloadMagType" in template._props));


        //Get healing items
        const healingItems = lootTemplates.filter(template => "medUseTime" in template._props);

        const pocketHealingItems = pocketLootTemplates.filter(template =>
            "medUseTime" in template._props && ("Height" in template._props)
            && ("Width" in template._props)
            && template._props.Height === 1
            && template._props.Width === 1);

        const vestHealingItems = vestLootTemplates.filter(template => "medUseTime" in template._props);

        //Get grenade items
        const pocketGrenadeItems = pocketLootTemplates.filter(template =>
            "ThrowType" in template._props && ("Height" in template._props)
            && ("Width" in template._props)
            && template._props.Height === 1
            && template._props.Width === 1);

        const vestGrenadeItems = vestLootTemplates.filter(template => "ThrowType" in template._props);

        // Get all misc loot items
        const lootItems = lootTemplates.filter(template =>
            !("ammoType" in template._props)
            && !("ReloadMagType" in template._props)
            && !("medUseTime" in template._props)
            && !("ThrowType" in template._props));

        // Get single slot items for pocket loot
        const pocketLootItems = pocketLootTemplates.filter(template =>
            !("ammoType" in template._props)
            && !("ReloadMagType" in template._props)
            && !("medUseTime" in template._props)
            && !("ThrowType" in template._props)
            && ("Height" in template._props)
            && ("Width" in template._props)
            && template._props.Height === 1
            && template._props.Width === 1);

        // Get vest loot items
        const vestLootItems = vestLootTemplates.filter(template =>
            !("ammoType" in template._props)
            && !("ReloadMagType" in template._props)
            && !("medUseTime" in template._props)
            && !("ThrowType" in template._props));

        const nValue = isPmc ? BotConfig.lootNValue.pmc : BotConfig.lootNValue.scav;
        const looseLootMin = itemCounts.looseLoot.min;
        const looseLootMax = itemCounts.looseLoot.max;

        //Special loot count
        const specialLootItemCount = BotGenerator.getRandomisedCount(itemCounts.specialItems.min, itemCounts.specialItems.max, nValue);


        //Loose loot count
        const lootItemCount = BotGenerator.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        var vestLootCount = null;
        var pocketLootCount = null;

        if (botRole && BotController.isBotBoss(botRole) == true) {
            pocketLootCount = BotGenerator.getRandomisedCount(looseLootMin, looseLootMax, nValue);
            vestLootCount = BotGenerator.getRandomisedCount(0, 2, nValue);
        } else {
            pocketLootCount = BotGenerator.getRandomisedCount(0, 2, nValue);
            vestLootCount = BotGenerator.getRandomisedCount(Math.round(looseLootMin / 2), Math.round(looseLootMax / 2), nValue);
        }

        //Healing item count
        const healingItemCount = BotGenerator.getRandomisedCount(0, 1, nValue);
        const pocketHealingItemCount = BotGenerator.getRandomisedCount(itemCounts.healing.min, itemCounts.healing.max, nValue);
        const vestHealingItemCount = BotGenerator.getRandomisedCount(0, 2, nValue);

        //Grenade item count 
        const vestGrenadeCount = BotGenerator.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, nValue);
        const pocketGrenadeCount = BotGenerator.getRandomisedCount(0, 1, nValue);

        // Special items
        BotGenerator.addLootFromPool(specialLootItems, [EquipmentSlots.Pockets, EquipmentSlots.Backpack, EquipmentSlots.TacticalVest], specialLootItemCount);

        // Loose loot
        BotGenerator.addLootFromPool(lootItems, [EquipmentSlots.Backpack], lootItemCount, BotConfig.pmc.maxBackpackLootTotalRub, isPmc);
        BotGenerator.addLootFromPool(vestLootItems, [EquipmentSlots.TacticalVest], vestLootCount, BotConfig.pmc.maxVestLootTotalRub, isPmc);
        BotGenerator.addLootFromPool(pocketLootItems, [EquipmentSlots.Pockets], pocketLootCount, BotConfig.pmc.maxPocketLootTotalRub, isPmc);

        // Meds
        BotGenerator.addLootFromPool(healingItems, [EquipmentSlots.SecuredContainer], healingItemCount);
        BotGenerator.addLootFromPool(healingItems, [EquipmentSlots.Backpack], healingItemCount);
        BotGenerator.addLootFromPool(pocketHealingItems, [EquipmentSlots.Pockets], pocketHealingItemCount);
        BotGenerator.addLootFromPool(vestHealingItems, [EquipmentSlots.TacticalVest], vestHealingItemCount);

        // Grenades
        BotGenerator.addLootFromPool(pocketGrenadeItems, [EquipmentSlots.Pockets], pocketGrenadeCount);
        BotGenerator.addLootFromPool(vestGrenadeItems, [EquipmentSlots.TacticalVest], vestGrenadeCount);
    }








}

module.exports = Bots; 