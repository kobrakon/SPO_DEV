"use strict"

class SPO_Tweaks
{

  constructor()
{
const items = DatabaseServer.tables.templates.items;
const handbook = DatabaseServer.tables.templates.handbook;
const prices = DatabaseServer.tables.templates.prices; 
const filters = ["54009119af1c881c07000029",];
const globals = DatabaseServer.tables.globals;
const KNIFE_ID = "5447e1d04bdc2dff2f8b4567";
const Labcard = "5c94bbff86f7747ee735c08f";
const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const interiaDB = globalDB.Inertia;

//const DBlootCont = DB.loot.staticContainers;
const resKeys = ["5780cf7f2459777de4559322", "5ede7a8229445733cb4c18e2", "5efde6b4f5448336730dbd61", "5c94bbff86f7747ee735c08f", "5d80c60f86f77440373c4ece", "5d80c62a86f7744036212b3f", "5d08d21286f774736e7c94c3", "5e42c83786f7742a021fdf3c", "5e42c81886f7742a01529f57",  ]
for (const id in items){
      
    if(items[id]._parent == "543be5e94bdc2df1348b4568" || items[id]._parent == "5c99f98d86f7745c314214b3" || items[id]._parent == "5c164d2286f774194c5e69fa")
    {
      if (!resKeys.includes(items[id]._id))
        {
          items[id]._props.MaximumNumberOfUsage = 0;
        }
    }
}




itemDB[Labcard]._props.MaximumNumberOfUsage = 1
//Increase base stamina
globalDB.Stamina.Capacity = 150;

//Reduce aim drain
globalDB.Stamina.AimDrainRate *= 0.28;
globalDB.Stamina.AimConsumptionByPose["y"] = 0.95;

//increase aim movement speed
globalDB.Stamina.AimingSpeedMultiplier = 0.75;

//Increase stam regen rate
globalDB.Stamina.BaseRestorationRate *= 3;

//Decrease sprint speed and limits
globalDB.SprintSpeed["x"] *= 0.6;
globalDB.SprintSpeed["y"] *= 0.6;

//Speed weight limits
globalDB.Stamina.WalkOverweightLimits["x"] = 42;
globalDB.Stamina.WalkOverweightLimits["y"] = 75;

globalDB.Stamina.BaseOverweightLimits["x"] = 26;
globalDB.Stamina.BaseOverweightLimits["y"] = 70;

globalDB.Stamina.SprintOverweightLimits["x"] = 26;
globalDB.Stamina.SprintOverweightLimits["y"] = 65;

globalDB.Stamina.WalkSpeedOverweightLimits["x"] = 32;
globalDB.Stamina.WalkSpeedOverweightLimits["y"] = 92;

//Adjust inertia
interiaDB.SideTime["x"] *= 0.4;
interiaDB.SideTime["y"] *= 0.4;
interiaDB.MinDirectionBlendTime *= 0.7;
interiaDB.WalkInertia["x"] *= 0.8;
interiaDB.WalkInertia["y"] *= 0.8;
interiaDB.TiltInertiaMaxSpeed["x"] *= 1.05;
interiaDB.TiltInertiaMaxSpeed["y"] *= 1.05;
interiaDB.TiltMaxSideBackSpeed["x"] *= 1.05;
interiaDB.TiltMaxSideBackSpeed["y"] *= 1.05;
interiaDB.TiltStartSideBackSpeed["x"] *= 1.05;
interiaDB.TiltStartSideBackSpeed["y"] *= 1.05;

//Recoil changes 
    for (let i in itemDB) {
        let fileData = itemDB[i];
        if (fileData._props.weapClass != null && fileData._props.weapClass !== undefined)
        {
        if (fileData._props.weapClass !== "pistol") 
           {
               fileData._props.CameraRecoil *= 1.2;
               fileData._props.CameraSnap = 3.5;
           }
           else 
           {
               fileData._props.CameraRecoil *= 0.25;
               fileData._props.CameraSnap = 3.5;
           }
        }
       }
        globalDB.Aiming.RecoilCrank = true;
        globalDB.Aiming.AimProceduralIntensity = 0.7;
        globalDB.Aiming.RecoilHandDamping = 0.6;
        globalDB.Aiming.RecoilDamping = 0.5;
        globalDB.Aiming.RecoilConvergenceMult *= 5;
        globalDB.Aiming.RecoilVertBonus = 100;
        globalDB.Aiming.RecoilBackBonus = 80;



//Lower sell value on melee weapons
handbook.Items.forEach(handbookItem => {
    const id = handbookItem.Id;

    if (items[id] && items[id]._parent === KNIFE_ID) {
        // divide the price by 10
        handbookItem.Price *= 0.1

        // limit the price to 15k
        handbookItem.Price = Math.min(21432, handbookItem.Price)
    }
})
for (const id in items){
    if (items[id]._parent == KNIFE_ID){
    items[id]._props.knifeHitSlashDam *= 3 
    items[id]._props.knifeHitStabDam *= 3 
    }
    }
//add protection to ears
Object.values(items)
.filter((item) => item._props.headSegments)
.map((item) => {
    if(item._props.headSegments.includes("Eyes") || item._props.headSegments.includes("Jaws")) {
        item._props.headSegments.push("Ears");
    }
});
//hyd / ene drain values
globals.config.Health.Effects.Existence = {
    // how much time between every tick of Energy consumption(i belive seconds)
    "EnergyLoopTime": 150,
    // how much time between every tick of Hydration consumption
    "HydrationLoopTime": 210,
    // Energy consomption amount every tick
    "EnergyDamage": 1,
    // Hydration consomption amount every tick
    "HydrationDamage": 3,
    // Multipliers when stomach blackout
    "DestroyedStomachEnergyTimeFactor": 2,
    "DestroyedStomachHydrationTimeFactor": 2
}
// globals.config.Stamina.SprintDrainRate = 4.5,
// globals.config.Stamina.BaseRestorationRate = 12

//disable selling to Flea
for (let i in items)
  {
    if (items[i]._props.CanSellOnRagfair)
    {
      items[i]._props.CanSellOnRagfair = false
    }
  }

// Removal of Run Through 
globals.config.exp.match_end.survived_exp_requirement= 0;
globals.config.exp.match_end.survived_seconds_requirement= 15;

//damage over blacked limbs to player
globals.config.Health.ProfileHealthSettings.BodyPartsSettings.LeftArm.OverDamageReceivedMultiplier= 0.25;
globals.config.Health.ProfileHealthSettings.BodyPartsSettings.RightArm.OverDamageReceivedMultiplier= 0.25;
globals.config.Health.ProfileHealthSettings.BodyPartsSettings.LeftLeg.OverDamageReceivedMultiplier= 0.25;
globals.config.Health.ProfileHealthSettings.BodyPartsSettings.RightLeg.OverDamageReceivedMultiplier= 0.25;
globals.config.Health.ProfileHealthSettings.BodyPartsSettings.Stomach.OverDamageReceivedMultiplier= 0.75;

//bleed changes 
globals.config.Health.Effects.HeavyBleeding = {
    "DefaultDelay": 0.4,
    "DefaultResidueTime": 0.4,
    "DamageEnergy": 0.5,
    "DamageHealth": 1.95,
    "EnergyLoopTime": 15,
    "HealthLoopTime": 2,
    "DamageHealthDehydrated": 0.4,
    "HealthLoopTimeDehydrated": 6,
}
globals.config.Health.Effects.LightBleeding = {
    "DefaultDelay": 0.4,
    "DefaultResidueTime": 0.4,
    "DamageEnergy": 0.5,
    "DamageHealth": 0.6,
    "EnergyLoopTime": 15,
    "HealthLoopTime": 2,
    "DamageHealthDehydrated": 0.4,
    "HealthLoopTimeDehydrated": 6,
}


}
}

module.exports.SPO_Tweaks = new SPO_Tweaks()
