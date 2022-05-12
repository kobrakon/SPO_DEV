"use strict"

class MysteriousKeys
{

  static onLoadMod()
  {

    const items = DatabaseServer.tables.templates.items
    const parents = ["5c99f98d86f7745c314214b3", 
                      "5c164d2286f774194c5e69fa", 
                      "55818afb4bdc2dde698b456d", 
                      "55802f4a4bdc2ddb688b4569", 
                      "550aa4dd4bdc2dc9348b4569", 
                      "55818af64bdc2d5b648b4570",
                      "550aa4cd4bdc2dd8348b456c",
                      "55818b084bdc2d5b648b4571",
                      "55818b164bdc2ddc698b456c",
                      "5a74651486f7744e73386dd1",
                      "55818add4bdc2d5b648b456f",
                      "55818ad54bdc2ddc698b4569",
                      "55818acf4bdc2dde698b456b",
                      "55818ac54bdc2d5b648b456e",
                      "55818ae44bdc2dde698b456c",
                      "55818aeb4bdc2ddc698b456a",
                      "55818aeb4bdc2ddc698b456a",
                      "55818a6f4bdc2db9688b456b",
                      "5448bc234bdc2d3c308b4569",
                      "55818b224bdc2dde698b456f",
                      "55818a594bdc2db9688b456a",
                      "555ef6e44bdc2de9068b457e",
                      "56ea9461d2720b67698b456f",
                      "55818a104bdc2db9688b4569",
                      "55818a684bdc2ddd698b456d",
                      "55818a304bdc2db5418b457d"
                      ] 

    for (const i in items)
    {
      let item = items[i]

      parents.includes(item._parent) ?
        item._props.ExaminedByDefault = false :
        item._props.ExaminedByDefault = true
    }
  }
}

module.exports = MysteriousKeys