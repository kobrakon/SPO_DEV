"use strict";

class Mod {
    constructor() {
        this.mod = "Andrudis-QoL-Configurator";
		Logger.log(`Loaded: ${this.mod}`);
		ModLoader.onLoad[this.mod] = this.load.bind(this);

    }

    load() {
		Logger.log(`[QoL] Initializing: ${this.mod}`);
		

		const durab_filepath = `${ModLoader.getModPath(this.mod)}src/bots_durability.config`;
        const BotsDurabilityConfig = JsonUtil.deserialize(VFS.readFile(durab_filepath));		
		
		const filepath = `${ModLoader.getModPath(this.mod)}src/main_config.json`;
        const Config = JsonUtil.deserialize(VFS.readFile(filepath));
		
		const td_filepath = `${ModLoader.getModPath(this.mod)}src/trader_config.json`;
		const TradersDiscountsConfig = JsonUtil.deserialize(VFS.readFile(td_filepath));
		
		const qh_filepath = `${ModLoader.getModPath(this.mod)}src/quests_helpers_config.json`;
		const QuestsHelpersConfig = JsonUtil.deserialize(VFS.readFile(qh_filepath));
		
		const wm_filepath = `${ModLoader.getModPath(this.mod)}src/weapon_maintenance_config.json`;
		const WeaponMaintenanceConfig = JsonUtil.deserialize(VFS.readFile(wm_filepath));
		
		const i_filepath = `${ModLoader.getModPath(this.mod)}src/insurance_config.json`;
		const InsuranceConfig = JsonUtil.deserialize(VFS.readFile(i_filepath));
		
		const map_filepath = `${ModLoader.getModPath(this.mod)}src/maps_config.json`;
		const MapsConfig = JsonUtil.deserialize(VFS.readFile(map_filepath));
		
		const bots_filepath = `${ModLoader.getModPath(this.mod)}src/bots_config.json`;
		const BotsParamsConfig = JsonUtil.deserialize(VFS.readFile(bots_filepath));
		
		
		const database = DatabaseServer.tables;
		const globalsFile = database.globals.config;
		const settingsFile = database.settings.config;
		const locations = database.locations;
		let itemsList = database.templates.items;

		const db = this.LoopThroughThatBith(`${ModLoader.getModPath(this.mod)}/db/`);
		

		if (BotsParamsConfig.UsecChance != null && BotsParamsConfig.UsecChance >= 0 && BotsParamsConfig.UsecChance <= 100){
			Logger.log(`[QoL] Changing PMC chances: USEC = ` + BotsParamsConfig.UsecChance + `%, BEAR = ` + (100-BotsParamsConfig.UsecChance) + `%.`);
			BotConfig.pmc.isUsec = BotsParamsConfig.UsecChance;
		}
		if (BotsParamsConfig.SameFactionIsHostileChance != null && BotsParamsConfig.SameFactionIsHostileChance >= 0 && BotsParamsConfig.SameFactionIsHostileChance <= 100){
			Logger.log(`[QoL] Changing same faction hostile chances to ` + BotsParamsConfig.SameFactionIsHostileChance + `%.`);
			BotConfig.pmc.chanceSameSideIsHostilePercent = BotsParamsConfig.SameFactionIsHostileChance;
		}
		if (BotsParamsConfig.MaxPMCLootTotalRoubles != null && BotsParamsConfig.MaxPMCLootTotalRoubles >= 0){
			Logger.log(`[QoL] Changing max loot total in Roubles = ` + BotsParamsConfig.MaxPMCLootTotalRoubles);
			BotConfig.pmc.maxLootTotalRub = BotsParamsConfig.MaxPMCLootTotalRoubles;
		}
		if (BotsParamsConfig.ShowBotTypeInNickname == true){
			Logger.log(`[QoL] Adding explicit bot type to bots names`);
			BotConfig.showTypeInNickname = BotsParamsConfig.ShowBotTypeInNickname;
		}
		if (BotsParamsConfig.MaxBackpackLootTotalRub != null){
			BotConfig.pmc.maxBackpackLootTotalRub = BotsParamsConfig.MaxBackpackLootTotalRub;
		}
		if (BotsParamsConfig.MaxPocketLootTotalRub != null){
			BotConfig.pmc.maxPocketLootTotalRub = BotsParamsConfig.MaxPocketLootTotalRub;
		}
		if (BotsParamsConfig.MaxVestLootTotalRub != null){
			BotConfig.pmc.maxVestLootTotalRub = BotsParamsConfig.MaxVestLootTotalRub;
		}
		if (BotsParamsConfig.OverridePMCCartridgeBlacklist == true){
			BotConfig.pmc.cartridgeBlacklist = BotsParamsConfig.PMCCartridgeBlacklist;
		}

		if (Config.BoughtItemsCountedAsFiR == true){
			Logger.log(`[QoL] Bought Items Counted As FiR - enabled`);
			InventoryConfig.newItemsMarkedFound = true;
		} else if (Config.BoughtItemsCountedAsFiR == false){
			Logger.log(`[QoL] Bought Items Counted As FiR - disabled`);
			InventoryConfig.newItemsMarkedFound = false;
		}
		
		if (Config.AllowLootOverlay == true){
			Logger.log(`[QoL] Allow Loot Overlay enabled`);
			LocationConfig.allowLootOverlay = true;
		}
		
		if (Config.GlobalLootChanceModifier != 0.23){
			Logger.log(`[QoL] Global Loot Chance Modifier changed to: ` + Config.GlobalLootChanceModifier);
			globalsFile.GlobalLootChanceModifier = Config.GlobalLootChanceModifier;
		}
		
		if (BotsDurabilityConfig.EnableDurabilityOverride == true){
			BotConfig.durability = BotsDurabilityConfig.Durability;
		}
		
		//Map restriction by level - special thanks to @Shirito#4361 and @Wind Le T-Rex#1487 ​for idea and initial implementation
		if (MapsConfig.RestrictMapsByPlayerLevel == true){
			Object.entries(MapsConfig.MapsRestrictionsByLevel).forEach(([MapName, ReqPlayerLvL]) => {
					if (ReqPlayerLvL > 1){
						let mapAliasName = this.GetMapDbAlias(MapName)
						locations[mapAliasName].base.RequiredPlayerLevel = ReqPlayerLvL;
						Logger.log('[Qol]: Map `' + MapName + '` locked to level: ' + ReqPlayerLvL);
					}
				});
		}
		
		//SETTINGS
		if (Config.HeapPreAllocationEnabled == true){
			
			Logger.log(`[QoL] heap pre-allocation enabled`);
			settingsFile.MemoryManagment.HeapPreAllocationEnabled = true;
		}
		
		if (Config.OverrideRamCleanerSettings == true){
			
			Logger.log(`[QoL] override ram cleaner settings enabled`);
			settingsFile.MemoryManagment.OverrideRamCleanerSettings = true;
		}
		
		if (Config.RamCleanerEnabled == true){
			Logger.log(`[QoL] ram cleaner enabled`);
			settingsFile.MemoryManagment.RamCleanerEnabled = true;
		}
		
		if (Config.DisableReleaseProfiler == true){
			Logger.log(`[QoL] release profiler - disabled`);
			settingsFile.ReleaseProfiler.Enabled = false;
		}
		
		if (Config.ForceAllLooseLootSpawn)
		{
			Logger.log(`[QoL] Force all loose loot spawn - enabled`);
			this.modeLootToForced(database.locations.bigmap.loot);
			this.modeLootToForced(database.locations.factory4_day.loot);
			this.modeLootToForced(database.locations.factory4_night.loot);
			this.modeLootToForced(database.locations.interchange.loot);
			this.modeLootToForced(database.locations.laboratory.loot);
			this.modeLootToForced(database.locations.rezervbase.loot);
			this.modeLootToForced(database.locations.shoreline.loot);
			this.modeLootToForced(database.locations.woods.loot);
			this.modeLootToForced(database.locations.lighthouse.loot);
		}
		
		if (TradersDiscountsConfig.OverrideTradersDiscounts == true){
			Logger.log(`[QoL] Overriding Traders' Discounts`);
			
			database.traders["5a7c2eca46aef81a7ca2145d"].base.discount = TradersDiscountsConfig.TradersDiscounts.Mechanic;
			database.traders["5ac3b934156ae10c4430e83c"].base.discount = TradersDiscountsConfig.TradersDiscounts.Ragman;
			database.traders["5c0647fdd443bc2504c2d371"].base.discount = TradersDiscountsConfig.TradersDiscounts.Jaeger;
			database.traders["54cb50c76803fa8b248b4571"].base.discount = TradersDiscountsConfig.TradersDiscounts.Prapor;
			database.traders["54cb57776803fa99248b456e"].base.discount = TradersDiscountsConfig.TradersDiscounts.Therapist;
			database.traders["579dc571d53a0658a154fbec"].base.discount = TradersDiscountsConfig.TradersDiscounts.Fence;
			database.traders["5935c25fb3acc3127c3d8cd9"].base.discount = TradersDiscountsConfig.TradersDiscounts.Peacekeeper;
			database.traders["58330581ace78e27b8b10cee"].base.discount = TradersDiscountsConfig.TradersDiscounts.Skier;
		}
		
		if (MapsConfig.ExtendRaidTime == true){
			Object.entries(MapsConfig.RaidTimeByMapInMinutes).forEach(([MapName, RaidTime]) => {
					if (RaidTime != null && RaidTime > 0){
						let mapAliasName = this.GetMapDbAlias(MapName)
						locations[mapAliasName].base.exit_access_time = RaidTime;
						locations[mapAliasName].base.escape_time_limit = RaidTime;
					}
				});
			
			
			// for (let map in locations) {
				// if (map !== "base") {
					// locations[map].base.exit_access_time = 720
					// locations[map].base.escape_time_limit = 720
				// }
			// }
		}
		
		if (Config.LocationsLootChanceModifier != 0.8){
			Logger.log(`[QoL] Locations Loot Chance Modifier changed to: ` + Config.LocationsLootChanceModifier);
			for(let locNext in database.locations){
				database.locations[locNext].GlobalLootChanceModifier = Config.LocationsLootChanceModifier;
			}
		}

		//Grinch Stole Christmas
		if (Config.GrinchStoleChristmas == true) {
			for(let nextContainer in database.loot.statics){
				let lootContainer = database.loot.statics[nextContainer];
				for(let nextContainerItem in lootContainer.items){
					let containerItem = lootContainer.items[nextContainerItem];
					if (containerItem.id == "5df8a6a186f77412640e2e80"
						|| containerItem.id == "5df8a72c86f77412640e2e83"
						|| containerItem.id == "5df8a77486f77412672a1e3f"){
						Logger.log("[QoL] Grinch Stole Christmas from: " + containerItem.id);
						containerItem.id = "5449016a4bdc2d6f028b456f";
					}
				}
			}
		}

		if (Config.EnableChristmas == true || Config.EnableHalloween == true){
			if (Config.EnableChristmas == true 
				&& Config.GrinchStoleChristmas != true
				&& Config.EnableHalloween == true){
				Logger.log(`[QoL] Christmas and Halloween events - enabled`);
				globalsFile.EventType = ["Christmas", "Halloween"];
			}
			else if (Config.EnableChristmas == true && Config.GrinchStoleChristmas != true) {
				Logger.log(`[QoL] Christmas event - enabled`);
				globalsFile.EventType = ["Christmas"];
			}
			else if (Config.EnableHalloween == true) {
				Logger.log(`[QoL] Halloween event - enabled`);
				globalsFile.EventType = ["Halloween"];
			}	
		}
		
		this.addQuestCounters();
				
		

		

	


		if (Config.EnableNakedEdition === true){
			this.createHardcoreEdition();
		}
		
		Logger.log('[QoL] Changing Insurance Rules for maps'); {
			
			// Object.entries(InsuranceConfig.ChangeInsuranceAvailability).forEach(([MapName, IsAvailable]) => {
					// if (IsAvailable){
						// let mapAliasName = this.GetMapDbAlias(MapName)
						// locations[mapAliasName].base.Insurance = IsAvailable;
					// }
				// });
			
			locations.bigmap.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Customs;
			locations.factory4_day.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.FactoryDay;
			locations.factory4_night.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.FactoryNight;
			locations.interchange.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Interchange;
			locations.laboratory.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.The_Lab;
			locations.rezervbase.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Reserve;
			locations.shoreline.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Shoreline;
			locations.woods.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Woods;
			locations.lighthouse.base.Insurance = InsuranceConfig.ChangeInsuranceAvailability.Lighthouse;
		}
		
		Logger.log('[QoL] Disable Scav runs for maps');	{
			locations.bigmap.base.DisabledForScav = MapsConfig.DisabledForScav.Customs;
			locations.factory4_day.base.DisabledForScav = MapsConfig.DisabledForScav.FactoryDay;
			locations.factory4_night.base.DisabledForScav = MapsConfig.DisabledForScav.FactoryNight;
			locations.interchange.base.DisabledForScav = MapsConfig.DisabledForScav.Interchange;
			locations.rezervbase.base.DisabledForScav = MapsConfig.DisabledForScav.Reserve;
			locations.shoreline.base.DisabledForScav = MapsConfig.DisabledForScav.Shoreline;
			locations.woods.base.DisabledForScav = MapsConfig.DisabledForScav.Woods;
			locations.lighthouse.base.DisabledForScav = MapsConfig.DisabledForScav.Lighthouse;
		}

		//Remove Trader Loyalty requirements for Hideout
		if (Config.RemoveTraderLoyaltyForUpgrades === true) {
        	Logger.log('[QoL] Remove Trader Loyalty For Hideout Upgrades');

			let workstations = database.hideout.areas
		
			for (let station in workstations) {
	        	let stationData = workstations[station];	                
		        for (let i in stationData.stages) {
					for (let j in stationData.stages[i].requirements) {
						let requirementData = stationData.stages[i].requirements[j];

						if (requirementData.type === "TraderLoyalty") {
							requirementData.loyaltyLevel = 1
						}
					}
	            }
            }
		}
	}
	
	
	addQuestCounters() {
		const database = DatabaseServer.tables;
		const filepath = `${ModLoader.getModPath(this.mod)}src/main_config.json`;
        const Config = JsonUtil.deserialize(VFS.readFile(filepath));
		
		const td_filepath = `${ModLoader.getModPath(this.mod)}src/trader_config.json`;
		const TradersDiscountsConfig = JsonUtil.deserialize(VFS.readFile(td_filepath));
		
		const qh_filepath = `${ModLoader.getModPath(this.mod)}src/quests_helpers_config.json`;
		const QuestsHelpersConfig = JsonUtil.deserialize(VFS.readFile(qh_filepath));
		
        const instantComplete = '[{"_parent":"HandoverItem","_props":{"target":["5449016a4bdc2d6f028b456f"],"value":"1","minDurability":0,"index":0,"parentId":"","id":"instant_complete","maxDurability":0,"dogtagLevel":0}}]';
        const quests = database.templates.quests;
		const globalBase = database.locales.global;
		
		let itemsList = database.templates.items;
		
		//"A Shooter Born in Heaven" - it's impossible to kill PMC bots from 100 meters. reduced to 25 meters instead.
		if (QuestsHelpersConfig.AShooterBornInHeavenCounter > 0){
			if (QuestsHelpersConfig.AShooterBornInHeavenCounter != 100){
				Logger.log('[QoL] A Shooter Born in Heaven quest distance counter changed to: ' + QuestsHelpersConfig.AShooterBornInHeavenCounter);
				for (let localeName in globalBase){
					var oldConditionText1 = globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c0bdf2c86f7746f016734a8"];
					globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c0bdf2c86f7746f016734a8"] = oldConditionText1.replace("100", QuestsHelpersConfig.AShooterBornInHeavenCounter);
					var oldConditionText2 = globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137b8886f7747ae3220ff4"];
					globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137b8886f7747ae3220ff4"] = oldConditionText2.replace("100", QuestsHelpersConfig.AShooterBornInHeavenCounter);
					var oldConditionText3 = globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137ef386f7747ae10a821e"];
					globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137ef386f7747ae10a821e"] = oldConditionText3.replace("100", QuestsHelpersConfig.AShooterBornInHeavenCounter);
					var oldConditionText4 = globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137f5286f7747ae267d8a3"];
					globalBase[localeName].quest['5c0bde0986f77479cf22c2f8'].conditions["5c137f5286f7747ae267d8a3"] = oldConditionText4.replace("100", QuestsHelpersConfig.AShooterBornInHeavenCounter);
				}

				quests["5c0bde0986f77479cf22c2f8"].conditions.AvailableForFinish[0]._props.counter.conditions[0]._props.distance.value = QuestsHelpersConfig.AShooterBornInHeavenCounter;
				quests["5c0bde0986f77479cf22c2f8"].conditions.AvailableForFinish[1]._props.counter.conditions[0]._props.distance.value = QuestsHelpersConfig.AShooterBornInHeavenCounter;
				quests["5c0bde0986f77479cf22c2f8"].conditions.AvailableForFinish[2]._props.counter.conditions[0]._props.distance.value = QuestsHelpersConfig.AShooterBornInHeavenCounter;
				quests["5c0bde0986f77479cf22c2f8"].conditions.AvailableForFinish[3]._props.counter.conditions[0]._props.distance.value = QuestsHelpersConfig.AShooterBornInHeavenCounter;
			}
        }
		else{
			Logger.log('[QoL] Insta-complete A Shooter Born in Heaven quest');
			quests["5c0bde0986f77479cf22c2f8"].conditions.AvailableForFinish = JSON.parse(instantComplete);
		}

        // "Grenadier" - it's HORRIBLE to kill bots with grenade
		if (QuestsHelpersConfig.GrenadierCounter > 0){
			if (QuestsHelpersConfig.GrenadierCounter != 12){
				Logger.log('[QoL] Grenadier quest counter changed to: ' + QuestsHelpersConfig.GrenadierCounter);
				quests["5c0d190cd09282029f5390d8"].conditions.AvailableForFinish[0]._props.value = QuestsHelpersConfig.GrenadierCounter;
				for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['5c0d190cd09282029f5390d8'].conditions["5c1b760686f77412780211a3"];
					globalBase[localeName].quest['5c0d190cd09282029f5390d8'].conditions["5c1b760686f77412780211a3"] = oldConditionText.replace("12", QuestsHelpersConfig.GrenadierCounter);
				}
			}
		}
		else{
			Logger.log('[QoL] Insta-complete Grenadier quest');
			database.locales.global.en.mail['5c12428d86f77406fa13baf6'] = 'AKI Server] This quest almost impossible due to limited PMC bot\'s behaviour. Just finish it instantly.';
			quests["5c0d190cd09282029f5390d8"].conditions.AvailableForFinish = JSON.parse(instantComplete);
		}
		
