/*
エレシュキガル
Spaceman
*/



"use strict";

class CoreMod
{
    /**
     * Creates a simple clone of an item that only has the prefab changed
     * @param {String} idToClone The id of the item to clone
     * @param {String} newID The id of the new item
     * @param {String} parent The parent id of the new item
     * @param {String} newPath The new prefab path to use for the new item
     */
    static CreateNewItem(idToClone, newID, parent, newPath)
    {
        const items = DatabaseServer.tables.templates.items;
        const clonedItem = JsonUtil.clone(items[idToClone]);

        items[newID] = clonedItem;
        items[newID]._id = newID;
        if (parent)
        {
            items[newID]._parent = parent;
        }

        if (newPath)
        {
            items[newID]._props.Prefab.path = newPath;
        }
    }

    /**
     * Change the value of one property of an item
     * @param {String} id The id of the item
     * @param {*} data The property to change
     * @param {*} value The new value of the property
     */
    static EditSimpleItemData(id, data, value)
    {
        const items = DatabaseServer.tables.templates.items;
        items[id]._props[data] = value;
    }

    /**
     *
     * @param {String} id The Id of the item
     * @param {*} name The name of the array
     * @param {*} value The new value
     * @param {String} type add/remove/empty/replace
     * @param {*} newValue Only used if type == "replace"
     */
    static EditItemArray(id, name, value, type, newValue)
    {
        const items = DatabaseServer.tables.templates.items;
        const itemProps = items[id]._props[name];

        switch (type)
        {

            case "add":
                if (!itemProps[value])
                {
                    itemProps.push(value);
                }
                else
                {
                    Logger.error(`[CoreMod-Error] The following value: ${value} already exists in the given array: ${name}`);
                }
                break;

            case "remove":
                const index = itemProps.findIndex(e => (e === value));
                if (index != -1)
                {
                    if (index != 0)
                    {
                        itemProps.splice(index, index);
                    }
                    else
                    {
                        itemProps.splice(index, 1);
                    }
                }
                else
                {
                    Logger.error(`[CoreMod-Error] Your provided value: ${value} does not exist in the given array: ${name}`);
                }
                break;

            case "empty":
                if (itemProps.length > 0)
                {
                    itemProps = [];
                }
                else
                {
                    Logger.error(`[CoreMod-Error] You can't empty following array: ${name} because it is already empty.`);
                }
                break;

            case "replace":
                if (newValue)
                {
                    if (itemProps[value])
                    {
                        itemProps[value] = newValue;
                    }
                }
                else
                {
                    Logger.error("[CoreMod-Error] newValue param is empty for EditItemArray. Please fill the param to get this function to work.");
                }
                break;
        }
    }


    static EditItemObject(id, name, value, type, newValue)
    {
        const items = DatabaseServer.tables.templates.items;
        switch (type)
        {
            default:
                break;
            case "add":
                if (!items[id]._props[name][value])
                {
                    items[id]._props[name].push(value);
                }
                else
                {
                    Logger.error("[CoreMod-Error] The following value: " + value + " already exists in the given object: " + name);
                }
                break;
            case "remove":
                const index = items[id]._props[name].findIndex(e => (e === value));
                if (index != -1)
                {
                    if (index != 0)
                    {
                        items[id]._props[name].splice(index, index);
                    }
                    else
                    {
                        items[id]._props[name].splice(index, 1);
                    }
                }
                else
                {
                    Logger.error("[CoreMod-Error] Your provided value: " + value + " does not exist in the given object: " + name);
                }
                break;
            case "empty":
                if (items[id]._props[name].length > 0)
                {
                    items[id]._props[name] = [];
                }
                else
                {
                    Logger.error("[CoreMod-Error] You can't empty following object: " + name + " because it is already empty.");
                }
                break;
            case "replace":
                if (newValue)
                {
                    if (items[id]._props[name][value] !== undefined)
                    {
                        items[id]._props[name][value] = newValue;
                    }
                }
                else
                {
                    Logger.error("[CoreMod-Error] newValue param is empty for EditItemObject. Please fill the param to get this function to work.");
                }
                break;
        }
    }

    /**
     * Adds the provided item id to the handbook
     * @param {String} id The item id
     * @param {String} category The category of the item https://docs.sp-tarkov.com/#resources/other.md
     * @param {Number} price The price in RUB of the item on the flea
     */
    static CreateHandbookItem(id, category, price)
    {

        const handbook = DatabaseServer.tables.templates.handbook;

        handbook.Items.push({
            "Id": id,
            "ParentId": category,
            "Price": price
        });
    }

