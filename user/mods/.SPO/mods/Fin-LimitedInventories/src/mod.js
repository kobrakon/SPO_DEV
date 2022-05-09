/* mod.j
* license: NCSA
* copyright: Fin
* website: Nada
* authors:
* - Fin
*/

let debugMode = false

const traderIds = {
			"54cb57776803fa99248b456e" : "therapist",
			"5a7c2eca46aef81a7ca2145d" : "mechanic",
			"5ac3b934156ae10c4430e83c" : "ragman",
			"5c0647fdd443bc2504c2d371" : "jaeger",
			"54cb50c76803fa8b248b4571" : "prapor",
			"5935c25fb3acc3127c3d8cd9" : "peacekeeper",
			"58330581ace78e27b8b10cee" : "skier",
			"579dc571d53a0658a154fbec" : "fence"
		}

const database = DatabaseServer.tables
const itemdb = DatabaseServer.tables.templates.items
const handbook = DatabaseServer.tables.templates.handbook
const traders = DatabaseServer.tables.traders
const locations = DatabaseServer.tables.locations
const botTypes = DatabaseServer.tables.bots.types
const modFolder = `${ModLoader.getModPath(module.filename.split("\\")[module.filename.split("\\").length - 3])}`
const config = require("../config/config.json")
let filepath = `${modFolder}src/asset.js`;
let asset = JsonUtil.deserialize(VFS.readFile(filepath))
let timerInterval

let sessionId = ""
let origTraders = JsonUtil.clone(traders)
let vitalMods = []
let optionalMods = []

class FRET
{
    constructor()
    {		
        this.modname = "Fin-Limited Inventories for Traders";
        Logger.info(`Loading: ${this.modname}`);
		while (ModLoader.onLoad[this.modname])
		{
			console.log(`The mod name ${this.modname} is already taken. Modifying mod name.`)
			this.modname += "_Alt"
		}
		ModLoader.onLoad[this.modname] = FRET.load.bind(this)
		HttpRouter.onDynamicRoute["/client/location/getLocalloot"] = Object.assign({"FRET": FRET.runOnRaidStart}, HttpRouter.onDynamicRoute["/client/location/getLocalloot"]) //DOES NOT REPLACE the AKI function, it just needs to use that route as an entry point.
		HttpRouter.onStaticRoute["/client/game/start"]["FRET"] = FRET.runOnGameStart //DOES NOT REPLACE the AKI function
		// HttpRouter.onStaticRoute["/raid/profile/save"] = Object.assign({"ModInRaid": FRET.runOnRaidEnd}, HttpRouter.onStaticRoute["/raid/profile/save"]) //DOES NOT REPLACE the AKI function, it just needs to use that route as an entry point.
    }
	
	static load()
	{
		if (debugMode)
			FRET.main()
		FRET.updateTraderRefreshTimes()
		FRET.replaceAKIFunctions()
		// TraderConfig.updateTimeDefault = RD
	}
	
	static grabConfigValues()
	{
		if (config.I_am_using_a_mod_to_alter_trader_stock_and_want_FRET_to_play_nice_with_it)
			origTraders = JsonUtil.clone(traders)
		if (config.new_trader_IDs_to_modify.includes("ALL TRADERS"))
		{
			config.new_trader_IDs_to_modify = []
			for (let i in traders)
				config.new_trader_IDs_to_modify.push(i)
		}
		for (let id of config.new_trader_IDs_to_modify)
			if (traders[id] && !traderIds[id])
				traderIds[id] = id
	}
	
	static updateTraderRefreshTimes()
	{
		if (asset.nextUpdateTime - TimeUtil.getTimestamp() <= 0)
			asset.nextUpdateTime = TimeUtil.getTimestamp() + RD
		for (let traderId in traderIds)
			if (!["fence"].includes(traderIds[traderId]))
			{
				TraderConfig.updateTime.find(i => i.traderId == traderId).seconds = asset.nextUpdateTime - TimeUtil.getTimestamp()
				traders[traderId].assort.nextResupply = asset.nextUpdateTime
			}
	}
	
	static main()
	{
		FRET.qualifyMods(["guns"])
		FRET.qualifyMods(["optionalMods", "vitalMods"])
		FRET.qualifyMods(["optionalMods", "vitalMods"])
		FRET.qualifyMods(["optionalMods", "vitalMods"])
		
		if (debugMode)
			asset = {
				"traderInventories": {},
				"nextUpdateTime": 0
			}
		if (Object.keys(asset.traderInventories).length == 0 || true)
			FRET.setupTraderInventories()
		else
			for (let traderId in asset.traderInventories)
			{
				if (["579dc571d53a0658a154fbec", "ragfair"].includes(traderId))
					continue
				traders[traderId].assort = asset.traderInventories[traderId]
			}
	}
	
	static saveToFile(data, filePath)
	{
		var fs = require('fs');
				fs.writeFile(modFolder + filePath, JSON.stringify(data, null, 4), function (err) {
			  if (err) throw err;
			});
	}
	
	static checkRequired(slot)
	{
		if (slot._wasRequired != undefined)
		{
			if (slot._wasRequired == true)
				return true
		}
		else
			if (slot._required == true)
				return true
		return false
	}
	
