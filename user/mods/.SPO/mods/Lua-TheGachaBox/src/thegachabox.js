"use strict"

const pkg = require("../package.json");
const modConfig = require("../config/config.json");
const modLocale = require("../assets/locale.json");
const gachaStock = require("../assets/stock.json");
const modName = `${pkg.author}-${pkg.name}`;
const modPath = `${ModLoader.getModPath(modName)}`;
const loadingId = modName;
const ws = HttpServer.webSockets;
const database = DatabaseServer.tables;
const itemdb = database.templates.items;
const traders = database.traders;
const locales = database.locales.global;
const bots = database.bots.types;
const presets = database.globals.ItemPresets;
const akiFuncptr = {"SendImage": null, "ConfirmTrading": null, "UpdateTraders": null, "ClientLocale": null};
const itemNodes = {};
const itemNodesAll = {};
const itemBgColors = [];
const gachaList = {};
const buylimit = 20;
let loading;
let modPools = [];
let gachaDefaultList = {};
if (!gachaStock.locale) gachaStock.locale = "en";
let currentLocale = gachaStock.locale;

class TheGachaBox {
    static onLoadMod() {
        Logger.info(`Loading: ${modName} ${pkg.version}${__DEBUG ? " [DEBUG]" : ""}${modConfig.CHEATS.Enable ? "   >>> [CHEATER] <<<" : ""}`);
		if (!TheGachaBox.init()) return;
		for (const n in akiFuncptr) if (!akiFuncptr[n] || typeof(akiFuncptr[n]) !== "function")
			return TheGachaBox.log("error", `${modName} - Failed to find SPT-Aki function pointer "${n}", mod disabled...`);

		TheGachaBox.createGachaBox();
		TheGachaBox.serverItem(true);
		loading = setInterval(TheGachaBox.loading, 100);
    }

	static loading() {
		if (Object.keys(ws).length > 0 || ProfileController.sessionId || __DEBUG) {
			if (!ProfileController.sessionId) ProfileController.sessionId = Object.keys(ws)[0];
			TheGachaBox.loadGachaList();
			TheGachaBox.fillGachaBox();
			TheGachaBox.cleanStock();

			const len = Object.keys(gachaList).length;
			TheGachaBox.log("success", `${modName} @ Total ${len} Gacha ${len > 1 ? "boxes" : "box"} loaded!`);

			clearInterval(loading);
			loading = 1;

			const text = [
				"5ae44bfe86f7744d733e560c",
				"5ab0f32686f7745dd409f576",
				"5a8fd75188a45036844e0b0a",
				"5ab0f32686f7745dd409f5a6",
				"5ae4536b86f7741b747a04e9",
				"5ae9c25086f77415a869b601",
				"5ae9e3f386f774346013b844",
				"5d25dbd086f77443e625e380",
				"5d25cf5d86f77408251c422b",
				"60ed4e2ca664b027ab1441c7",
				"609a2b52a370660c971129f1"
			]
			TheGachaBox.serverItem(false);
			if (ProfileController.sessionId && SaveServer.profiles[ProfileController.sessionId] && !SaveServer.profiles[ProfileController.sessionId].info.wipe) {
				const messageContent = {
					"templateId": text[RandomUtil.getInt(0, text.length-1)],
					"type": DialogueController.getMessageTypeValue("questSuccess"),
					"maxStorageTime": 1800
				};
				DialogueController.addDialogueMessage(pkg.name, messageContent, ProfileController.sessionId, [{_id: HashUtil.generate(), _tpl: "5449016a4bdc2d6f028b456f", upd: {StackObjectsCount: RandomUtil.getInt(1, 690)}}]);
			}
		}
	}

	static loadGachaList() {
        const files = VFS.getFiles(`${modPath}config/gacha/`);
        for (const file of files)
        {
            if (VFS.getFileExtension(file).toLowerCase() === "json")
            {
				const filename = VFS.stripExtension(file);
                let fileContents = JsonUtil.deserialize(VFS.readFile(`${modPath}config/gacha/${file}`));
				for (const name in fileContents) {
					const gachaName = filename+"-"+name;
					gachaList[gachaName] = fileContents[name];
				}
            }
        }

		for (let i in itemdb) {
			const item = itemdb[i];
			const bgcolor = item._props.BackgroundColor;
			if (bgcolor && bgcolor.length > 0 && !itemBgColors.includes(bgcolor))
				itemBgColors.push(bgcolor);
			if (item._type !== "Node") continue;

			itemNodesAll[item._name] = item._id;
			for (let j in itemdb) {
				if (itemdb[j]._type === "Node") continue;
				if (itemdb[j]._parent === item._id) {
					itemNodes[item._name] = item._id;
					break;
				}
			}
		}

		for (let i in bots) {
			const botMods = bots[i].inventory.mods;
			if (!botMods || Object.keys(botMods).length === 0)
				continue;

			for (const tpl in botMods) {
				if (!modPools[tpl]) {
					modPools[tpl] = {...botMods[tpl]};
					continue;
				}

				for (const slot in botMods[tpl]) {
					if (!modPools[tpl][slot]) {
						modPools[tpl][slot] = [...botMods[tpl][slot]];
						continue;
					}

					for (const slotIndex in modPools[tpl][slot]) {
						const modTpl = modPools[tpl][slot][slotIndex];
						if (!modPools[tpl][slot].includes(modTpl)) {
							modPools[tpl][slot].push(modTpl);
						}
					}
				}
			}
		}

		for (const i in itemdb) {
			const item = itemdb[i];
			if (!item._props || !item._props.weapClass || !item._props.Slots)
				continue;
			
			const tpl = item._id;
			for (const mod of item._props.Slots) {
				if (!mod._props || !mod._props.filters)
					continue;

				const slot = mod._name;
				for (const filter of mod._props.filters) {
					if (!filter.Filter || filter.Filter.length === 0)
						continue;
					
					for (const modTpl of filter.Filter) {
						if (!modPools[tpl]) modPools[tpl] = {};
						if (!modPools[tpl][slot]) modPools[tpl][slot] = [];
						if (!modPools[tpl][slot].includes(modTpl)) {
							modPools[tpl][slot].push(modTpl);
						}
					}
				}
			}
		}

		for (let i in presets) {
			const preset = presets[i];
			const _items = preset._items;
			const itemId = preset._encyclopedia || preset._items[0]._tpl;
			const parentId = preset._parent;
			if (!_items || _items.length < 2)
				continue;
			
			for (const item of _items) {
				const itemTpl = item._tpl;
				const slot = item.slotId;
				const parent = item.parentId; 
				if (!slot || !parent)
					continue;
				
				if (parent === parentId) {
					if (!modPools[itemId]) modPools[itemId] = {};
					if (!modPools[itemId][slot]) modPools[itemId][slot] = [itemTpl];
					else if (!modPools[itemId][slot].includes(itemTpl)) {
						modPools[itemId][slot].push(itemTpl);
				}
				// } else { // WIP
				// 	let itemSlot;
				// 	switch (slot)
				// 	{
				// 		case "patron_in_weapon":
				// 		case "patron_in_weapon_000":
				// 		case "patron_in_weapon_001":
				// 			itemSlot = items[itemId]._props.Chambers.find(c => c._name.includes(slot));
				// 			break;
				// 		default:
				// 			itemSlot = items[itemId]._props.Slots.find(s => s._name === slot);
				// 			break;
				// 	}
				// 	if (itemSlot) {
				// 		if (!modPools[itemId]) modPools[itemId] = {};
				// 		if (!modPools[itemId][slot]) modPools[itemId][slot] = [itemTpl];
				// 		else if (!modPools[itemId][slot].includes(itemTpl)) {
				// 			modPools[itemId][slot].push(itemTpl);
				// 		}
				// 	}
				}
			}
		}

		gachaDefaultList = {...gachaList};
	}

