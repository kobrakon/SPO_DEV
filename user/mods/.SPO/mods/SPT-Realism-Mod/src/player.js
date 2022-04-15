"use strict";
const DB = DatabaseServer.tables;
const globalDB = DB.globals.config;
const interiaDB = globalDB.Inertia
const myProfile = require("../db/profile/profile.json");
const commonStats = require("../db/bots/common.json");
const config = require("../config/config.js");

class Player {

    static headHealth = commonStats.health.BodyParts[0].Head.max;
    static chestHealth = commonStats.health.BodyParts[0].Chest.max;
    static stomaHealth = commonStats.health.BodyParts[0].Stomach.max;
    static armHealth = commonStats.health.BodyParts[0].RightArm.max;
    static legHealth = commonStats.health.BodyParts[0].RightLeg.max;
    static tempCurr = 30
    static tempMax = 30

    static loadPlayer() {
    
        if (config.weightChanges == true) {
            //Speed weight limits
            globalDB.Stamina.WalkOverweightLimits["x"] = 40;
            globalDB.Stamina.WalkOverweightLimits["y"] = 55;

            globalDB.Stamina.BaseOverweightLimits["x"] = 30;
            globalDB.Stamina.BaseOverweightLimits["y"] = 50;

            globalDB.Stamina.SprintOverweightLimits["x"] = 5;
            globalDB.Stamina.SprintOverweightLimits["y"] = 15;

            globalDB.Stamina.WalkSpeedOverweightLimits["x"] = 30;
            globalDB.Stamina.WalkSpeedOverweightLimits["y"] = 60;

            //increased fall damage
            globalDB.Health.Falling.DamagePerMeter = 11.5;
            globalDB.Health.Falling.SafeHeight = 2.05;
        }

        if (config.speedChanges == true) {
            //Increase base stamina
            globalDB.Stamina.Capacity = 155;

            //Reduce aim drain
            globalDB.Stamina.AimDrainRate *= 0.3;
            globalDB.Stamina.AimConsumptionByPose["y"] = 0.9;

            //Increase stam regen rate
            globalDB.Stamina.BaseRestorationRate *= 3;

            //Decrease sprint speed
            globalDB.SprintSpeed["x"] *= 0.47;
            globalDB.SprintSpeed["y"] *= 0.47;
        }

        if (config.inertiaChanges == true) {
            //Adjust inertia
            interiaDB.SideTime["x"] *= 0.38;
            interiaDB.SideTime["y"] *= 0.38;
            interiaDB.MinDirectionBlendTime *= 0.7;
            interiaDB.WalkInertia["x"] *= 0.78;
            interiaDB.WalkInertia["y"] *= 0.78;
            interiaDB.TiltInertiaMaxSpeed["x"] *= 1.1;
            interiaDB.TiltInertiaMaxSpeed["y"] *= 1.1;
            interiaDB.TiltMaxSideBackSpeed["x"] *= 1.1;
            interiaDB.TiltMaxSideBackSpeed["y"] *= 1.1;
            interiaDB.TiltStartSideBackSpeed["x"] *= 1.1;
            interiaDB.TiltStartSideBackSpeed["y"] *= 1.1;
        }

        if (config.realism == true) {
            //reduce blacked limb overdamage
            globalDB.LegsOverdamage *= 2.47;
            globalDB.HandsOverdamage *= 0.85;
            globalDB.StomachOverdamage *= 2.15;

            //Custom starter kits to be more balanced with the changes
            DB.templates.profiles.Standard.bear.character.Inventory = myProfile.Standard.bear.Inventory;
            DB.templates.profiles.Standard.usec.character.Inventory = myProfile.Standard.usec.Inventory;
            DB.templates.profiles.Standard.bear.character.Health = myProfile.Health;
            DB.templates.profiles.Standard.usec.character.Health = myProfile.Health;

            DB.templates.profiles["Left Behind"].bear.character.Inventory = myProfile["Left Behind"].bear.Inventory;
            DB.templates.profiles["Left Behind"].usec.character.Inventory = myProfile["Left Behind"].usec.Inventory;
            DB.templates.profiles["Left Behind"].bear.character.Health = myProfile.Health;
            DB.templates.profiles["Left Behind"].usec.character.Health = myProfile.Health;

            DB.templates.profiles["Prepare To Escape"].bear.character.Inventory = myProfile["Prepare To Escape"].bear.Inventory;
            DB.templates.profiles["Prepare To Escape"].usec.character.Inventory = myProfile["Prepare To Escape"].usec.Inventory;
            DB.templates.profiles["Prepare To Escape"].bear.character.Health = myProfile.Health;
            DB.templates.profiles["Prepare To Escape"].usec.character.Health = myProfile.Health;

            DB.templates.profiles["Edge Of Darkness"].bear.character.Inventory = myProfile["Edge Of Darkness"].bear.Inventory;
            DB.templates.profiles["Edge Of Darkness"].usec.character.Inventory = myProfile["Edge Of Darkness"].usec.Inventory;
            DB.templates.profiles["Edge Of Darkness"].bear.character.Health = myProfile.Health;
            DB.templates.profiles["Edge Of Darkness"].usec.character.Health = myProfile.Health;
        }

        if(config.logEverything == true){
            Logger.info("Player Loaded");
        }
    }
}
module.exports = Player;