	static qualifyMods(filter)
	{
		for (let id in itemdb)
			if (filter.includes(FRET.filterItemType(id, false)) && itemdb[id]._parent != "5448bc234bdc2d3c308b4569")
				for (let slot in itemdb[id]._props.Slots)
					if (!itemdb[id]._props.Slots[slot]._name.toLowerCase().includes("camora"))
						if (FRET.checkRequired(itemdb[id]._props.Slots[slot]) == true)
							for (let mod of itemdb[id]._props.Slots[slot]._props.filters[0].Filter)
							{
								if (optionalMods.includes(mod))
									optionalMods.splice(optionalMods.findIndex(i => i == mod), 1)
								if (!vitalMods.includes(mod))
									vitalMods.push(mod)
							}
						else
							for (let mod of itemdb[id]._props.Slots[slot]._props.filters[0].Filter)
								if (!vitalMods.includes(mod) && !optionalMods.includes(mod))
									optionalMods.push(mod)
	}
	
	static disableFence()
	{
		//TraderConfig.fenceAssortSize = 0
	}
	
	
	static setupTraderInventories()
	{
		for (let traderId in traderIds)
		{
			if (["579dc571d53a0658a154fbec", "ragfair"].includes(traderId) || !traders[traderId])
				continue
			let newInv = FRET.randomizeTraderInventory(traderId, sessionId)
			if (newInv == false)
				continue
			traders[traderId].assort = newInv
			FRET.consolidateTraderInventory(traderId)
			// FRET.findLostChildren(traderId)
			FRET.clearInvalidTradeEntries(traderId)
			if (TraderController.pristineTraderAssorts)
				TraderController.pristineTraderAssorts[traderId] = traders[traderId].assort
			if (debugMode)
				FRET.saveToFile(traders[traderId].assort, `z${traderIds[traderId]}.json`)
		}
		FRET.saveTraderInventories()
	}
	
	static rotateTraderInventories()
	{
		clearInterval(timerInterval)
		RagfairConfig.dynamic.enable = false
		let delay = (asset.nextUpdateTime - TimeUtil.getTimestamp()) * 1000
		if (delay > 0)
		{
			for (let traderId in traders)
				traders[traderId].assort.nextResupply = asset.nextUpdateTime
			timerInterval = setInterval(FRET.rotateTraderInventories, delay)
			return
		}
		timerInterval = setInterval(FRET.rotateTraderInventories, delay)
		FRET.setupTraderInventories()
		FRET.updateTraderRefreshTimes()
		FRET.saveToFile(asset, `src/asset.js`)
	}
	
	static saveTraderInventories()
	{
		FRET.disableFence()
		for (let traderId in traders)
		{
			if (["579dc571d53a0658a154fbec", "ragfair"].includes(traderId))
				continue
			asset.traderInventories[traderId] = JsonUtil.clone(traders[traderId].assort)
		}
		FRET.saveToFile(asset, `src/asset.js`)
	}
	
