/* mod.js
 * license: NCSA
 * copyright: yoshka
 * website: -
 * authors:
 * - yoshka
 */
 
const globalsConfig = DatabaseServer.tables.globals.config;
const skillsSettings = globalsConfig.SkillsSettings;
const modConfig = require("../config/config.json");

const aimDrillsSkill = skillsSettings.AimDrills;
const assaultSkill = skillsSettings.Assault;
const attentionSkill = skillsSettings.Attention;
const charismaSkill = skillsSettings.Charisma;
const covertMovementSkill = skillsSettings.CovertMovement;
const craftingSkill = skillsSettings.Crafting;
const dmrSkill = skillsSettings.DMR;
const enduranceSkill = skillsSettings.Endurance;
const healthSkill = skillsSettings.Health;

const hideoutManagementSkill = skillsSettings.HideoutManagement;
const hideoutEliteSlots = hideoutManagementSkill.EliteSlots;
const hideoutSkillPointRate = hideoutManagementSkill.SkillPointsRate;

const immunitySkill = skillsSettings.Immunity;
const intellectSkill = skillsSettings.Intellect;
const magDrillSkill = skillsSettings.MagDrills;
const memorySkill = skillsSettings.Memory;
const metabolismSkill = skillsSettings.Metabolism;
const perceptionSkill = skillsSettings.Perception;
const pistolSkill = skillsSettings.Pistol;
const recoilControlSkill = skillsSettings.RecoilControl;
const searchSkill = skillsSettings.Search;
const shotgunSkill = skillsSettings.Shotgun;
const sniperSkill = skillsSettings.Sniper;
const strengthSkill = skillsSettings.Strength;
const stressResistanceSkill = skillsSettings.StressResistance;
const surgerySkill = skillsSettings.Surgery;
const throwingSkill = skillsSettings.Throwing;
const troubleShootingSkill = skillsSettings.TroubleShooting;
const vitalitySkill = skillsSettings.Vitality;
const weaponTreatmentSkill = skillsSettings.WeaponTreatment;


class Mod
{
    constructor()
    {
        this.modname = "Advanced skill config";
        Logger.info(`Loading: ${this.modname}`);
        ModLoader.onLoad[this.modname] = this.load.bind(this);
    }

    load()
    {
        this.applyConfig();
    }
	