	static serverItem(add) {
		const assort = traders[pkg.name].assort;
		if (add) {
			itemdb[loadingId] = JsonUtil.clone(itemdb["60b0f7057897d47c5b04ab94"]);

			for (const lang in locales) {
				const time = locales[lang].interface["NetworkError/TooManyFriendRequestsMessage"].replace("{0}", "90");
				locales[lang].templates[loadingId] = {
					"Description": `SPT-Aki ${locales[lang].interface["Connection to server lost"]}\n${locales[lang].interface["Connecting to server"]} ${time}\n-Lua`,
					"Name": "Lizard Gamble stock" + pkg.version,
					"ShortName": time
				};
			}

			itemdb[loadingId]._id = loadingId;
			itemdb[loadingId]._parent = "5447e0e74bdc2d3c308b4567";
			itemdb[loadingId]._props.Width = 10;
			itemdb[loadingId]._props.Height = 6;

			const dummy = {
				_id: loadingId,
				_tpl: loadingId,
				parentId: "hideout",
				slotId: "hideout",
				upd: {
					UnlimitedCount: false,
					StackObjectsCount: 0
				}
			};
			assort.items.push(dummy);
			assort.barter_scheme[loadingId] = [[{count: 1, _tpl: "590c2e1186f77425357b6124"}]];
			assort.loyal_level_items[loadingId] = 1;
		} else {
			for (const i in assort.items) {
				if (assort.items[i]._id === loadingId) {
					assort.items.splice(i, 1);
					break;
				}
			}
			delete assort.barter_scheme[loadingId];
			delete assort.loyal_level_items[loadingId];
		}
	}

    static createGachaBox() {
		traders[pkg.name] = {
			base: JsonUtil.deserialize(VFS.readFile(`${modPath}assets/base.json`)),
			assort: {
				items: [],
				barter_scheme: {},
				loyal_level_items: {},
			}
		};
		traders[pkg.name].base.nextResupply = TimeUtil.getTimestamp()+604800;
		
		for (const lang in locales) {
			locales[lang].trading[pkg.name] = {
				Description: "Some shit I dug up",
				FirstName: traders[pkg.name].base.name,
				FullName: traders[pkg.name].base.name,
				Location: traders[pkg.name].base.location,
				Nickname: traders[pkg.name].base.nickname
			};
		}
    }

    static fillGachaBox() {
		if (!gachaList || Object.keys(gachaList).length === 0) return;

		const weaponNodes = ["Item", "Weapon", ...TheGachaBox.getSubNodes("Weapon")];
		for (const gachaName in gachaList) {
			const gacha = gachaList[gachaName];

			let badDummy = false;
			const isDummyPresetAndTpl = TheGachaBox.isPreset(gacha.BaseDummyItem, gachaName);
			if (!isDummyPresetAndTpl) {
				if (!gacha.BaseDummyItem || itemdb[gacha.BaseDummyItem] === undefined) {
					badDummy = true;
				}
			} else if (isDummyPresetAndTpl === "_BadPreset_" || isDummyPresetAndTpl[6] === ":") { // only weapon preset accepted
				badDummy = true;
			}

			if (badDummy) {
				TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "BaseDummyItem" (${gacha.BaseDummyItem}), Skipping...`);
				continue;
			}

			if (!gacha.PrizeList || gacha.PrizeList.length === 0) {
				TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has empty "PrizeList", Skipping...`);
				continue;
			}

			for (const lang in locales) {
				locales[lang].templates[gachaName] = {
					"Description": (!gacha.ShowPrizeList) ? gacha.Description : gacha.Description + "\n===========================================",
					"Name": gacha.Name,
					"ShortName": gacha.Name
				};
			}

			// Prize List Check
			for (let i = 0; i < gacha.PrizeList.length; i++) {
				const prize = gacha.PrizeList[i];
				if (!TheGachaBox.isChanceValid(prize.Chance)) {
					TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "PrizeList.Chance" (${prize.Chance}), Removed...`);
					gacha.PrizeList.splice(i--, 1);
					continue;
				}

				if (!TheGachaBox.isCountValid(prize.Count, prize.Item)) {
					TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "PrizeList.Count" (${prize.Count}), Removed...`);
					gacha.PrizeList.splice(i--, 1);
					continue;
				}

				const check = TheGachaBox.isItemAndPresetValid(prize.Item, gachaName, prize.AllowQuestItems, prize.ExcludedItems);
				if (check !== true) {
					switch(check) {
						case "missing":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has missing "Item" property in "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
						case "none":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has item node for "PrizeList.Item" (${prize.Item}) but no related items found, Removed...`);
							break;
						case "blacklist":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has blacklisted "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
						case "badpreset":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad preset for "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
						case "noquest":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has quest item without allow option for "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
						case "notexist":
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has non-exist item for "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
						default:
							TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "PrizeList.Item" (${prize.Item}), Removed...`);
							break;
					}

					gacha.PrizeList.splice(i--, 1);
					continue;
				}