	static randomizeTraderInventory(traderId, sessionId)
	{
		let debugTraderLLs = false
		let playerLL = 1
		debugMode? playerLL = 4 : null
		if (sessionId)
		{
			let pmcData = ProfileController.getPmcProfile(sessionId)
			if (pmcData.TradersInfo && pmcData.TradersInfo[traderId] && pmcData.TradersInfo[traderId].loyaltyLevel)
				playerLL = pmcData.TradersInfo[traderId].loyaltyLevel
		}
		//Grab the trader
		let trader = origTraders[traderId]
		if (trader == undefined)
		{
			if (traders[traderId])
			{
				origTraders[traderId] = JsonUtil.clone(traders[traderId])
				trader = origTraders[traderId]
				FRET.qualifyMods(["guns"])
				FRET.qualifyMods(["optionalMods", "vitalMods"])
				FRET.qualifyMods(["optionalMods", "vitalMods"])
				FRET.qualifyMods(["optionalMods", "vitalMods"])
			}
			else
				return false
		}
		let categories = ["guns", "ammo", "throwables", "vitalMods", "optionalMods", "armors", "helmets", "eyewear", "backpack", "magazine", "rig", "headset", "barter", "melee", "tech", "meds", "food"]
		//Parse out their inventory (IE: Parent items only)
		let itemList = trader.assort.items.filter(i => ["hideout"].includes(i.parentId))
		let questItems = []
		//Get quest items
		for (let index = 0; index < itemList.length; index++)
		{
			let itemID = itemList[index]._tpl
			let item = itemdb[itemID]
			let hbEntry = handbook.Items.find(i => i.Id == itemID)
			if (item._props.QuestItem == true || (hbEntry && ["5b47574386f77428ca22b345", "5b619f1a86f77450a702a6f3"].includes(hbEntry.ParentId)) || FRET.filterItemType(itemID) == "other")
			{
				questItems.push(itemList[index])
				itemList.splice(index,1)
				index--
			}
		}
		//Spread items by loyalty level
		let itemLLs = {}
		let barterItemLLs = {}
		
		debugTraderLLs ? console.log(`Trader:													 ${traderIds[traderId]}`) : null
		
		for (let cat of categories)
		{
			let itemCount = []
			itemLLs[cat] = []
			barterItemLLs[cat] = []
			for (let ind = 1; ind <= playerLL; ind++)
			{
				let validCurrencies = ["5696686a4bdc2da3298b456a", "5449016a4bdc2d6f028b456f", "569668774bdc2da2298b4568"]
				let LLitems = itemList.filter(i => trader.assort.loyal_level_items[i._id] && trader.assort.loyal_level_items[i._id] == ind && (FRET.filterItemType(i._tpl) == cat && validCurrencies.includes(trader.assort.barter_scheme[i._id][0][0]._tpl)))
				// if (config.allow_barter_trades)
					// LLitems.push(...barterLLitems)
				itemCount[ind] = LLitems.length
				// itemLLs[cat][ind] = LLitems
				itemLLs[cat].push(...LLitems)
				if (config.allow_barter_trades)
				{
					let barterLLitems = itemList.filter(i => trader.assort.loyal_level_items[i._id] && trader.assort.loyal_level_items[i._id] == ind && (FRET.filterItemType(i._tpl) == cat && !validCurrencies.includes(trader.assort.barter_scheme[i._id][0][0]._tpl)))
					barterItemLLs[cat].push(...barterLLitems)
				}
			}
			debugTraderLLs ? console.log(`Cat: ${cat}`) : null
			debugTraderLLs ? console.log(`		${itemCount[1]} || ${itemCount[2]} || ${itemCount[3]} || ${itemCount[4]}`) : null
		}
		//Randomly select items from each loyalty level according to a formula
		//Idea: Give every trader a multiplier to these things?
		//		Maybe store each trader's value in an array [prap, skier, pk, etc.]
		//ORDER IS: Ther, Mech, Rag, Jaeg, Prap, PK, Skier
		let traderIndex = {"therapist": 0,"mechanic": 1,"ragman": 2,"jaeger": 3,"prapor": 4,"peacekeeper": 5,"skier": 6}
		let durabFilter = ["guns"]
		if (config.reduce_armor_durability)
			durabFilter.push(...["armors", "helmets"])
		let count = {
			"base":{
				"guns": 			[0,	2,	0,	3,	4,	2,	3],
				"ammo": 			[0,	2,	0,	24,	32,	20,	20],
				"throwables": 		[0,	0,	0,	0,	2,	0,	0],
				"vitalMods": 		[0,	10,	0,	20,	5,	4,	5],
				"optionalMods": 	[0,	8,	0,	10,	10,	7,	13],
				"armors": 			[0,	0,	4,	0,	1,	2,	0],
				"helmets": 			[0,	0,	3,	0,	1,	1,	0],
				"eyewear": 			[0,	0,	3,	0,	1,	0,	0],
				"backpack": 		[0,	0,	6,	0,	1,	1,	0],
				"magazine":			[0,	4,	0,	6,	6,	6,	6],
				"rig": 				[0,	0,	8,	1,	2,	1,	0],
				"headset": 			[0,	0,	3,	0,	2,	0,	2],
				"barter": 			[0,	0,	0,	.5,	0,	0,	0],
				"melee": 			[0,	0,	0,	0,	0,	0,	0],
				"tech": 			[0,	.2,	0,	0,	0,	.4,	.5],
				"meds": 			[14,0,	0,	2,	0,	1,	0],
				"food": 			[1,	0,	0,	0,	0,	0,	0]
			},
			"perLevel":{
				"guns": 			[0,	1,	0,	1,	1,	2,	1],
				"ammo": 			[0,	1,	0,	7,	10,	10,	10],
				"throwables": 		[0,	0,	0,	0,	1,	0,	0],
				"vitalMods": 		[0,	14,	0,	10,	2,	6,	7],
				"optionalMods": 	[0,	6,	0,	6,	8,	7,	6],
				"armors": 			[0,	0,	2,	0,	1,	1,	0],
				"helmets": 			[0,	0,	1,	0,	.5,	.5,	0],
				"eyewear": 			[0,	0,	1,	0,	.5,	0,	0],
				"backpack": 		[0,	0,	2,	0,	1,	1,	0],
				"magazine":			[0,	0,	0,	2,	3,	3,	2],
				"rig": 				[0,	0,	3,	1,	.4,	1,	0],
				"headset": 			[0,	0,	2,	0,	.5,	.5,	.5],
				"barter": 			[1,	0,	0,	1,	.7,	0,	0],
				"melee": 			[0,	0,	0,	0,	.5,	0,	.2],
				"tech": 			[0,	.1,	0,	0,	0,	.2,	.5],
				"meds": 			[6,	0,	0,	1,	0,	1,	0],
				"food": 			[1,	0,	0,	0,	0,	0,	0]
			}
		}
		if (traderIndex[traderIds[traderId]] == undefined || config.Use_mod_added_trader_settings_for_vanilla_traders) //Non-vanilla trader
		{
			// console.log(`${traderIds[traderId]}`)
			if (traderIndex[traderIds[traderId]] == undefined)
				traderIndex[traderIds[traderId]] = count.base.guns.length
			let TraderNum = traderIndex[traderIds[traderId]]
			for (let cat in count.base)
			{
				let M1 = 0.75; let M2 = 0.55
				if (cat == "ammo")
				{
					M1 = 6
					M2 = 5
				}
				else if (cat == "optionalMods")
				{
					M1 = 1.5
					M2 = 1.4
				}
				// console.log(`${cat}: Base: ${count.base[cat][TraderNum]} => ${itemLLs[cat].length / playerLL * 0.66}   ||   Per Level ${count.perLevel[cat][TraderNum]} => ${itemLLs[cat].length / playerLL * 0.45}`)
				count.base[cat][TraderNum] = (itemLLs[cat].length / playerLL) * M1
				count.perLevel[cat][TraderNum] = (itemLLs[cat].length / playerLL) * M2
				// if (playerLL == 4) //Want to avoid situations where one item is sold, and value is always sub-1
				// {
					// count.base[cat][TraderNum] = Math.ceil(count.base[cat][TraderNum])
					// count.perLevel[cat][TraderNum] = Math.ceil(count.perLevel[cat][TraderNum])
				// }
			}
		}
		let traderCounts = {}
		let countIndex = traderIndex[traderIds[traderId]]
		for (let cat of categories)
			traderCounts[cat] = Math.round(
					(count.base[cat][countIndex] + ( count.perLevel[cat][countIndex] * ( playerLL - 1 ))) * RandomUtil.getFloat(0.5,1.2)
				)
		//Randomly pick quantity and durabilities for each item
		let outputInventory = {
			"items": [],
			"barter_scheme": {},
			"loyal_level_items": {}
		}
		
		for (let item in questItems)
		{
			let id = questItems[item]._id
			outputInventory.items.push(questItems[item])
			outputInventory.barter_scheme[id] = trader.assort.barter_scheme[id]
			outputInventory.loyal_level_items[id] = trader.assort.loyal_level_items[id]
		}		
		for (let cat of categories)
		{
			if (traderCounts[cat] > 0 && itemLLs[cat].length > 0)
				outputInventory = FRET.fillInventoryCat(traderId, playerLL, cat, config.allow_barter_trades ? traderCounts[cat] - Math.ceil(barterItemLLs[cat].length / 3): traderCounts[cat], itemLLs[cat], outputInventory, durabFilter, false)
			if (barterItemLLs[cat].length > 0)
				outputInventory = FRET.fillInventoryCat(traderId, playerLL, cat, barterItemLLs[cat].length, barterItemLLs[cat], outputInventory, durabFilter, true)
		}
		for (let item in outputInventory.items)
			if (outputInventory.items[item].upd)
			{
				if (outputInventory.items[item].upd.UnlimitedCount)
					delete outputInventory.items[item].upd.UnlimitedCount
				// if (outputInventory.items[item].upd.StackObjectsCount && outputInventory.items[item].upd.StackObjectsCount > 1000 && outputInventory.items[item].upd.StackObjectsCount % 10 == 0)
					// outputInventory.items[item].upd.StackObjectsCount = 2
			}
		//Assign all this to the trader
		if (outputInventory != undefined)
			return outputInventory
		else
			return trader.assort
	}
	
