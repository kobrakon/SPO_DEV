/*
    FileName    | Holtzman.js
    Mod Name    | Holtzman Shield
    Description | A shield produced by a Holtzman generator.
    Mod Version | 2.3.0
    Aki Version | 2.3.0
    Copyright   | jbs4bmx
    Author(s)   | jbs4bmx
    Code Credit | AssAssIn
*/

// Database
const items = DatabaseServer.tables.templates.items;

class Holtzman
{
    constructor() {
        this.mod = "Holtzman Shield v2.3.0";
        Logger.info(`Loading: ${this.mod}`);
        const { other } = require('./config.json');
        if (other.HideWarningMessage === false) {
            Logger.log(`I must not fear. Fear is the mind-killer.`, "magenta");
            Logger.log(`Fear is the little-death that brings total obliteration.`, "magenta");
            Logger.log(`I will face my fear. I will permit it to pass over me and through me.`, "magenta");
            Logger.log(`And when it has gone past I will turn the inner eye to see its path.`, "magenta");
            Logger.log(`Where the fear has gone there will be nothing.`, "magenta");
            Logger.log(`Only I will remain.`, "magenta");
        }

        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

    load()
    {
        // Load config items
        const { MainArmor, HeadAreas, Resources } = require('./config.json');

        // Database
        const items = DatabaseServer.tables.templates.items;
        const handbook = DatabaseServer.tables.templates.handbook.Items;
        const global = DatabaseServer.tables.locales.global;
        const traders = DatabaseServer.tables.traders;

        // Set item placeable slot to Default Inventory slot 14 (armband)
        function getItem(id) {
            return Object.values(items).filter((item) => item._id === id)[0];
        }
        const inventory = getItem("55d7217a4bdc2d86028b456d");
        // Armband Slot filter
        const placeable = inventory._props.Slots[14];

        // Set arrays for armor attributes
        let armor = [];
        let segments = [];

        // Build Item Properties, set trader to Ragman, and accept only Roubles.
        var itemId = "HShield";
        var itemProto = "545cdb794bdc2d3a198b456a";
        var itemClone = "572b7fa524597762b747ce82";
        var itemParent = "57bef4c42459772e8d35a53b";
        var itemCategory = "5b5f701386f774093f2ecf0f";
        var itemFleaPrice = Resources.marketPrice;
        var itemPrefabPath = "assets/content/items/equipment/armband/item_equipment_armband_evasion.bundle";
        var itemLongName = "One Shot Protector";
        var itemShortName = "OSP";
        var itemDescription = "Protects head and thorax from being one shotted.";
        var itemTrader = "5ac3b934156ae10c4430e83c";
        var itemTraderPrice = Resources.traderPrice;
        var itemTraderCurrency = "5449016a4bdc2d6f028b456f";
        var itemTraderLV = Resources.minTraderLevel;

        //push body armor to array "armor"
        if (typeof MainArmor.Head === "boolean") {
            if (MainArmor.Head === true) {
                armor.push("Head")
            }
        } else {
            armor.push("Head")
            Logger.info(`[HS Mod] - Resource value Head is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.Thorax === "boolean") {
            if (MainArmor.Thorax === true) {
                armor.push("Chest")
            }
        } else {
            armor.push("Chest")
            Logger.info(`[HS Mod] - Resource value Chest is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.Stomach === "boolean") {
            if (MainArmor.Stomach === true) {
                armor.push("Stomach")
            }
        } else {
            armor.push("Stomach")
            Logger.info(`[HS Mod] - Resource value Stomach is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.LeftArm === "boolean") {
            if (MainArmor.LeftArm === true) {
                armor.push("LeftArm")
            }
        } else {
            armor.push("LeftArm")
            Logger.info(`[HS Mod] - Resource value LeftArm is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.RightArm === "boolean") {
            if (MainArmor.RightArm === true) {
                armor.push("RightArm")
            }
        } else {
            armor.push("RightArm")
            Logger.info(`[HS Mod] - Resource value RightArm is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.LeftLeg === "boolean") {
            if (MainArmor.LeftLeg === true) {
                armor.push("LeftLeg")
            }
        } else {
            armor.push("LeftLeg")
            Logger.info(`[HS Mod] - Resource value LeftLeg is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.RightLeg === "boolean") {
            if (MainArmor.RightLeg === true) {
                armor.push("RightLeg")
            }
        } else {
            armor.push("RightLeg")
            Logger.info(`[HS Mod] - Resource value RightLeg is not a boolean. Defaulting to true.`, "yellow", "red");
        }

        // push head segments to array "segments"
        if (typeof HeadAreas.Top === "boolean") {
            if (HeadAreas.Top === true) {
                segments.push("Top")
            }
        } else {
            segments.push("Top")
            Logger.info(`[HS Mod] - Resource value Top is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Nape === "boolean") {
            if (HeadAreas.Nape === true) {
                segments.push("Nape")
            }
        } else {
            segments.push("Nape")
            Logger.info(`[HS Mod] - Resource value Nape is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Ears === "boolean") {
            if (HeadAreas.Ears === true) {
                segments.push("Ears")
            }
        } else {
            segments.push("Ears")
            Logger.info(`[HS Mod] - Resource value Ears is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Eyes === "boolean") {
            if (HeadAreas.Eyes === true) {
                segments.push("Eyes")
            }
        } else {
            segments.push("Eyes")
            Logger.info(`[HS Mod] - Resource value Eyes is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Jaws === "boolean") {
            if (HeadAreas.Jaws === true) {
                segments.push("Jaws")
            }
        } else {
            segments.push("Jaws")
            Logger.info(`[HS Mod] - Resource value Jaws is not a boolean. Defaulting to true.`, "yellow", "red");
        }

        if (typeof Resources.RepairCost === "number") {
            if ((Resources.RepairCost < 1) || (Resources.RepairCost > 9999999)) {
                Resources.RepairCost = 100000
            }
        } else {
            Logger.info(`[HS Mod] - Resource value RepairCost is not a number.`, "yellow", "red");
        }
        if (typeof Resources.Durability === "number") {
            if ((Resources.Durability < 1) || (Resources.Durability > 9999999)) {
                Resources.Durability = 100
            }
        } else {
            Logger.info(`[HS Mod] - Resource value Durability is not a number.`, "yellow", "red");
        }
        if (typeof Resources.minTraderLevel === "number") {
            if ((Resources.minTraderLevel < 1) || (Resources.minTraderLevel > 4)) {
                Resources.minTraderLevel = 2
            }
        } else {
            Logger.info(`[HS Mod] - Resource value minTraderLevel is not a number.`, "yellow", "red");
        }
        if (typeof Resources.marketPrice === "number") {
            if ((Resources.marketPrice < 1) || (Resources.marketPrice > 9999999)) {
                Resources.marketPrice = 100000
            }
        } else {
            Logger.info(`[HS Mod] - Resource value marketPrice is not a number.`, "yellow", "red");
        }
        if (typeof Resources.traderPrice === "number") {
            if ((Resources.traderPrice < 1) || (Resources.traderPrice > 9999999)) {
                Resources.traderPrice = 100000
            }
        } else {
            Logger.info(`[HS Mod] - Resource value traderPrice is not a number.`, "yellow", "red");
        }


        // pass info to functions below
        this.createItem(itemId, itemClone, itemParent, itemPrefabPath, itemLongName, itemShortName, itemDescription, items, global);
        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, handbook);
        this.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV, traders);

        // change item properties
        // items[itemId]._props.Prefab = itemPrefabPath;
        items[itemId]._proto = itemProto;
        items[itemId]._props.CreditsPrice = itemTraderPrice;
        items[itemId]._props.RepairCost = Resources.RepairCost;
        items[itemId]._props.Durability = Resources.Durability;
        items[itemId]._props.MaxDurability = Resources.Durability;
        items[itemId]._props.armorClass = "10";
        items[itemId]._props.armorZone = armor;
        items[itemId]._props.headSegments = segments;
        items[itemId]._props.MaterialType = "BodyArmor";
        items[itemId]._props.ArmorMaterial = "UHMWPE";

        // Place the item into the filter for the Armband Slot
		placeable._props.filters[0].Filter.push("HShield");

        // Report to Console
        Logger.info("Holtzman Shield Mod: Cached Successfully");
    }

    createItem(i_id, i_clone, i_parent, i_path, i_lname, i_sname, i_desc, i_items, i_global)
    {
        let item = JsonUtil.clone(i_items[i_clone]);
        item._id = i_id;
        item._parent = i_parent;
        item._props.Prefab.Path = i_path;
        // add item back to database
        i_items[i_id] = item;
        // add custom item names to all languages/locales
        for (const localeID in i_global)
        {
            i_global[localeID].templates[i_id] =
            {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            };
        }
    }

    createItemHandbookEntry(i_id, i_category, i_fprice, i_handbook)
    {
        // add item to handbook
        i_handbook.push(
            {
                "Id": i_id,
                "ParentId": i_category,
                "Price": i_fprice
            }
        );
    }

    createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty, i_traders)
    {
        i_traders[i_trader].assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999999
                }
            }
        );

        // add trader cost to item
        i_traders[i_trader].assort.barter_scheme[i_id] = [
            [
                {
                    "count": i_price,
                    "_tpl": i_currency
                }
            ]
        ];

        // add trader loyalty level to item
        i_traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;

        // add item stack to fleamarket
        i_traders.ragfair.assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999
                }
            }
        );
        i_traders.ragfair.assort.loyal_level_items[i_id] = 1;
    }
}
module.exports.Holtzman = Holtzman;