"use strict";

const itemsToModify = require("../cfg/config.json")

class BackpackResize {
    static onLoadMod() 
    {
      const database = DatabaseServer.tables;
      const items = database.templates.items;

//VKBO
      items["5ab8ee7786f7742d8f33f0b9"]._props.Width = 3
      items["5ab8ee7786f7742d8f33f0b9"]._props.Height = 4
      //transformer
      items["56e33680d2720be2748b4576"]._props.Width = 2
      items["56e33680d2720be2748b4576"]._props.Height = 4
      //SCAV
      items["56e335e4d2720b6c058b456d"]._props.Width = 5
      items["56e335e4d2720b6c058b456d"]._props.Height = 5
      //LBT
      items["618cfae774bb2d036a049e7c"]._props.Width = 5
      items["618cfae774bb2d036a049e7c"]._props.Height = 5
      //Oakley
      items["5d5d940f86f7742797262046"]._props.Width = 4
      items["5d5d940f86f7742797262046"]._props.Height = 5
      //T4
      items["5f5e46b96bdad616ad46d613"]._props.Width = 4
      items["5f5e46b96bdad616ad46d613"]._props.Height = 6
      //sling
      items["5ab8f04f86f774585f4237d8"]._props.Width = 3
      items["5ab8f04f86f774585f4237d8"]._props.Height = 4
        // Loop over the items to modify
        for (const id in itemsToModify) {
          const excludeFilters = [];
          const grids = items[id]._props.Grids;

          for (const grid of grids) {
              let exf = [];
              if (grid._props.filters[0]) exf = grid._props.filters[0].ExcludedFilter; 
              excludeFilters.push(...exf,);
          }
          
          var filters = items[id]._props.Grids[0]._props.filters[0].Filter;
          // overwrite the grid of the item with the new one
          items[id]._props.Grids = BackpackResize.createGrid(id, itemsToModify[id].grid, filters, excludeFilters);

          // overwrite bag layout
          if (itemsToModify[id].GridLayoutName != "") {
              items[id]._props.GridLayoutName = itemsToModify[id].GridLayout;
          }
      }
    }

    static createGrid(itemId, columns, filters, excludeFilters) {
      const grids = [];
    
      for (const [key, val] of Object.entries(columns)) {
        grids.push(BackpackResize.generateColumn(itemId, `column_${key}`, filters, excludeFilters, val.cellH, val.cellV));
      }

      return grids;
    }

    static generateColumn(itemId, name, filters, excludeFilters,  cellH, cellV) {
    return {
        "_name": name,
        "_id": HashUtil.generate(),
        "_parent": itemId,
        "_props": {
            "filters": [
                {
                    "Filter": filters,
                    "ExcludedFilter": excludeFilters
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
    }
  }
}

module.exports = BackpackResize;