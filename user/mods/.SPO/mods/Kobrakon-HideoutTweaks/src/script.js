const database = DatabaseServer.tables
const hideout = database.hideout
const products = hideout.production
const globals = database.globals.config
const locales = database.locales.global
let product;

class hideouttweaks
{
  constructor ()
  {
    this.mod = ModLoader.getModPath("Kobrakon-HideoutTweaks")
    ModLoader.onLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": hideouttweaks.begin}, HttpRouter.onStaticRoute["/client/game/start"]) // needed in order to catch pmc data 
    HttpRouter.onStaticRoute["/client/game/start"]["Interceptor"] = hideouttweaks.begin // checks your profile and applys changes (when conditions are met) every half-second
  }
  
  load()
  {
    locales.en.interface["hideout_HydrationRegeneration"] = "Total max hydration"
    locales.en.interface["hideout_HealthRegeneration"] = "Total max stamina"
    locales.en.interface["hideout_EnergyRegeneration"] = "Total max energy"
    locales.en.interface["hideout_MaximumEnergyReserve"] = "Total Hydration and Energy reserve"
    
    for (product in products)
    {
      if (products[product].areaType == 20)
      {
        products[product].productionTime = 72000
      }
      
      if (products[product].areaType == 19)
      {
        products[product].productionTime = 7200
      }
      
      if (products[product].areaType == 6)
      {
        products[product].productionTime = 10800
      }
    }
  }
  
  static begin(url, info, sessionID, output)
  {
    setInterval(hideouttweaks.getPlayerData, 1000, sessionID)

    return(output)
  }
  
  static getPlayerData(sessionID)
  {
    let pmcData = ProfileController.getPmcProfile(sessionID)

    if (pmcData == null) {
      return;
    }
    
    globals.Health.Effects.Regeneration.Energy = 0 // enforce no regen
    globals.Health.Effects.Regeneration.Hydration = 0
    for (let value in globals.Health.Effects.Regeneration.BodyHealth)
    {
      globals.Health.Effects.Regeneration.BodyHealth[value].Value = 0
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `+5 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum = 105
    }
    
    if (pmcData.Hideout.Areas[7].level == 2)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `15 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum = 115
    }
    
    if (pmcData.Hideout.Areas[7].level == 3)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `25 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum = 125
    }
    
    if(pmcData.Hideout.Areas[8].level == 1)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `10 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity = 165
    }
    
    if(pmcData.Hideout.Areas[8].level == 2)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `15 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity = 180
    }
    
    if(pmcData.Hideout.Areas[8].level == 3)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `20 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity = 200
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `5 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum = 105
    }
    
    if (pmcData.Hideout.Areas[7].level == 2)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `15 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum = 115
    }
    
    if (pmcData.Hideout.Areas[7].level == 3)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `25 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum = 125
    }
  }
}

module.exports.Mod = hideouttweaks
