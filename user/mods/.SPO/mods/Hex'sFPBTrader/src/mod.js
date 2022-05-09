/* 
 * authors: VirtualHex
*/

"use strict";

class Mod
{
    constructor()
    {
        this.mod = "Hex'sFPBTrader";
        this.funcptr = HttpServer.onRespond["IMAGE"]; 

        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);    
        HttpServer.onRespond["IMAGE"] = this.getImage.bind(this);
    }

    getImage(sessionID, req, resp, body)
    {
        const filepath = `${ModLoader.getModPath(this.mod)}avatar/`;

        if (req.url.includes("/avatar/FGunsmith"))
        {
            HttpServer.sendFile(resp, `${filepath}FGunsmith.jpg`);
            return;
        }

        this.funcptr(sessionID, req, resp, body);
    }

    load()
    {
		
        const filepath = `${ModLoader.getModPath(this.mod)}db/`;
        DatabaseServer.tables.traders.gunsmith7898 = {
            assort:       JsonUtil.deserialize(VFS.readFile(`${filepath}assort.json`)),
            base:         JsonUtil.deserialize(VFS.readFile(`${filepath}base.json`)),
            dialogue:     JsonUtil.deserialize(VFS.readFile(`${filepath}dialogue.json`)),
            questassort:  JsonUtil.deserialize(VFS.readFile(`${filepath}questassort.json`)),
			suits:        JsonUtil.deserialize(VFS.readFile(`${filepath}suits.json`)),
        };
        let locales = DatabaseServer.tables.locales.global;

        for (const locale in locales)
        {
            locales[locale].trading.gunsmith7898 = {
                FullName: "Yuri Bolovnik",
                FirstName: "Yuri",
                Nickname: "Gunsmith",
                Location: "Chemical factory #12, a biochem warehouse repurposed as a weapon manufacturing facility.",
                Description: "Your new business partner. Runs and manages your gun manufacturing operation. He's crafted some of the finest weaponry in Tarkov. Be sure to collect your firearm sales income from him, he'll have a lump sum of your cash profit every hour in exchange for Weapon Parts."
            };
        }
		
		const TradeC = TraderConfig ;
		const help = {"traderId": "gunsmith7898","seconds": 3600}
		TradeC["updateTime"].push(help);
		
        DatabaseServer.tables.locales.global = locales;
		
		
    }
}

module.exports.Mod = Mod;
