const database = DatabaseServer.tables
const locales = database.locales.global
const globals = database.globals.config
const traders = database.traders

class tweakstuff {
    constructor() {
        this.mod = ModLoader.getModPath["flealock"]
        ModLoader.onLoad[this.mod] = this.load.bind(this)
        HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": tweakstuff.intercept}, HttpRouter.onStaticRoute["/client/game/start"]) // needed in order to catch pmc data 
        HttpRouter.onStaticRoute["/client/ragfair/find"]["Interceptor"] = tweakstuff.intercept // runs the check whenever you visit the flea so we don't have a case of needing to restart the game for flea to work after construction
    }

    load() {
        locales.en.interface["ragfair/Unlocked at character LVL {0}"] = "The Intelligence Center must be installed in your Hideout in order to communicate with the Flea Market network."
        locales.en.interface["hideout_area_11_stage_3_description"] = "A full-fledged intelligence center equipped with computer equipment, radio devices and analytical tools. With the ability to contact anyone including traders from anywhere in Norvinsk, the escape from Tarkov has never felt so close."
    }

    static intercept(url, info, sessionID, output) {
        tweakstuff.doTheThing(sessionID)
        return(output)
    }

    static doTheThing(sessionID) {
        ProfileController.getPmcProfile(sessionID)
        let pmcData = ProfileController.getPmcProfile(sessionID)

        if (!pmcData.Info) {
            return
        }
        if (pmcData.Hideout.Areas[11].level > 0) {
            globals.RagFair.minUserLevel = 1
        } else {
            globals.RagFair.minUserLevel = 90
        }
    }
}

module.exports.Mod = tweakstuff