				if (gacha.ShowPrizeList) {
					const isItem = TheGachaBox.isItem(prize.Item);
					const isPresetAndTpl = TheGachaBox.isPreset(prize.Item, gachaName);
					for (const lang in locales) {
						let localeItem = prize.Item;
						if (localeItem.toLowerCase() === "item")
							localeItem = modLocale[lang].Random + " " + modLocale[lang].Items;
						else if (isPresetAndTpl && isPresetAndTpl !== "_BadPreset_") {
							const presetName = prize.Item.substring(7);
							if (isPresetAndTpl[6] === ":") localeItem = `[${modLocale[lang].Items} ${locales[lang].interface.Builds}] ${presetName}`;
							else localeItem = `[${locales[lang].interface["WEAPON BUILDS"]}] ${presetName} @ ${locales[lang].templates[isPresetAndTpl].Name}`;
						}
						else if (locales[lang].templates[itemNodesAll[prize.Item]] !== undefined)
							localeItem = modLocale[lang].Random + " " + locales[lang].templates[itemNodesAll[prize.Item]].Name;
						else if (locales[lang].interface[itemNodesAll[prize.Item]] !== undefined)
							localeItem = modLocale[lang].Random + " " + locales[lang].interface[itemNodesAll[prize.Item]];
						else if (itemdb[localeItem])
							localeItem = itemdb[localeItem]._name;

						let localeCount = "";
						if (prize.Count === 1) {}
						else if (typeof(prize.Count) === "string") {
							const nums = TheGachaBox.isMinMaxNumber(prize.Count);
							if (nums) {
								const minPercent = nums[0].includes("%");
								const maxPercent = nums[1].includes("%");
								if (parseFloat(nums[0]) > parseFloat(nums[1]) && ((!minPercent && !maxPercent) || (minPercent && maxPercent))) nums[1] = nums[0];
								if (nums[0] !== 1 && nums[1] !== 1) localeCount = `  x${nums[0]}${(nums[0] !== nums[1]) ? " ~ "+nums[1] : ""}`;
							} else {
								switch(prize.Count.toLowerCase()) {
									case "random":
										localeCount = "  x"+modLocale[lang].Random;
										break;
									case "min":
										localeCount = "  x"+modLocale[lang].Min;
										break;
									case "max":
										localeCount = "  x"+modLocale[lang].Max;
										break;
								}
							}
						} else localeCount  = "  x"+prize.Count;

						let localeChance = "";
						let localeBuildChance = "";
						if (gacha.ShowPrizeChance) {
							if (prize.Chance >= 100) localeChance = " 100.0 %  |  ";
							else if (prize.Chance >= 10) localeChance = `  ${prize.Chance.toFixed(1)} %  |  `;
							else localeChance = `   ${prize.Chance.toFixed(1)} %  |  `;
							if (!isPresetAndTpl && prize.WeaponPrebuilChance && ((isItem && itemdb[prize.Item]._props.weapClass) || (!isItem && weaponNodes.includes(prize.Item)))) {
								localeBuildChance = `  [+${locales[lang].interface.Builds} ${prize.WeaponPrebuilChance.toFixed(1)} %]`;
							}
						}

						// Long-long and looooooong description
						locales[lang].templates[gachaName].Description += `\n[${i+1}]${(localeChance)}${(!prize.FIR) ? "" : "<FIR> "}${(!isItem) ? localeItem : locales[lang].templates[prize.Item].Name}${localeCount}${(!isPresetAndTpl && prize.AllowNotExaminedItems) ? `  [+${modLocale[lang].NotExaminedItems}]` : ""}${(!isPresetAndTpl && prize.AllowQuestItems) ? `  [+${modLocale[lang].QuestItems}]` : ""}${localeBuildChance}`;
					}
				}
			}

			if (gacha.PrizeList.length === 0) {
				TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has unusable "PrizeList", Skipping...`);
				continue;
			}
	
			// Failed Prize List Check
			if (gacha.FailedPrizeList && gacha.FailedPrizeList.length > 0) {
				if (gacha.ShowFailedPrizeList) {
					for (const lang in locales)
						locales[lang].templates[gachaName].Description += "\n===========================================\n[Failed Prize List]";
				}

				for (let i = 0; i < gacha.FailedPrizeList.length; i++) {
					const failPrize = gacha.FailedPrizeList[i];
					if (!TheGachaBox.isCountValid(failPrize.Count, failPrize.Item)) {
						TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "FailedPrizeList.Count" (${failPrize.Count}), Removed...`);
						gacha.FailedPrizeList.splice(i--, 1);
						continue;
					}

					const check = TheGachaBox.isItemAndPresetValid(failPrize.Item, gachaName, failPrize.AllowQuestItems, failPrize.ExcludedItems);
					if (check !== true) {
						switch(check) {
							case "missing":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has missing "Item" property in "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
							case "none":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has item node for "FailedPrizeList.Item" (${failPrize.Item}) but no related items found, Removed...`);
								break;
							case "blacklist":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has blacklisted "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
							case "badpreset":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad preset for "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
							case "noquest":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has quest item without allow option for "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
							case "notexist":
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has non-exist item for "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
							default:
								TheGachaBox.log("error", `${modName} - Gacha "${gachaName}" has bad "FailedPrizeList.Item" (${failPrize.Item}), Removed...`);
								break;
						}

						gacha.FailedPrizeList.splice(i--, 1);
						continue;
					}
	
					if (gacha.ShowFailedPrizeList) {
						const isItem = TheGachaBox.isItem(failPrize.Item);
						const isPresetAndTpl = TheGachaBox.isPreset(failPrize.Item, gachaName);
						for (const lang in locales) {
							let localeItem = failPrize.Item;
							if (localeItem.toLowerCase() === "item")
								localeItem = modLocale[lang].Random + " " + modLocale[lang].Items;
							else if (isPresetAndTpl && isPresetAndTpl !== "_BadPreset_") {
								const presetName = failPrize.Item.substring(7);
								if (isPresetAndTpl[6] === ":") localeItem = `[${modLocale[lang].Items} ${locales[lang].interface.Builds}] ${presetName}`;
								else localeItem = `[${locales[lang].interface["WEAPON BUILDS"]}] ${presetName} @ ${locales[lang].templates[isPresetAndTpl].Name}`;
							}
							else if (locales[lang].templates[itemNodesAll[failPrize.Item]] !== undefined)
								localeItem = modLocale[lang].Random + " " + locales[lang].templates[itemNodesAll[failPrize.Item]].Name;
							else if (locales[lang].interface[itemNodesAll[failPrize.Item]] !== undefined)
								localeItem = modLocale[lang].Random + " " + locales[lang].interface[itemNodesAll[failPrize.Item]];
							else if (itemdb[localeItem])
								localeItem = itemdb[localeItem]._name;

							let localeCount = "";
							if (failPrize.Count === 1) {}
							else if (typeof(failPrize.Count) === "string") {
								const nums = TheGachaBox.isMinMaxNumber(failPrize.Count);
								if (nums) {
									const minPercent = nums[0].includes("%");
									const maxPercent = nums[1].includes("%");
									if (parseFloat(nums[0]) > parseFloat(nums[1]) && ((!minPercent && !maxPercent) || (minPercent && maxPercent))) nums[1] = nums[0];
									if (nums[0] !== 1 && nums[1] !== 1) localeCount = `  x${nums[0]}${(nums[0] !== nums[1]) ? " ~ "+nums[1] : ""}`;
								} else {
									switch(failPrize.Count.toLowerCase()) {
										case "random":
											localeCount = "  x"+modLocale[lang].Random;
											break;
										case "min":
											localeCount = "  x"+modLocale[lang].Min;
											break;
										case "max":
											localeCount = "  x"+modLocale[lang].Max;
											break;
									}
								}
							} else localeCount  = "  x"+failPrize.Count;

							let localeBuildChance = "";
							if (gacha.ShowPrizeChance) {
								if (!isPresetAndTpl && failPrize.WeaponPrebuilChance && ((isItem && itemdb[failPrize.Item]._props.weapClass) || (!isItem && weaponNodes.includes(failPrize.Item)))) {
									localeBuildChance = `  [+${locales[lang].interface.Builds} ${failPrize.WeaponPrebuilChance.toFixed(1)} %]`;
								}
							}

							// Long-long and looooooong description
							locales[lang].templates[gachaName].Description += `\n  ${(!failPrize.FIR) ? "" : "<FIR> "}${(!isItem) ? localeItem : locales[lang].templates[failPrize.Item].Name}${localeCount}${(!isPresetAndTpl && failPrize.AllowNotExaminedItems) ? `  [+${modLocale[lang].NotExaminedItems}]` : ""}${(!isPresetAndTpl && failPrize.AllowQuestItems) ? `  [+${modLocale[lang].QuestItems}]` : ""}${localeBuildChance}`;
						}
					}
				}

				if (gacha.FailedPrizeList.length === 0) {
					TheGachaBox.log("warning", `${modName} - Gacha "${gachaName}" has unusable "FailedPrizeList"`);
					if (gacha.ShowFailedPrizeList) {
						for (const lang in locales) {
							const desc = locales[lang].templates[gachaName].Description;
							desc = desc.slice(0, desc.lastIndexOf("\n"));
						}
					}
				}
			}

			itemdb[gachaName] = isDummyPresetAndTpl ? JsonUtil.clone(itemdb[isDummyPresetAndTpl]) : JsonUtil.clone(itemdb[gacha.BaseDummyItem]);
			const dummyItem = itemdb[gachaName];
			dummyItem._id = gachaName;
			if (!isDummyPresetAndTpl) {
				if (!dummyItem._props.weapClass) dummyItem._parent = itemNodesAll.SpecItem;
				if (gacha.Width) dummyItem._props.Width = gacha.Width;
				if (gacha.Height) dummyItem._props.Height = gacha.Height;
			}
			if (gacha.BackgroundColor && itemBgColors.includes(gacha.BackgroundColor.toLowerCase()))
				dummyItem._props.BackgroundColor = gacha.BackgroundColor.toLowerCase();

			const assort = traders[pkg.name].assort;

			if (gachaStock[gachaName] === undefined) {
				const update = gacha.RestockTimeInSecond && gacha.RestockTimeInSecond > 0 ? gacha.RestockTimeInSecond : TraderConfig.updateTimeDefault;
				const refresh = Math.floor(TimeUtil.getTimestamp() / update) + 1;
				gachaStock[gachaName] = {buyCount: 0, nextResupply: refresh * update};
			}

			if (gachaStock[gachaName].buyCount === undefined || typeof(gachaStock[gachaName].buyCount) !== "number" || gachaStock[gachaName].buyCount < 0)
				gachaStock[gachaName].buyCount = 0;

			if (gachaStock[gachaName].nextResupply === undefined || typeof(gachaStock[gachaName].nextResupply) !== "number") {
				const update = gacha.RestockTimeInSecond && gacha.RestockTimeInSecond > 0 ? gacha.RestockTimeInSecond : TraderConfig.updateTimeDefault;
				const refresh = Math.floor(TimeUtil.getTimestamp() / update) + 1;
				gachaStock[gachaName].nextResupply = refresh * update;
			} else {
				const update = gacha.RestockTimeInSecond && gacha.RestockTimeInSecond > 0 ? gacha.RestockTimeInSecond : TraderConfig.updateTimeDefault;
				const refresh = Math.floor(TimeUtil.getTimestamp() / update) + 1;
				const nextResupply = refresh * update;
				if (nextResupply < gachaStock[gachaName].nextResupply)
					gachaStock[gachaName].nextResupply = nextResupply;
			}

			if (modConfig.CHEATS.Enable) {
				if (modConfig.CHEATS.ResetStocksOnServerStart)
					gachaStock[gachaName].buyCount = 0;

				if (modConfig.CHEATS.UnlimitedStockForAllGacha) {
					gacha.Stock.UnlimitedCount = true;
					gacha.Stock.StackObjectsCount = 999999;
				}

				if (modConfig.CHEATS.FreeGacha)
					gacha.Price = [{"Item": "5449016a4bdc2d6f028b456f", "Count": 1}];
			}

			gacha.Stock.StackObjectsCount = gacha.Stock.StackObjectsCount-gachaStock[gachaName].buyCount;
			if (gacha.Stock.StackObjectsCount < 0) gacha.Stock.StackObjectsCount = 0;

			gacha.Stock.BuyRestrictionCurrent = 0;
			gacha.Stock.BuyRestrictionMax = buylimit;
			const dummy = {
				_id: gachaName,
				_tpl: gachaName,
				parentId: "hideout",
				slotId: "hideout",
				upd: gacha.Stock
			};

			let mods = [];
			if (!isDummyPresetAndTpl) {
				if (gacha.BaseDummyItemWeaponPrebuilt && dummyItem._props.weapClass && Object.keys(modPools).includes(gacha.BaseDummyItem)) {
					const allMods = {};
					dummyItem._props.Slots.filter(s => allMods[s._name] = 100);
					let loop = 0;
					while(!TheGachaBox.isWeaponValid(mods, gacha.ItemBlacklist)) {
						mods = BotGenerator.generateModsForItem([dummy], modPools, gachaName, itemdb[gacha.BaseDummyItem], allMods);
						if (++loop > 1000) {
							mods = [];
							TheGachaBox.log("error", `${modName} - Failed to prebuilt weapon for "${dummyItem._name}"...`);
							break;
						}
					}
					if (mods.length > 0) {
						dummyItem._props.Width = itemdb[gacha.BaseDummyItem]._props.Width;
						dummyItem._props.Height = itemdb[gacha.BaseDummyItem]._props.Height;
						assort.items = [...assort.items, ...mods];
					}
				}
			} else {
				const presetName = gacha.BaseDummyItem.substring(7);
				const preset = JsonUtil.clone(gacha.ItemPresets[presetName]);
				for (const i in preset.items) {
					const item = preset.items[i];
					if (item._id === preset.root) {
						item._tpl = gachaName;
						item.parentId = "hideout";
						item.slotId = "hideout";
						if (!item.upd) item.upd = gacha.Stock;
						else item.upd = {...gacha.Stock, ...item.upd};
						break;
					}
				}

				let rootId;
				mods = ItemHelper.replaceIDs(null, preset.items);
				for (const item of mods) {
					if (item._tpl === gachaName) {
						rootId = item._id;
						item._id = gachaName;
						break;
					}
				}

				// Just in case when base weapon is not on the top
				for (const item of mods) {
					if (item.parentId === rootId) {
						item.parentId = gachaName
					}
				}
				assort.items = [...assort.items, ...mods];
			}
			if (mods.length === 0) assort.items.push(dummy);

			const barter = [];
			for (const i in gacha.Price) barter.push({count: gacha.Price[i].Count, _tpl: gacha.Price[i].Item});
			assort.barter_scheme[gachaName] = [barter];
			assort.loyal_level_items[gachaName] = (gacha.LoyaltyLevel < 1 || gacha.LoyaltyLevel > traders[pkg.name].base.loyaltyLevels.length) ? 1 : gacha.LoyaltyLevel;
		}
	}

	static cleanStock() {
		for (const gachaName in gachaStock) {
			if (gachaName !== "locale" && !gachaList[gachaName]) delete gachaStock[gachaName];
		}
	}

	static isWeaponValid(itemList, excluded = []) {
		if (!itemList || itemList.length === 0) return false;
		const removeList = [];
        for (let i = 0; i < itemList.length; i++)
        {
			const item = itemList[i];
            const template = database.templates.items[item._tpl];
            if (!template._props.Slots || !template._props.Slots.length)
            {
                continue;
            }

			if (removeList.includes(item._id))
				continue;

			if (TheGachaBox.isBlacklistedItem(item._tpl, null, excluded)) {
				let del = true;
				for (const slot of template._props.Slots)
				{
					if (slot._required) {
						del = false;
						break;
					}
				}
				if (!del) return false;
				else {
					for (const modItem of itemList) {
						if (modItem.parentId === item._id && !removeList.includes(modItem._id)) {
							removeList.push(modItem._id);
						}
					}
					itemList.splice(i--, 1);
				}
			}

            for (const slot of template._props.Slots)
            {
                if (!slot._required)
                {
                    continue;
                }

                const slotItem = itemList.find(i => i.parentId === item._id && i.slotId === slot._name);
                if (!slotItem)
                {
                    return false;
                }
            }
        }
		for (const target of removeList) {
			for (let i = 0; i < itemList.length; i++) {
				if (target._id === itemList[i]._id) {
					itemList.splice(i--, 1);
					break;
				}
			}
		}
		return true;
	}

	static isChanceValid(condition) {
		return (condition && typeof(condition) === "number" && condition > 0 && condition <= 100);
	}

	static isCountValid(condition, item) {
		if (!condition)
			return false;

		if (typeof(condition) === "number" && condition <= 0)
			return false;
	
		if (typeof(condition) === "string") {
			const isPresetItem = TheGachaBox.isPresetItem(item);
			condition = condition.toLowerCase();

			if (isPresetItem && (condition.includes("min") || condition.includes("max") || condition.includes("random") || condition.includes("%")))
				return false;

			if (condition === "random" || condition === "min" || condition === "max")
				return true;

			if (condition.includes(","))
				return TheGachaBox.isMinMaxNumber(condition);

			if (condition.includes("%"))
				return parseFloat(condition) > 0;

			return parseInt(condition) > 0;
		}
	
		return true;
	}

	static isItemAndPresetValid(condition, gachaName, questItems = false, excludedItems = []) {
		if (!condition) return "missing"; 
		const isItem = TheGachaBox.isItem(condition);
		const isPresetAndTpl = TheGachaBox.isPreset(condition, gachaName);
		if (!isItem) {
			if (!isPresetAndTpl) {
				if (typeof(condition) !== "string" || itemNodesAll[condition] === undefined) {
					return "bad";
				}

				let found = false;
				for (const j in itemNodes) {
					if (j === condition || itemdb[itemNodes[j]]._parent === itemNodesAll[condition]) {
						found = true;
						break;
					}
				}

				if (!found) {
					return "none";
				}
			} else if (isPresetAndTpl === "_BadPreset_") {
				return "badpreset";
			}
		} else if (!itemdb[condition]) {
			return "notexist";
		} else if (!questItems && itemdb[condition]._props.QuestItem) {
			return "noquest";
		}

		if (TheGachaBox.isBlacklistedItem(condition, gachaName, excludedItems)) {
			return "blacklist";
		}

		return true;
	}

	static isMinMaxNumber(condition) {
		if (typeof(condition) !== "string")
			return false;

		if (condition.includes(",")) {
			const nums = condition.replace(" ", "").split(",");
			if (nums.length !== 2) return false;

			for (const i of nums) {
				const isPercent = i.includes("%");
				const num = isPercent ? i : parseInt(i);
				if (isPercent) {
					const f = parseFloat(num);
					if (isNaN(f) || f <= 0)
						return false;
				}
				else {
					if (i.toLowerCase() === "min" || i.toLowerCase() === "max") {
						continue;
					}

					if (isNaN(num) || num <= 0)
						return false;
				}
			}
			if (typeof(nums[0]) === "string") {
				if ( (nums[0].toLowerCase() === "max" && (!nums[1].includes("%") || nums[1].includes("%") && parseFloat(nums[1] < 100.0)) ) ||
				nums[0].includes("%") && parseFloat(nums[0]) > 100.0 ||
				nums[1].toLowerCase() === "min") {
					const a = nums[1];
					nums[1] = nums[0];
					nums[0] = a;
				}
			}
			return nums;
		}

		return false;
	}

	static isItem(item) {
		return itemdb[item] && itemdb[item]._type === "Item";
	}

	static isPresetItem(item) {
		return item && typeof(item) === "string" && item.length > 7 && item.toLowerCase().substring(0, 7) === "preset:";
	}

	static isPreset(item, gachaName) {
		if (!TheGachaBox.isPresetItem(item)) return false;
		const gacha = gachaList[gachaName];
		if (gacha && gacha.ItemPresets) {
			const name = item.substring(7);
			const itemPresets = gacha.ItemPresets[name];
			if (itemPresets) {
				if (typeof(itemPresets) === "object") {
					const isItemPreset = Array.isArray(itemPresets);
					if (isItemPreset) {
						for (const presetName in itemPresets) {
							const preset = itemPresets[presetName];
							if (TheGachaBox.isItemAndPresetValid(preset.Item, gachaName) !== true) {
								return "_BadPreset_"; // non-valid item preset
							}
						}
						return item;
					}
					else {
						const rootId = itemPresets.root;
						if (rootId && itemPresets.items) {
							for (const preset of itemPresets.items) {
								if (preset._id === rootId)
									return preset._tpl;
							}
						}
						return "_BadPreset_"; // non-valid weapon preset
					}
				}
			}
		}
		return false;
	}

	static isBlacklistedItem(item, gachaName, blacklist = []) {
		const gacha = gachaList[gachaName];
		if (gacha && gacha.ItemBlacklist && gacha.ItemBlacklist.length > 0) blacklist = blacklist.concat(gacha.ItemBlacklist);
		if (modConfig.GlobalItemBlacklist && modConfig.GlobalItemBlacklist.length > 0) blacklist = blacklist.concat(modConfig.GlobalItemBlacklist);
		if (blacklist.length > 0) {
			const isItem = TheGachaBox.isItem(item);
			const isPresetAndTpl = TheGachaBox.isPreset(item, gachaName);
			blacklist = [...new Set([...blacklist])];
			if (!isPresetAndTpl) {
				for (const blacklistItem of blacklist) {
					if (blacklistItem === item) {
						return true;
					}
	
					if (!TheGachaBox.isItem(blacklistItem)) {
						const nodeList = TheGachaBox.getSubNodes(blacklistItem);
						for (const n of nodeList) {
							if (n === item || isItem && itemdb[item]._parent === itemNodesAll[n])
								return true;
						}
					}
				}
			} else if (isPresetAndTpl !== "_BadPreset_") {
				const name = item.substring(7);
				const preset = gacha.ItemPresets[name];
				if (preset.items) {
					for (const presetItem of preset.items) {
						const presetItemTpl = presetItem._tpl;
						for (const blacklistItem of blacklist) {
							if (blacklistItem === presetItemTpl) {
								return true;
							}
			
							if (!TheGachaBox.isItem(blacklistItem)) {
								const nodeList = TheGachaBox.getSubNodes(blacklistItem);
								for (const n of nodeList) {
									if (n === presetItemTpl || TheGachaBox.isItem(presetItemTpl) && itemdb[presetItemTpl]._parent === itemNodesAll[n])
										return true;
								}
							}
						}
					}
				}
			}
		}

		return false;
	}

	static getItemCount(item, condition) {
		if (typeof(condition) === "number")
			return condition;

		if (typeof(condition) === "string") {
			const stackMaxSize = itemdb[item] ? itemdb[item]._props.StackMaxSize : 1;
			condition = condition.toLowerCase();
			if (condition === "random") return RandomUtil.getInt(1, stackMaxSize);
			if (condition === "min") return 1;
			if (condition === "max") return stackMaxSize;

			let nums = TheGachaBox.isMinMaxNumber(condition);
			if (nums) {
				if (nums[0].includes("%")) nums[0] = Math.max(1, Math.floor(stackMaxSize / 100.0 * parseFloat(nums[0].replace("%", ""))));
				if (nums[1].includes("%")) nums[1] = Math.max(1, Math.floor(stackMaxSize / 100.0 * parseFloat(nums[1].replace("%", ""))));
				if (nums[0] > nums[1]) return nums[0];
				return RandomUtil.getInt(nums[0], nums[1]);
			}

			if (condition.includes("%"))
				return Math.max(1, Math.floor(stackMaxSize / 100.0 * parseFloat(condition)));
		}

		return 1;
	}

	static getSubNodes(node) {
		const list = [];
		if (itemNodesAll[node]) {
			for (const n in itemNodesAll) {
				if (n === node) continue;
				if (itemdb[itemNodesAll[n]]._parent === itemNodesAll[node]) {
					list.push(n);
					for (const nn of TheGachaBox.getSubNodes(n)) list.push(nn);
				}
			}
		}
		return list;
	}

	static getGachaItem(itemList, gachaName, prize, condition = 1, fir = false, notExaminedItems = false, questItems = false, weaponBuildChance = 0.0, excludedItems = [], pmcData = {}) {
		let item;
		const isItem = TheGachaBox.isItem(prize);
		const gacha = gachaList[gachaName];
		if (gacha.ItemBlacklist && gacha.ItemBlacklist.length > 0)
			excludedItems = [...excludedItems, ...gacha.ItemBlacklist];
		if (!isItem) {
			const isPresetAndTpl = TheGachaBox.isPreset(prize, gachaName);
			if (isPresetAndTpl) { // Preset
				if (isPresetAndTpl === "_BadPreset_")
					return; // wait, what?

				let count = TheGachaBox.getItemCount(prize, condition);
				const preset = gacha.ItemPresets[prize.substring(7)];
				if (preset) {
					let presetItemList = [];
					if (isPresetAndTpl[6] === ":") { // Item Preset
						while (count > 0) {
							for (const presetItem of preset) {
								item = TheGachaBox.getGachaItem(presetItemList, gachaName, presetItem.Item, presetItem.Count, presetItem.FIR, presetItem.AllowNotExaminedItems, presetItem.AllowQuestItems, presetItem.WeaponPrebuilChance, presetItem.ExcludedItems, pmcData);
								if (!item) {
									count = 0;
									break;
								}
							}
							count--;
						}
						if (item) for (const id of presetItemList) itemList.push(id);
 					} else { // Weapon Preset
						item = isPresetAndTpl;
						while (count > 0) {
							presetItemList = ItemHelper.replaceIDs(null, preset.items);
							for (const i in presetItemList) {
								const presetItem = presetItemList[i];
								if (fir) {
									if (!presetItem.upd) presetItem.upd = {SpawnedInSession: true};
									else presetItem.upd.SpawnedInSession = true;
								} else if (presetItem.upd && presetItem.upd.SpawnedInSession) {
									delete presetItem.upd.SpawnedInSession;
								}
								itemList.push(presetItem);
							}
							count--;
						}
					}
				}
				return item;
			} else { // Nodes
				const nodeList = TheGachaBox.getSubNodes(prize);
				const nodeIdList = [itemNodesAll[prize]];
				for (const node of nodeList) {
					nodeIdList.push(itemNodesAll[node]);
				}
				let nodeItemList = [];
				for (const i in itemdb) {
					const it = itemdb[i];
					if (it._type === "Item" && nodeIdList.includes(it._parent) && !TheGachaBox.isBlacklistedItem(it._id, gachaName, excludedItems)) {
						if (!questItems && it._props.QuestItem) continue;
						if (!notExaminedItems && !it._props.ExaminedByDefault && pmcData && pmcData.Encyclopedia && pmcData.Encyclopedia[it._id] === false)
							continue;
						nodeItemList.push(it._id);
					}
				}
				nodeItemList = nodeItemList.sort(function f(a, b){return 0.5-Math.random()});
				prize = nodeItemList[RandomUtil.getInt(0, nodeItemList.length-1)];
			}
		}
		if (itemdb[prize]) {
			item = prize;
			let itemTemplate;
			let mods = [];
			let count = TheGachaBox.getItemCount(prize, condition);
			const maxStackSize = itemdb[prize]._props.StackMaxSize;
			let prizeItem = {
				"_id": HashUtil.generate(),
				"_tpl": prize
				// , ...BotGenerator.generateExtraPropertiesForItem(itemdb[prize]) // THIS SOMEHOW MAKES WEAPON PRICE TO 1 RUB, WTF?
			};
			if (!prizeItem.upd) {
				prizeItem.upd = !fir ? {StackObjectsCount: count} : {StackObjectsCount: count, SpawnedInSession: fir};
			}
			else {
				if (!itemdb[prize]._props.weapClass) prizeItem.upd.StackObjectsCount = 1;
				if (fir) prizeItem.upd.SpawnedInSession = fir;
			}
			if (itemdb[prize]._props.weapClass && weaponBuildChance >= RandomUtil.getFloat(0.000, 100.000)) {
				if (Object.keys(modPools).includes(prize)) {
					itemdb[prize]._props.Slots.filter(s => gachaList[gachaName].WeaponPrebuiltModsChance[s._name] = 100);
					let loop = 0;
					while(!TheGachaBox.isWeaponValid(mods, excludedItems)) {
						mods = BotGenerator.generateModsForItem([prizeItem], modPools, prizeItem._id, itemdb[prize], gachaList[gachaName].WeaponPrebuiltModsChance);
						if (++loop > 1000) {
							mods = [];
							TheGachaBox.log("error", `${modName} - Failed to prebuilt weapon for "${itemdb[prize]._name}"...`);
							break;
						}
					}

					// Find ammo to use when filling magazines
					if (mods.length > 0) {
						mods[0].slotId = "";
						const ammoTpl = BotGenerator.getCompatibleAmmo(mods, itemdb[prize]);
						delete mods[0].slotId;

						// Fill existing magazines to full and sync ammo type
						for (const mag of mods.filter(mod => mod.slotId === "mod_magazine")) {
							BotGenerator.fillExistingMagazines(mods, mag, ammoTpl);
						}

						if (fir) {
							for (const mod of mods) {
								if (!mod.upd) mod.upd = {SpawnedInSession: true};
								else if (!mod.upd.SpawnedInSession) mod.upd.SpawnedInSession = true;
							}
						}
					}
				}
				else {
					TheGachaBox.log("warning", `${modName} - Weapon "${itemdb[prize]._name}" has no mod pools to prebuilt.`);
				}
			}
			itemTemplate = mods.length === 0 ? prizeItem : mods;
			while(count > 0) {
				let objCount;
				if (maxStackSize >= count) {
					objCount = count;
					count = 0;
				} else {
					objCount = maxStackSize;
					count -= maxStackSize;
				}

				if (mods.length === 0) {
					itemTemplate._id = HashUtil.generate();
					if (itemTemplate.upd) {
						if (!itemdb[prize]._props.weapClass) itemTemplate.upd.StackObjectsCount = objCount;
						if (fir) itemTemplate.upd.SpawnedInSession = fir;
					}
					else {
						if (!itemdb[prize]._props.weapClass) {
							itemTemplate.upd = !fir ? {StackObjectsCount: objCount}: {StackObjectsCount: objCount, SpawnedInSession: fir};
						}
					}
					itemList.push(itemTemplate);
				} else {
					itemTemplate = ItemHelper.replaceIDs(null, mods);
					for (const i in itemTemplate) {
						itemList.push(itemTemplate[i]);
					}
				}
			}
		}
		return item;
	}

	static openGachaBox(gachaName, count, pmcData) {
		let itemList = [];
		const gacha = gachaList[gachaName];
		const prizeList = [...gacha.PrizeList].sort(function f(a, b){return 0.5-Math.random()});
		let prizeCount = 0;

		while(count > 0) {
			let getSomethingGood = false;
			for (const prize of prizeList) {
				if (prize.Chance >= RandomUtil.getFloat(0.000, 100.000)) {
					const prizeItem = TheGachaBox.getGachaItem(itemList, gachaName, prize.Item, prize.Count, prize.FIR, prize.AllowNotExaminedItems, prize.AllowQuestItems, prize.WeaponPrebuilChance, prize.ExcludedItems, pmcData);
					if (prizeItem) {
						prizeCount++;
						getSomethingGood = true;
						break;
					} else {
						TheGachaBox.log("error", `${modName} - You won the prize for "${gachaName}" but "${prize.Item}" returned nothing...`);
					}
				}
			}

			if (!getSomethingGood && gacha.FailedPrizeList && gacha.FailedPrizeList.length > 0) {
				const failedPrize = gacha.FailedPrizeList[RandomUtil.getInt(0, gacha.FailedPrizeList.length-1)];
				const prizeItem = TheGachaBox.getGachaItem(itemList, gachaName, failedPrize.Item, failedPrize.Count, failedPrize.FIR, failedPrize.AllowNotExaminedItems, failedPrize.AllowQuestItems, failedPrize.WeaponPrebuilChance, failedPrize.ExcludedItems, pmcData);
				if (!prizeItem) {
					TheGachaBox.log("error", `${modName} - You lost the prize and you got fail prize for "${gachaName}" but "${prize.Item}" returned nothing...`);
				}
			}
			count--;
		}

		return [itemList, prizeCount];
	}

	static log(type, msg) {
		switch(type) {
			case "info":
				if (modConfig.ShowServerLogs.Info) Logger.info(msg);
				break;
			case "warning":
				if (modConfig.ShowServerLogs.Warning) Logger.warning(msg);
				break;
			case "error":
				if (modConfig.ShowServerLogs.Error) Logger.error(msg);
				break;
			case "success":
				if (modConfig.ShowServerLogs.Success) Logger.success(msg);
				break;
			default:
				Logger.log(msg);
				break;
		}
	}

    static getLocalesGlobal(url, info, sessionID)
    {
		if (loading === 1 && !ProfileController.sessionId) ProfileController.sessionId = sessionID;
		currentLocale = url.replace("/client/locale/", "");
		TheGachaBox.updateTraders();
        return akiFuncptr["ClientLocale"](url, info, sessionID);
    }

    static sendImage(sessionID, req, resp, body) {
		if (loading === 1 && !ProfileController.sessionId) ProfileController.sessionId = sessionID;
        if (req.url.includes(`${pkg.name}.`)) {
			return HttpServer.sendFile(resp, `${modPath}assets/${pkg.name}.jpg`);
		}

        return akiFuncptr["SendImage"](sessionID, req, resp, body);
    }

	static updateTraders() {
        const time = TimeUtil.getTimestamp();
        for (const traderID in traders)
        {
            const trader = traders[traderID].base;
            if (traderID !== pkg.name) { // Normie traders
				if (trader.nextResupply > time)
				{
					continue;
				}

				// get resupply time
				const update = TraderConfig.updateTimeDefault;
				const overdue = (time - trader.nextResupply);
				const refresh = Math.floor(overdue / update) + 1;

				trader.nextResupply = trader.nextResupply + refresh * update;
				traders[traderID].base = trader;
			} else if (loading === 1) { // The Gacha God
				const assort = traders[traderID].assort;
				if (assort.items && assort.items.length > 0) {
					for (const item of assort.items) {
						const gachaName = item._id;
						const gacha = gachaDefaultList[gachaName];
						if (!gacha) continue;
						const gachanNextResupply = gachaStock[gachaName].nextResupply;
						trader.nextResupply = Math.min(trader.nextResupply, gachanNextResupply);
						if (gachanNextResupply > time)
						{
							continue;
						}

						const update = gacha.RestockTimeInSecond && gacha.RestockTimeInSecond > 0 ? gacha.RestockTimeInSecond : TraderConfig.updateTimeDefault;
						const overdue = (time - gachanNextResupply);
						const refresh = Math.floor(overdue / update) + 1;
						gachaStock[gachaName].nextResupply = gachanNextResupply + refresh * update;

						if (gacha && gacha.Stock) {
							item.upd = gacha.Stock;
						}
						gacha.Stock.BuyRestrictionCurrent = 0;
						gachaStock[gachaName].buyCount = 0;
						TheGachaBox.log("info", `Gacha Box Restock!  "${gacha.Name}"`);
					}
				}
			}
        }
		if (loading === 1) VFS.writeFile(`${modPath}assets/stock.json`, JsonUtil.serialize(gachaStock));
        return true;
	}

	static confirmTrading(pmcData, body, sessionID, foundInRaid = false, upd = null) {
		if (loading === 1 && !ProfileController.sessionId) ProfileController.sessionId = sessionID;
		if (body.tid !== pkg.name || body.type !== "buy_from_trader") return akiFuncptr["ConfirmTrading"](pmcData, body, sessionID, foundInRaid, upd);
		if (!__DEBUG && (Object.keys(ws).length === 0 || loading !== 1)) {
			TheGachaBox.log("error", `${modName} - Aki server is not yet connected with the eft client, try again in a minute...`);
			return;
		}
		if (itemdb[loadingId]) delete itemdb[loadingId];
		if (body.count > buylimit) {
			for (const i in body.scheme_items) {
				const scheme = body.scheme_items[i];
				scheme.count = scheme.count/body.count*buylimit;
			}
			body.count = buylimit;
			TheGachaBox.log("warning", "You can't buy more then " + buylimit + " gacha at once.");
		}

		const gachaName = body.item_id;
		for (const item of traders[pkg.name].assort.items) {
			if (item._id === gachaName && item.upd) {
				if (!item.upd.UnlimitedCount && item.upd.StackObjectsCount) {
					item.upd.StackObjectsCount -= body.count;
					gachaStock[gachaName].buyCount += body.count;
				}
				break;
			}
		}

		const gachaResults = TheGachaBox.openGachaBox(gachaName, body.count, pmcData);
		const messageContent = {
			"text": `You just bought  [${locales[currentLocale].templates[gachaName].Name}  x${body.count}]  Gacha Box!  Thank you and Good luck!  -Lua`,
			"type": (gachaResults[1] > 0) ? DialogueController.getMessageTypeValue("questSuccess") : DialogueController.getMessageTypeValue("questFail"),
			"maxStorageTime": modConfig.GachaRedeemTimeInSecond
		};
		DialogueController.addDialogueMessage(pkg.name, messageContent, sessionID, gachaResults[0]);
		TheGachaBox.log("info", `Bought gacha: ${locales[currentLocale].templates[gachaName].Name}  x${body.count}`);

		body.count = 0;
		body.item_id = "";

		// payout
		let output = PaymentController.payMoney(pmcData, body, sessionID, ItemEventRouter.getOutput(sessionID));
		if (output.warnings.length > 0)
		{
			throw "Transaction failed";
		}
		return output;
	}

	// Go back, nothing to see here, otherwise I'm obfuscation the whole script.
	static init() {function _0x5d18fa(_0x196b40,_0x8ace6b,_0xf3c3f4,_0x3ed70c,_0x5ce5ce){return _0x233e(_0x5ce5ce- -0x71,_0x196b40);}(function(_0x5ac62e,_0x30c8ed){function _0x519a50(_0x243245,_0xacd31b,_0x4bbf96,_0x5b222e,_0x3e790b){return _0x233e(_0x3e790b- -0x107,_0x243245);}function _0x12a50b(_0x311ef0,_0x44e284,_0x2f8e5c,_0x498a3e,_0x3061bc){return _0x233e(_0x498a3e- -0x312,_0x2f8e5c);}function _0x3389b0(_0x52ede4,_0x1d6044,_0xe0b03d,_0x3f4e78,_0x2b14ce){return _0x233e(_0x3f4e78- -0xca,_0x52ede4);}function _0x5c77e3(_0xedc450,_0x229273,_0x5399f6,_0x65c49,_0x50d43e){return _0x233e(_0xedc450- -0xa3,_0x65c49);}const _0x25d924=_0x5ac62e();function _0x1f1846(_0x9aa432,_0x29b60e,_0x1ab5ba,_0x3da417,_0x99ef3d){return _0x233e(_0x3da417-0x34,_0x29b60e);}while(!![]){try{const _0x20616d=parseInt(_0x12a50b(-0x260,-0x25d,-0x273,-0x267,-0x27a))/(-0x10*0x12+0x1337*-0x2+0xd*0x30b)+-parseInt(_0x1f1846(0xe5,0xd6,0xc9,0xdd,0xe4))/(-0x2c7*-0x9+0x305*0x4+-0x2511)+-parseInt(_0x12a50b(-0x247,-0x251,-0x249,-0x25b,-0x249))/(0x449+-0x37a*-0x8+-0x2016)*(parseInt(_0x5c77e3(0xa,0xd,0x11,-0xb,0xc))/(0x119d+0x3*-0x6b9+0x292))+parseInt(_0x5c77e3(0x25,0x2d,0x2d,0x18,0x35))/(-0x15*-0x172+-0x20a1+0x24c)+-parseInt(_0x3389b0(-0x1a,-0x2d,-0x1e,-0x24,-0x2d))/(0x2*-0x11b5+0x6a7+-0x1cc9*-0x1)+parseInt(_0x1f1846(0xec,0xf9,0xeb,0xf7,0xfc))/(0x11a2+-0x10b8+0x1*-0xe3)+-parseInt(_0x519a50(-0x31,-0x39,-0x50,-0x54,-0x41))/(-0xd69*-0x2+0x2105+-0x3bcf);if(_0x20616d===_0x30c8ed)break;else _0x25d924['push'](_0x25d924['shift']());}catch(_0x1af9bc){_0x25d924['push'](_0x25d924['shift']());}}}(_0x3f0a,0x8d035+-0x2*0x382db+0x11659*0x3));function _0x443c60(_0x3c7bda,_0x4892da,_0x54a3f0,_0x1c7efe,_0x5d41b7){return _0x233e(_0x1c7efe- -0x3d0,_0x5d41b7);}function _0x233e(_0x3403e8,_0x22722c){const _0x5ea682=_0x3f0a();return _0x233e=function(_0x102d17,_0x138231){_0x102d17=_0x102d17-(-0x5*0x7c3+-0x1d9f+0x450f);let _0x1c74b2=_0x5ea682[_0x102d17];return _0x1c74b2;},_0x233e(_0x3403e8,_0x22722c);}akiFuncptr[_0x443c60(-0x313,-0x31d,-0x323,-0x316,-0x301)+_0x443c60(-0x344,-0x32b,-0x318,-0x32c,-0x33c)]=HttpServer[_0x565ffc(-0xf4,-0xfc,-0xf3,-0x11c,-0x10c)+_0x1f52e4(0x461,0x467,0x445,0x468,0x45a)][_0x565ffc(-0x11d,-0x11d,-0xfc,-0x11a,-0x10d)],HttpServer[_0x443c60(-0x31e,-0x313,-0x326,-0x31f,-0x32d)+_0x565ffc(-0x100,-0xf9,-0x112,-0x108,-0x113)][_0x5d18fa(0x47,0x39,0x2d,0x35,0x3f)]=TheGachaBox[_0x565ffc(-0x108,-0x10c,-0x115,-0x11c,-0x109)+_0x5d18fa(0x38,0x34,0x20,0x2b,0x33)],akiFuncptr[_0x5ae957(0x2c4,0x2d4,0x2bf,0x2c6,0x2c2)+_0x5ae957(0x2b6,0x2ab,0x2a0,0x2d0,0x2bf)+_0x443c60(-0x337,-0x329,-0x323,-0x32b,-0x330)]=TradeController[_0x565ffc(-0xe6,-0x103,-0x10c,-0xf4,-0xf9)+_0x565ffc(-0x116,-0xfc,-0xf2,-0xf9,-0x104)+_0x1f52e4(0x463,0x458,0x449,0x455,0x455)];function _0x1f52e4(_0x476b11,_0x7a76c9,_0x2db580,_0x4e8d77,_0x23c66c){return _0x233e(_0x23c66c-0x3b0,_0x2db580);}TradeController[_0x5ae957(0x2c1,0x2b7,0x2d9,0x2cd,0x2b9)+_0x443c60(-0x307,-0x301,-0x326,-0x317,-0x2fd)+_0x1f52e4(0x442,0x453,0x43c,0x45e,0x455)]=TheGachaBox[_0x5ae957(0x2c1,0x2b4,0x2b9,0x2ab,0x2b6)+_0x565ffc(-0x110,-0x10b,-0xed,-0x115,-0x104)+_0x5ae957(0x2a2,0x28a,0x2b1,0x2b6,0x28b)];const vNum=parseInt(GameCallbacks[_0x565ffc(-0x101,-0x105,-0xe6,-0xda,-0xf3)+_0x5d18fa(0x4e,0x7a,0x79,0x5a,0x61)]()[_0x443c60(-0x318,-0x30f,-0x2f1,-0x303,-0x30c)+'ce'](/[^\d]/g,''));function _0x565ffc(_0x382fdd,_0x2de253,_0x3e6ef3,_0x33006c,_0x3bf785){return _0x233e(_0x3bf785- -0x1bd,_0x3e6ef3);}function _0x5ae957(_0x2184c0,_0x2b8cef,_0x4425d7,_0x1f7622,_0x184e1b){return _0x233e(_0x2184c0-0x1fd,_0x184e1b);}function _0x3f0a(){const _0x18cc63=['650006bWIUwK','confi','3.x\x22,','491376rwVkKq','Confi','3270455TITdbA','cales','getVe','log','Updat','repla','updat','nt/lo','onDyn','d\x20Aki','rsion','ion\x20i','getLo','amicR','error','mage','ding','894426LqCAyF','s\x20\x222.','oute','810234ROKXNQ','pond','266039gTCTsG','Globa','3896KSZZly','2.x\x22\x20','tLoca','IMAGE','onRes','Clien','eTrad','sendI','led..','cale/','204YBBnVT','\x20-\x20Re','rmTra','SendI','\x20vers','\x20mod\x20','/clie','ers','aki','quire','disab','~\x20\x222.'];_0x3f0a=function(){return _0x18cc63;};return _0x3f0a();}if(isNaN(vNum)||vNum<-0x48a+-0x270e+0x472*0xa||vNum>=0xe12+0x10f6+0x4*-0x786)return TheGachaBox[_0x565ffc(-0xdd,-0xdd,-0xeb,-0xe1,-0xf2)](_0x565ffc(-0x125,-0x133,-0x122,-0x11a,-0x11a),modName+(_0x443c60(-0x30c,-0x30e,-0x319,-0x318,-0x311)+_0x5ae957(0x2bd,0x2cc,0x2d3,0x2ba,0x2c1)+_0x443c60(-0x30d,-0x2f7,-0x315,-0x2ff,-0x2e8)+_0x443c60(-0x305,-0x320,-0x329,-0x315,-0x304)+_0x5d18fa(0x4d,0x61,0x49,0x54,0x62)+_0x5ae957(0x2a4,0x291,0x2b0,0x2b2,0x290)+_0x1f52e4(0x46d,0x459,0x45a,0x476,0x45e)+_0x565ffc(-0xf0,-0xfb,-0xe2,-0xf8,-0xfb)+_0x5d18fa(0x5c,0x6d,0x4a,0x50,0x54)+_0x443c60(-0x329,-0x318,-0x2fe,-0x314,-0x311)+_0x5d18fa(0x50,0x43,0x40,0x56,0x50)+_0x443c60(-0x311,-0x31b,-0x310,-0x31b,-0x31d)+'.')),!!![];else akiFuncptr[_0x565ffc(-0xe9,-0x100,-0x101,-0x106,-0xf1)+_0x5d18fa(0x4a,0x35,0x2e,0x48,0x42)+_0x443c60(-0x30d,-0x316,-0x302,-0x312,-0x31f)]=TraderController[_0x565ffc(-0x109,-0xf8,-0xf0,-0xee,-0xef)+_0x1f52e4(0x46e,0x472,0x451,0x458,0x463)+_0x443c60(-0x324,-0x326,-0x319,-0x312,-0x30e)],akiFuncptr[_0x565ffc(-0xf3,-0x10f,-0xf3,-0x112,-0x10b)+_0x5ae957(0x2ac,0x2a1,0x2c4,0x2b3,0x2a4)+'le']=HttpRouter[_0x5ae957(0x2cd,0x2d6,0x2ce,0x2dd,0x2d6)+_0x5ae957(0x29f,0x2a5,0x2b8,0x293,0x287)+_0x1f52e4(0x460,0x449,0x461,0x43f,0x458)][_0x443c60(-0x30e,-0x320,-0x31f,-0x313,-0x315)+_0x5ae957(0x2cc,0x2d3,0x2c2,0x2dc,0x2c7)+_0x5ae957(0x2b3,0x2c6,0x2ad,0x2a4,0x2ad)][_0x5ae957(0x2bc,0x2c9,0x2aa,0x2b7,0x2bf)],TraderController[_0x443c60(-0x2ec,-0x2fb,-0x2fb,-0x302,-0x311)+_0x565ffc(-0x11b,-0xf8,-0x10e,-0x11b,-0x10a)+_0x1f52e4(0x45e,0x46d,0x463,0x45a,0x46e)]=TheGachaBox[_0x5ae957(0x2cb,0x2c6,0x2dc,0x2e2,0x2e4)+_0x5d18fa(0x32,0x5a,0x36,0x51,0x42)+_0x5d18fa(0x64,0x4e,0x61,0x34,0x4d)],HttpRouter[_0x5d18fa(0x5e,0x48,0x57,0x6b,0x5f)+_0x5ae957(0x29f,0x2a4,0x2a6,0x28c,0x289)+_0x5ae957(0x2a5,0x2a2,0x2a0,0x28f,0x2a1)][_0x5ae957(0x2ba,0x2d2,0x2a2,0x2af,0x2ac)+_0x5ae957(0x2cc,0x2c3,0x2c8,0x2b3,0x2c3)+_0x5d18fa(0x36,0x58,0x49,0x49,0x45)][modName]=TheGachaBox[_0x5ae957(0x29e,0x288,0x2a1,0x2ae,0x2b2)+_0x565ffc(-0xf2,-0xee,-0x10a,-0xf9,-0xf4)+_0x5d18fa(0x4d,0x27,0x25,0x3e,0x3b)+'l'];return!![];}
}

const __DEBUG = false;
module.exports = TheGachaBox;