	static fillInventoryCat(traderId, playerLL, cat, numItemsToAdd, itemList, outputInventory, durabFilter, barter)
	{
		for (let itemCount = 0; itemCount < numItemsToAdd; itemCount++)
		{
			// console.log(`${traderIds[traderId]}: ${cat} ${itemCount + 1} / ${numItemsToAdd}`)
			let barterLimit = Math.ceil(numItemsToAdd / 3) - itemCount
			let newIndex
			barter ? newIndex = itemCount : newIndex = RandomUtil.getInt(0, itemList.length - 1)
			let newItem = JsonUtil.clone(itemList[newIndex])
			let newBarter = JsonUtil.clone(origTraders[traderId].assort.barter_scheme[newItem._id])
			let newLLI = JsonUtil.clone(origTraders[traderId].assort.loyal_level_items[newItem._id])
			let children = FRET.getChildren(traderId, newItem._id)
			let oldId = newItem._id
			newItem._id = HashUtil.generate()
			for (let ind in children)
				if (children[ind].parentId == oldId)
					children[ind].parentId = newItem._id
			if (!newItem.upd)
				newItem.upd = {}
			if (barter)
			{
				if (barterLimit > 0) 
					newItem.upd.StackObjectsCount =itemdb[newItem._tpl]._props.StackMaxSize ?
					Math.ceil(itemdb[newItem._tpl]._props.StackMaxSize * RandomUtil.getFloat(0.5 * (playerLL / 10 + 1),0.9 * (playerLL / 50 + 1)))
					: 1
				else if (config.show_unavailable_barters_as_zero_stock)
					newItem.upd.StackObjectsCount = 0
				else
					continue
			}
			else
				newItem.upd.StackObjectsCount = itemdb[newItem._tpl]._props.StackMaxSize ?
				Math.ceil(itemdb[newItem._tpl]._props.StackMaxSize * RandomUtil.getFloat(0.5 * (playerLL / 10 + 1),0.9 * (playerLL / 50 + 1)))
				: 1
			if (newItem.upd.UnlimitedCount)
				delete newItem.upd.UnlimitedCount
			let durabMult = 1
			//Temporarily not lowering armor durability
			if (itemdb[newItem._tpl]._props.Durability && durabFilter.includes(FRET.filterItemType(newItem._tpl)))
			{
				durabMult = RandomUtil.getFloat(0.5 * (playerLL / 10 + 1),0.9 * (playerLL / 50 + 1))
				barter ? durabMult += (1 - (durabMult * 0.5)) : null
				console.log(durabMult)
				durabMult > 0.98 ? durabMult = 0.98 : null
				newItem.upd.Repairable = {
					"MaxDurability": Math.round((itemdb[newItem._tpl]._props.Durability * durabMult) * 1000) / 1000,
					"Durability": Math.round((itemdb[newItem._tpl]._props.Durability * durabMult) * 1000) / 1000
				}
				newItem.Fin = {"Repairable" : {
					"MaxDurability" : newItem.upd.Repairable.MaxDurability,
					"Durability" : newItem.upd.Repairable.Durability
				}}
			}
			if(["5696686a4bdc2da3298b456a", "5449016a4bdc2d6f028b456f", "569668774bdc2da2298b4568"].includes(newBarter[0][0]._tpl))
				newBarter[0][0].count = Math.round((newBarter[0][0].count * (config.price_multipliers[cat] > 1 ? config.price_multipliers[cat]  : 1) * (durabMult < 1 ? (1 - (0.5 * (1 - durabMult) ) ) : 1)) * 1000) / 1000
			// outputInventory.nextResupply = asset.nextUpdateTime < TimeUtil.getTimestamp() ? TimeUtil.getTimestamp() : asset.nextUpdateTime
			outputInventory.items.push(newItem)
			outputInventory.items.push(...children)
			outputInventory.barter_scheme[newItem._id] = newBarter
			outputInventory.loyal_level_items[newItem._id] = newLLI
		}
		return outputInventory
	}
	
