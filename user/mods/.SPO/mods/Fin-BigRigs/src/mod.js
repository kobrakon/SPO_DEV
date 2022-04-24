/* mod.j
* license: NCSA
* copyright: Fin
* website: Nada
* authors:
* - Fin
*/

const database = DatabaseServer.tables
const itemdb = DatabaseServer.tables.templates.items
const handbook = DatabaseServer.tables.templates.handbook
const traders = DatabaseServer.tables.traders
const locations = DatabaseServer.tables.locations
const botTypes = DatabaseServer.tables.bots.types
const modFolder = `${ModLoader.getModPath(module.filename.split("\\")[module.filename.split("\\").length - 3])}`

class FBR
{
    constructor()
    {
        this.modname = "Fin-Bigger Rigs";
        Logger.info(`Loading: ${this.modname}`);
		while (ModLoader.onLoad[this.modname])
		{
			console.log(`The mod name ${this.modname} is already taken. Modifying mod name.`)
			this.modname += "_Alt"
		}
		HttpRouter.onStaticRoute["/client/game/start"]["FBR"] = FBR.runOnGameStart //DOES NOT REPLACE the AKI function
		// HttpRouter.onStaticRoute["/raid/profile/save"] = Object.assign({"ModInRaid": FRET.runOnRaidEnd},
    }
	
	static sumGridSpace(itemId)
	{
		let slots = 0
		if (itemdb[itemId]._props && itemdb[itemId]._props.Grids)
			for (let grid in itemdb[itemId]._props.Grids)
				slots += itemdb[itemId]._props.Grids[grid]._props.cellsH * itemdb[itemId]._props.Grids[grid]._props.cellsV
		else
			return false
		return slots
	}
	
	static embiggeningRiggening()
	{
		for (let id in itemdb)
			if (["5448e5284bdc2dcb718b4567"].includes(itemdb[id]._parent))
			{
				let slots = FBR.sumGridSpace(id)
				if (!slots)
					continue
				let dim1 = Math.ceil(Math.sqrt(slots)) //Should always be highest, right?
				let dim2 = Math.ceil(slots / dim1)
				if (itemdb[id]._props.Width >= dim1)
				{
					if (itemdb[id]._props.Height >= dim2)
						continue
					else
						itemdb[id]._props.Height = dim2
				}
				else if (itemdb[id]._props.Height >= dim1)
					itemdb[id]._props.Width = dim2
				else
				{
					if (itemdb[id]._props.Height > itemdb[id]._props.Width)
					{
						itemdb[id]._props.Height = dim1
						itemdb[id]._props.Width = dim2
					}
					else
					{
						itemdb[id]._props.Width = dim1
						itemdb[id]._props.Height = dim2
					}
				}
			}
	}
	
	static runOnGameStart(url, info, sessionID, output)
	{
		FBR.embiggeningRiggening()
		return(output)
	}
}

module.exports.FBR = FBR;