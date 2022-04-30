"use strict";

const meds = require("../db/items/med_items.json");
const itemDB = DatabaseServer.tables.templates.items;
const arrays = require("./arrays.js");
const medItems = arrays.stash_meds;

class Helper {
    static correctMedItems(pmcData, pmcEXP) {
        var inventProp = pmcData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < pmcData.Inventory.items.length; i++) {
                var itemProp = pmcData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < medItems.length; j++) {
                        if (pmcData.Inventory.items[i]._tpl === medItems[j]
                            && pmcData.Inventory.items[i].upd.MedKit.HpResource > itemDB[medItems[j]]._props.MaxHpResource) {
                            pmcData.Inventory.items[i].upd.MedKit.HpResource = itemDB[medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && pmcData.Inventory.items[i]._tpl === medItems[j]) {
                            pmcData.Inventory.items[i].upd.MedKit.HpResource = itemDB[medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
}
module.exports = Helper;