Install:

1. Unzip and copy Andrudis-QoL-Configurator\ folder in user/mods/
2. Change options in \Andrudis-QoL-Configurator\src\*_config.json files  to your liking (default values will not change anything for compatibility with other mods)

### Collaboration with other mods:
* KMC Gear (https://hub.sp-tarkov.com/files/file/260-kmc-gear/)
* KMC Weapons (https://hub.sp-tarkov.com/files/file/259-kmc-weapons/)
See "Collaboration configuration" section below for details

### Mod Information - main_config.json
* RemoveTraderLoyaltyForUpgrades - all upgrades in Hideout that require specific lvl of standing with Trader now require only lvl 1 standing.
* EnableNakedEdition - if set to 'true' new "Naked and Dangerous" edition will be added in launcher to Wipe options. Using this edition you start absolutely naked with only Alpha container
* RemoveExaminedByDefault - remove ExaminedByDefault flag from all items. In conjunction with EnableNakedEdition you start with absolutely no items examined
* ExpandRandomStackLimits - when enabled, ammo can spawn using full stack range. E.g.: 9x19 mm Green Tracer stacks at 50 max, but random stack in loot containers spawn in range between 15 and 40. With this option enabled all stackable items spawn in range between 1 and MAX_STACK_SIZE except money, which stack in range between 1 and MAX_STACK_SIZE/200
* RemoveInRaidLootingRestrictions - when enabled, armbands and melee of AI PMCs will become lootable. 
* RemoveInRaidCarryRestrictions - remove restrictions on how many specific items you can carry in you PMC inventory

* ItemsLootExperienceMultiplier - change XP you get from looting items
* ItemsExamineExperienceMultiplier - change XP you get from examining items
* ItemsExamineTimeMultiplier - change how much time you spend during item examination (0 - instant, for hardcore 3-5 recommended)

* PlayerLeftRaidMultiplier - change end-raid XP on Disconnect
* PlayerMiaMultiplier - change end-raid XP on MIA (raid time runs out while you are still in raid)
* PlayerSurvivedRaidMultiplier - change end-raid XP on Survived extract
* PlayerRunThroughMultiplier - change end-raid XP on RunThrough extract (less than 10 minutes in raid, no kills)
* PlayerKilledMultiplier - change end-raid XP in case you died in raid

* TimeBeforeDeployLocal - changes countdown time in seconds for GET READY screen after map assets are loaded, set to 0 to remove delay completely
* NumberOfUsagesForUnlimitedKeys - leave at 0 to keep keys as is. Increasing this number will add limit to usages for all keys and keycards that did not have limit before.

* BoughtItemsCountedAsFiR - changes whether bought items from trader will not be FiR or not. Valid values:
null = Default value, will do nothing for compatibility with other mods
true = override settings to explicitly enable FiR for items bought from traders
false = override settings to explicitly disable FiR for items bought from traders
* AllowLootOverlay - when set to 'true' will enable multiple overlaping items to spawn on the same spot. Does nothing otherwise for compatibility with other mods.
* GlobalLootChanceModifier - sets global Loot Chance Modifier to set value if different from 0.23. If equal to 0.23 (default) does nothing for compatibility with other mods.
* LocationsLootChanceModifier - sets maps' Loot Chance Modifier to set value if different from 0.8. If equal to 0.8 (default) does nothing for compatibility with other mods.

* FixBsAmmoPack - when enabled, fixed issue that '120 pack of BS ammo' unloads into BP rounds
* GrinchStoleChristmas - when enabled, spawn Roubles instead of decorations in containers.
* EnableChristmas - when enabled, activates Christmas event
* EnableHalloween - when enabled, activates Halloween event

* ForceAllLooseLootSpawn - when enabled, all loose loot of all maps will always spawn (may be affected by max number of loose loot allowed)
* LootContainerSpawnLootChance - does nothing at default (50), otherwise change % chance to spawn loot in container
* MinRelativeChance - increase relative spawn change of all items below value to be equal to that value. Vanilla values are between 1 and 5000, but can be set higher. At 5000 or higher all items have equal spawn change.
* AdjustItemsSpawnInContainers - when enabled, imports custom loot spawn configs from 'loot_spawn_configs' folder, See "Adjust Items Spawn Configuration" section of README for details.

### Mod Information - bots_config.json
* UsecChance - set to value between 0 and 100 to change chance PMC will be USEC. BEAR chance will be (100-UsecChance)%
* SameFactionIsHostileChance - set to value between 0 and 100 to change chance PMCs of same faction are hostile
* MaxPMCLootTotalRoubles - default SPT-AKI value is 150000, leave 'null' to keep that
* ShowBotTypeInNickname - if enabled, bot role will be added to the end of NPC Nickname

### Mod Information - trader_config.json
* OverrideTradersDiscounts - enable to set % of item's base cost traders will substract when buying items from you. Disabled by default. 
* TradersDiscounts - set discount for each trader. This setting is ignored if "OverrideTradersDiscounts" is not se to 'true'

### Mod Information - quests_helpers_config.json
* ChangeUsecToAnyPmc - when enabled, "Punisher - Part 6" and "Friend from the West - Part 1" quest will accept any PMS's dogtags/kill instead of USEC ones
* ChangeBearToAnyPmc - when enabled, "Punisher - Part 6" quest will accept any PMS's dogtags instead of BEAR ones
* GrenadierCounter" - change to any positive  value except 12 to change how many PMCs you have to kill with grenades for "Grenadier" quest. Change to 0 or negative value to insta-complete quest. (credits  go to @Lone_Simon for initial implementation of insta-complete version)
* TheStylishOneCounter - change to any positive value except 100 to change how many time you have to kill Killa for "The Stylish One" quest. Change to 0 or negative value to insta-complete quest. (credits  go to @Lone_Simon for initial implementation of insta-complete version)
* AShooterBornInHeavenCounter" - change to any positive value except 100 to change required distance for "A Shooter Born In Heaven" quest. Change to 0 or negative value to insta-complete quest.
(All credits go to @kikirio and @Lone_Simon for initial implementation, I've just added insta-complete option and support for condition's texts in all locales and not just EN locale )
* "HunterCounter" - change to any positive value except 25 to change how many times you have to kill Shturman. Change to 0 or negative value to insta-complete quest.
* ForceMarkedOphthalmoscopeSpawn - when enabled, force "Marked Ophthalmoscope" for quest "Colleagues - Part 2" spawn with 100% chance

### Mod Information - quests_helpers_config.json
* ChangeInsuranceAvailability - change for which maps insurance will be available or ignored.

### Mod Information - maps_config.json
* ExtendRaidTime - enable for changes in RaidTimeByMapInMinutes to take effect
* RaidTimeByMapInMinutes - define raid time in minutes per map. Does nothing if ExtendRaidTime is not enabled
* DisabledForScav - change scav raids availability for maps
* RestrictMapsByPlayerLevel - then enabled, maps will become locked by player level accorting to 'MapsRestrictionsByLevel' settings (special thanks to @Shirito#4361 and @Wind Le T-Rex#1487 ​for idea and initial implementation)
* MapsRestrictionsByLevel - set for each map min player level to access this map. Does nothing if 'RestrictMapsByPlayerLevel' is not enabled

### Mod Information - weapon_maintenance_config.json
Note: all setting in this section only affect weapons
* MaxDurability - sets max durability for all weapons (NOTE: weapons will always show 100%, does not affect weapons already in inventory)
* DurabilityBurnRatio - multiplier for weapon durability burn each shot. Set to 0 to disable durability degradation

* DurabilitySpawnMin - set min durability % for Scavs weapons
* DurabilitySpawnMax - set max durability % for Scavs weapons
* MinRepairDegradation - set min weapon durability degradation during repair
* MaxRepairDegradation - set max weapon durability degradation during repair

* BaseMalfunctionChance - set base malfunction chance for weapons (for most weapons default is 0.13-0.17)
* AllowMisfire - change to enable/disable Misfire malfunction for all weapons
* AllowJam - change to enable/disable Jam malfunction for all weapons
* AllowFeed - change to enable/disable Feed malfunction for all weapons
* AllowSlide - change to enable/disable Slide malfunction for all weapons
* AllowOverheat - change to enable/disable Overheat malfunction for all weapons

* HeatFactorGun - affects head buildup, most guns have values between 0.85 and 1.05
* CoolFactorGun - affects head dispersion, most guns have values between 0.75 and 5.76
* CoolFactorGunMods - affects head dispersion, most guns have values between 0.9 and 1.5
* HeatFactorByShot - affects head buildup, most guns have values between 1.2 and 11.7

### EXPERIMENTAL:
* HeapPreAllocationEnabled - 'false' do nothing, 'true' - may have positive effect, but needs confirmation
* OverrideRamCleanerSettings - 'false' do nothing, 'true' - may have positive effect, but needs confirmation
* RamCleanerEnabled - 'false' do nothing, 'true' - may have positive effect, but needs confirmation
* DisableReleaseProfiler - 'false' do nothing, 'true' - may have positive effect, but needs confirmation
* EnableNewSpawnForMaps - in theory should enable new bots spawn algorithm as in Live, but looks like not supported for now. Leaving it here just in case

###Collaboration configuration - collaboration_config.json
[WARNING]: Temporary DISABLED as KMC mods are not yet updated for 2.2.0 and even when they will be updated - wait for QoL Configurator update!

See '\scr\collaboration_config.json' where you can enable/disable collaboration with other supported mods:
* KMC_Gear - when enabled, adds gears from mod to loot containers loot pool according to configuration in '\src\collaboration\KMC_Gear\kmc_gear.json'. 
* KMC_Weapons - when enabled, adds mods and ammo from mod to loot containers loot pool according to configuration in '\src\collaboration\KMC_Weapons\kmc_mods_and_ammo.json'. 
Note: Collaboration options should be disabled if target mod is not installed or removed!

### Adjust Items Spawn Configuration
Only works in "AdjustItemsSpawnInContainers" is set to 'true' in main config file. 
There are multiple items (barrels, foregrips, ammo, ironsights etc.) which are not added to loot containers spawn tables and so never spawn inside any containers.
In folder \src\loot_spawn_configs\ - there are a number of files with configurations to add missing item spawns to loot containers.
You are free to remove, edit or add your own spawn configurations as you like - just put them in 'loot_spawn_configs' folder.
Should be compatible with other mods that add new items to the game as long as they are loaded before this mod - you can create your own config files for those items and add them to loot pool of containers you want

Each file starts with 'AdjustAlreadyExistingItems' param
* AdjustAlreadyExistingItems - if set to 'true' will override spawn chances for existing items, default is 'false' which will only add items that do not yet exists in containers' loot tables and ignore already existing ones. This setting has affect only for one specific configuration file - each file is handled separately.
* ItemsSpawnConfigs - contains list of items to be added/edited for containers' loot tables

Each record consists of the following fields:
* Name - for your reference and log only, does not have any effect
* UID - EFT '_id' value for item you want to edit. Use 'items.json' or 'https://items.sp-tarkov.com/' for reference. If item with this UID does not exist - whole record will just be ignored
* EnableSpawnChanceAdjustment - change to any value except 'true' to disable this record without deleting it.
* RelativeSpawnChance - set relative spawn chance. EFT values usually go between 1 and 5000, but can be set higher. Higher value gives more chances to spawn this item.
* SpawnInAnyContainer - if set to 'true' item will be added to loot table of each available container in the game
* MimicItemSpawn - enter another item's '_id' to spawn your item in the same containers where mimicked item can be spawned. NOTE: this setting is ignored if your item already has at least 1 spawn container defined, i.e. only works for items that has no spawns defined yet at all.
* IntendedContainers - coma-separated list if container IDs in which you want to spawn this item.  See 'container IDs.txt' for full list
Note: if item can already spawn in a given container, second spawn will not be added - instead existing spawn chance will be altered

### Roadmap
You can track progress and plans for my mods here: https://trello.com/b/12O0q28P/andrudis-aki-mods-roadmap
I can neither provide any ETA nor promise 100% of backlog will be implemented, but tasks that got into ToDo list at least will be attempted,