    /**
     * Creates a new locale for a mail message
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The id of the message
     * @param {String} text The text the message contains
     */
    static CreateNewMailLocale(lang, id, text)
    {
        const locales = DatabaseServer.tables.locales.global;

        locales[lang].mail[id] = text;
    }

    /**
     * Creates a locale for the quest message
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The id of the quest
     * @param {String} name The name of the quest
     * @param {String} desc The description of the quest
     * @param {String} note The note of the quest
     * @param {String} fail The fail message of the quest
     * @param {String} started The started message of the quest
     * @param {String} success The success message of the quest
     * @param {String} loc The location of the quest
     */
    static CreateNewQuestLocale(lang, id, name, desc, note, fail, started, success, loc)
    {
        const locales = DatabaseServer.tables.locales.global;

        locales[lang].quest[id] = {
            "name": name,
            "description": desc,
            "note": note,
            "failMessageText": fail,
            "startedMessageText": started,
            "successMessageText": success,
            "conditions": {},
            "location": loc
        };
    }

    /**
     * Creates a locale for the quest condition
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The id of the quest
     * @param {String} condID The id of the quest's condtion
     * @param {String} text The text of the conditon
     */
    static CreateQuestConditionLocale(lang, id, condID, text)
    {
        const locales = DatabaseServer.tables.locales.global;

        locales[lang].quest[id].conditions[condID] = text;
    }

    /**
     *
     * Creates a locale for the provided item
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The item to provide a locale for
     * @param {String} name The name of the item
     * @param {String} shortname The short name of the item
     * @param {String} desc The description of the item
     */
    static CreateNewItemLocale(lang, id, name, shortname, desc)
    {
        const locales = DatabaseServer.tables.locales.global;
        locales[lang].templates[id] = {
            "Name": name,
            "ShortName": shortname,
            "Description": desc
        };
    }

    /**
     * Creates a locale for an item category
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The item category to provide a locale for
     * @param {String} data The name of the categoy
     */
    static CreateNewHandbookLocale(lang, id, data)
    {
        const locales = DatabaseServer.tables.locales.global;
        locales[lang].handbook[id] = data;
    }

    /**
     * Creates a locale for the provided customization
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The customization id
     * @param {String} name The name of the customization
     * @param {String} short The short name of the customization
     * @param {String} desc The description of the customization
     */
    static CreateNewCustomizationLocale(lang, id, name, short, desc)
    {
        const locales = DatabaseServer.tables.locales.global;
        locales[lang].customization[id] = {
            "Name": name,
            "ShortName": short,
            "Description": desc
        };
    }

    /**
     * Creates a locale for the provided location/map
     * @param {*} lang The id of the locale ex. "en"
     * @param {*} id The id of the location/map
     * @param {*} name The name of the location/map
     * @param {*} desc The description of the location/map
     */
    static CreateNewLocationLocale(lang, id, name, desc)
    {
        const locales = DatabaseServer.tables.locales.global;

        locales[lang].handbook[id] = {
            "Name": name,
            "Description": desc
        };
    }

    /**
     * Creates a locale for the provided trader
     * @param {String} lang The id of the locale ex. "en"
     * @param {String} id The id of the trader
     * @param {String} full The full name of the trader
     * @param {String} first The first name of the trader
     * @param {String} nick The nick name of the trader
     * @param {String} loc The location of the trader
     * @param {String} desc The description fo the trader
     */
    static CreateNewTraderLocale(lang, id, full, first, nick, loc, desc)
    {
        const locales = DatabaseServer.tables.locales.global;

        locales[lang].trading[id] = {
            "FullName": full,
            "FirstName": first,
            "Nickname": nick,
            "Location": loc,
            "Description": desc
        };
    }

    static CreateTraderAssortUnlock(id, type, assortID, questID)
    {
        const traders = DatabaseServer.tables.traders;

        traders[id].questassort[type][assortID] = questID;
    }