	static reduceItemSellPricesByCategory()
	{
		let priceMults = {
			"guns": 			1,
			"ammo": 			1,
			"throwables": 		1,
			"vitalMods": 		1,
			"optionalMods": 	0.5,
			"armors": 			0.75,
			"helmets": 			1,
			"eyewear": 			1,
			"backpack": 		1,
			"magazine":			1,
			"rig": 				1,
			"headset": 			1,
			"barter": 			1,
			"melee": 			1,
			"tech":				0.4,
			"meds": 			1,
			"food": 			1,
			"other":			1
		}
		for (let id in itemdb)
		{
			let cat = FRET.filterItemType(id)
			let hbEntry = handbook.Items.find(i => i.Id == id)
			if (!hbEntry)
				continue
			if (!hbEntry.origPrice)
				hbEntry.origPrice = hbEntry.Price
			else
				hbEntry.Price *= priceMults[cat]
		}
	}
	
	static consolidateTraderInventory(traderId)
	{
		let trader = JsonUtil.clone(traders[traderId].assort)
		for (let item in trader.items)
			if ((trader.items[item].upd && trader.items[item].upd.StackObjectsCount) && (config.condense_identical_items_into_one_stack || trader.items[item].upd.StackObjectsCount > 1))
				for (let matchingItem = 0; matchingItem < trader.items.length; matchingItem++)
				{
					let itemTpl = trader?.items?.[item]?._tpl
					let matchTpl = trader?.items?.[matchingItem]?._tpl
					let itemId = trader?.items?.[item]?._id
					let matchId = trader?.items?.[matchingItem]?._id
					if ([itemTpl, matchTpl, itemId, matchId].includes(undefined))
						continue
					if (
						(itemTpl == matchTpl && itemId != matchId)
						&& 
						(trader.barter_scheme[matchId] && trader.barter_scheme[itemId]
						&& trader.barter_scheme[matchId].toString() == trader.barter_scheme[itemId].toString())
						)
						{
							trader.items[item].upd.StackObjectsCount += trader.items[matchingItem].upd.StackObjectsCount
							trader.items.splice(matchingItem, 1)
							delete trader.barter_scheme[matchId]
							delete trader.loyal_level_items[matchId]
						}
				}
		traders[traderId].assort = JsonUtil.clone(trader)
	}
	
	static clearInvalidTradeEntries(traderId)
	{
		for (let index = 0; index < traders[traderId].assort.items.length; index++)
		{
			let tradeId = traders[traderId].assort.items[index]._id
			if (traders[traderId].assort.items[index].parentId == "hideout" && (traders[traderId].assort.barter_scheme[tradeId] == undefined || traders[traderId].assort.loyal_level_items[tradeId] == undefined))
			{
				traders[traderId].assort.items.splice(index, 1)
				index--
			}
		}
	}
	
	static getChildren(traderId, parentId)
	{
		let children = []
		for (let item in origTraders[traderId].assort.items)
			if (origTraders[traderId].assort.items[item].parentId == parentId)
			{
				let newChild = JsonUtil.clone(origTraders[traderId].assort.items[item])
				let newChildId = HashUtil.generate()
				let tempChilds = FRET.getChildren(traderId, newChild._id)
				for (let i in tempChilds)
					if (tempChilds[i].parentId == newChild._id)
						tempChilds[i].parentId = newChildId
				newChild._id = newChildId
				children.push(newChild)
				children.push(...tempChilds)
			}
		return children
	}
	
	static findLostChildren(traderId)
	{
		for (let item in traders[traderId].assort.items)
		{
			let index = item
			item = traders[traderId].assort.items[item]
			if (item.parentId != "hideout" && traders[traderId].assort.items.filter(i => i._id == item.parentId).length == 0)
				console.log(`${traders[traderId]} ${item._id}`)
		}
	}
	