        // "The stylish one" - we can kill Killa at anytime. no need for this :)
		if (QuestsHelpersConfig.TheStylishOneCounter > 0){
			if (QuestsHelpersConfig.TheStylishOneCounter != 100){
				Logger.log('[QoL] The stylish one quest counter changed to: ' + QuestsHelpersConfig.TheStylishOneCounter);
				quests["5dc53acb86f77469c740c893"].conditions.AvailableForFinish[0]._props.value = QuestsHelpersConfig.TheStylishOneCounter;
				for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['5dc53acb86f77469c740c893'].conditions["5dc53fd386f77469c87589a3"];
					globalBase[localeName].quest['5dc53acb86f77469c740c893'].conditions["5dc53fd386f77469c87589a3"] = oldConditionText.replace("100", QuestsHelpersConfig.TheStylishOneCounter);
				}
			}
		}
		else{
			Logger.log('[QoL] Insta-complete The stylish one quest');
			quests["5dc53acb86f77469c740c893"].conditions.AvailableForFinish = JSON.parse(instantComplete);
		}
		
		// "Hunter" - we can kill Shturman at anytime. no need for this :)
		if (QuestsHelpersConfig.HunterCounter > 0 ){
			if (QuestsHelpersConfig.HunterCounter != 25){
				Logger.log('[QoL] Hunter quest counter changed to: ' + QuestsHelpersConfig.HunterCounter);
				quests["600302d73b897b11364cd161"].conditions.AvailableForFinish[0]._props.value = QuestsHelpersConfig.HunterCounter;
				for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['600302d73b897b11364cd161'].conditions["600303250b79c6604058ce30"];
					globalBase[localeName].quest['600302d73b897b11364cd161'].conditions["600303250b79c6604058ce30"] = 
						oldConditionText.replace("25", QuestsHelpersConfig.HunterCounter);
				}
			}
		}
		else{
			Logger.log('[QoL] Insta-complete Hunter quest');
			quests["600302d73b897b11364cd161"].conditions.AvailableForFinish = JSON.parse(instantComplete);
		}	
		
		//ChangeBearToAnyPmc
		if (QuestsHelpersConfig.ChangeBearToAnyPmc == true){
			Logger.log('[QoL] Changing BEAR dogtags and kills conditions to accept any PMC');
			quests["59ca2eb686f77445a80ed049"].conditions.AvailableForFinish[1]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5b05468f86f774030379eb74"];
					globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5b05468f86f774030379eb74"] = oldConditionText.replace("BEAR", "BEAR/USEC");
			}
			quests["59ca2eb686f77445a80ed049"].conditions.AvailableForFinish[2]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5b0548e686f7740306753506"];
					globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5b0548e686f7740306753506"] = oldConditionText.replace("BEAR", "BEAR/USEC");
			}
		}
				//remove examined by default
		if (Config.RemoveExaminedByDefault === true){
			for (let id in itemsList) {
				
				itemsList[id]._props.ExaminedByDefault = false;
			}
		}
	
		//Loot Multipliers
		for (let id in itemsList) {
			if (itemsList[id]._props.LootExperience){
				itemsList[id]._props.LootExperience = itemsList[id]._props.LootExperience * Config.ItemsLootExperienceMultiplier;
			}
			if (itemsList[id]._props.ExamineExperience){
				itemsList[id]._props.ExamineExperience = itemsList[id]._props.ExamineExperience * Config.ItemsExamineExperienceMultiplier;
			}
			if (itemsList[id]._props.ExamineTime){
				itemsList[id]._props.ExamineTime = itemsList[id]._props.ExamineTime * Config.ItemsExamineTimeMultiplier;
			}
		}
				//remove examined by default
				if (Config.RemoveExaminedByDefault === true){
					for (let id in itemsList) {
						
						itemsList[id]._props.ExaminedByDefault = false;
					}
				}
			
				//Loot Multipliers
				for (let id in itemsList) {
					if (itemsList[id]._props.LootExperience){
						itemsList[id]._props.LootExperience = itemsList[id]._props.LootExperience * Config.ItemsLootExperienceMultiplier;
					}
					if (itemsList[id]._props.ExamineExperience){
						itemsList[id]._props.ExamineExperience = itemsList[id]._props.ExamineExperience * Config.ItemsExamineExperienceMultiplier;
					}
					if (itemsList[id]._props.ExamineTime){
						itemsList[id]._props.ExamineTime = itemsList[id]._props.ExamineTime * Config.ItemsExamineTimeMultiplier;
					}
						}
		
						
		//ChangeUsecToAnyPmc
		if (QuestsHelpersConfig.ChangeUsecToAnyPmc == true){
			Logger.log('[QoL] Changing USEC dogtags and kills conditions to accept any PMC');
			quests["59ca2eb686f77445a80ed049"].conditions.AvailableForFinish[3]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5cb3393888a4505d02042061"];
					globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5cb3393888a4505d02042061"] = oldConditionText.replace("USE", "BEAR/USE");
			}
			quests["59ca2eb686f77445a80ed049"].conditions.AvailableForFinish[4]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5cb3397c88a450159a723d79"];
					globalBase[localeName].quest['59ca2eb686f77445a80ed049'].conditions["5cb3397c88a450159a723d79"] = oldConditionText.replace("USE", "BEAR/USE");
			}
			
			quests["5a27c99a86f7747d2c6bdd8e"].conditions.AvailableForFinish[1]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5ec137962d5b8510d548aef1"];
					globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5ec137962d5b8510d548aef1"] = oldConditionText.replace("USE", "BEAR/USE");
			}
			quests["5a27c99a86f7747d2c6bdd8e"].conditions.AvailableForFinish[2]._props.target = ["59f32bb586f774757e1e8442", "59f32c3b86f77472a31742f0"];
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5ec137dcc367fc6781104613"];
					globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5ec137dcc367fc6781104613"] = oldConditionText.replace("USE", "BEAR/USE");
			}
			quests["5a27c99a86f7747d2c6bdd8e"].conditions.AvailableForFinish[0]._props.counter.conditions[0]._props.target = "AnyPmc";
			for (let localeName in globalBase){
					var oldConditionText = globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5be0198686f774595412d9c4"];
					globalBase[localeName].quest['5a27c99a86f7747d2c6bdd8e'].conditions["5be0198686f774595412d9c4"] = oldConditionText.replace("USE", "BEAR/USE");
			}
		}
	}


	//taken from Lone_Simon's quest-fixer mod
	// fixSturmanKey() {
        // Logger.log("[QoL] add Shturman's key to his backpack");

        // // KSH should drop 100% but never does.
        // // Tried to fix Shturman's pockets but seems like vests and pockets are un-controllable.
        // // So I had to put only KSH into backpack to make sure it drops every time.
        // const kojaniy = DatabaseServer.tables.bots.types.bosskojaniy
        // kojaniy.generation.items.looseLoot.min = 1;
        // kojaniy.generation.items.looseLoot.max = 1;
        // // I just removed useless keys and ammo.
        // kojaniy.inventory.items.Backpack = ["5d08d21286f774736e7c94c3", "5d08d21286f774736e7c94c3"];
    // }


	createHardcoreEdition() {
        const sides = ["bear", "usec"];
        let profiles = {};

        for (const side of sides) {
            profiles[side] = this.createProfile(side);
        }

        DatabaseServer.tables.templates.profiles = {};
	DatabaseServer.tables.templates.profiles["Single Player Overhaul"] = profiles;
    }
	
    createProfile(side) {
        const filepath = `${ModLoader.getModPath(this.mod)}db/`; 
		
        let profile = JsonUtil.clone(DatabaseServer.tables.templates.profiles["Standard"][side]);

        // set suits
        profile.suits = [ "5cde9ec17d6c8b04723cf479", "5cde9e957d6c8b0474535da7" ];
		//profile.suits = [ ];
		
        // set trader
        profile.trader.initialStanding = 0;
        profile.trader.initialSalesSum = 0;

        // set pmc
        let pmc = profile.character;

		pmc.Encyclopedia = {};
        // set player level and such
        pmc.Info.Level = 1;
        pmc.Info.Experience = 0;
        pmc.Info.AccountType = 0;
        pmc.Info.MemberCategory = 0;

        // unlock hideout energy bonus
        pmc.Health.Energy.Current = 100;
        pmc.Health.Energy.Maximum = 100;

        // set large profile changes
		pmc.Inventory = JsonUtil.deserialize(VFS.readFile(`${filepath}profile/inventory.json`));;
	// add DTC
	pmc.DynamicTimeCycle = {};
	pmc.DynamicTimeCycle.hour = 7;
	pmc.DynamicTimeCycle.min = 0;
	pmc.DynamicTimeCycle.hideout = false;
	    
        profile.character = pmc;
        return profile;
    } 	
	
	LoopThroughThatBith(filepath) {
        const fs = require('fs');
				
        let baseNode = {};
        let directories = this.getDirList(filepath);
        let files = fs.readdirSync(filepath);

        // remove all directories from files
        for (let directory of directories) {
            for (let file in files) {
                if (files[file] === directory) {
                    files.splice(file, 1);
                }
            }
        }

        // make sure to remove the file extention
        for (let node in files) {
            let fileName = files[node].split('.').slice(0, -1).join('.');
            baseNode[fileName] = filepath + files[node];
        }

        // deep tree search
        for (let node of directories) {
            baseNode[node] = this.LoopThroughThatBith(filepath + node + "/");
        }

        return baseNode;
    }
    getDirList(path) {
        const fs = require('fs');
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path + "/" + file).isDirectory();
        });
    }
}

module.exports.Mod = Mod;