    static EditTraderAssortUnlock(id, type, remove, assortID, questID)
    {
        const traders = DatabaseServer.tables.traders;

        if (remove)
        {
            delete traders[id].questassort[type][assortID];
        }
        else
        {
            traders[id].questassort[type][assortID] = questID;
        }
    }
    /**
     * Creates the provided item to the trader along with the barter and the loyalty
     * @param {String} id The id of the trade
     * @param {String} tpl The id of the item
     * @param {String} traderID The id of the trader
     * @param {Number} price The price of the item
     * @param {String} currency The currency used to buy the item ex. "RUB"
     * @param {Number} loyalty The loyalty level required to purchased
     * @param {Boolean} [unlimited=true] If the item is sold in unlimited quantities
     * @param {Number} [objectCount=999999] The quantitiy of the item to sell
     * @param {Number} [quantityMax] The maximum of available purchase in one restock
     */
    static CreateTraderAssort(id, tpl, traderID, price, currency, loyalty, unlimited = true, objectCount = 999999, quantityMax)
    {
        const traders = DatabaseServer.tables.traders;
        if (quantityMax)
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount,
                    "BuyRestrictionMax": quantityMax,
                    "BuyRestrictionCurrent": 0
                }
            });
        }
        else
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount
                }
            });
        }

        var currencyDict = {
            "GEIGER": "5672cb724bdc2dc2088b456b",
            "GAS": "590a3efd86f77437d351a25b",
            "PARA": "5c12688486f77426843c7d32",
            "TOOL": "590c2e1186f77425357b6124",
            "RUB": "5449016a4bdc2d6f028b456f",
            "EUR": "569668774bdc2da2298b4568",
            "USD": "5696686a4bdc2da3298b456a"
        };
        traders[traderID].assort.barter_scheme[id] = [
            [{
                "count": price,
                "_tpl": currencyDict[currency]
            }]
        ];
        traders[traderID].assort.loyal_level_items[id] = loyalty;
    }

    /**
     * Creates the provided item to the trader along with the barter and the loyalty
     * @param {String} id The id of the trade
     * @param {String} presetID The id of the preset in globals.json
     * @param {String} traderID The id of the trader
     * @param {Number} price The price of the item
     * @param {String} currency The currency used to buy the item ex. "RUB"
     * @param {Number} loyalty The loyalty level required to purchased
     * @param {Boolean} [unlimited=true] If the item is sold in unlimited quantities
     * @param {Number} [objectCount=999999] The quantitiy of the item to sell
     * @param {Number} [quantityMax] The maximum of available purchase in one restock
     */
    static CreateTraderAssortWithPreset(id, presetID, traderID, price, currency, loyalty, unlimited = true, objectCount = 999999, quantityMax)
    {
        const traders = DatabaseServer.tables.traders;
        const globalsPresets = DatabaseServer.tables.globals.ItemPresets;

        if (quantityMax)
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": globalsPresets[presetID]._items[0]._tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount,
                    "BuyRestrictionMax": quantityMax,
                    "BuyRestrictionCurrent": 0
                }
            });
        }
        else
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": globalsPresets[presetID]._items[0]._tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount
                }
            });
        }
        var currencyDict = {
            "RUB": "5449016a4bdc2d6f028b456f",
            "EUR": "569668774bdc2da2298b4568",
            "USD": "5696686a4bdc2da3298b456a"
        };
        traders[traderID].assort.barter_scheme[id] = [
            [{
                "count": price,
                "_tpl": currencyDict[currency]
            }]
        ];
        traders[traderID].assort.loyal_level_items[id] = loyalty;

        const presetItems = ItemHelper.replaceIDs(null, globalsPresets[presetID]._items);
        for (const preset in presetItems)
        {

            const newBarter = {
                "_id": presetItems[preset]._id,
                "_tpl": presetItems[preset]._tpl,
                "parentId": presetItems[preset].parentId,
                "slotId": presetItems[preset].slotId,
            };

            if (newBarter.parentId === presetItems[0]._id)
            {
                newBarter.parentId = id;
            }

            if (newBarter.slotId !== undefined)
            {
                traders[traderID].assort.items.push(newBarter);
            }
        }
    }




    /**
     * Creates a barter trade for the item
     * @param {String} id The id of the trade
     * @param {String} tpl The id of the item
     * @param {String} parentID The parent id of the item
     * @param {String} slotID The slot name of the item
     * @param {*} barter The barter scheme for the trade
     * @param {String} traderID The id of the trader
     * @param {Number} loyalty The loyalty level required to purchased
     * @param {Boolean} [unlimited=true] If the item is sold in unlimited quantities
     * @param {Number} [objectCount=999999] The quantitiy of the item to sell
     * @param {Number} [quantityMax] The maximum of available purchase in one restock
     */
    static CreateTraderBarter(id, tpl, parentID = "hideout", slotID = "hideout", barter, traderID, loyalty, unlimited = true, objectCount = 999999, quantityMax)
    {
        const traders = DatabaseServer.tables.traders;
        if (quantityMax)
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": tpl,
                "parentId": parentID,
                "slotId": slotID,
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount,
                    "BuyRestrictionMax": quantityMax,
                    "BuyRestrictionCurrent": 0
                }
            });
        }
        else
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": tpl,
                "parentId": parentID,
                "slotId": slotID,
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount
                }
            });
        }
        traders[traderID].assort.barter_scheme[id] = barter;
        traders[traderID].assort.loyal_level_items[id] = loyalty;
    }

    /**
     * Creates a barter trade for the item
     * @param {String} id The id of the trade
     * @param {String} presetID The id of the item
     * @param {String} parentID The parent id of the item
     * @param {String} slotID The slot name of the item
     * @param {*} barter The barter scheme for the trade
     * @param {String} traderID The id of the trader
     * @param {Number} loyalty The loyalty level required to purchased
     * @param {Boolean} [unlimited=true] If the item is sold in unlimited quantities
     * @param {Number} [objectCount=999999] The quantitiy of the item to sell
     * @param {Number} [quantityMax] The maximum of available purchase in one restock
     */
    static CreateTraderBarterWithPreset(id, presetID, parentID, slotID, barter, traderID, loyalty, unlimited = true, objectCount = 999999, quantityMax)
    {
        const traders = DatabaseServer.tables.traders;
        const globalsPresets = DatabaseServer.tables.globals.ItemPresets;

        if (quantityMax)
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": globalsPresets[presetID]._items[0]._tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount,
                    "BuyRestrictionMax": quantityMax,
                    "BuyRestrictionCurrent": 0
                }
            });
        }
        else
        {
            traders[traderID].assort.items.push({
                "_id": id,
                "_tpl": globalsPresets[presetID]._items[0]._tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": unlimited,
                    "StackObjectsCount": objectCount
                }
            });
        }
        traders[traderID].assort.barter_scheme[id] = barter;
        traders[traderID].assort.loyal_level_items[id] = loyalty;

        const presetItems = ItemHelper.replaceIDs(null, globalsPresets[presetID]._items);
        for (const preset in presetItems)
        {

            const newBarter = {
                "_id": presetItems[preset]._id,
                "_tpl": presetItems[preset]._tpl,
                "parentId": presetItems[preset].parentId,
                "slotId": presetItems[preset].slotId,
            };

            if (newBarter.parentId === presetItems[0]._id)
            {
                newBarter.parentId = id;
            }

            if (newBarter.slotId !== undefined)
            {
                traders[traderID].assort.items.push(newBarter);
            }
        }
    }

    /**
     * Remove an assort from the traer
     * @param {Stirng} traderID The id of the trader
     * @param {String} assortID The id of the assort
     */
    static RemoveTraderAssort(traderID, assortID)
    {
        const traders = DatabaseServer.tables.traders;

        delete traders[traderID].assort[assortID];
        delete traders[traderID].assort.barter_scheme[assortID];
        delete traders[traderID].assort.loyal_level_items[assortID];
    }

    /*
    static function CreateHideoutModule(type, oldID, newID) {
        if (type === "area") {
            const Area = JsonUtil.clone(hideout.areas[oldID])
            hideout.areas[newID] = Area
        } else if (type === "production") {
            const prod = JsonUtil.clone(hideout.production[oldID])
            hideout.production[newID] = prod
        } else if (type === "scavcase") {
            const recipe = JsonUtil.clone(hideout.scavcase[oldID])
            hideout.scavcase[newID] = recipe
        }
    }

    static function EditHideoutModule(type, id, data, value) {
        if (type === "area") {
            for(const zones in hideout.area){
                if(hideout.area[zones]._id === id){
                    const zone = hideout.area[zones]

                }
            }

        } else if (type === "production") {} else if (type === "scavcase") {}
    }*/

    /**
     * Creates a new trader
     * @param {String} newID The id of the trader
     * @param {Boolean} enabled If The trader is enabled by default
     * @param {String} avatar The path to the trader's avatar
     * @param {String} currency The id of the currency the trader buys thing in
     */
    static CreateNewTrader(newID, enabled, avatar, currency)
    {
        const traders = DatabaseServer.tables.traders;
        const NewTrader = JsonUtil.clone(traders["ragfair"]);

        NewTrader.base._id = newID;
        if (enabled)
        {
            NewTrader.base.working = enabled;
        }

        if (avatar)
        {
            NewTrader.base.avatar = avatar;
        }

        if (currency)
        {
            NewTrader.base.currency = currency;
        }
        NewTrader.questassort = {
            "started": {},
            "success": {},
            "fail": {}
        };
        NewTrader.assort = {
            "items": [],
            "barter_scheme": {},
            "loyal_level_items": {}
        };

        return NewTrader;

    }

    /**
     * Edits the property of a trader
     * @param {String} id The id of the trader
     * @param {String} param The property of the trader to edit
     * @param {*} value The new value of the property
     */
    static EditTraderParams(id, param, value)
    {
        const traders = DatabaseServer.tables.traders;

        traders[id].base[param] = value;
    }

    /**
     * Creates/edits a trader loyalty level requirements
     * @param {String} id The id of the trader
     * @param {Number} level The loyalty level to edit
     * @param {Number} minLvl The minimum player level required to reach this level
     * @param {Number} minSls The minimum sales required represented in the traders currency
     * @param {Number} minStand The minimum standing required to reach this level
     */
    static EditTraderLL(id, level, minLvl, minSls, minStand)
    {
        const traders = DatabaseServer.tables.traders;

        traders[id].base.loyaltyLevels[level] = {
            "minLevel": minLvl,
            "minSalesSum": minSls,
            "minStanding": minStand
        };
    }

    /**
     * Edits the properties of the traders isurance offering
     * @param {String} id The id of the trader
     * @param {Boolean} available if insurance is availible from The trader
     * @param {Number} minPay
     * @param {Number} minReturn The minimum amount of time the trader will take to return the items in hours
     * @param {Number} maxReturn The maximum amount of time the trader will take to return the items in hours
     * @param {Number} maxStorage The maximum amount of items the trader will store in insurance
     * @param {String} excluded The item categories or item ids that cannot be insured by this trader
     */
    static EditTraderInsurance(id, available, minPay, minReturn, maxReturn, maxStorage, excluded)
    {
        const traders = DatabaseServer.tables.traders;

        traders[id].base.insurance = {
            "availability": available,
            "min_payment": minPay,
            "min_return_hour": minReturn,
            "max_return_hour": maxReturn,
            "max_storage_time": maxStorage,
            "excluded_category": excluded
        };
    }

    /**
     * Searches the item for the slot with the name and returns the index
     * @param {String} itemId The id of the item to search
     * @param {String} slotName The name of the slot
     * @returns {Number} The index of the slot
     */
    static FindSlotIndex(itemId, slotName)
    {
        const database = DatabaseServer.tables;
        const items = database.templates.items;
        var i = 0;
        for (const slot in items[itemId]._props.Slots)
            if (items[itemId]._props.Slots[slot]._name == slotName)
            {
                return i;
            }
            else
            {
                i++;
            }
        Logger.error(`ERROR: ${slotName} not found in ${itemId}`);
        return null;
    }

    /**
     * Add an item to the slot filter of another item
     * @param {String} parentItemId The id of the item which contains the slot
     * @param {String} childItemID The id of the item to add to the filter
     * @param {Number} slotIndex The index of the slot
     */
    static AddItemSlotFilter(itemID, childItemID, slot)
    {
        const items = DatabaseServer.tables.templates.items;

        if (!items[itemID]._props.Slots[slot]._props.filters[0].Filter[childItemID])
        {
            items[itemID]._props.Slots[slot]._props.filters[0].Filter.push(childItemID);
        }
    }

    /**
     * Adds an item to the grid filter of another item
     * @param {String} parentItemId The id of the item which contains the slot
     * @param {String} childItemID The id of the item to add to the filter
     * @param {Number} gridIndex The index of the grid with a filter
     */
    static AddItemGridsFilter(itemID, childItemID, grid)
    {
        const items = DatabaseServer.tables.templates.items;

        if (!items[itemID]._props.Grids[grid]._props.filters[0].Filter[childItemID])
        {
            items[itemID]._props.Grids[grid]._props.filters[0].Filter.push(childItemID);
        }
    }

    /**
     * Adds The child item to The cartrige filter of The parent item
     * @param {String} parentItemID The magazine
     * @param {String} childItemID The ammo to add to The magazine
     */
    static AddCartridgesFilter(parentItemID, childItemID)
    {
        const items = DatabaseServer.tables.templates.items;

        if (!items[parentItemID]._props.Cartridges[0]._props.filters[0].Filter[childItemID])
        {
            items[parentItemID]._props.Cartridges[0]._props.filters[0].Filter.push(childItemID);
        }
    }

    /**
     * Adds The child item to The chamber filter of The parent item
     * @param {String} parentItemID The gun
     * @param {String} childItemID The ammo to add to The gun
     */
    static AddChamberFilter(parentItemID, childItemID)
    {
        const items = DatabaseServer.tables.templates.items;

        if (!items[parentItemID]._props.Chambers[0]._props.filters[0].Filter[childItemID])
        {
            items[parentItemID]._props.Chambers[0]._props.filters[0].Filter.push(childItemID);
        }
    }

    /**
     * Checks if The child item is already in the slot filter of the parent item
     * @param {String} parentItemID The parent which contains the slot
     * @param {String} childItemID The item which is to be check if in the slot filter
     * @param {Number} slotIndex The index of the slot to be checked
     * @returns {Boolean} If the item is in the slot filter
     */
    static IsItemAlreadyInSlotFilter(parentItemID, childItemID, slotIndex)
    {
        const items = DatabaseServer.tables.templates.items;

        if (items[parentItemID]._props.Slots[slotIndex]._props.filters[0].Filter[childItemID])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Checks if the child item is already in the grid filter of the parent item
     * @param {String} parentItemID The parent which contains the grid
     * @param {String} childItemID The item which is to be check if in the grid filter
     * @param {Number} gridIndex the index of the grid to be checked
     * @returns {Boolean} If the item is in the grid filter
     */
    static IsItemAlreadyInGridsFilter(itemID, itemID2, gridIndex)
    {
        const items = DatabaseServer.tables.templates.items;

        if (items[itemID]._props.Grids[gridIndex]._props.filters[0].Filter[itemID2])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Checks if the child item is already in the cartrige filter of the parent item
     * @param {String} parentItemID The parent which contains the cartrige
     * @param {String} childItemID The item which is to be check if in the cartrige filter
     * @returns {Boolean} If the item is in the cartrige filter
     */
    static IsItemAlreadyInCartridgeFilter(parentItemID, childItemID)
    {
        const items = DatabaseServer.tables.templates.items;

        if (items[parentItemID]._props.Cartridges[0]._props.filters[0].Filter[childItemID])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Checks if the child item is already in the chamber filter of the parent item
     * @param {String} parentItemID The parent which contains the chamber
     * @param {String} childItemID The item which is to be check if in the chamber filter
     * @returns {Boolean} If the item is in the chamber filter
     */
    static IsItemAlreadyInChamberFilter(parentItemID, childItemID)
    {
        const items = DatabaseServer.tables.templates.items;

        if (items[parentItemID]._props.Chambers[0]._props.filters[0].Filter[childItemID])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Adds equipment to The bot loadout
     * @param {String} type The type of equipment to add ex. "Headwear"
     * @param {String} id The id of The equipment to add
     * @param {String} bot The role of The bot to modify ex. "pmcbot"
     */
    static AddEquipmentToLoadout(type, id, bot)
    {
        const items = DatabaseServer.tables.templates.items;
        const bots = DatabaseServer.tables.bots.types;

        bots[bot].inventory.equipment[type].push(id);

        if(items[id] && items[id]._props && items[id]._props.Slots)
        {
            for (const slots in items[id]._props.Slots)
            {
                if (!bots[bot].inventory.mods[id])
                {
                    bots[bot].inventory.mods[id] = new Object();
                }
                let slot = items[id]._props.Slots[slots];
                bots[bot].inventory.mods[id][slot._name] = slot._props.filters[0].Filter;

                for (const FirstFilters in slot._props.filters[0].Filter)
                {
                    let id2 = slot._props.filters[0].Filter[FirstFilters];

                    //We need to add mags
                    if (items[id2]._parent === "5448bc234bdc2d3c308b4569")
                    {
                        if (!bots[bot].inventory.mods[id2])
                        {
                            bots[bot].inventory.mods[id2] = new Object();
                        }
                        let mag = items[id2];
                        bots[bot].inventory.mods[id2][mag._props.Cartridges[0]._name] = mag._props.Cartridges[0]._props.filters[0].Filter;
                    }

                    for (const slots2 in items[id2]._props.Slots)
                    {
                        if (!bots[bot].inventory.mods[id2])
                        {
                            bots[bot].inventory.mods[id2] = new Object();
                        }
                        let slot2 = items[id2]._props.Slots[slots2];
                        bots[bot].inventory.mods[id2][slot2._name] = slot2._props.filters[0].Filter;

                        for (const SecondFilters in slot2._props.filters[0].Filter)
                        {
                            let id3 = slot2._props.filters[0].Filter[SecondFilters];
                            for (const slots3 in items[id3]._props.Slots)
                            {
                                if (!bots[bot].inventory.mods[id3])
                                {
                                    bots[bot].inventory.mods[id3] = new Object();
                                }
                                let slot3 = items[id3]._props.Slots[slots3];
                                bots[bot].inventory.mods[id3][slot3._name] = slot3._props.filters[0].Filter;

                                for (const ThirdFilters in slot3._props.filters[0].Filter)
                                {
                                    let id4 = slot3._props.filters[0].Filter[ThirdFilters];
                                    for (const slots4 in items[id4]._props.Slots)
                                    {
                                        if (!bots[bot].inventory.mods[id4])
                                        {
                                            bots[bot].inventory.mods[id4] = new Object();
                                        }
                                        let slot4 = items[id4]._props.Slots[slots4];
                                        bots[bot].inventory.mods[id4][slot4._name] = slot4._props.filters[0].Filter;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    static AddNewSpawnPoint(id, map, x, y, z, rot, sides, categories, infill, BotZone)
    {
        const maps = DatabaseServer.tables.locations;
        const NewSpawn = {
            "Id": id,
            "Position": {
                "x": x,
                "y": y,
                "z": z
            },
            "Rotation": rot,
            "Sides": sides,
            "Categories": categories,
            "Infiltration": infill,
            "DelayToCanSpawnSec": 5,
            "ColliderParams": {
                "_parent": "SpawnSphereParams",
                "_props": {
                    "Center": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    "Radius": 20
                }
            },
            "BotZoneName": BotZone
        };
        maps[map].base.SpawnPointParams.push(NewSpawn);
    }


    static ChangeBotEquipmentChances(role, node, property, value)
    {
        const database = DatabaseServer.tables;
        const bots = database.bots.types;
        bots[role].chances[node][property] = value;
    }


    /**
     * Check if The provided mod exists
     * @param {String} modName
     * @returns {Boolean}
     */
    static DoesModExist(modName)
    {
        if (ModLoader.mods[modName])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Check if The provided mod is loaded
     * @param {String} modName
     * @returns {Boolean}
     */
    static IsModLoaded(modName)
    {
        if (ModLoader.onLoad[modName])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    static GenerateRandomQuest(maxMoneyRewards = 5000, maxExperienceReward = 5000, MaximumItemsRewards = 2, MaximumRewards = 1, MaximumStandingRewards = 1.0, MaximumOjectives = 2, MaximumKillsNeeded = 10, FoundInRaidObjectives = false)
    {
        const template = require("../data/quest.json");
        const objectives = require("../data/ojectives.json");
        const text = require("../data/texts.json");
        const items = DatabaseServer.tables.templates.items;
        /* To-do
        Générer plusieurs objectifs aléatoires
        Vérifier si la quête est spécifique à une map
        Vérifier si la quête est spécifique à un endroit sur une map
        Quels objectifs sont utilisable et peuvent être aléatoire générer ?
        Donner les bons objectives en fonction du type, ou alors osef ?

        */
        let quest = {};

        //Insert quest template
        const questID = HashUtil.generate();
        quest[questID] = template.QuestTemplate;
        quest[questID][0]._id = questID;
        quest[questID][0].location = RandomUtil.getKey(template.LocationList);
        quest[questID][0].traderId = RandomUtil.getKey(template.TraderList);
        quest[questID][0].type = RandomUtil.getKeyValue(template.TypeList);
        let successRewards = quest[questID][0].rewards.Success;
        let finishConditions = quest[questID][0].conditions.AvailableForFinish;
        let availableConditions = quest[questID][0].conditions.AvailableForStart;

        //Generating rewards
        for (let i = 0; i < RandomUtil.getIntEx(MaximumRewards); i++)
        {
            //Roll rewards
            const hash = HashUtil.generate();
            switch (RandomUtil.getKey(template.RewardTypes))
            {
                case "Money":
                    //Generate money as reward
                    const curr = RandomUtil.getKey(template.CurrencyList);
                    let count = RandomUtil.getIntEx(maxMoneyRewards);
                    if (curr !== "5449016a4bdc2d6f028b456f")
                    {
                        count = PlzRefactorMeHelper.fromRUB(count, curr);
                    }
                    const currrewardProp = this.GenerateQuestRewardProperty(count.toString(), hash, "Item", i, this.GenerateItemObject(curr, count, RandomUtil.getBool()), RandomUtil.getBool());

                    successRewards.push(currrewardProp);

                    break;
                case "Item":
                    //Generate an item as reward
                    const ItemCount = RandomUtil.getIntEx(MaximumItemsRewards);
                    successRewards.push(this.GenerateQuestRewardProperty(ItemCount.toString(), hash, "Item", i, this.GenerateItemObject(RandomUtil.getKey(items), ItemCount, RandomUtil.getBool()), RandomUtil.getBool()));

                    break;
                case "Experience":
                    //Generate Experience as reward
                    const exp = RandomUtil.getIntEx(maxExperienceReward);
                    //I need to find a way to avoid the execution if a Experience reward is already in there
                    successRewards.push(this.GenerateQuestRewardProperty(exp.toString(), hash, "Experience", i, undefined, false));

                    break;
                case "Standing":
                    //Generate Standing as reward
                    //Should the reward be negative or positive ?
                    const isPos = RandomUtil.getBool();
                    const randomFloat = RandomUtil.getFloat(0, MaximumStandingRewards).toFixed(2);
                    if (isPos)
                    {
                        successRewards.push(this.GenerateQuestRewardProperty(randomFloat.toString(), hash, "TraderStanding", i, undefined, false, RandomUtil.getKey(template.TraderList)));

                    }
                    else
                    {
                        const negReward = -Math.abs(randomFloat);
                        successRewards.push(this.GenerateQuestRewardProperty(negReward.toString(), hash, "TraderStanding", i, undefined, false, RandomUtil.getKey(template.TraderList)));
                    }

                    break;
            }

        }
        //End of reward generation

        //Conditions generation
        //Welcome in Hell, may your soul be ready to see the below code

        //Generation start conditions
        const operators = ["<", ">", "=", "<=", ">=", ];
        let startCondition = objectives["Start conditions"]["Level Condition"];
        startCondition._props.compareMethod = RandomUtil.getKeyValue(operators);
        startCondition._props.value = RandomUtil.getIntEx(69).toString();
        startCondition._props.id = HashUtil.generate();
        if (startCondition._props.compareMethod === "<" && startCondition._props.value === 1)
        {
            startCondition._props.value = RandomUtil.getIntEx(69).toString();
        }
        availableConditions.push(startCondition);
        //End of start condition generation
        //Improvements ? Should i try to add quest dependencies ? Might be really fucky to do that

        //Generate objectives
        for (let foo = 0; foo < RandomUtil.getIntEx(MaximumOjectives); foo++)
        {

            const hash = HashUtil.generate();

            switch (RandomUtil.getKey(objectives["Finish conditions"].Objectives))
            {
                case "Elimination":
                    const maxKills = RandomUtil.getIntEx(MaximumKillsNeeded);
                    let eliminationProperty = objectives["Finish conditions"].Objectives.Elimination;
                    eliminationProperty._props.value = maxKills.toString();
                    eliminationProperty._props.id = hash;
                    eliminationProperty._props.counter.id = HashUtil.generate();

                    let killConditionProperty = objectives["Finish conditions"].Other.KillCondition;
                    killConditionProperty._props.target = RandomUtil.getKeyValue(template.Sides);
                    killConditionProperty._props.id = HashUtil.generate();
                    killConditionProperty._props.value = "1";
                    killConditionProperty._props.compareMethod = ">=";

                    if (killConditionProperty._props.target === "Savage")
                    {
                        killConditionProperty._props["savageRole"] = [];
                        killConditionProperty._props.savageRole.push(RandomUtil.getKey(template.Roles));
                    }

                    //Roll for extra conditions
                    if (RandomUtil.getBool() === true)
                    {

                        let mapCondProperty = objectives["Finish conditions"]["Extra Conditions"].MapCondition;
                        mapCondProperty.target = RandomUtil.getKeyValue(template.LocationList);
                        mapCondProperty.id = HashUtil.generate();
                        eliminationProperty._props.counter.conditions.push(mapCondProperty);

                        /*case "ExitCondition":

                            const escapStatus = template.EscapingStatus
                            delete escapStatus["Killed"]
                            delete escapStatus["Left"]
                            delete escapStatus["MissingInAction"]

                            let exitCondProperty = objectives["Finish conditions"]["Extra Conditions"].ExitCondition
                            exitCondProperty.status = RandomUtil.getKey(template.EscapingStatus)
                            exitCondProperty.id = HashUtil.generate()

                            eliminationProperty._props.counter.conditions.push(exitCondProperty)
                            break;
                        */

                    }
                    //End of extra conditions setup

                    eliminationProperty._props.counter.conditions.push(killConditionProperty);
                    finishConditions.push(eliminationProperty);

                    break;
                case "Find item":
                    break;
                case "Hand over item":
                    break;
                case "Place Item":
                    // Hell, fuck me, why i am adding this one ?
                    break;
            }
        }

        return quest;
    }

    static GenerateItemObject(item, count, fir = false)
    {
        const template = {
            "_id": "CHANGEME",
            "_tpl": item,
            "upd": {
                "StackObjectsCount": count
            }
        };

        if (fir)
        {
            template.upd["SpawnedInSession"] = true;
        }

        template._id = HashUtil.generate();
        return template;
    }

    static GenerateQuestRewardProperty(value = 0, id = "CHANGEME", type = "Item", index = 0, items = undefined, unknown = false, target = "")
    {
        let reward = {};
        if (type === "TraderStanding")
        {
            reward["target"] = target;
        }

        if (unknown)
        {
            reward["unknown"] = true;
        }
        reward["value"] = value;
        reward["id"] = id;
        reward["type"] = type;
        reward["index"] = index;
        if (items)
        {
            reward["items"] = items;
        }
        return reward;
    }

    /**
     * Add a defined percentage to a number
     * @param {number} base
     * @param {number} percent
     * @returns {number}
     */
    static percentageCalculation(base, percent)
    {
        return Math.round(base + ((percent / 100) * base));
    }

    static DoesHandbookAlreadyExist(id)
    {
        const database = DatabaseServer.tables;
        const handbook = database.templates.handbook.Items;
        for (const foo in handbook)
        {
            if (handbook[foo].Id === id)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}

module.exports = CoreMod;