const database = DatabaseServer.tables
const products = database.hideout.production
const file = require("../CustomCrafts.json")

class customproduction
{
  constuctor()
  {
    this.mod = ModLoader.getModPath["CustomCrafts"]
    ModLoader.onLoad[this.mod] = this.load.bind(this)
  }
  
  load()
  {
   products = []
   products = file
  }
}

module.exports.Mod = customproduction
