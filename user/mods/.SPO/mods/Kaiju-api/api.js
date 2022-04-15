"use strict";
let debug = false;
class KaijuApi {
    static DebugCheck(Check) {
        if (Check) {
            debug = true;
        }
    }
    static DebugMessage(DebugMessage) {
        if (debug) {
            Logger.log(DebugMessage);
        }
    }
    static AddItemToSlots(NewItemID, AddWhere, ArrayIncludes) {
        const items = DatabaseServer.tables.templates.items
        const obj = {
        "modForegripArr": ["mod_foregrip"],
        "modScopeArr": ["mod_scope"],
        "modSightFrontArr": ["mod_sight_front"],
        "modSightRearArr": ["mod_sight_rear"],
        "modPistolGripArr": ["mod_pistol_grip"],
        "modMagazineArr": ["mod_magazine"],
        "modRecieverArr": ["mod_reciever"],
        "modStockArr": ["mod_stock"],
        "modChargeArr": ["mod_charge"],
        "modBarrelArr": ["mod_barrel"],
        "modHandguardArr": ["mod_handguard"],
        "modGasBlockArr": ["mod_gas_block"],
        "modLauncherArr": ["mod_launcher"],
        "modMuzzleArr": ["mod_muzzle"],
        "modTacticalArr": ["mod_tactical_000" , "mod_tactical_001" ,"mod_tactical_002" , "mod_tactical_003" , "mod_tactical_004"],
        "modMountArr": ["mod_mount_000" , "mod_mount_001" ,"mod_mount_002" , "mod_mount_003" , "mod_mount_004", "mod_mount_005", "mod_mount_006"]
        }

        let x = 0;

        const slotsArr = obj[AddWhere];

        for (const currentItem in items) {
            let item = items[currentItem]
            if (item._props.Slots && item._props.Slots.length > 0) {
                for (const slot in slotsArr) {
                    const index = (item._props.Slots.findIndex((Slots) => Slots._name === slotsArr[slot]));
                    for (const inc in ArrayIncludes){
                        if (index > -1 && item._props.Slots[index]._props.filters[0].Filter.includes(ArrayIncludes[inc])) {
                            item._props.Slots[index]._props.filters[0].Filter.push(NewItemID);
                            x++
                        }
                    }
                }
            }
        }

        if (debug) {
            Logger.log(`Item ${NewItemID} ArrayIncludes array length: ${ArrayIncludes.length}`)
            Logger.log(`Added ${NewItemID} to ${x} slots.`);
        }
    }

