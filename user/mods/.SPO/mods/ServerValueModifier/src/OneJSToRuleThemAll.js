"use strict";
class InitiateTheBassCannon {
  static load() {
    //Config variables to asset for funcs.
    const Config = require("../Loader/loader.json");
    //DB redirects
    const DB = DatabaseServer.tables;
    const hideout = DB.hideout;
    const locations = DB.locations;
    const traders = DB.traders;
    const Quests = DB.templates.quests;
    const suits = DB.templates.customization;
    const items = DB.templates.items;
    const globals = DB.globals.config;
    // Redirects to server internal configs.
    const Inraid = InraidConfig
    const Repair = RepairConfig
    const Ragfair = RagfairConfig
    const locs = LocationConfig
    const Insurance = InsuranceConfig
    const Health = HealthConfig
    const Bots = BotConfig
    const Quest = QuestConfig
    const WeatherValues = WeatherConfig
    const trader = TraderConfig
    const Inventory = InventoryConfig
    const BL = Config.BL;
    const Bot = DB.bots.types
   
    
    Logger.log(`SVM has awoken, EmuTarkovRC wishes you a good day`, "white", "blue");


    
    //############## RAGFAIR OPTIONS ###############
    if (Config.Fleamarket.EnableFleamarket) {
      Logger.debug("SVM:Fleamarket settings enabled")
      //Player offers tab
      Ragfair.sell.fees = Config.Fleamarket.PlayerOffers.EnableFees;
      Ragfair.sell.chance.base = Config.Fleamarket.PlayerOffers.Sell_chance;
      Ragfair.sell.chance.underpriced = Config.Fleamarket.PlayerOffers.Sell_underprice;
      Ragfair.sell.chance.overprices = Config.Fleamarket.PlayerOffers.Sell_overprice;
      Ragfair.sell.time.base = Config.Fleamarket.PlayerOffers.Tradeoffer_avg;
      Ragfair.sell.time.max = Config.Fleamarket.PlayerOffers.Tradeoffer_max;
      Ragfair.sell.time.min = Config.Fleamarket.PlayerOffers.Tradeoffer_min;
      Ragfair.sell.reputation.gain = Config.Fleamarket.PlayerOffers.Rep_gain;
      Ragfair.sell.reputation.loss = Config.Fleamarket.PlayerOffers.Rep_loss;
      //Dynamic offers
      Ragfair.dynamic.enabled = Config.Fleamarket.DynamicOffers.Playertrades;
      Ragfair.dynamic.liveprices = Config.Fleamarket.DynamicOffers.Liveprices;
      Ragfair.dynamic.expiredOfferCountRegenThreshold = Config.Fleamarket.DynamicOffers.ExpireThreshold;
      //Min-Max
      Ragfair.dynamic.offerItemCount.min = Config.Fleamarket.DynamicOffers.PerOffer_min;
      Ragfair.dynamic.offerItemCount.max = Config.Fleamarket.DynamicOffers.PerOffer_max;
      Ragfair.dynamic.rating.min = Config.Fleamarket.DynamicOffers.Rating_min;
      Ragfair.dynamic.rating.max = Config.Fleamarket.DynamicOffers.Rating_max;
      Ragfair.dynamic.price.min = Config.Fleamarket.DynamicOffers.Price_min;
      Ragfair.dynamic.price.max = Config.Fleamarket.DynamicOffers.Price_max;
      Ragfair.dynamic.endTimeSeconds.min = Config.Fleamarket.DynamicOffers.Time_min;
      Ragfair.dynamic.endTimeSeconds.max = Config.Fleamarket.DynamicOffers.Time_max;
      Ragfair.dynamic.condition.min = Config.Fleamarket.DynamicOffers.Condition_min;
      Ragfair.dynamic.condition.max = Config.Fleamarket.DynamicOffers.Condition_max;
      Ragfair.dynamic.nonStackableCount.min = Config.Fleamarket.DynamicOffers.NonStack_min
      Ragfair.dynamic.nonStackableCount.max = Config.Fleamarket.DynamicOffers.NonStack_max
      Ragfair.dynamic.stackablePercent.min = Config.Fleamarket.DynamicOffers.Stack_min
      Ragfair.dynamic.stackablePercent.max = Config.Fleamarket.DynamicOffers.Stack_max
      //Currencies
      Ragfair.dynamic.currencies["5449016a4bdc2d6f028b456f"] = Config.Fleamarket.DynamicOffers.Roubleoffers;
      Ragfair.dynamic.currencies["5696686a4bdc2da3298b456a"] = Config.Fleamarket.DynamicOffers.Dollaroffers;
      Ragfair.dynamic.currencies["569668774bdc2da2298b4568"] = Config.Fleamarket.DynamicOffers.Eurooffers;
      //Trader static offers
      Ragfair.traders["54cb50c76803fa8b248b4571"] = Config.Fleamarket.TraderStaticOffers.Praporoffers;
      Ragfair.traders["54cb57776803fa99248b456e"] = Config.Fleamarket.TraderStaticOffers.Therapistoffers;
      Ragfair.traders["579dc571d53a0658a154fbec"] = Config.Fleamarket.TraderStaticOffers.Fenceoffers;
      Ragfair.traders["58330581ace78e27b8b10cee"] = Config.Fleamarket.TraderStaticOffers.SkierOffers;
      Ragfair.traders["5935c25fb3acc3127c3d8cd9"] = Config.Fleamarket.TraderStaticOffers.Peacekeeperoffers;
      Ragfair.traders["5a7c2eca46aef81a7ca2145d"] = Config.Fleamarket.TraderStaticOffers.Mechanicoffers;
      Ragfair.traders["5ac3b934156ae10c4430e83c"] = Config.Fleamarket.TraderStaticOffers.Ragmanoffers;
      Ragfair.traders["5c0647fdd443bc2504c2d371"] = Config.Fleamarket.TraderStaticOffers.Jaegeroffers;
	  //blacklist
	  Ragfair.dynamic.blacklist.enableBsgList = !Config.Fleamarket.DisableBSGList;
    }
    //############## LOOT OPTIONS ##################
    if (Config.Loot.EnableLoot) {
      Logger.debug("SVM:Loot settings enabled")
      locs.allowLootOverlay = Config.Loot.Locations.LootOverlap;
	  globals.GlobalLootChanceModifier = Config.Loot.Locations.Lootchancemultiplier;
	  //Limits
      locs.limits.bigmap = Config.Loot.Locations.Bigmap_limit;
      locs.limits.factory4_day = Config.Loot.Locations.FactoryDay_limit;
      locs.limits.factory4_night = Config.Loot.Locations.FactoryNight_Limit;
      locs.limits.interchange = Config.Loot.Locations.Interchange_limit;
      locs.limits.laboratory = Config.Loot.Locations.Laboratory_limit;
      locs.limits.rezervbase = Config.Loot.Locations.Reserve_limit;
      locs.limits.shoreline = Config.Loot.Locations.Shoreline_limit;
      locs.limits.woods = Config.Loot.Locations.Woods_limit;
	  locs.limits.lighthouse = Config.Loot.Locations.Lighthouse_limit;
	  //loose loot mults
	  locs.looseLootMultiplier.bigmap = Config.Loot.Locations.Bigmap_limit;
      locs.looseLootMultiplier.factory4_day = Config.Loot.Locations.FactoryDay_limit;
      locs.looseLootMultiplier.factory4_night = Config.Loot.Locations.FactoryNight_Limit;
      locs.looseLootMultiplier.interchange = Config.Loot.Locations.Interchange_limit;
      locs.looseLootMultiplier.laboratory = Config.Loot.Locations.Laboratory_limit;
      locs.looseLootMultiplier.rezervbase = Config.Loot.Locations.Reserve_limit;
      locs.looseLootMultiplier.shoreline = Config.Loot.Locations.Shoreline_limit;
      locs.looseLootMultiplier.woods = Config.Loot.Locations.Woods_limit;
	  locs.looseLootMultiplier.lighthouse = Config.Loot.Locations.Lighthouse_limit;
	  	//container loot mults
		if(Config.Loot.Locations.ContainerMult)
		{
		  locs.staticLootMultiplier.bigmap = Config.Loot.Locations.Bigmap_limit;
		  locs.staticLootMultiplier.factory4_day = Config.Loot.Locations.FactoryDay_limit;
		  locs.staticLootMultiplier.factory4_night = Config.Loot.Locations.FactoryNight_Limit;
		  locs.staticLootMultiplier.interchange = Config.Loot.Locations.Interchange_limit;
		  locs.staticLootMultiplier.laboratory = Config.Loot.Locations.Laboratory_limit;
		  locs.staticLootMultiplier.rezervbase = Config.Loot.Locations.Reserve_limit;
		  locs.staticLootMultiplier.shoreline = Config.Loot.Locations.Shoreline_limit;
		  locs.staticLootMultiplier.woods = Config.Loot.Locations.Woods_limit;
		  locs.staticLootMultiplier.lighthouse = Config.Loot.Locations.Lighthouse_limit;
		}
    }
    //############## BOTS OPTIONS ##################
    if (Config.Bots.EnableBots) {
      Logger.debug("SVM:Bot section settings enabled")
      Bots.pmc.types.assault = Config.Bots.AItoPMC.PMCtoScav;
      Bots.pmc.types.pmcBot = Config.Bots.AItoPMC.PMCtoRaider;
      Bots.pmc.types.exUsec = Config.Bots.AItoPMC.ExusectoPMC;
      Bots.pmc.isUsec = Config.Bots.PMCRatio;
      Bots.maxBotCap = Config.Bots.BotSpawn.GlobalATO;
      Bots.pmc.chanceSameSideIsHostilePercent = Config.Bots.HostilePMC;
      locations["bigmap"].base.MaxBotPerZone = Config.Bots.BotSpawn.CustomsSPZ;
      locations["factory4_day"].base.MaxBotPerZone = Config.Bots.BotSpawn.FactoryNightSPZ;
      locations["factory4_night"].base.MaxBotPerZone = Config.Bots.BotSpawn.FactoryDaySPZ;
      locations["interchange"].base.MaxBotPerZone = Config.Bots.BotSpawn.InterchangeSPZ;
      locations["laboratory"].base.MaxBotPerZone = Config.Bots.BotSpawn.LaboratorySPZ;
      locations["shoreline"].base.MaxBotPerZone = Config.Bots.BotSpawn.ShorelineSPZ;
      locations["woods"].base.MaxBotPerZone = Config.Bots.BotSpawn.WoodsSPZ;
      locations["rezervbase"].base.MaxBotPerZone = Config.Bots.BotSpawn.ReserveSPZ;
	  locations["lighthouse"].base.MaxBotPerZone = Config.Bots.BotSpawn.LighthouseSPZ;

	  
	  
	for (const id in items) {
	  	//Maximum durability
		if ((items[id]._parent == "5447b5cf4bdc2d65278b4567" || items[id]._parent == "5447b6254bdc2dc3278b4568" || items[id]._parent == "5447b5f14bdc2d61278b4567" || items[id]._parent == "5447bed64bdc2d97278b4568" || items[id]._parent == "5447b6094bdc2dc3278b4567" || items[id]._parent == "5447b5e04bdc2d62278b4567" || items[id]._parent == "5447b6194bdc2d67278b4567") && items[id]._props.durabSpawnMax !== undefined) {
          items[id]._props.durabSpawnMax = Config.Bots.AIDurability.DurabilityMax;
        }
		//Minimum durability
		if ((items[id]._parent == "5447b5cf4bdc2d65278b4567" || items[id]._parent == "5447b6254bdc2dc3278b4568" || items[id]._parent == "5447b5f14bdc2d61278b4567" || items[id]._parent == "5447bed64bdc2d97278b4568" || items[id]._parent == "5447b6094bdc2dc3278b4567" || items[id]._parent == "5447b5e04bdc2d62278b4567" || items[id]._parent == "5447b6194bdc2d67278b4567") && items[id]._props.durabSpawnMin !== undefined) {
          items[id]._props.durabSpawnMin = Config.Bots.AIDurability.DurabilityMin;
        }
	}
    }
    //############## BOTS PRESET BATCH OPTIONS #########
    if (Config.Deprecated.EnableDeprecated) //Still dunno should i bonk it or nah.
    {
      Bots.presetBatch.assault = Config.Deprecated.BotLoadouts.Assault;
      Bots.presetBatch.marksman = Config.Deprecated.BotLoadouts.Marksman;
      Bots.presetBatch.pmcBot = Config.Deprecated.BotLoadouts.PMCbot;
      Bots.presetBatch.bossBully = Config.Deprecated.BotLoadouts.Reshala;
      Bots.presetBatch.bossGluhar = Config.Deprecated.BotLoadouts.Glukhar;
      Bots.presetBatch.bossKilla = Config.Deprecated.BotLoadouts.Killa;
      Bots.presetBatch.bossKojaniy = Config.Deprecated.BotLoadouts.Shturman;
      Bots.presetBatch.bossSanitar = Config.Deprecated.BotLoadouts.Sanitar;
      Bots.presetBatch.followerBully = Config.Deprecated.BotLoadouts.Zavodskoy;
      Bots.presetBatch.followerGluharAssault = Config.Deprecated.BotLoadouts.Glukhar_assault;
      Bots.presetBatch.followerGluharScout = Config.Deprecated.BotLoadouts.Glukhar_scout;
      Bots.presetBatch.followerGluharSecurity = Config.Deprecated.BotLoadouts.Glukhar_security;
      Bots.presetBatch.followerGluharSnipe = Config.Deprecated.BotLoadouts.Glukhar_snipe;
      Bots.presetBatch.followerKojaniy = Config.Deprecated.BotLoadouts.Shturman_followers;
      Bots.presetBatch.followerSanitar = Config.Deprecated.BotLoadouts.Sanitar_followers;
      Bots.presetBatch.test = Config.Deprecated.BotLoadouts.Test;
      Bots.presetBatch.followerTest = Config.Deprecated.BotLoadouts.Test;
      Bots.presetBatch.bossTest = Config.Deprecated.BotLoadouts.Bosstest;
      Bots.presetBatch.assaultGroup = Config.Deprecated.BotLoadouts.Assault_group;
      Bots.presetBatch.playerScav = Config.Deprecated.BotLoadouts.PlayerScav;
      Bots.presetBatch.sectantWarrior = Config.Deprecated.BotLoadouts.Cultists;
      Bots.presetBatch.sectantPriest = Config.Deprecated.BotLoadouts.Cultist_priest;
    }
    //############## INSURANCE OPTIONS #############
    if (Config.Insurance.EnableInsurance) {
      Logger.debug("SVM:Insurance settings enabled")
      Insurance.insuranceMultiplier["54cb50c76803fa8b248b4571"] = Config.Insurance.InsuranceMultPrapor;
      Insurance.insuranceMultiplier["54cb57776803fa99248b456e"] = Config.Insurance.InsuranceMultTherapist;
      Insurance.returnChance = Config.Insurance.ReturnChance;
      globals.Insurance.MaxStorageTimeInHour = Config.Insurance.InsuranceStorageTime;
      traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour = Config.Insurance.InsuranceTime.Prapor_Min;
      traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour = Config.Insurance.InsuranceTime.Prapor_Max;
      traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour = Config.Insurance.InsuranceTime.Therapist_Min;
      traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour = Config.Insurance.InsuranceTime.Therapist_Max;
    }
    //############## CSM OPTIONS ###################
    if (Config.CSM.EnableCSM) {
      Logger.debug("SVM:CSM settings enabled")
      const Cases = Config.CSM.Cases
      const SecCon = Config.CSM.SecureContainers
      const SecConID = ["544a11ac4bdc2d470e8b456a", "5c093ca986f7740a1867ab12", "5857a8b324597729ab0a0e7d", "59db794186f77448bc595262", "5857a8bc2459772bad15db29"]
      const CasesID = ["59fb016586f7746d0d4b423a", "5783c43d2459774bbe137486", "60b0f6c058e0b0481a09ad11", "5e2af55f86f7746d4159f07c", "59fb042886f7746c5005a7b2", "59fb023c86f7746d0d4b423c", "5b7c710788a4506dec015957", "5aafbde786f774389d0cbc0f", "5c127c4486f7745625356c13", "5c093e3486f77430cb02e593", "5aafbcd986f7745e590fff23", "5c0a840b86f7742ffa4f2482", "5b6d9ce188a4501afc1b2b25", "5d235bb686f77443f4331278", "59fafd4b86f7745ca07e1232", "590c60fc86f77412b13fddcf", "567143bf4bdc2d1a0f8b4567", "5c093db286f7740a1b2617e3","619cbf7d23893217ec30b689","619cbf9e0a7c3a1a2731940a"]
      const Vsize = [
      Cases.MoneyCaseVSize, Cases.SimpleWalletVSize, Cases.WZWalletVSize, Cases.GrenadeCaseVSize, Cases.ItemsCaseVSize, Cases.WeaponCaseVSize, Cases.LuckyScavVSize, Cases.AmmunitionCaseVSize, Cases.MagazineCaseVSize, Cases.DogtagCaseVSize, Cases.MedicineCaseVSize, Cases.ThiccItemsCaseVSize, Cases.ThiccWeaponCaseVSize, Cases.SiccCaseVSize, Cases.KeytoolVSize, Cases.DocumentsCaseVSize, Cases.PistolCaseVSize, Cases.HolodilnickVSize, Cases.InjectorCaseVSize, Cases.KeycardHolderCaseVSize]
      const Hsize = [
      Cases.MoneyCaseHSize, Cases.SimpleWalletHSize, Cases.WZWalletHSize, Cases.GrenadeCaseHSize, Cases.ItemsCaseHSize, Cases.WeaponCaseHSize, Cases.LuckyScavHSize, Cases.AmmunitionCaseHSize, Cases.MagazineCaseHSize, Cases.DogtagCaseHSize, Cases.MedicineCaseHSize, Cases.ThiccItemsCaseHSize, Cases.ThiccWeaponCaseHSize, Cases.SiccCaseHSize, Cases.KeytoolHSize, Cases.DocumentsCaseHSize, Cases.PistolCaseHSize, Cases.HolodilnickHSize, Cases.InjectorCaseHSize, Cases.KeycardHolderCaseHSize]
      const SecVsize = [SecCon.AlphaVSize, SecCon.KappaVSize, SecCon.BetaVSize, SecCon.EpsilonVSize, SecCon.GammaVSize];
      const SecHsize = [SecCon.AlphaHSize, SecCon.KappaHSize, SecCon.BetaHSize, SecCon.EpsilonHSize, SecCon.GammaHSize];
      const Filts = [
        Cases.MoneyCaseFilter, Cases.SimpleWalletFilter, Cases.WZWalletFilter, Cases.GrenadeCaseFilter, Cases.ItemsCaseFilter, Cases.WeaponCaseFilter, Cases.LuckyScavFilter, Cases.AmmunitionCaseFilter, Cases.MagazineCaseFilter, Cases.DogtagCaseFilter, Cases.MedicineCaseFilter, Cases.ThiccItemsCaseFilter, Cases.ThiccWeaponCaseFilter, Cases.SiccCaseFilter, Cases.KeytoolFilter, Cases.DocumentsCaseFilter, Cases.PistolCaseFilter, Cases.HolodilnickFilter, Cases.InjectorCaseFilter, Cases.KeycardHolderCaseFilter]
   
      for (var SecConts in SecConID) {
        items[SecConID[SecConts]]._props.Grids[0]._props["cellsV"] = SecVsize[SecConts];
        items[SecConID[SecConts]]._props.Grids[0]._props["cellsH"] = SecHsize[SecConts];
      }
      for (var Case in CasesID) {
        items[CasesID[Case]]._props.Grids[0]._props["cellsV"] = Vsize[Case];
        items[CasesID[Case]]._props.Grids[0]._props["cellsH"] = Hsize[Case];
      }
      //Filters
      for (var Filters in Filts)
      {
        if (Filts[Filters])// To check whether checkmark is true or false
        {
          items[CasesID[Filters]]._props.Grids[0]._props.filters = [];
        }
      }
    }
    //############## ITEMS SECTION ##################
    if (Config.Items.EnableItems) {
      Logger.debug("SVM:Items settings enabled")
      //Price Modifier
      for (const item in DB.templates.handbook.Items) {
        if (DB.templates.handbook.Items[item].ParentId !== "5b5f78b786f77447ed5636af" && DB.templates.handbook.Items[item].Price != null) {
          var parser = DB.templates.handbook.Items[item].Price * Config.Items.ItemPriceMult
          DB.templates.handbook.Items[item].Price = parser //this shit can be simplified, i dunno why i did this in a first place
        }
      }

      for (const id in items) {
        let base = items[id]
        //Load-Unload
        if (items[id]._parent == "5448bc234bdc2d3c308b4569" && (Config.Items.AmmoLoadSpeed !== 0 || Config.Items.AmmoLoadSpeed !== undefined)) {
          EditSimpleItemData(id, "LoadUnloadModifier", ( - Config.Items.AmmoLoadSpeed));
        }
        //Malfunction 
        if ((items[id]._parent == "5447b5cf4bdc2d65278b4567" || items[id]._parent == "5447b6254bdc2dc3278b4568" || items[id]._parent == "5447b5f14bdc2d61278b4567" || items[id]._parent == "5447bed64bdc2d97278b4568" || items[id]._parent == "5447b6094bdc2dc3278b4567" || items[id]._parent == "5447b5e04bdc2d62278b4567" || items[id]._parent == "5447b6194bdc2d67278b4567") && items[id]._props.BaseMalfunctionChance !== undefined) {
          items[id]._props.BaseMalfunctionChance = (items[id]._props.BaseMalfunctionChance * Config.Items.MalfunctChanceMult).toFixed(2);
        }
        if (items[id]._parent === "5448bc234bdc2d3c308b4569" && items[id]._props.MalfunctionChance !== undefined) {
          items[id]._props.MalfunctionChance = (items[id]._props.MalfunctionChance * Config.Items.MalfunctChanceMult).toFixed(2);
        }
        //Misfire - WIP
        if (items[id]._parent === "5485a8684bdc2da71d8b4567" && items[id]._props.MisfireChance !== undefined) {
          items[id]._props.MisfireChance = (items[id]._props.MisfireChance * Config.Items.MisfireChance).toFixed(2);
        }
        // BallisticCoeficient - WIP
        if (items[id]._parent === "5485a8684bdc2da71d8b4567" && items[id]._props.BallisticCoeficient !== undefined) {
          items[id]._props.MisfireChance = (items[id]._props.BallisticCoeficient * Config.Items.BallisticCoeficient).toFixed(4);
        }
        //Examine all items
        if (Config.Items.AllExaminedItems) {
          EditSimpleItemData(id, "ExaminedByDefault", true);
        }
        //Change the weight - finally got rid of variables i had to force, i also think i could simplify that "if".
        if (base._type !== "Node" && base._type !== undefined && (base.parent !== "557596e64bdc2dc2118b4571" || base._parent !== "55d720f24bdc2d88028b456d")) {
          EditSimpleItemData(id, "Weight", (Config.Items.WeightChanger * base._props.Weight).toFixed(3));
        }

        //-----Barter Stuff----
        if (Config.Items.EnableBarterStack) {
          switch (base._parent) {
          case "57864ee62459775490116fc1":
            // Battery
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Battery)
            break;
          case "57864ada245977548638de91":
            //Building materials
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Buildmats)
            break;
          case "57864a66245977548f04a81f":
            //Electronics
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Electronics)
            break;
          case "57864c322459775490116fbf":
            //Household goods
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Householdgoods)
            break;
          case "57864a3d24597754843f8721":
            // Valuables
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Jewelry)
            break;
          case "57864c8c245977548867e7f1":
            //Medical supplies
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Medsupplies)
            break;
          case "57864e4c24597754843f8723":
            //Flammable
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Fuel)
            break;
          case "57864bb7245977548b3b66c2":
            //Tools
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Tools)
            break;
          case "590c745b86f7743cc433c5f2":
            //Other
            EditSimpleItemData(id, "StackMaxSize", Config.Items.StackValues.Other)
            break;
          }
        }
        if (Config.Items.NoGearPenalty) {
          if (base._props.mousePenalty) {
            EditSimpleItemData(id, "mousePenalty", 0)
          }
          if (base._props.weaponErgonomicPenalty) {
            EditSimpleItemData(id, "weaponErgonomicPenalty", 0)
          }
          if (base._props.speedPenaltyPercent) {
            EditSimpleItemData(id, "speedPenaltyPercent", 0)
          }
        }
        //if (base._name.includes("patron"))
        if (base._parent == ("5485a8684bdc2da71d8b4567")) {
          var str = base._name.split("_", 2)
          if (str[1] == "9x19" || str[1] == "9x18pm" || str[1] == "9x21" || str[1] == "762x25tt" || str[1] == "46x30" || str[1] == "57x28" || str[1] == "1143x23") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.PistolRound)
          }
          if (str[1] == "12x70" || str[1] == "20x70" || str[1] == "23x75") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.ShotgunRound)
          }
          if (str[1] == "762x39" || str[1] == "545x39" || str[1] == "556x45" || str[1] == "9x39" || str[1] == "366" || str[1] == "762x35" || str[1] == "300blk" || str[1] == "ATL15") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.RifleRound)
          }
          if (str[1] == "762x51" || str[1] == "762х54R" || str[1] == "762x54r" || str[1] == "86x70" || str[1] == "127x55") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.MarksmanRound)
          }
          //KMC
          if (str[2] == "10MM" || str[2] == "40SW" || str[2] == "357SIG" || str[2] == "9MM" || str[2] == "45ACP" || str[2] == "50AE" || str[2] == "380AUTO") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.PistolRound)
          }
          if (str[2] == "GRENDEL" || str[2] == "50WLF") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.RifleRound)
          }
          if (str[2] == "BMG" || str[2] == "277") {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.MarksmanRound)
          }
          if (str[2] == "KURZ")
          {
            EditSimpleItemData(id, "StackMaxSize", Config.Items.AmmoStacks.RifleRound)
          }
        }
        //Change money stacks
        if (base._parent == "543be5dd4bdc2deb348b4569" && Config.Items.CashStack !== 500000) //Need to rebuild all of this.
        {
          EditSimpleItemData(id, "StackMaxSize", Config.Items.CashStack);
        }
        //Allow armored rigs with armors
        if (Config.Items.EquipRigsWithArmors) {
          EditSimpleItemData(id, "BlocksArmorVest", false);
        }
        //Remove filters
        if (Config.Items.RemoveSecureContainerFilters && base._parent == "5448bf274bdc2dfc2f8b456a" && base._props.Grids[0]._props.filters !== undefined) {
          base._props.Grids[0]._props.filters = [];
        }
        if (Config.Items.RemoveBackpacksRestrictions && base._parent == "5448e53e4bdc2d60728b4567" && base._props.Grids[0]._props.filters !== undefined) {
          base._props.Grids[0]._props.filters = [];
        }
        if (Config.Items.RemoveRaidRestr) {
          globals.RestrictionsInRaid = []
        }
        //Change items experience gain
        if (base._props.LootExperience !== undefined) {
          let calculation = Math.round(base._props.LootExperience * Config.Items.LootExp);
          EditSimpleItemData(id, "LootExperience", calculation);
        }
        if (base._props.ExamineExperience !== undefined) {
          let calculation = Math.round(base._props.ExamineExperience * Config.Items.ExamineExp);
          EditSimpleItemData(id, "ExamineExperience", calculation);
        }
        //Remove the keys usage
        if (Config.Items.RemoveKeysUsageNumber && (base._parent == "5c99f98d86f7745c314214b3" || base._parent == "5c164d2286f774194c5e69fa")) {
          base._props.MaximumNumberOfUsage = 0
        
        }
        //Change weapons parts moddability
        if (Config.Items.InRaidModdable) {
          if (base._props.RaidModdable) {
            EditSimpleItemData(id, "RaidModdable", true);
            if (base._props.ToolModdable) {
              EditSimpleItemData(id, "ToolModdable", true);
            }
          }
          if (base._props.Slots) {
            for (let z in base._props.Slots) {
              if (base._props.Slots[z]._required !== "false") {
                base._props.Slots[z]._required = false;
              }
            }
          }
        }
      }
      

      if (Config.Items.IDChanger) {
        Logger.log("SVM: Custom properties are on, no support will be given if you screw this up", "white", "magenta")
        //Edit item properties, i know it looks stupid, but hey - it works and i like it.
        if (Config.ItemList !== {}) {
          try {
            for (var k in Config.ItemList) {
              var fin = Config.ItemList[k].split(":", 6)
              if (fin[3] == null) {
                Logger.log("ID: " + fin[0] + " Property: " + fin[1] + " Value: " + fin[2])
                EditSimpleItemData(fin[0], fin[1], fin[2])//For basic items properties
              } else if (fin[4] == null) {
                Logger.log("ID: " + fin[0] + " Structure: " + fin[1] + " Property: " + fin[2] + " Value: " + fin[3])
                EditAdvancedItemData(fin[0], fin[1], fin[2], fin[3])
              } else if (fin[5] == null) //Mags and their sizes
              {
                Logger.log("ID: " + fin[0] + " Structure: " + fin[1] + " Array: " + fin[2] + " Property: " + fin[3] + " Value: " + fin[4])
                EditEnchancedtemData(fin[0], fin[1], fin[2], fin[3], fin[4])
              } else 
              {
                Logger.log("ID: " + fin[0] + " Ext.Structure: " + fin[1] + " Array: " + fin[2] + " Int.Structure: " + fin[3] + " Property: " + fin[4] + " Value: " + fin[5])
                EditComplicatedItemData(fin[0], fin[1], fin[2], fin[3], fin[4], fin[5]) //Stupidly long one for Backpacks, Initial _props after ID, Grids, number of grid, another selectable _props, and only then values.
              }
            }
            Logger.success("SVM: Custom properties successfully loaded")
          } catch(e) {
            Logger.error("SVM: Custom properties failed to load, error of the code:" + e)
          }
        }
      }
    }
    
  
    //############## PLAYER SECTION #################
    if (Config.Player.EnablePlayer) {
      Logger.debug("SVM:Player settings enabled")
      //Skill box
      globals.SkillsSettings.SkillProgressRate = Config.Player.SkillProgMult;
      globals.SkillsSettings.WeaponSkillProgressRate = Config.Player.WeaponSkillMult;
      //health after raid box
      Health.healthMultipliers.death = Config.Player.DiedHealth.Health_death;
      Health.healthMultipliers.blacked = Config.Player.DiedHealth.Health_blacked;
      Health.save.health = Config.Player.DiedHealth.Savehealth;
      Health.save.effects = Config.Player.DiedHealth.Saveeffects;
      //Remove fall damages
      if (Config.Player.FallDamage) {
        Logger.debug("SVM: Icarus wings granted");
        globals.Health.Falling.SafeHeight = 200
        globals.Health.Falling.DamagePerMeter = 0
      }
      //Change stamina (unlimited or no)
      if (Config.Player.MaxStamina !== 100 && Config.Player.UnlimitedStamina) {
        Logger.debug("SVM: Custom maximum stamina activated");
        globals.Stamina.Capacity = Config.Player.MaxStamina;
      } else if (Config.Player.UnlimitedStamina) {
        Logger.debug("SVM: Unlimited stamina - granted");
        globals.Stamina.Capacity = 500;
        globals.Stamina.BaseRestorationRate = 500;
        globals.Stamina.StaminaExhaustionCausesJiggle = false;
        globals.Stamina.StaminaExhaustionStartsBreathSound = false;
        globals.Stamina.StaminaExhaustionRocksCamera = false;
        globals.Stamina.SprintDrainRate = 0;
        globals.Stamina.JumpConsumption = 0;
        globals.Stamina.AimDrainRate = 0;
        globals.Stamina.SitToStandConsumption = 0;
      }
      if (Config.Player.SkillFatigue) {
        Logger.debug("SVM: Custom Fatigue settings activated");
        Logger.debug("SVM: Fatigue Settings: MinEffect: " + Config.Player.SkillMinEffect + "\r\n FatiguePerPoint: " + Config.Player.SkillFatiguePerPoint + "\r\n FreshEffect: " + Config.Player.SkillFreshEffect + "\r\n FreshPoints: " + Config.Player.SkillFPoints + "\r\n PointsBeforeFatigue: " + Config.Player.SkillPointsBeforeFatigue + "\r\n FatigueResetTime: " + Config.Player.SkillFatigueReset);
        globals.SkillMinEffectiveness = Config.Player.SkillMinEffect;
        globals.SkillFatiguePerPoint = Config.Player.SkillFatiguePerPoint;
        globals.SkillFreshEffectiveness = Config.Player.SkillFreshEffect;
        globals.SkillFreshPoints = Config.Player.SkillFPoints;
        globals.SkillPointsBeforeFatigue = Config.Player.SkillPointsBeforeFatigue;
        globals.SkillFatigueReset = Config.Player.SkillFatigueReset;
      }
      else
      {
        globals.SkillAtrophy = false; //May not work at all
      }
      if (Config.Player.EnableHealth) {
        HttpRouter.onStaticRoute["/client/game/version/validate"]["SVM"] = EditHealth.bind(this);
      }
      if (Config.Player.SkillMax) {
        Logger.warning("SVM: Max Skills activated, I hope you made a profile.")
        HttpRouter.onStaticRoute["/client/game/version/validate"]["SVM"] = maxSkills.bind(this);
      }

    }
    //############## HIDEOUT SECTION ################
    if (Config.Hideout.EnableHideout) {
      Logger.debug("SVM:Hideout settings enabled")
      //Change hideout fuel consumption
      hideout.settings.generatorFuelFlowRate = Config.Hideout.FuelConsumptionRate;
      //Enable hideout fast constructions
      if (Config.Hideout.FastHideoutConstruction) {
        for (const data in hideout.areas) {
          let areaData = hideout.areas[data]
          for (const i in areaData.stages) {
            if (areaData.stages[i].constructionTime > 0) {
              areaData.stages[i].constructionTime = 10;
            }
          }
        }
      }
      //Enable fast hideout production
      if (Config.Hideout.FastHideoutProduction) {
        for (const data in hideout.production) {
          let productionData = hideout.production[data];
          if (productionData.continuous === false && productionData.productionTime >= 10) {
            productionData.productionTime = 10;
          }
        }
      }
      //Scav cases modifications
      if (Config.Hideout.FastScavCase) {
        for (const scav in hideout.scavcase) {
          let caseData = hideout.scavcase[scav];
          if (caseData.ProductionTime >= 10) {
            caseData.ProductionTime = 10;
          }
        }
      }
      if (Config.Hideout.ScavCasePriceReducer) {
        for (const scase in hideout.scavcase) {
          let caseData = hideout.scavcase[scase];
          if (caseData.Requirements[0].count >= 10 && (caseData.Requirements[0].templateId == "5449016a4bdc2d6f028b456f" || caseData.Requirements[0].templateId == "5696686a4bdc2da3298b456a" || caseData.Requirements[0].templateId == "569668774bdc2da2298b4568")) {
            caseData.Requirements[0].count = 10;
          }
        }
      }
      //Remove construction requirements
      if (Config.Hideout.RemoveConstructionsRequirements) {
        for (const data in hideout.areas) {
          let areaData = hideout.areas[data]
          for (const i in areaData.stages) {
            if (areaData.stages[i].requirements !== undefined) {
              areaData.stages[i].requirements = [];
            }
          }
        }
      }
    }
    //############## RAIDS SECTION ###################
    if (Config.Raids.EnableRaids) {
      Logger.debug("SVM:Raids settings enabled")
      //############## WEATHER OPTIONS ##################
      WeatherValues.acceleration = Config.Raids.Timeacceleration;
      WeatherValues.weather.clouds.min = Config.Raids.Weather.Clouds_min;
      WeatherValues.weather.clouds.max = Config.Raids.Weather.Clouds_max;
      WeatherValues.weather.windSpeed.min = Config.Raids.Weather.Windspeed_min;
      WeatherValues.weather.windSpeed.max = Config.Raids.Weather.Windspeed_max;
      WeatherValues.weather.windDirection.min = Config.Raids.Weather.Winddirection_min;
      WeatherValues.weather.windDirection.max = Config.Raids.Weather.Winddirection_max;
      WeatherValues.weather.windGustiness.min = Config.Raids.Weather.Windgustiness_min;
      WeatherValues.weather.windGustiness.max = Config.Raids.Weather.Windgustiness_max;
      WeatherValues.weather.rain.min = Config.Raids.Weather.Rain_min;
      WeatherValues.weather.rain.max = Config.Raids.Weather.Rain_max;
      WeatherValues.weather.rainIntensity.min = Config.Raids.Weather.Rainintensity_min;
      WeatherValues.weather.rainIntensity.max = Config.Raids.Weather.Rainintensity_max;
      WeatherValues.weather.fog.min = Config.Raids.Weather.Fog_min;
      WeatherValues.weather.fog.max = Config.Raids.Weather.Fog_max;
      WeatherValues.weather.temp.min = Config.Raids.Weather.Temp_min;
      WeatherValues.weather.temp.max = Config.Raids.Weather.Temp_max;
      WeatherValues.weather.pressure.min = Config.Raids.Weather.Pressure_min;
      WeatherValues.weather.pressure.max = Config.Raids.Weather.Pressure_max;
      //############## END OF RAID OPTIONS ############## 
      globals.exp.match_end.runnerMult = Config.Raids.RaidMult.Runner
      globals.exp.match_end.miaMult = Config.Raids.RaidMult.MIA
      globals.exp.match_end.survivedMult = Config.Raids.RaidMult.Survived
      globals.exp.match_end.killedMult = Config.Raids.RaidMult.Killed
      //############## INRAID OPTIONS ##################
      Inraid.MIAOnRaidEnd = Config.Raids.RaidStartup.MIAEndofRaid;
      Inraid.raidMenuSettings.aiAmount = Config.Raids.RaidStartup.AIAmount;
      Inraid.raidMenuSettings.aiDifficulty = Config.Raids.RaidStartup.AIDiffculty;
      Inraid.raidMenuSettings.bossEnabled = Config.Raids.RaidStartup.EnableBosses;
      Inraid.raidMenuSettings.scavWars = Config.Raids.RaidStartup.ScavWars;
      Inraid.raidMenuSettings.taggedAndCursed = Config.Raids.RaidStartup.TaggedAndCursed;
      Inraid.save.loot = Config.Raids.RaidStartup.SaveLoot;
      Inraid.save.durability = Config.Raids.RaidStartup.SaveDurability;
      globals.TimeBeforeDeployLocal = Config.Raids.RaidStartup.TimeBeforeDeployLocal
      //Scav Timer
      if (Config.Raids.SCAVTimer) {
        globals.SavagePlayCooldown = 1;
      }
      DatabaseServer.tables.locations["laboratory"].base.Insurance = Config.Raids.LabInsurance;
      //Remove labs entry keycard
      if (Config.Raids.Removelabkey) {
        Logger.debug("SVM: No key for lab activated");
        locations["laboratory"].base.AccessKeys = []
      }
      //Remove extracts restrictions
      if (Config.Raids.NoExtractRestric) {
        Logger.debug("SVM: Extractions requirements removed");
        for (let i in locations) {
          if (i !== "base") {
            for (let x in locations[i].base.exits) {
              if (locations[i].base.exits[x].Name !== "EXFIL_Train" && !locations[i].base.exits[x].Name.includes("lab") || locations[i].base.exits[x].Name === "lab_Vent") {
                if (locations[i].base.exits[x].PassageRequirement !== "None") {
                  locations[i].base.exits[x].PassageRequirement = "None";
                }
                if (locations[i].base.exits[x].ExfiltrationType !== "Individual") {
                  locations[i].base.exits[x].ExfiltrationType = "Individual";
                }
                if (locations[i].base.exits[x].Id !== '') {
                  locations[i].base.exits[x].Id = '';
                }
                if (locations[i].base.exits[x].Count !== 0) {
                  locations[i].base.exits[x].Count = 0;
                }
                if (locations[i].base.exits[x].RequirementTip !== '') {
                  locations[i].base.exits[x].RequirementTip = '';
                }
                if (locations[i].base.exits[x].RequiredSlot) {
                  delete locations[i].base.exits[x].RequiredSlot;
                }
              }
            }
          }
        }
      }
      //Make all extractions available to extract
      if (Config.Raids.AllExtractionsAvailable) {
        Logger.debug("SVM: Every chance based extract available");
        for (let i in locations) {
          if (i !== "base") {
            for (let x in locations[i].base.exits) {
              if (locations[i].base.exits[x].Name !== "EXFIL_Train" && locations[i].base.exits[x].Chance !== 100) {
                locations[i].base.exits[x].Chance = 100;
              }
            }
          }
        }
      }
      //Extend raids to 4 hours
      if (Config.Raids.ExtendedRaid) {
        Logger.debug("SVM: Extended Raid activated");
        for (let map in locations) {
          if (map !== "base") {
            locations[map].base.exit_access_time = 240
            locations[map].base.escape_time_limit = 240
          }
        }
      }
      //Make all extractions of the map available regardless of the infill
      if (Config.Raids.ExtendedExtracts) {
        Logger.debug("SVM: All extractions of the map available regardless of the infiltration");
        for (let map in locations) {
          switch (map) {
          case "base":
            break;
          case "bigmap":
            for (const extract in locations[map].base.exits) {
              locations[map].base.exits[extract].EntryPoints = "Customs,Boiler Tanks"
            }
            break;
          case "interchange":
            for (const extract in locations[map].base.exits) {
              locations[map].base.exits[extract].EntryPoints = "MallSE,MallNW"
            }
            break;
          case "shoreline":
            for (const extract in locations[map].base.exits) {
              locations[map].base.exits[extract].EntryPoints = "Village,Riverside"
            }
            break;
          case "woods":
            for (const extract in locations[map].base.exits) {
              locations[map].base.exits[extract].EntryPoints = "House,Old Station"
            }
            break;
          default:
            break;
          }
        }
      }
      if (Config.Raids.RaidEvents.Christmas) {
			globals.EventType = ["Christmas"];
		  }
      if (Config.Raids.RaidEvents.Halloween) {
			globals.EventType = ["Halloween", "HalloweenIllumination"];
      }
      if (Config.Raids.RaidEvents.RaidersEverywhere) {
        HttpRouter.onStaticRoute["/client/game/bot/generate"]["SVM"] = GenerateRaiders.bind(this);
        Bot["pmcbot"].lastName = [];
      }
      if (Config.Raids.RaidEvents.CultistsEverywhere) {
        Inraid.raidMenuSettings.taggedAndCursed = true;
        HttpRouter.onStaticRoute["/client/game/bot/generate"]["SVM"] = GenerateCultists.bind(this);
      }
      if (Config.Raids.RaidEvents.KillaFactory) {
        const KillaWave = CreateBoss("bossKilla", 100, "followerBully", 0, locations["factory4_day"].base.OpenZones)
        locations["factory4_day"].base.BossLocationSpawn.push(KillaWave)
        locations["factory4_night"].base.BossLocationSpawn.push(KillaWave)
      }
      if (Config.Raids.RaidEvents.BossesOnReserve) {
        let BossWave = CreateBoss("bossKilla", 100, "followerBully", 0, locations["rezervbase"].base.OpenZones)
        locations["rezervbase"].base.BossLocationSpawn.push(BossWave)

        BossWave = CreateBoss("bossBully", 100, "followerBully", 4, locations["rezervbase"].base.OpenZones)
        locations["rezervbase"].base.BossLocationSpawn.push(BossWave)

        BossWave = CreateBoss("bossKojaniy", 100, "followerKojaniy", 2, locations["rezervbase"].base.OpenZones)
        locations["rezervbase"].base.BossLocationSpawn.push(BossWave)

        BossWave = CreateBoss("bossSanitar", 100, "followerSanitar", 2, locations["rezervbase"].base.OpenZones)
        locations["rezervbase"].base.BossLocationSpawn.push(BossWave)
        if (Config.Raids.RaidEvents.IncludeTagilla) {
          BossWave = CreateBoss("bossTagilla", 100, "followerBully", 0, locations["rezervbase"].base.OpenZones)
          locations["rezervbase"].base.BossLocationSpawn.push(BossWave)
        }

      }
      if (Config.Raids.SaveGearAfterDeath) {
        HttpRouter.onStaticRoute["/raid/profile/save"]["aki"] = AlwaysSave.bind(this);
      }
      if (Config.Raids.RaidEvents.GlukharLabs) {
        const Glukhar = {
          "BossName": "bossGluhar",
          "BossChance": 43,
          "BossZone": "ZoneRailStrorage,ZoneRailStrorage,ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBarrack,ZoneBarrack,ZoneSubStorage",
          "BossPlayer": false,
          "BossDifficult": "normal",
          "BossEscortType": "followerGluharAssault",
          "BossEscortDifficult": "normal",
          "BossEscortAmount": "0",
          "Time": -1,
          "TriggerId": "",
          "TriggerName": "",
          "Supports": [{
            "BossEscortType": "followerGluharAssault",
            "BossEscortDifficult": ["normal"],
            "BossEscortAmount": "2"
          },
          {
            "BossEscortType": "followerGluharSecurity",
            "BossEscortDifficult": ["normal"],
            "BossEscortAmount": "2"
          },
          {
            "BossEscortType": "followerGluharScout",
            "BossEscortDifficult": ["normal"],
            "BossEscortAmount": "2"
          }]
        }
        Glukhar.BossZone = locations["laboratory"].base.OpenZones
        locations["laboratory"].base.BossLocationSpawn.push(Glukhar)
      }
      //Make all bosses to 100% spawn - had to move it down to affect funcs above
      if (Config.Raids.IncreaseBossChance) {
        Logger.debug("SVM: 100% Boss chance activated");
        for (let i in locations) {
          if (i !== "base" && locations[i].base.BossLocationSpawn !== []) {
            for (let x in locations[i].base.BossLocationSpawn) {
              locations[i].base.BossLocationSpawn[x].BossChance = 100
            }
          }
        }
      }
    }
    //############## TRADERS SECTION #################
    if (Config.Traders.EnableTraders) {
      Quest.redeemTime = Config.Traders.QuestRedeemTime;
      Inventory.newItemsMarkedFound = Config.Traders.FIRTrade;
      trader.fenceAssortSize = Config.Traders.FenceAmountOnSale;
      trader.minDurabilityForSale = Config.Traders.MinDurabSell
      Repair.priceMultiplier = Config.Traders.RepairMult;
	  
      globals.RagFair.minUserLevel = Config.Traders.FleaMarketLevel;

      
      //Trader Markup - god i fucking hate what i've done.

      for (let level in traders["579dc571d53a0658a154fbec"].base.loyaltyLevels) {
        traders["579dc571d53a0658a154fbec"].base.loyaltyLevels[level].buy_price_coef = 100 - Config.Traders.TraderMarkup.FenceMarkup}

      //Enable all the quests
      if (Config.Traders.AllQuestsAvailable) {
        Logger.debug("SVM: All Quests are Available");
        for (let id in Quests) {
          let QuestData = Quests[id]
          QuestData.conditions.AvailableForStart = [{
            "_parent": "Level",
            "_props": {
              "compareMethod": ">=",
              "value": "1",
              "index": 0,
              "parentId": "",
              "id": "SVM: AllQuestsAvailable"
            }
          }]
        }
      }
      if (Config.Traders["FIRRestrictsQuests"]) {
        Logger.debug("SVM: No more FIR requirements in quests");
        for (const id in Quests) {
          let condition = Quests[id].conditions.AvailableForFinish
          for (const requirements in condition) {
            let requirement = condition[requirements]
            if (requirement._parent == "FindItem" || requirement._parent == "HandoverItem") {
              if ('_props' in requirement && 'onlyFoundInRaid' in requirement._props) {
                requirement._props.onlyFoundInRaid = false
              }
            }
          }
        }
      }
      //Enable all clothes available for both side
      if (Config.Traders.ClothesAnySide) {
        Logger.debug("SVM: All fashion unlocked");
        for (let suit in suits) {
          let suitData = suits[suit]
          if (suitData._parent === "5cd944ca1388ce03a44dc2a4" || suitData._parent === "5cd944d01388ce000a659df9") {
            suitData._props.Side = ["Bear", "Usec"];
          }
        }
      }
      //Enable all traders 4 stars
      if (Config.Traders.TradersLvl4) {
        Logger.warning("SVM: Lvl 4 Traders activated, be sure to sell each trader something, that way it will work")
        for (var traderID in traders) {
          let loyaltyLevels = traders[traderID].base.loyaltyLevels;
          for (let level in loyaltyLevels) {
            loyaltyLevels[level].minLevel = 1
            loyaltyLevels[level].minSalesSum = 0
            loyaltyLevels[level].minStanding = 0
          }
        }
      }
    }
    //############## BOTS LOADOUT SECTION ##################, Maybe making it in one JS wasn't such a good idea, but thanks that Ctrl-F exists.
    //I'm too lazy to clean the code for now, i think some shortcuts could be made 
    if (BL.EnableAdvLoad) {
      // BL redirects
      const BEAR = Config.BL.BearAdvancedLoadout;
      const USEC = Config.BL.UsecAdvancedLoadout;
      const RAIDER = Config.BL.RaiderAdvancedLoadout;
      const SCAV = Config.BL.ScavAdvancedLoadout; // kinda overkill for 5 variables but made it to make code in BL section readable
      const AddKeys = [];
      const AddContainers = [];
      const CurUsec = "usec"
      const CurBear = "bear"
      const bottypes = [CurBear, "assault", CurUsec, "pmcbot", "marksman"];
      for (const id in items) {
        let base = items[id]
        //BL pos
        if ((base._parent === "5c99f98d86f7745c314214b3" || base._parent === "5c164d2286f774194c5e69fa") && Config.BL.AddAllKeys) {
          AddKeys.push(base._id)
        }

        if ((base._id === "567143bf4bdc2d1a0f8b4567" || base._parent === "5795f317245977243854e041") && Config.BL.AddAllContainers) {
          AddContainers.push(base._id)
        }
		if (base._parent === "5447e1d04bdc2dff2f8b4567" && base._id !== "6087e570b998180e9f76dc24" && Config.BL.LootableMelee){
			EditSimpleItemData(id, "Unlootable", false);
			EditSimpleItemData(id, "UnlootableFromSide", []);
		}

      }
      Logger.debug("SVM: Bots loadouts is on")
      if (Config.AddAllKeys || Config.AddAllContainers) {
        for (const i in AddKeys) {
          let id = AddKeys[i]
          for (const type in bottypes) {
            let role = bottypes[type]
            if (!Bot[role].inventory.items.Pockets[id]) {
              Bot[role].inventory.items.Pockets.push(id)
            }
          }
        }
        for (const i in AddContainers) {
          let id = AddContainers[i]
          for (const type in bottypes) {
            let role = bottypes[type]
            if (!Bot[role].inventory.items.Backpack[id]) {
              Bot[role].inventory.items.Backpack.push(id)
            }
          }
        }
      }
      if (BEAR.BearNamesEnable) {
        Bot[CurBear].firstName = BEAR.BearNameList
        Bot[CurBear].lastName = []
      }
      if (USEC.BearNamesEnable) {
        Bot[CurUsec].firstName = USEC.UsecNameList
        Bot[CurUsec].lastName = []
      }
      //Customize primary weapons
      if (BEAR.BearPrimaryWeaponEnable) {
        Bot[CurBear].inventory.equipment["FirstPrimaryWeapon"] = BEAR.BearPrimaryWeaponList
      }
      if (USEC.UsecPrimaryWeaponEnable) {
        Bot[CurUsec].inventory.equipment["FirstPrimaryWeapon"] = USEC.UsecPrimaryWeaponList
      }
      if (SCAV.ScavPrimaryWeaponEnable) {
        Bot["assault"].inventory.equipment["FirstPrimaryWeapon"] = SCAV.ScavPrimaryWeaponList
      }
      if (RAIDER.RaiderPrimaryWeaponEnable) {
        Bot["pmcbot"].inventory.equipment["FirstPrimaryWeapon"] = RAIDER.RaiderPrimaryWeaponList
      }
      //Customize secondary weapons
      if (BEAR.BearSecondaryWeaponEnable) {
        Bot[CurBear].inventory.equipment["SecondPrimaryWeapon"] = BEAR.BearSecondaryWeaponList
      }
      if (USEC.UsecSecondaryWeaponEnable) {
        Bot[CurUsec].inventory.equipment["SecondPrimaryWeapon"] = USEC.UsecSecondaryWeaponList
      }
      if (SCAV.ScavSecondaryWeaponEnable) {
        Bot["assault"].inventory.equipment["SecondPrimaryWeapon"] = SCAV.ScavSecondaryWeaponList
      }
      if (RAIDER.RaiderSecondaryWeaponEnable) {
        Bot["pmcbot"].inventory.equipment["SecondPrimaryWeapon"] = RAIDER.RaiderSecondaryWeaponList
      }
      //Customize holster weapons
      if (BEAR.BearHolsterEnable) {
        Bot[CurBear].inventory.equipment["Holster"] = BEAR.BearHolsterList
      }
      if (USEC.UsecHolsterEnable) {
        Bot[CurUsec].inventory.equipment["Holster"] = USEC.UsecHolsterList
      }
      if (SCAV.ScavHolsterEnable) {
        Bot["assault"].inventory.equipment["Holster"] = SCAV.ScavHolsterList
      }
      if (RAIDER.RaidersHolsterEnable) {
        Bot["pmcbot"].inventory.equipment["Holster"] = RAIDER.RaiderHolsterList
      }
      //Customize Headwears
      if (BEAR.BearHeadwearEnable) {
        Bot[CurBear].inventory.equipment["Headwear"] = BEAR.BearHeadwearList
      }
      if (USEC.UsecHeadwearEnable) {
        Bot[CurUsec].inventory.equipment["Headwear"] = USEC.UsecHeadwearList
      }
      if (SCAV.ScavHeadwearEnable) {
        Bot["assault"].inventory.equipment["Headwear"] = SCAV.ScavHeadwearList
      }
      if (RAIDER.RaidersHeadwearEnable) {
        Bot["pmcbot"].inventory.equipment["Headwear"] = RAIDER.RaiderHeadwearList
      }
      //Customize armors
      if (BEAR.BearArmorEnable) {
        Bot[CurBear].inventory.equipment["ArmorVest"] = BEAR.BearArmorList
      }
      if (USEC.UsecArmorEnable) {
        Bot[CurUsec].inventory.equipment["ArmorVest"] = USEC.UsecArmorList
      }
      if (SCAV.ScavArmorEnable) {
        Bot["assault"].inventory.equipment["ArmorVest"] = SCAV.ScavArmorList
      }
      if (RAIDER.RaiderArmorEnable) {
        Bot["pmcbot"].inventory.equipment["ArmorVest"] = RAIDER.RaiderArmorList
      }
      //Customize vests
      if (BEAR.BearVestsEnable) {
        Bot[CurBear].inventory.equipment["TacticalVest"] = BEAR.BearVestList
      }
      if (USEC.UsecVestsEnable) {
        Bot[CurUsec].inventory.equipment["TacticalVest"] = USEC.UsecVestList
      }
      if (SCAV.ScavVestsEnable) {
        Bot["assault"].inventory.equipment["TacticalVest"] = SCAV.ScavVestList
      }
      if (RAIDER.RaiderVestsEnable) {
        Bot["pmcbot"].inventory.equipment["TacticalVest"] = RAIDER.RaiderVestList
      }
      //Change generation values
      if (BEAR.BearGenerationValuesEnable) {
        Bot[CurBear].generation.items.healing.min = BEAR.BearHealingMin
        Bot[CurBear].generation.items.healing.max = BEAR.BearHealingMax

        Bot[CurBear].generation.items.looseLoot.min = BEAR.BearLootMin
        Bot[CurBear].generation.items.looseLoot.max = BEAR.BearLootMax

        Bot[CurBear].generation.items.magazines.min = BEAR.BearMagazinesMin
        Bot[CurBear].generation.items.magazines.max = BEAR.BearMagazinesMax

        Bot[CurBear].generation.items.grenades.min = BEAR.BearGrenadesMin
        Bot[CurBear].generation.items.grenades.max = BEAR.BearGrenadesMax
      }
      if (USEC.UsecGenerationValuesEnable) {
        Bot[CurUsec].generation.items.healing.min = USEC.UsecHealingMin
        Bot[CurUsec].generation.items.healing.max = USEC.UsecHealingMax

        Bot[CurUsec].generation.items.looseLoot.min = USEC.UsecLootMin
        Bot[CurUsec].generation.items.looseLoot.max = USEC.UsecLootMax

        Bot[CurUsec].generation.items.magazines.min = USEC.UsecMagazinesMin
        Bot[CurUsec].generation.items.magazines.max = USEC.UsecMagazinesMax

        Bot[CurUsec].generation.items.grenades.min = USEC.UsecGrenadesMin
        Bot[CurUsec].generation.items.grenades.max = USEC.UsecGrenadesMax
      }
      if (SCAV.ScavGenerationValuesEnable) {
        Bot["assault"].generation.items.healing.min = SCAV.ScavHealingMin
        Bot["assault"].generation.items.healing.max = SCAV.ScavHealingMax

        Bot["assault"].generation.items.looseLoot.min = SCAV.ScavLootMin
        Bot["assault"].generation.items.looseLoot.max = SCAV.ScavLootMax

        Bot["assault"].generation.items.magazines.min = SCAV.ScavMagazinesMin
        Bot["assault"].generation.items.magazines.max = SCAV.ScavMagazinesMax

        Bot["assault"].generation.items.grenades.min = SCAV.ScavGrenadesMin
        Bot["assault"].generation.items.grenades.max = SCAV.ScavGrenadesMax
      }
      if (RAIDER.RaiderGenerationValuesEnable) {
        Bot["pmcbot"].generation.items.healing.min = RAIDER.RaiderHealingMin
        Bot["pmcbot"].generation.items.healing.max = RAIDER.RaiderHealingMax

        Bot["pmcbot"].generation.items.looseLoot.min = RAIDER.RaiderLootMin
        Bot["pmcbot"].generation.items.looseLoot.max = RAIDER.RaiderLootMax

        Bot["pmcbot"].generation.items.magazines.min = RAIDER.RaiderMagazinesMin
        Bot["pmcbot"].generation.items.magazines.max = RAIDER.RaiderMagazinesMax

        Bot["pmcbot"].generation.items.grenades.min = RAIDER.RaiderGrenadesMin
        Bot["pmcbot"].generation.items.grenades.max = RAIDER.RaiderGrenadesMax
      }
      if (BEAR.BearEquipmentChanceEnable) {
        Bot[CurBear].chances.equipment = BEAR.BearEquipmentChanceList
        Bot[CurBear].chances.mods = BEAR.BearAttachmentChanceList
      }
      if (USEC.UsecEquipmentChanceEnable) {
        Bot[CurUsec].chances.equipment = USEC.UsecEquipmentChanceList
        Bot[CurUsec].chances.mods = USEC.UsecAttachmentChanceList
      }
      if (RAIDER.RaiderEquipmentChanceEnable) {
        Bot["pmcbot"].chances.equipment = RAIDER.RaiderEquipmentChanceList
        Bot["pmcbot"].chances.mods = RAIDER.RaiderAttachmentChanceList
      }
      if (SCAV.ScavEquipmentChanceEnable) {
        Bot["assault"].chances.equipment = SCAV.ScavEquipmentChanceList
        Bot["assault"].chances.mods = SCAV.ScavAttachmentChanceList
      }
    }

    function CreateBoss(role, chance, followers, escortAmount, zones) {
      const Wave = {
        "BossName": role,
        "BossChance": chance,
        "BossZone": zones,
        "BossPlayer": false,
        "BossDifficult": "normal",
        "BossEscortType": followers,
        "BossEscortDifficult": "normal",
        "BossEscortAmount": escortAmount,
        "Time": -1
      }
      return Wave
    }

    function GenerateRaiders(url, info, sessionID) {
      for (let type in info.conditions) {
        let roles = info.conditions[type]
        roles.Role = "pmcBot"
        roles.Difficulty = "impossible"
      }
      return HttpResponse.getBody(BotController.generate(info));
    }

    function GenerateCultists(url, info, sessionID) {
      for (let type in info.conditions) {
        let roles = info.conditions[type]
        roles.Role = "sectantwarrior"
        roles.Difficulty = "impossible"
      }
      return HttpResponse.getBody(BotController.generate(info));
    }

    function EditHealth(url, info, sessionID) {
      let pmcData = ProfileController.getPmcProfile(sessionID);
      try {
        pmcData.Health.BodyParts["Head"].Health.Maximum = Config.Player.Health.Head
        pmcData.Health.BodyParts["Chest"].Health.Maximum = Config.Player.Health.Chest
        pmcData.Health.BodyParts["Stomach"].Health.Maximum = Config.Player.Health.Stomach
        pmcData.Health.BodyParts["LeftArm"].Health.Maximum = Config.Player.Health.LeftArm
        pmcData.Health.BodyParts["LeftLeg"].Health.Maximum = Config.Player.Health.LeftLeg
        pmcData.Health.BodyParts["RightArm"].Health.Maximum = Config.Player.Health.RightArm
        pmcData.Health.BodyParts["RightLeg"].Health.Maximum = Config.Player.Health.RightLeg
        return HttpResponse.nullResponse();
      } catch(e) {
        Logger.error("SVM:Edit health - Unknown error occured" + e)
        return HttpResponse.nullResponse();
      }
    }

    function maxSkills(url, info, sessionID) {
      try {
        let pmcData = null; //All of this looks stupid, need to rework this
        if (sessionID) {
          pmcData = ProfileController.getPmcProfile(sessionID);
        }
        for (let skills in pmcData.Skills.Common) {
          let skill = pmcData.Skills.Common[skills]
          switch (skill.Id) {
          case "BotReload":
            if (Config.Player.BotReload) {
              skill.Progress = 5100;
            }
            break;
          case "BotSound":
            if (Config.Player.BotSound) {
              skill.Progress = 5100;
            }
            break;

          default:
            skill.Progress = 5100;
            break;
          }
        }
        return HttpResponse.nullResponse();
      } catch(e) {
        Logger.error("Max Skills: New profile detected, Cancelling function")
        return HttpResponse.nullResponse();
      }
    }

    function AlwaysSave(url, info, sessionID) 
	{
		if(info.exit == "survived" )
		{
			return InraidCallbacks.saveProgress(url, info, sessionID);
		}
		else
		{
		info.exit = "runner";
		return InraidCallbacks.saveProgress(url, info, sessionID);
		}
    }

    function EditSimpleItemData(id, data, value) {
      items[id]._props[data] = value
    }

    function EditAdvancedItemData(id, structure, data, value) {
      items[id]._props[structure][0][data] = value
    }

    function EditEnchancedtemData(id, structure, array, data, value) {
      items[id]._props[structure][array][data] = value
    }

    function EditComplicatedItemData(id, extstructure, array, intstructure, data, value) {
      items[id]._props[extstructure][array][intstructure][data] = value
    }

  }
}
module.exports = InitiateTheBassCannon;
