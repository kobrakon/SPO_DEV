"use strict";
const config = require("../config/config.js");
const arrays = require("./arrays.js");

const EquipmentSlots = arrays.equipment_slots

class BotGeneration {

    static botLootGen() {
        BotGenerator.generateInventory = function (templateInventory, equipmentChances, generation, botRole, isPmc) {
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

        BotGenerator.generateLoot = function (lootPool, itemCounts, isPmc, botRole) {
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
                        poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.items[lootTpl]);
                        specialLootTemplates.push(...poolItems.filter(x => !!x));
                        break;
                    case "pockets":
                        poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.items[lootTpl]);
                        pocketLootTemplates.push(...poolItems.filter(x => !!x));
                        break;
                    case "tacticalvest":
                        poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.items[lootTpl]);
                        vestLootTemplates.push(...poolItems.filter(x => !!x));
                        break;
                    case "securedcontainer":
                        // Don't add these items to loot pool
                        break;
                    default:
                        poolItems = pool.map(lootTpl => DatabaseServer.tables.templates.items[lootTpl]);
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
        if (config.logEverything == true) {
            Logger.info("AKI generateLoot and generateInventory overrided");
        }
    }


    static botModGeneration() {
        BotGenerator.generateModsForItem = function (items, modPool, parentId, parentTemplate, modSpawnChances, isPmc = false) {
            const itemModPool = modPool[parentTemplate._id];

            if (!parentTemplate._props.Slots.length && !parentTemplate._props.Cartridges.length && !parentTemplate._props.Chambers.length) {
                Logger.error(`Item ${parentTemplate._id} had mods defined, but no slots to support them`);
                return items;
            }

            for (const modSlot in itemModPool) {
                let itemSlot;

                switch (modSlot) {
                    case "patron_in_weapon":
                    case "patron_in_weapon_000":
                    case "patron_in_weapon_001":
                        itemSlot = parentTemplate._props.Chambers.find(c => c._name.includes(modSlot));
                        break;

                    case "cartridges":
                        itemSlot = parentTemplate._props.Cartridges.find(c => c._name === modSlot);
                        break;

                    default:
                        itemSlot = parentTemplate._props.Slots.find(s => s._name === modSlot);
                        break;
                }

                if (!itemSlot) {
                    Logger.error(`Slot '${modSlot}' does not exist for item ${parentTemplate._id}`);
                    continue;
                }

                const ammoContainers = ["mod_magazine", "patron_in_weapon", "patron_in_weapon_000", "patron_in_weapon_001", "cartridges"];
                const modSpawnChance = BotGeneration.checkRequired(itemSlot) || ammoContainers.includes(modSlot) ? 100 : modSpawnChances[modSlot];

                if (RandomUtil.getIntEx(100) > modSpawnChance) {
                    continue;
                } // Filter blacklisted cartridges


                if (isPmc && ammoContainers.includes(modSlot)) {
                    // Array includes mod_magazine which isnt a cartridge, but we need to filter the other 4 items
                    const cartridgeBlacklist = BotConfig.pmc.cartridgeBlacklist;
                    itemModPool[modSlot] = itemModPool[modSlot].filter(x => !cartridgeBlacklist.includes(x));
                }
                const exhaustableModPool = new ExhaustableArray(itemModPool[modSlot]);
                let modTpl;
                let found = false;

                while (exhaustableModPool.hasValues()) {
                    modTpl = exhaustableModPool.getRandomValue();

                    if (!BotGenerator.isItemIncompatibleWithCurrentItems(items, modTpl, modSlot)) {
                        found = true;
                        break;
                    }
                } // Find a mod to attach from items db for required slots if none found above


                const parentSlot = parentTemplate._props.Slots.find(i => i._name === modSlot);

                if (!found && parentSlot !== undefined && BotGeneration.checkRequired(parentSlot)) {
                    modTpl = BotGenerator.getModTplFromItemDb(modTpl, parentSlot, modSlot, items);
                    found = !!modTpl;
                }

                if (!found || !modTpl) {
                    if (BotGeneration.checkRequired(itemSlot)) {
                        Logger.error(`Could not locate any compatible items to fill '${modSlot}' for ${parentTemplate._id}`);
                    }

                    continue;
                }

                if (!itemSlot._props.filters[0].Filter.includes(modTpl)) {
                    Logger.error(`Mod ${modTpl} is not compatible with slot '${modSlot}' for item ${parentTemplate._id}`);
                    continue;
                }

                const modTemplate = DatabaseServer.tables.templates.items[modTpl];

                if (!modTemplate) {
                    Logger.error(`Could not find mod item template with tpl ${modTpl}`);
                    Logger.info(`Item -> ${parentTemplate._id}; Slot -> ${modSlot}`);
                    continue;
                } // TODO: check if weapon already has sight
                // 'sight' 550aa4154bdc2dd8348b456b 2x parents down


                const parentItem = DatabaseServer.tables.templates.items[modTemplate._parent];

                if (modTemplate._parent === "550aa4154bdc2dd8348b456b" || parentItem._parent === "550aa4154bdc2dd8348b456b") {// todo, check if another sight is already on gun AND isnt a side-mounted sight
                    // if weapon has sight already, skip
                }
                const modId = HashUtil.generate();
                items.push({
                    "_id": modId,
                    "_tpl": modTpl,
                    "parentId": parentId,
                    "slotId": modSlot,
                    ...BotGenerator.generateExtraPropertiesForItem(modTemplate)
                }); // I first thought we could use the recursive generateModsForItems as previously for cylinder magazines.
                // However, the recurse doesnt go over the slots of the parent mod but over the modPool which is given by the bot config
                // where we decided to keep cartridges instead of camoras. And since a CylinderMagazine only has one cartridge entry and
                // this entry is not to be filled, we need a special handling for the CylinderMagazine

                if (parentItem._name === "CylinderMagazine") {
                    // we don't have child mods, we need to create the camoras for the magazines instead
                    BotGenerator.fillCamora(items, modPool, modId, modTemplate);
                } else {
                    if (Object.keys(modPool).includes(modTpl)) {
                        BotGenerator.generateModsForItem(items, modPool, modId, modTemplate, modSpawnChances);
                    }
                }
            }
            return items;
        }

        BotGenerator.isWeaponValid = function (itemList) {
            for (const item of itemList) {
                const template = DatabaseServer.tables.templates.items[item._tpl];
                if (!template._props.Slots || !template._props.Slots.length) {
                    continue;
                }

                for (const slot of template._props.Slots) {
                    if (!BotGeneration.checkRequired(slot)) {
                        continue;
                    }

                    const slotItem = itemList.find(i => i.parentId === item._id && i.slotId === slot._name);
                    if (!slotItem) {
                        Logger.error(`Required slot '${slot._name}' on ${template._id} was empty`);
                        return false;
                    }
                }
            }
            return true;
        }
        if (config.logEverything == true) {
            Logger.info("AKI generateModsForItem overrided");
        }
    }

    static checkRequired(slot) {
        if (slot._botRequired != undefined) {
            if (slot._botRequired == true)
                return true
        }
        else
            if (slot._required == true)
                return true
        return false
    }
}

class ExhaustableArray {
    constructor(itemPool) {
        this.pool = JsonUtil.clone(itemPool);
    }

    getRandomValue() {
        if (!this.pool || !this.pool.length) {
            return null;
        }

        const index = RandomUtil.getInt(0, this.pool.length - 1);
        const toReturn = JsonUtil.clone(this.pool[index]);
        this.pool.splice(index, 1);
        return toReturn;
    }

    getFirstValue() {
        if (!this.pool || !this.pool.length) {
            return null;
        }

        const index = 0;
        const toReturn = JsonUtil.clone(this.pool[index]);
        this.pool.splice(index, 1);
        return toReturn;
    }

    hasValues() {
        if (this.pool && this.pool.length) {
            return true;
        }

        return false;
    }

}
module.exports = BotGeneration; 