    static NewItemClone(ItemID, NewItemID, NewItemPrefabPath, NewItemCategory, NewItemTrader, NewItemTraderLoyalty, NewItemPrice, NewItemCurrency, NewItemDesc) {
        const items = DatabaseServer.tables.templates.items;
        const clonedItem = JsonUtil.clone(items[ItemID])
        const locales = DatabaseServer.tables.locales.global
        let traderCheck = false;
        let categoryCheck = false;
        let priceCheck;
        let loyaltyCheck;
        let NewItemPrefabPathCheck;
        let NewItemCategoryCheck;
        const tradersObj = {
            "Prapor": "54cb50c76803fa8b248b4571",
            "Therapist": "54cb57776803fa99248b456e",
            "Skier": "58330581ace78e27b8b10cee",
            "Peacekeeper": "5935c25fb3acc3127c3d8cd9",
            "Mechanic": "5a7c2eca46aef81a7ca2145d",
            "Ragman": "5ac3b934156ae10c4430e83c",
            "Jaeger": "5c0647fdd443bc2504c2d371"
        }
        const categoryObj = {
            "Ammo": "5b47574386f77428ca22b346",
            "Ammoboxes": "5b47574386f77428ca22b33c",
            "Armorvests": "5b5f701386f774093f2ecf0f",
            "Assaultcarbines": "5b5f78e986f77447ed5636b1",
            "Assaultrifles": "5b5f78fc86f77409407a7f90",
            "Assaultscopes": "5b5f740a86f77447ec5d7706",
            "Auxiliaryparts": "5b5f74cc86f77447ec5d770a",
            "Backpacks": "5b5f6f6c86f774093f2ecf0b",
            "Barrels": "5b5f75c686f774094242f19f",
            "Barteritems": "5b47574386f77428ca22b33e",
            "Bipods": "5b5f71c186f77409407a7ec0",
            "Bolt-actionrifles": "5b5f798886f77447ed5636b5",
            "Buildingmaterials": "5b47574386f77428ca22b2ee",
            "Charginghandles": "5b5f751486f77447ec5d770c",
            "Collimators": "5b5f742686f774093e6cb4ff",
            "Compactcollimators": "5b5f744786f774094242f197",
            "Containers&cases": "5b5f6fa186f77409407a7eb7",
            "Drinks": "5b47574386f77428ca22b335",
            "Electronickeys": "5c518ed586f774119a772aee",
            "Electronics": "5b47574386f77428ca22b2ef",
            "Energyelements": "5b47574386f77428ca22b2ed",
            "Facecovers": "5b47574386f77428ca22b32f",
            "Flammablematerials": "5b47574386f77428ca22b2f2",
            "Flashhiders&brakes": "5b5f724c86f774093f2ecf15",
            "Flashlights": "5b5f73ab86f774094242f195",
            "Food": "5b47574386f77428ca22b336",
            "Foregrips": "5b5f71de86f774093f2ecf13",
            "Functionalmods": "5b5f71b386f774093f2ecf11",
            "Gasblocks": "5b5f760586f774093e6cb509",
            "Gear": "5b47574386f77428ca22b33f",
            "Gearcomponents": "5b5f704686f77447ec5d76d7",
            "Gearmods": "5b5f750686f774093e6cb503",
            "Grenadelaunchers": "5b5f79d186f774093f2ed3c2",
            "Handguards": "5b5f75e486f77447ec5d7712",
            "Headsets": "5b5f6f3c86f774094242ef87",
            "Headwear&helmets": "5b47574386f77428ca22b330",
            "Householdmaterials": "5b47574386f77428ca22b2f0",
            "Infoitems": "5b47574386f77428ca22b341",
            "Injectors": "5b47574386f77428ca22b33a",
            "Injurytreatment": "5b47574386f77428ca22b339",
            "Ironsights": "5b5f746686f77447ec5d7708",
            "Keys": "5b47574386f77428ca22b342",
            "Lasertargetpointers": "5b5f73c486f77447ec5d7704",
            "Launchers": "5b5f752e86f774093e6cb505",
            "Light&laserdevices": "5b5f71de86f774093f2ecf13",
            "Machineguns": "5b5f79a486f77409407a7f94",
            "Magazines": "5b5f754a86f774094242f19b",
            "Maps": "5b47574386f77428ca22b343",
            "Marksmanrifles": "5b5f791486f774093f2ed3be",
            "Mechanicalkeys": "5c518ec986f7743b68682ce2",
            "Medicalsupplies": "5b47574386f77428ca22b2f3",
            "Medicaltreatment": "5b47574386f77428ca22b344",
            "Medkits": "5b47574386f77428ca22b338",
            "Meleeweapons": "5b5f7a0886f77409407a7f96",
            "Money": "5b5f78b786f77447ed5636af",
            "Mounts": "5b5f755f86f77447ec5d770e",
            "Muzzleadapters": "5b5f72f786f77447ec5d7702",
            "Muzzledevices": "5b5f724186f77447ed5636ad",
            "Optics": "5b5f748386f774093e6cb501",
            "Others": "5b47574386f77428ca22b2f4",
            "Pills": "5b47574386f77428ca22b337",
            "Pistolgrips": "5b5f761f86f774094242f1a1",
            "Pistols": "5b5f792486f77447ed5636b3",
            "Provisions": "5b47574386f77428ca22b340",
            "Receivers&slides": "5b5f764186f77447ec5d7714",
            "Rounds": "5b47574386f77428ca22b33b",
            "SMGs": "5b5f796a86f774093f2ed3c0",
            "Securedcontainers": "5b5f6fd286f774093f2ecf0d",
            "Shotguns": "5b5f794b86f77409407a7f92",
            "Sights": "5b5f73ec86f774093e6cb4fd",
            "SpecialEquipment": "5b4391a586f7745321235ab2",
            "Specialsights": "5b5f749986f774094242f199",
            "Stocks&chassis": "5b5f757486f774093e6cb507",
            "Suppressors": "5b5f731a86f774093e6cb4f9",
            "Tacticalcombodevices": "5b5f737886f774093e6cb4fb",
            "Tacticalrigs": "5b5f6f8786f77447ed563642",
            "Throwables": "5b5f7a2386f774093f2ed3c4",
            "Tools": "5b47574386f77428ca22b2f6",
            "Valuables": "5b47574386f77428ca22b2f1",
            "Visors": "5b47574386f77428ca22b331",
            "Vitalparts": "5b5f75b986f77447ec5d7710",
            "Weaponparts&mods": "5b5f71a686f77447ed5636ab",
            "Weapons": "5b5f78dc86f77409407a7f8e"
        }
        const currencyDict = { //CoreMod Line
            "RUB": "5449016a4bdc2d6f028b456f", //CoreMod Line
            "USD": "5696686a4bdc2da3298b456a", //CoreMod Line
            "EUR": "569668774bdc2da2298b4568", //CoreMod Line
            "SHELL": "5d0379a886f77420407aa271"
        }; 

        if (debug) {
            Logger.log(``)
            Logger.log(``)
            Logger.log(`------------------------------------------------------------`)
            Logger.log(`${NewItemID} Debug`)
            Logger.log(``)
        }

        if (NewItemDesc.length < 3 && debug) {
            Logger.log(`Locale of ${NewItemID} has missing items`);
        }

        if (NewItemPrefabPath === undefined && debug) {
            Logger.log(`No prefab path detected for ${NewItemID}`);
        }

        if (NewItemPrefabPath < 1) {
            NewItemPrefabPathCheck = items[ItemID]._props.Prefab.path;
            if (debug) {
                Logger.debug(`Prefab path for ${NewItemID} was set to ${items[ItemID]._props.Prefab.path} path because none was provided`);
            }
        } else {
            NewItemPrefabPathCheck = NewItemPrefabPath;
            if (debug) {
                Logger.log(`Prefab path for ${NewItemID} was set to ${NewItemPrefabPathCheck}`);
            }
        }
        
        for (const traders in tradersObj) {
            if (tradersObj[NewItemTrader] === tradersObj[traders]) {
                traderCheck = true;
            }
        }

        if (traderCheck === false) {
            NewItemTrader = "Peacekeeper";
            if (debug) {
                Logger.debug(`Trader for ${NewItemID} was set to Peacekeeper because no trader was provided`)
            }
        } else if (debug) {
            Logger.log(`Trader ${NewItemTrader} found for ${NewItemID}`);
        }

        for (const category in categoryObj) {
            if (categoryObj[NewItemCategory] === categoryObj[category]) {
                NewItemCategoryCheck = categoryObj[category];
                categoryCheck = true;
            }
        }

        if (categoryCheck === false && debug) {
            Logger.debug(`Category ${NewItemCategory} Doesn't exist for ${NewItemID}`);
        } else if (categoryCheck === true && debug) {
            Logger.log(`Category ${NewItemCategory} found for ${NewItemID}`);
        }

        if (NewItemPrice.length < 1) {
            priceCheck = items[ItemID]._props.CreditsPrice;
            if (debug) {
                Logger.debug(`Price for ${NewItemID} was set to ${priceCheck} because none was provided`);
            }
        } else {
            priceCheck = NewItemPrice;
            if (debug) {
                Logger.log(`Price for ${NewItemID} was set to ${priceCheck} because NewItemPrice: ${NewItemPrice} was provided`);
            }
        }

        if (NewItemTraderLoyalty === 1 || NewItemTraderLoyalty === 2 || NewItemTraderLoyalty === 3 || NewItemTraderLoyalty === 4) {
            loyaltyCheck = NewItemTraderLoyalty;
            if (debug) {
                Logger.log(`Loyalty for ${NewItemID} was set to ${loyaltyCheck} because ${NewItemTraderLoyalty} was provided`);
            } 
        } else {
            loyaltyCheck = 1;
            if (debug) {
                Logger.debug(`Loyalty for ${NewItemID} was set to ${loyaltyCheck} because NONE was provided`);
            }
        }

        //CreateNewItem
        items[NewItemID] = clonedItem //CoreMod Line
        items[NewItemID]._id = NewItemID //CoreMod Line
        
        //CreateTraderAssort
        DatabaseServer.tables.traders[tradersObj[NewItemTrader]].assort.items.push({ //CoreMod Line
            "_id": NewItemID, //CoreMod Line
            "_tpl": NewItemID, //CoreMod Line
            "parentId": "hideout", //CoreMod Line
            "slotId": "hideout", //CoreMod Line
            "upd": { //CoreMod Line
                "UnlimitedCount": true, //CoreMod Line
                "StackObjectsCount": 999999 //CoreMod Line
            }
        })

        DatabaseServer.tables.traders[tradersObj[NewItemTrader]].assort.barter_scheme[NewItemID] = [[{ "count": priceCheck, "_tpl": currencyDict[NewItemCurrency] }]] //CoreMod Line
        DatabaseServer.tables.traders[tradersObj[NewItemTrader]].assort.loyal_level_items[NewItemID] = loyaltyCheck //CoreMod Line
        
        //Name, Prefab, flea
        items[NewItemID]._props.Name = NewItemID;
        items[NewItemID]._props.Prefab.path = NewItemPrefabPathCheck;
        DatabaseServer.tables.templates.handbook.Items.push({
            "Id": NewItemID,
            "ParentId": NewItemCategoryCheck,
            "Price": priceCheck
        });

        //CreateNewItemLocale
        for(const lang in DatabaseServer.tables.locales.global){ //CoreMod Line
            locales[lang].templates[NewItemID] = { //CoreMod Line
                "Name": NewItemDesc[0], //CoreMod Line
                "ShortName": NewItemDesc[1], //CoreMod Line
                "Description": NewItemDesc[2] //CoreMod Line
            }
        };
    }
}
module.exports = KaijuApi