"use strict";


class PlayerScavController {
    static generateScav(sessionId) {
        const pmcData = ProfileController.getPmcProfile(sessionId);
        let bot = JsonUtil.clone(DatabaseServer.tables.bots.base);
        let node = JsonUtil.clone(DatabaseServer.tables.bots.types.assault);

        const fence = pmcData.TradersInfo["579dc571d53a0658a154fbec"];
        let scavKarma = 1;
        if (fence != undefined) {
            scavKarma = fence.standing;
        }

        node = PlayerScavController.modifyBotNode(node, scavKarma)

        bot.Info.Settings.BotDifficulty = "normal";
        bot.Info.Settings.Role = "assault";
        bot.Info.Side = "Savage";
        bot.Info.Nickname = `${RandomUtil.getArrayValue(node.firstName)} ${RandomUtil.getArrayValue(node.lastName) || ""}`;

        if (BotConfig.showTypeInNickname) {
            bot.Info.Nickname += ` ${bot.Info.Settings.Role}`;
        }

        bot.Info.Settings.StandingForKill = node.experience.standingForKill;
        bot.Info.Voice = RandomUtil.getArrayValue(node.appearance.voice);
        bot.Health = BotController.generateHealth(node.health, bot.Info.Side === "Savage");
        bot.Skills = BotController.generateSkills(node.skills);
        bot.Customization.Head = RandomUtil.getArrayValue(node.appearance.head);
        bot.Customization.Body = RandomUtil.getArrayValue(node.appearance.body);
        bot.Customization.Feet = RandomUtil.getArrayValue(node.appearance.feet);
        bot.Customization.Hands = RandomUtil.getArrayValue(node.appearance.hands);
        bot.Inventory = BotGenerator.generateInventory(node.inventory, node.chances, node.generation);

        bot = InventoryHelper.generateInventoryID(bot);

        bot._id = pmcData.savage;
        bot.aid = sessionId;
        bot.Info.Settings = {};
        bot.TradersInfo = JsonUtil.clone(pmcData.TradersInfo);
        bot.Skills = ProfileController.getScavSkills(sessionId);
        bot.Stats = ProfileController.getScavStats(sessionId);
        bot.Info.Level = ProfileController.getScavLevel(sessionId);
        bot.Info.Experience = ProfileController.getScavExperience(sessionId);

        bot = InventoryHelper.removeSecureContainer(bot);
        bot = ProfileController.setScavCooldownTimer(bot, pmcData);

        ProfileController.setScavProfile(sessionId, bot);
        return bot;
    }

    static modifyBotNode(node, scavKarma) {
        const config = require("../../config/config.json");

        scavKarma = scavKarma < 0 ? "negative" : Math.round(scavKarma) || 1;
        const overwriteConfig = require(`../../config/levels/${scavKarma}.json`);

        if (config.overwriteItemGeneration) {
            PlayerScavController.overwriteItemGeneration(node, overwriteConfig);
        }
        if (config.overwriteEquipmentChances) {
            PlayerScavController.overwriteEquipmentChances(node, overwriteConfig);
        }
        if (config.overwriteModsChances) {
            PlayerScavController.overwriteModsChances(node, overwriteConfig);
        }
        if (config.addEquipment) {
            PlayerScavController.addEquipment(node, overwriteConfig);
        }
        if (config.removeEquipment) {
            PlayerScavController.removeEquipment(node, overwriteConfig);
        }
        if (config.overwriteHealth) {
            PlayerScavController.overwriteHealth(node, overwriteConfig);
        }

        return node;
    }

    static overwriteItemGeneration(node, overwriteConfig) {
        for (const item in overwriteConfig.itemGeneration) {
            node.generation.items[item] = overwriteConfig.itemGeneration[item];
        }
    }

    static overwriteEquipmentChances(node, overwriteConfig) {
        node.chances.equipment = overwriteConfig.equipmentChances;
    }

    static overwriteModsChances(node, overwriteConfig) {
        node.chances.mods = overwriteConfig.modsChances;
    }

    static addEquipment(node, overwriteConfig) {
        const equipment = overwriteConfig.addEquipment;
        for (const slot in equipment) {
            for (const item in equipment[slot]) {
                node.inventory.equipment[slot][item] = equipment[slot][item]; 
            }
        }
    }

    static removeEquipment(node, overwriteConfig) {
        const equipment = overwriteConfig.removeEquipment;
        for (const slot in equipment) {
            for (const item in equipment[slot]) {
                delete node.inventory.equipment[slot][equipment[slot][item]];
            }
        }
    }

    static overwriteHealth(node, overwriteConfig) {
        for (const preset of node.health.BodyParts) {
            for (const bodyPart in preset) {
                preset[bodyPart].max *= overwriteConfig.overwriteHealth[bodyPart];
                preset[bodyPart].min *= overwriteConfig.overwriteHealth[bodyPart];
            }
        }
    }
}

module.exports = PlayerScavController;