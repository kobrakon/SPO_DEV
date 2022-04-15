/* 
 * authors: Revingly
*/

class MICC {
    static MOD_NAME = "Revingly-MICC";

    static Start() {
        Logger.info(`Loading: ${MICC.MOD_NAME}`);
        const { price, trader_loyalty_level, columns } = require('./config.json');
        const SMALL_SICC_ID = "5d235bb686f77443f4331278";

        const handbook = DatabaseServer.tables.templates.handbook.Items;
        const locales = DatabaseServer.tables.locales.global;

        const itemId = "Revingly_MICC",
            itemCategory = "5795f317245977243854e041",
            itemFleaPrice = price,
            itemPrefabPath = "micc.bundle",
            itemName = "Medical SICC",
            itemShortName = "MICC",
            itemDescription = "SICC for med items",
            itemTrader = "54cb57776803fa99248b456e", //Therapist
            itemTraderPrice = price,
            itemTraderLV = trader_loyalty_level;

        const therapist = DatabaseServer.tables.traders[itemTrader];

        const item = JsonUtil.clone(DatabaseServer.tables.templates.items[SMALL_SICC_ID]);
        item._id = itemId;
        item._props.Prefab.path = itemPrefabPath;
        item._props.Grids = MICC.createGrid(itemId, columns);
        DatabaseServer.tables.templates.items[itemId] = item;

        // add the item to the trader
        for (const locale in locales) {
            locales[locale].templates[itemId] =
            {
                "Name": itemName,
                "ShortName": itemShortName,
                "Description": itemDescription
            };
        }
        handbook.push(
            {
                "Id": itemId,
                "ParentId": itemCategory,
                "Price": itemFleaPrice
            }
        );
        therapist.assort.items.push({
            "_id": itemId,
            "_tpl": itemId,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
            {
                "UnlimitedCount": false,
                "StackObjectsCount": 1
            }
        });
        therapist.assort.barter_scheme[itemId] = [
            [
                {
                    "count": itemTraderPrice,
                    "_tpl": "590c657e86f77412b013051d" // roubles
                }
            ]
        ];
        therapist.assort.loyal_level_items[itemId] = itemTraderLV;

        MICC.allowMiccIntoSecureContainers(itemId);
    }

    static allowMiccIntoSecureContainers(itemId) {
        // nootropix mod for secure containers conflict with this mod, so we try to make a compromise
        const NOOTROPIX_MOD = "Nootropix-BigSecureCases";
        const secureContainers = {
            "kappa": "5c093ca986f7740a1867ab12",
            "gamma": "5857a8bc2459772bad15db29",
            "epsilon": "59db794186f77448bc595262",
            "beta": "5857a8b324597729ab0a0e7d",
            "alpha": "544a11ac4bdc2d470e8b456a",
            "waistPouch": "5732ee6a24597719ae0c0281"
        };

        if (ModLoader.onLoad[NOOTROPIX_MOD] !== undefined) { // check if big secure cases is added to modloader
            Logger.debug(`${NOOTROPIX_MOD} detected`);
            const configFilePath = `${ModLoader.getModPath(NOOTROPIX_MOD)}config/config.json`;
            const { cases } = JsonUtil.deserialize(VFS.readFile(configFilePath));

            for (const secureCase in cases) {
                if (cases[secureCase].removeFilters) continue;

                DatabaseServer.tables.templates.items[secureContainers[secureCase]]
                    ._props
                    .Grids[0]
                    ._props
                    .filters[0]
                    .Filter
                    .push(itemId)
            }
        } else {
            Logger.debug(`${NOOTROPIX_MOD} not detected`);
            for (const secureCase in secureContainers) {
                DatabaseServer.tables.templates.items[secureContainers[secureCase]]
                    ._props
                    .Grids[0]
                    ._props
                    .filters[0]
                    .Filter
                    .push(itemId)
            }
        }
    }

    static createGrid(itemId, columns) {
        const grids = [];
        
        for (const [key, val] of Object.entries(columns)) {
            grids.push(MICC.generateColumn(itemId, `column_${key}`, val.cellH, val.cellV));
        }

        return grids;
    }

    static generateColumn(itemId, name, cellH, cellV) {
        const MEDS = "543be5664bdc2dd4348b4569";
        const INJECTOR_CASE = "619cbf7d23893217ec30b689";
        return {
            "_name": name,
            "_id": HashUtil.generate(),
            "_parent": itemId,
            "_props": {
                "filters": [
                    {
                        "Filter": [MEDS, INJECTOR_CASE],
                        "ExcludedFilter": []
                    }
                ],
                "cellsH": cellH,
                "cellsV": cellV,
                "minCount": 0,
                "maxCount": 0,
                "maxWeight": 0,
                "isSortingTable": false
            },
            "_proto": "55d329c24bdc2d892f8b4567"
        };
    }
}

module.exports.Mod = MICC;