	//Types:
	// guns
	// ammo
	// throwables
	// vitalMods
	// optionalMods
	// helmets
	// armors
	// eyewear
	// backpack
	// magazine
	// rig
	// headset
	// barter
	// melee
	// tech
	// meds
	// food
	static filterItemType(itemId, debug)
	{
		let item = database.templates.items[itemId]
		if (item._props.Damage && item._props.Damage > 0 || ["5485a8684bdc2da71d8b4567", "543be5cb4bdc2deb348b4568"].includes(item._parent)) //Bullet / grenade
			return "ammo"
		else if (["543be6564bdc2df4348b4568"].includes(item._parent)) //Throwables
			return "throwables"
		else if (item._props.weapUseType && item._props.weapUseType != "") //Guns
			return "guns"
		else if (["5a341c4086f77401f2541505"].includes(item._parent) && item._props.armorClass && item._props.armorClass > 0) //Helmets
			return "helmets"
		else if (item._props.armorClass && item._props.armorClass > 0) //Body armor
			return "armors"
		else if (["5448e5724bdc2ddf718b4568"].includes(item._parent)) //Eyewear
			return "eyewear"
		else if (["5448e53e4bdc2d60728b4567"].includes(item._parent)) //Backpack
			return "backpack"
		else if (["5448bc234bdc2d3c308b4569"].includes(item._parent)) //Magazine
			return "magazine"
		else if (["5448e5284bdc2dcb718b4567"].includes(item._parent)) //Rig
			return "rig"
		else if (["5645bcb74bdc2ded0b8b4578"].includes(item._parent)) //Headset
			return "headset"
		else if (["5d650c3e815116009f6201d2"].includes(item._parent)) //Barter
			return "barter"
		else if (["5447e1d04bdc2dff2f8b4567"].includes(item._parent)) //Melee
			return "melee"
		else if (["5d21f59b6dbe99052b54ef83", "5a2c3a9486f774688b05e574"].includes(item._parent)) //Tech
			return "tech"
		else if (["5448f3ac4bdc2dce718b4569", "5448f39d4bdc2d0a728b4568", "5448f3a14bdc2d27728b4569"].includes(item._parent)) //Meds
			return "meds"
		else if (["5448f3a64bdc2d60728b456a"].includes(item._parent)) //Stims
			return "stims"
		else if (["5448e8d64bdc2dce718b4568"].includes(item._parent)) //Food
			return "food"
		else if (vitalMods.includes(itemId)) //Vital Mods
			return "vitalMods"
		else if (optionalMods.includes(itemId)) //Optional Mods
			return "optionalMods"
		else
		{
			return "other"
		}
	}
	
	static runOnRaidEnd(url, info, sessionID)
	{
		
		return(FRET.nullResponse())
	}
	
	static runOnRaidStart(url, info, sessionID, output)
	{
		FRET.disableFence()

		FRET.saveTraderInventories()
		return(output)
	}
	
	static runOnGameStart(url, info, sessionID, output)
	{
		FRET.disableFence()

		sessionId = sessionID
		let updateAt = 0
		let timeToNextUpdate = updateAt - TimeUtil.getTimestamp();
		timeToNextUpdate < 0 ? timeToNextUpdate = 0 : null
		FRET.grabConfigValues()
		FRET.main()
		FRET.reduceItemSellPricesByCategory()
		timerInterval = setInterval(FRET.rotateTraderInventories, (timeToNextUpdate * 1000) + 1000)
		if (debugMode == true)
			for (let traderId in traders)
				FRET.saveToFile(traders[traderId].assort, `z${traderIds[traderId]}.json`)
		return(output)
	}
	
	static clearString(s)
    {
        return s.replace(/[\b]/g, "")
            .replace(/[\f]/g, "")
            .replace(/[\n]/g, "")
            .replace(/[\r]/g, "")
            .replace(/[\t]/g, "")
            .replace(/[\\]/g, "");
    }

    static getBody(data, err = 0, errmsg = null)
    {
        return FRET.clearString(FRET.getUnclearedBody(data, err, errmsg));
    }

    static nullResponse()
    {
        return FRET.getBody(null);
    }
	
	static getUnclearedBody(data, err = 0, errmsg = null)
    {
        return FRET.serialize({
            "err": err,
            "errmsg": errmsg,
            "data": data
        });
    }
	
	static serialize(data, prettify = false)
    {
        if (prettify)
        {
            return JSON.stringify(data, null, "\t");
        }
        else
        {
            return JSON.stringify(data);
        }
    }
	
