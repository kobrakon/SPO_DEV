"use strict";

const itemsToModify = require("../cfg/config.json")

class BackpackResize {
    static onLoadMod() 
    {
      const database = DatabaseServer.tables;
      const items = database.templates.items;

        // Loop over the items to modify
        for (const id in itemsToModify) {
          if (itemsToModify[id].width != "") {
            items[id]._props.width = itemsToModify[id].width;
          }

          if (itemsToModify[id].height != "") {
            items[id]._props.height = itemsToModify[id].height;
          }

          const excludeFilters = [];
          var efilter = excludeFilters;
          if (itemsToModify[id].exclude != null) {
            if (itemsToModify[id].exclude != items[id]._props.Grids[0]._props.filters[0].ExcludedFilter) {
              efilter = itemsToModify[id].exclude;
            }
          }
          
          const filters = ["54009119af1c881c07000029"];
          var nfilter = filters;
          if (itemsToModify[id].filter != null) {
            if (itemsToModify[id].filter != items[id]._props.Grids[0]._props.filters[0].Filter) {
              nfilter = itemsToModify[id].filter;
            }
          }

          if (itemsToModify[id].grid != null) {
            const grids = items[id]._props.Grids;
            for (const grid of grids) {
              let exf = [];
              if (grid._props.filters[0].ExcludedFilter) exf = efilter; 
              excludeFilters.push(...exf,);

              let nxf = [];
              if (grid._props.filters[0].Filter) exf = nfilter; 
              filters.push(...nxf,);
            }
          
            // overwrite the grid of the item with the new one
            items[id]._props.Grids = BackpackResize.createGrid(id, itemsToModify[id].grid, filters, excludeFilters);

            // overwrite bag layout
            if (itemsToModify[id].GridLayoutName != "") {
              items[id]._props.GridLayoutName = itemsToModify[id].GridLayout;
            }
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