	applyConfig()
    {
		if(modConfig.GlobalModifiers.enable)
		{
			Logger.log(`Global modifiers for skills enabled`);
			skillsSettings.SkillProgressRate = modConfig.GlobalModifiers.SkillProgressRate;
			Logger.log(`SkillPointsRate set to ${modConfig.GlobalModifiers.SkillProgressRate}`);
			skillsSettings.WeaponSkillProgressRate = modConfig.GlobalModifiers.WeaponSkillProgressRate;
			Logger.log(`WeaponSkillProgressRate set to ${modConfig.GlobalModifiers.WeaponSkillProgressRate}`);
			
			globalsConfig.SkillAtrophy = modConfig.GlobalModifiers.SkillAtrophy;
			globalsConfig.SkillEnduranceWeightThreshold = modConfig.GlobalModifiers.SkillEnduranceWeightThreshold;
			globalsConfig.SkillExpPerLevel = modConfig.GlobalModifiers.SkillExpPerLevel;
			globalsConfig.SkillFatiguePerPoint = modConfig.GlobalModifiers.SkillFatiguePerPoint;
			globalsConfig.SkillFatigueReset = modConfig.GlobalModifiers.SkillFatigueReset;
			globalsConfig.SkillFreshEffectiveness = modConfig.GlobalModifiers.SkillFreshEffectiveness;
			globalsConfig.SkillFreshPoints = modConfig.GlobalModifiers.SkillFreshPoints;
			globalsConfig.SkillMinEffectiveness = modConfig.GlobalModifiers.SkillMinEffectiveness;
			globalsConfig.SkillPointsBeforeFatigue = modConfig.GlobalModifiers.SkillPointsBeforeFatigue;
		}
		if(modConfig.AimDrills.enable)
		{
			Logger.log(`AimDrills enabled`);
			aimDrillsSkill.WeaponShotAction = modConfig.AimDrills.WeaponShotAction;
		}
		if(modConfig.Assault.enable)
		{
			Logger.log(`Assault enabled`);
			assaultSkill.WeaponChamberAction = modConfig.Assault.WeaponChamberAction;
			assaultSkill.WeaponFixAction = modConfig.Assault.WeaponFixAction;
			assaultSkill.WeaponReloadAction = modConfig.Assault.WeaponReloadAction;
			assaultSkill.WeaponShotAction = modConfig.Assault.WeaponShotAction;
		}
		if(modConfig.Attention.enable)
		{
			Logger.log(`Attention enabled`);
			attentionSkill.ExamineWithInstruction = modConfig.Attention.ExamineWithInstruction;
			attentionSkill.FindActionFalse = modConfig.Attention.FindActionFalse;
			attentionSkill.FindActionTrue = modConfig.Attention.FindActionTrue;
		}
		if(modConfig.Charisma.enable)
		{
			Logger.log(`Charisma enabled`);
			charismaSkill.SkillProgressAtn = modConfig.Charisma.SkillProgressAtn;
			charismaSkill.SkillProgressInt = modConfig.Charisma.SkillProgressInt;
			charismaSkill.SkillProgressPer = modConfig.Charisma.SkillProgressPer;
		}
		if(modConfig.CovertMovement.enable)
		{
			Logger.log(`CovertMovement enabled`);
			covertMovementSkill.MovementAction = modConfig.CovertMovement.MovementAction;
		}
		if(modConfig.Crafting.enable)
		{
			Logger.log(`Crafting enabled`);
			craftingSkill.CraftTimeReductionPerLevel = modConfig.Crafting.CraftTimeReductionPerLevel;
			craftingSkill.CraftingCycleHours = modConfig.Crafting.CraftingCycleHours;
			craftingSkill.CraftingPointsToInteligence = modConfig.Crafting.CraftingPointsToInteligence;
			craftingSkill.EliteExtraProductions = modConfig.Crafting.EliteExtraProductions;
			craftingSkill.PointsPerCraftingCycle = modConfig.Crafting.PointsPerCraftingCycle;
			craftingSkill.PointsPerUniqueCraftCycle = modConfig.Crafting.PointsPerUniqueCraftCycle;
			craftingSkill.ProductionTimeReductionPerLevel = modConfig.Crafting.ProductionTimeReductionPerLevel;
			craftingSkill.UniqueCraftsPerCycle = modConfig.Crafting.UniqueCraftsPerCycle;
		}		
		if(modConfig.DMR.enable)
		{
			Logger.log(`DMR enabled`);
			dmrSkill.WeaponChamberAction = modConfig.DMR.WeaponChamberAction;
			dmrSkill.WeaponFixAction = modConfig.DMR.WeaponFixAction;
			dmrSkill.WeaponReloadAction = modConfig.DMR.WeaponReloadAction;
			dmrSkill.WeaponShotAction = modConfig.DMR.WeaponShotAction;
		}
		if(modConfig.Endurance.enable)
		{
			Logger.log(`Endurance enabled`);
			enduranceSkill.GainPerFatigueStack = modConfig.Endurance.GainPerFatigueStack;
			enduranceSkill.MovementAction = modConfig.Endurance.MovementAction;
			enduranceSkill.SprintAction = modConfig.Endurance.SprintAction;
		}		
		if(modConfig.Health.enable)
		{
			Logger.log(`Health enabled`);
			healthSkill.SkillProgress = modConfig.Health.SkillProgress;
		}
		if(modConfig.HideoutManagement.enable)
		{
			Logger.log(`HideoutManagement enabled`);
			hideoutManagementSkill.ConsumptionReductionPerLevel = modConfig.HideoutManagement.ConsumptionReductionPerLevel;
			hideoutManagementSkill.SkillBoostPercent = modConfig.HideoutManagement.SkillBoostPercent;
			hideoutManagementSkill.SkillPointsPerAreaUpgrade = modConfig.HideoutManagement.SkillPointsPerAreaUpgrade;
			hideoutManagementSkill.SkillPointsPerCraft = modConfig.HideoutManagement.SkillPointsPerCraft;
		
			hideoutEliteSlots.AirFilteringUnit.Container = modConfig.HideoutManagement.EliteSlots.AirFilteringUnit.Container;
			hideoutEliteSlots.AirFilteringUnit.Slots = modConfig.HideoutManagement.EliteSlots.AirFilteringUnit.Slots;
		
			hideoutEliteSlots.BitcoinFarm.Container = modConfig.HideoutManagement.EliteSlots.BitcoinFarm.Container;
			hideoutEliteSlots.BitcoinFarm.Slots = modConfig.HideoutManagement.EliteSlots.BitcoinFarm.Slots;
		
			hideoutEliteSlots.Generator.Container = modConfig.HideoutManagement.EliteSlots.Generator.Container;
			hideoutEliteSlots.Generator.Slots = modConfig.HideoutManagement.EliteSlots.Generator.Slots;
		
			hideoutEliteSlots.WaterCollector.Container = modConfig.HideoutManagement.EliteSlots.WaterCollector.Container;
			hideoutEliteSlots.WaterCollector.Slots = modConfig.HideoutManagement.EliteSlots.WaterCollector.Slots;
		
			hideoutSkillPointRate.AirFilteringUnit.PointsGained = modConfig.HideoutManagement.SkillPointsRate.AirFilteringUnit.PointsGained;
			hideoutSkillPointRate.AirFilteringUnit.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.AirFilteringUnit.ResourceSpent;
		
			hideoutSkillPointRate.Generator.PointsGained = modConfig.HideoutManagement.SkillPointsRate.Generator.PointsGained;
			hideoutSkillPointRate.Generator.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.Generator.ResourceSpent;
		
			hideoutSkillPointRate.SolarPower.PointsGained = modConfig.HideoutManagement.SkillPointsRate.SolarPower.PointsGained;
			hideoutSkillPointRate.SolarPower.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.SolarPower.ResourceSpent;
		
			hideoutSkillPointRate.WaterCollector.PointsGained = modConfig.HideoutManagement.SkillPointsRate.WaterCollector.PointsGained;
			hideoutSkillPointRate.WaterCollector.ResourceSpent = modConfig.HideoutManagement.SkillPointsRate.WaterCollector.ResourceSpent;
		}			
		if(modConfig.Immunity.enable)
		{
			Logger.log(`Immunity enabled`);
			immunitySkill.HealthNegativeEffect = modConfig.Immunity.HealthNegativeEffect;
			immunitySkill.ImmunityMiscEffects = modConfig.Immunity.ImmunityMiscEffects;
			immunitySkill.ImmunityPainKiller = modConfig.Immunity.ImmunityPainKiller;
			immunitySkill.ImmunityPoisonBuff = modConfig.Immunity.ImmunityPoisonBuff;
			immunitySkill.StimulatorNegativeBuff = modConfig.Immunity.StimulatorNegativeBuff;	
		}
		if(modConfig.Intellect.enable)
		{
			Logger.log(`Intellect enabled`);
			intellectSkill.ExamineAction = modConfig.Intellect.ExamineAction;	
			intellectSkill.RepairAction = modConfig.Intellect.RepairAction;
			intellectSkill.SkillProgress = modConfig.Intellect.SkillProgress;
		}
		if(modConfig.MagDrills.enable)
		{
			Logger.log(`MagDrills enabled`);
			magDrillSkill.MagazineCheckAction = modConfig.MagDrills.MagazineCheckAction;
			magDrillSkill.RaidLoadedAmmoAction = modConfig.MagDrills.RaidLoadedAmmoAction;
			magDrillSkill.RaidUnloadedAmmoAction = modConfig.MagDrills.RaidUnloadedAmmoAction;
		}
		if(modConfig.Memory.enable)
		{
			Logger.log(`Memory enabled`);
			memorySkill.AnySkillUp = modConfig.Memory.AnySkillUp;
			memorySkill.SkillProgress = modConfig.Memory.AnySkillUp;
		}
		if(modConfig.Metabolism.enable)
		{
			Logger.log(`Metabolism enabled`);
			metabolismSkill.DecreaseNegativeEffectDurationRate = modConfig.Metabolism.DecreaseNegativeEffectDurationRate;
			metabolismSkill.DecreasePoisonDurationRate = modConfig.Metabolism.DecreasePoisonDurationRate;
			metabolismSkill.EnergyRecoveryRate = modConfig.Metabolism.EnergyRecoveryRate;
			metabolismSkill.HydrationRecoveryRate = modConfig.Metabolism.HydrationRecoveryRate;
			metabolismSkill.IncreasePositiveEffectDurationRate = modConfig.Metabolism.IncreasePositiveEffectDurationRate;
		}
		if(modConfig.Perception.enable)
		{
			Logger.log(`Perception enabled`);
			perceptionSkill.OnlineAction = modConfig.Perception.OnlineAction;
			perceptionSkill.UniqueLoot = modConfig.Perception.UniqueLoot;
		}
		if(modConfig.Pistol.enable)
		{
			Logger.log(`Pistol enabled`);
			pistolSkill.WeaponChamberAction = modConfig.Pistol.WeaponChamberAction;
			pistolSkill.WeaponFixAction = modConfig.Pistol.WeaponFixAction;
			pistolSkill.WeaponReloadAction = modConfig.Pistol.WeaponReloadAction;
			pistolSkill.WeaponShotAction = modConfig.Pistol.WeaponShotAction;
		}
		if(modConfig.RecoilControl.enable)
		{
			Logger.log(`RecoilControl enabled`);
			recoilControlSkill.RecoilAction = modConfig.RecoilControl.RecoilAction;
		}
		if(modConfig.Search.enable)
		{
			Logger.log(`Search enabled`);
			searchSkill.FindAction = modConfig.Search.FindAction;
			searchSkill.SearchAction = modConfig.Search.SearchAction;
		}
		if(modConfig.Shotgun.enable)
		{
			Logger.log(`Shotgun enabled`);
			shotgunSkill.WeaponChamberAction = modConfig.Shotgun.WeaponChamberAction;
			shotgunSkill.WeaponFixAction = modConfig.Shotgun.WeaponFixAction;
			shotgunSkill.WeaponReloadAction = modConfig.Shotgun.WeaponReloadAction;
			shotgunSkill.WeaponShotAction = modConfig.Shotgun.WeaponShotAction;
		}
		if(modConfig.Sniper.enable)
		{
			Logger.log(`Sniper enabled`);
			sniperSkill.WeaponChamberAction = modConfig.Sniper.WeaponChamberAction;
			sniperSkill.WeaponFixAction = modConfig.Sniper.WeaponFixAction;
			sniperSkill.WeaponReloadAction = modConfig.Sniper.WeaponReloadAction;
			sniperSkill.WeaponShotAction = modConfig.Sniper.WeaponShotAction;
		}
		if(modConfig.Strength.enable)
		{
			Logger.log(`Strength enabled`);
			strengthSkill.FistfightAction = modConfig.Strength.FistfightAction;
			strengthSkill.MovementActionMax = modConfig.Strength.MovementActionMax;
			strengthSkill.MovementActionMin = modConfig.Strength.MovementActionMin;
			strengthSkill.PushUpMax = modConfig.Strength.PushUpMax;
			strengthSkill.PushUpMin = modConfig.Strength.PushUpMin;
			strengthSkill.SprintActionMax = modConfig.Strength.SprintActionMax;
			strengthSkill.SprintActionMin = modConfig.Strength.SprintActionMin;
			strengthSkill.ThrowAction = modConfig.Strength.ThrowAction;
		}
		if(modConfig.StressResistance.enable)
		{
			Logger.log(`StressResistance enabled`);
			stressResistanceSkill.HealthNegativeEffect = modConfig.StressResistance.HealthNegativeEffect;
			stressResistanceSkill.LowHPDuration = modConfig.StressResistance.LowHPDuration;
		}
		if(modConfig.Surgery.enable)
		{
			Logger.log(`Surgery enabled`);
			surgerySkill.SkillProgress = modConfig.Surgery.SkillProgress;
			surgerySkill.SurgeryAction = modConfig.Surgery.SurgeryAction;
		}
		if(modConfig.Throwing.enable)
		{
			Logger.log(`Throwing enabled`);
			throwingSkill.ThrowAction = modConfig.Throwing.ThrowAction;
		}
		if(modConfig.TroubleShooting.enable)
		{
			Logger.log(`TroubleShooting enabled`);
			troubleShootingSkill.EliteAmmoChanceReduceMult = modConfig.TroubleShooting.EliteAmmoChanceReduceMult;
			troubleShootingSkill.EliteDurabilityChanceReduceMult = modConfig.TroubleShooting.EliteDurabilityChanceReduceMult;
			troubleShootingSkill.EliteMagChanceReduceMult = modConfig.TroubleShooting.EliteMagChanceReduceMult;
			troubleShootingSkill.MalfRepairSpeedBonusPerLevel = modConfig.TroubleShooting.MalfRepairSpeedBonusPerLevel;
			troubleShootingSkill.SkillPointsPerMalfFix = modConfig.TroubleShooting.SkillPointsPerMalfFix;
		}
		if(modConfig.Vitality.enable)
		{
			Logger.log(`Vitality enabled`);
			vitalitySkill.DamageTakenAction = modConfig.Vitality.DamageTakenAction;
			vitalitySkill.HealthNegativeEffect = modConfig.Vitality.HealthNegativeEffect;
		}
		if(modConfig.WeaponTreatment.enable)
		{
			Logger.log(`WeaponTreatment enabled`);
			weaponTreatmentSkill.DurLossReducePerLevel = modConfig.WeaponTreatment.DurLossReducePerLevel;
			weaponTreatmentSkill.Filter = modConfig.WeaponTreatment.Filter;
			weaponTreatmentSkill.SkillPointsPerRepair = modConfig.WeaponTreatment.SkillPointsPerRepair;
			weaponTreatmentSkill.WearChanceReducePerLevel = modConfig.WeaponTreatment.WearChanceReducePerLevel;
		}
    }	
}
module.exports.Mod = Mod;