	static replaceAKIFunctions()
	{
		TradeController.incrementAssortBuyCount = function(traderId, assortId, itemCount)
		{
			const isFence = traderId === TraderHelper.TRADER.Fence;
			const traderAssorts = isFence
				? TraderController.fenceAssort.items
				: DatabaseServer.tables.traders[traderId].assort.items;

			const relatedAssortIndex = traderAssorts.findIndex(i => i._id === assortId);

			if (isFence)
			{
				traderAssorts.splice(relatedAssortIndex, 1);
				return;
			}

			const itemToUpdate = traderAssorts[relatedAssortIndex];
			if (itemToUpdate)
			{
				itemToUpdate.upd.BuyRestrictionCurrent += itemCount;
				//////////////////////////////////////////////////
				if (itemToUpdate.upd.StackObjectsCount)
					itemToUpdate.upd.StackObjectsCount -= itemCount
				//////////////////////////////////////////////////
			}
		}
		InventoryController.addItem = function(pmcData, body, output, sessionID, callback, foundInRaid = false, addUpd = null)
		{
			//////////////////////////////////////////////////
			let traderId = body.tid
			let tradeId = body.items[0].item_id
			let trade = traders[traderId].assort.items.find(i => i._id == tradeId)
			
			if (trade && trade.Fin)
				addUpd = trade.Fin
			//////////////////////////////////////////////////
			
			const itemLib = [];
			const itemsToAdd = [];

			for (const baseItem of body.items)
			{
				if (baseItem.item_id in DatabaseServer.tables.globals.ItemPresets)
				{
					const presetItems = JsonUtil.clone(DatabaseServer.tables.globals.ItemPresets[baseItem.item_id]._items);
					itemLib.push(...presetItems);
					baseItem.isPreset = true;
					baseItem.item_id = presetItems[0]._id;
				}
				else if (PaymentController.isMoneyTpl(baseItem.item_id))
				{
					itemLib.push({ _id: baseItem.item_id, _tpl: baseItem.item_id });
				}
				else if (body.tid === TraderHelper.TRADER.Fence)
				{
					const fenceItem = TraderController.fenceAssort.items;
					const item = fenceItem[fenceItem.findIndex(i => i._id === baseItem.item_id)];

					// handle when item being bought is preset
					if (item.upd.presetId)
					{
						const presetItems = JsonUtil.clone(DatabaseServer.tables.globals.ItemPresets[item.upd.presetId]._items);
						itemLib.push(...presetItems);
						baseItem.isPreset = true;
						baseItem.item_id = presetItems[0]._id;
					}
					else
					{
						itemLib.push({ _id: baseItem.item_id, _tpl: item._tpl });
					}
				}
				else
				{
					// Only grab the relevant trader items and add unique values
					const traderItems = TraderController.getAssort(sessionID, body.tid).items;
					const relevantItems = ItemHelper.findAndReturnChildrenAsItems(traderItems, baseItem.item_id);
					const toAdd = relevantItems.filter(traderItem => !itemLib.some(item => traderItem._id === item._id));
					itemLib.push(...toAdd);
				}

				for (const item of itemLib)
				{
					if (item._id === baseItem.item_id)
					{
						const tmpItem = ItemHelper.getItem(item._tpl)[1];
						const itemToAdd = { itemRef: item, count: baseItem.count, isPreset: baseItem.isPreset };
						let MaxStacks = 1;

						// split stacks if the size is higher than allowed by StackMaxSize
						if (baseItem.count > tmpItem._props.StackMaxSize)
						{
							let count = baseItem.count;
							const calc = baseItem.count - (Math.floor(baseItem.count / tmpItem._props.StackMaxSize) * tmpItem._props.StackMaxSize);

							MaxStacks = (calc > 0) ? MaxStacks + Math.floor(count / tmpItem._props.StackMaxSize) : Math.floor(count / tmpItem._props.StackMaxSize);

							for (let sv = 0; sv < MaxStacks; sv++)
							{
								if (count > 0)
								{
									const newItemToAdd = JsonUtil.clone(itemToAdd);
									if (count > tmpItem._props.StackMaxSize)
									{
										count = count - tmpItem._props.StackMaxSize;
										newItemToAdd.count = tmpItem._props.StackMaxSize;
									}
									else
									{
										newItemToAdd.count = count;
									}
									itemsToAdd.push(newItemToAdd);
								}
							}
						}
						else
						{
							itemsToAdd.push(itemToAdd);
						}
						// stacks prepared
					}
				}
			}

			// Find an empty slot in stash for each of the items being added
			let StashFS_2D = PlayerController.getStashSlotMap(pmcData, sessionID);

			for (const itemToAdd of itemsToAdd)
			{
				const itemSize = InventoryHelper.getItemSize(itemToAdd.itemRef._tpl, itemToAdd.itemRef._id, itemLib);
				const findSlotResult = ContainerHelper.findSlotForItem(StashFS_2D, itemSize[0], itemSize[1]);

				if (findSlotResult.success)
				{
					/* Fill in the StashFS_2D with an imaginary item, to simulate it already being added
					* so the next item to search for a free slot won't find the same one */
					const itemSizeX = findSlotResult.rotation ? itemSize[1] : itemSize[0];
					const itemSizeY = findSlotResult.rotation ? itemSize[0] : itemSize[1];

					try
					{
						StashFS_2D = ContainerHelper.fillContainerMapWithItem(StashFS_2D, findSlotResult.x, findSlotResult.y, itemSizeX, itemSizeY);
					}
					catch (err)
					{
						Logger.error(`fillContainerMapWithItem returned with an error${typeof err === "string" ? ` -> ${err}` : ""}`);
						return HttpResponse.appendErrorToOutput(output, "Not enough stash space");
					}

					itemToAdd.location = { x: findSlotResult.x, y: findSlotResult.y, rotation: findSlotResult.rotation };
				}
				else
				{
					return HttpResponse.appendErrorToOutput(output, "Not enough stash space");
				}
			}

			// We've succesfully found a slot for each item, let's execute the callback and see if it fails (ex. payMoney might fail)
			try
			{
				if (typeof callback === "function")
				{
					callback();
				}
			}
			catch (err)
			{
				const message = typeof err === "string" ? err : "An unknown error occurred";
				return HttpResponse.appendErrorToOutput(output, message);
			}

			for (const itemToAdd of itemsToAdd)
			{
				let newItem = HashUtil.generate();
				const toDo = [[itemToAdd.itemRef._id, newItem]];
				let upd = { "StackObjectsCount": itemToAdd.count };

				//if it is from ItemPreset, load preset's upd data too.
				if (itemToAdd.isPreset)
				{
					for (const updID in itemToAdd.itemRef.upd)
					{
						upd[updID] = itemToAdd.itemRef.upd[updID];
					}
				}

				// add ragfair upd properties
				if (addUpd)
				{
					upd = { ...addUpd, ...upd };
				}

				// hideout items need to be marked as found in raid
				// or in case people want all items to be marked as found in raid
				if (foundInRaid || InventoryConfig.newItemsMarkedFound)
				{
					upd.SpawnedInSession = true;
				}

				if (upd.UnlimitedCount)
				{
					delete upd.UnlimitedCount;
				}
				// upd.Repairable = {
							// "MaxDurability": 50,
							// "Durability": 25
						// }
				output.profileChanges[sessionID].items.new.push({
					"_id": newItem,
					"_tpl": itemToAdd.itemRef._tpl,
					"parentId": pmcData.Inventory.stash,
					"slotId": "hideout",
					"location": { "x": itemToAdd.location.x, "y": itemToAdd.location.y, "r": itemToAdd.location.rotation ? 1 : 0 },
					"upd": upd
				});

				pmcData.Inventory.items.push({
					"_id": newItem,
					"_tpl": itemToAdd.itemRef._tpl,
					"parentId": pmcData.Inventory.stash,
					"slotId": "hideout",
					"location": { "x": itemToAdd.location.x, "y": itemToAdd.location.y, "r": itemToAdd.location.rotation ? 1 : 0 },
					"upd": upd
				});

				// If this is an ammobox, add cartridges to it.
				// Damaged ammo box are not loaded.
				const itemInfo = ItemHelper.getItem(itemToAdd.itemRef._tpl)[1];
				const ammoBoxInfo = itemInfo._props.StackSlots;

				if (ammoBoxInfo !== undefined && itemInfo._name.indexOf("_damaged") < 0)
				{
					// Cartridge info seems to be an array of size 1 for some reason... (See AmmoBox constructor in client code)
					let maxCount = ammoBoxInfo[0]._max_count;
					const ammoTmplId = ammoBoxInfo[0]._props.filters[0].Filter[0];
					const ammoStackMaxSize = ItemHelper.getItem(ammoTmplId)[1]._props.StackMaxSize;
					const ammos = [];
					let location = 0;

					while (maxCount > 0)
					{
						const ammoStackSize = maxCount <= ammoStackMaxSize ? maxCount : ammoStackMaxSize;
						ammos.push({
							"_id": HashUtil.generate(),
							"_tpl": ammoTmplId,
							"parentId": toDo[0][1],
							"slotId": "cartridges",
							"location": location,
							"upd": { "StackObjectsCount": ammoStackSize }
						});

						location++;
						maxCount -= ammoStackMaxSize;
					}

					for (const item of [output.profileChanges[sessionID].items.new, pmcData.Inventory.items])
					{
						item.push.apply(item, ammos);
					}
				}

				while (toDo.length > 0)
				{
					for (const tmpKey in itemLib)
					{
						if (itemLib[tmpKey].parentId && itemLib[tmpKey].parentId === toDo[0][0])
						{
							newItem = HashUtil.generate();

							const SlotID = itemLib[tmpKey].slotId;

							// if it is from ItemPreset, load preset's upd data too.
							if (itemToAdd.isPreset)
							{
								upd = { "StackObjectsCount": itemToAdd.count };

								for (const updID in itemLib[tmpKey].upd)
								{
									upd[updID] = itemLib[tmpKey].upd[updID];
								}

								if (foundInRaid || InventoryConfig.newItemsMarkedFound)
								{
									upd.SpawnedInSession = true;
								}
							}
							if (SlotID === "hideout")
							{
								output.profileChanges[sessionID].items.new.push({
									"_id": newItem,
									"_tpl": itemLib[tmpKey]._tpl,
									"parentId": toDo[0][1],
									"slotId": SlotID,
									"location": { "x": itemToAdd.location.x, "y": itemToAdd.location.y, "r": "Horizontal" },
									"upd": upd
								});
								pmcData.Inventory.items.push({
									"_id": newItem,
									"_tpl": itemLib[tmpKey]._tpl,
									"parentId": toDo[0][1],
									"slotId": itemLib[tmpKey].slotId,
									"location": { "x": itemToAdd.location.x, "y": itemToAdd.location.y, "r": "Horizontal" },
									"upd": upd
								});
							}
							else
							{
								const itemLocation = {};

								if (itemLib[tmpKey]["location"] !== undefined)
								{
									itemLocation["location"] = itemLib[tmpKey]["location"];
								}

								output.profileChanges[sessionID].items.new.push({
									"_id": newItem,
									"_tpl": itemLib[tmpKey]._tpl,
									"parentId": toDo[0][1],
									"slotId": SlotID,
									...itemLocation,
									"upd": upd
								});
								pmcData.Inventory.items.push({
									"_id": newItem,
									"_tpl": itemLib[tmpKey]._tpl,
									"parentId": toDo[0][1],
									"slotId": itemLib[tmpKey].slotId,
									...itemLocation,
									"upd": upd
								});
							}

							toDo.push([itemLib[tmpKey]._id, newItem]);
						}
					}

					toDo.splice(0, 1);
				}
			}
			//////////////////////////////////////////////////
			FRET.saveTraderInventories()
			//////////////////////////////////////////////////
			return output;
		}
	}
}

class ExhaustableArray
{
    constructor(itemPool)
    {
        this.pool = JsonUtil.clone(itemPool);
    }

    getRandomValue()
    {
        if (!this.pool || !this.pool.length)
        {
            return null;
        }

        const index = RandomUtil.getInt(0, this.pool.length - 1);
        const toReturn = JsonUtil.clone(this.pool[index]);
        this.pool.splice(index, 1);
        return toReturn;
    }
	
	getFirstValue()
    {
        if (!this.pool || !this.pool.length)
        {
            return null;
        }

        const index = 0;
        const toReturn = JsonUtil.clone(this.pool[index]);
        this.pool.splice(index, 1);
        return toReturn;
    }

    hasValues()
    {
        if (this.pool && this.pool.length)
        {
            return true;
        }

        return false;
    }

}
let RD = 10801
module.exports.FRET = FRET;