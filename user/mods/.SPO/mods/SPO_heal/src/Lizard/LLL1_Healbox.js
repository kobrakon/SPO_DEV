class LLL1_Healbox
{
    constructor()
    {
        this.modname = "LLL1_Healbox";
        Logger.info(`Loading: ${this.modname}`);
        ModLoader.onLoad[this.modname] = this.load.bind(this);
    }

    load()
    {
        const itemId = "LLL1_Healbox"; // unique item id, used in tarkov
        const itemClone = "590c657e86f77412b013051d"; // base item, make clone from this

        // handbook
        const itemCategory = "5448f39d4bdc2d0a728b4568"; // https://docs.sp-tarkov.com/#resources/items_stats.md -->> Weapon Parts & mod
        const itemFleaPrice = 300000; // Price of item on Fleamarket

        // item
        const itemPrefabPath = "item_container_meds.bundle"; // Server/mods/this.modname/bundles/... CAB 2e33dcd51900e1153e9615eca8d9afa3 === f2ba5588e4d8c01fb4f96ad9b2fb64bb
        const itemLongName = "Hideout healing supplies";
        const itemShortName = "HHS";
        const itemDescription = "Kit of various medical equipment, designed for use at safe and clean environment";

        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, itemLongName, itemShortName, itemDescription);
        this.createItem(itemClone, itemId, itemPrefabPath);
        
    }
    createItemHandbookEntry(i_id, i_category, i_fprice, i_lname, i_sname, i_desc)
    {
        // add item to handbook
        DatabaseServer.tables.templates.handbook.Items.push(
        {
            "Id": i_id, //use item id
            "ParentId": i_category, // category item will show under
            "Price": i_fprice, // price used on fleamarket
        });

        // add custom item names to all languages
        for (const localeID in DatabaseServer.tables.locales.global)
        {
            DatabaseServer.tables.locales.global[localeID].templates[i_id] = {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            }
        }
    }

    createItem(i_clone, i_id, i_path)
    {
        let item = JsonUtil.clone(DatabaseServer.tables.templates.items[i_clone]); // https://items.sp-tarkov.com/
        // set clone item to custom itemId
        DatabaseServer.tables.templates.items[i_id] = item;

        // change item properties
        item._id = i_id;
        item._props.BackgroundColor = "blue"
        item._props.MaxHpResource = 6200
        item._props.hpResourceRate = 1
        item._props.Width = 3
        item._props.Height = 3
                                          
        }
}

module.exports.LLL1_Healbox = LLL1_Healbox;
