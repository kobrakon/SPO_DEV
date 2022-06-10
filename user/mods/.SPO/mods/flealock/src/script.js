const database = DatabaseServer.tables
const locales = database.locales.global
const globals = database.globals.config
const traders = database.traders
let check;

class tweakstuff 
{
    constructor() 
    {
        this.mod = ModLoader.getModPath["flealock"]
        ModLoader.onLoad[this.mod] = this.load.bind(this)
        HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": tweakstuff.intercept}, HttpRouter.onStaticRoute["/client/game/start"]) // needed in order to catch pmc data 
        HttpRouter.onStaticRoute["/client/game/start"]["Interceptor"] = tweakstuff.intercept // checks your profile and applys changes (when conditions are met) every half-second
        HttpRouter.onStaticRoute["/client/game/logout"]["Interceptor"] = tweakstuff.endCheck
    }

    load() 
    {
    }
    
    static endCheck(url, info, sessionID, output)
    {
        clearInterval(check)
        return(output)
    }

    static intercept(url, info, sessionID, output) 
    {
        check = setInterval(tweakstuff.doTheThing, 500, sessionID)
        return(output)
    }

    static doTheThing(sessionID) 
    {
        let pmcData = ProfileController.getPmcProfile(sessionID)

        if (!pmcData.Info)
        return

        if (pmcData.Hideout.Areas[11].level == 0)
        {
            globals.RagFair.minUserLevel = 90
            locales.en.interface["ragfair/Unlocked at character LVL {0}"] = "The Intelligence Center must be installed in your Hideout in order to communicate with the Flea Market network."
        }
        
        if (pmcData.Hideout.Areas[4].active && pmcData.Hideout.Areas[11].level > 0)
        {
            globals.RagFair.minUserLevel = 1
        }
        
        if (!pmcData.Hideout.Areas[4].active && pmcData.Hideout.Areas[11].level > 0)
        {
            globals.RagFair.minUserLevel = 90
            locales.en.interface["ragfair/Unlocked at character LVL {0}"] = "The Generator must be on in order to access the Flea Market network."
        }
    }
}

module.exports.Mod = tweakstuff
