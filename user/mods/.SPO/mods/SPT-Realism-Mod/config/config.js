"use strict";

class Config {

    //A NOTE ON CONFIGURATION: I encourage you try this mod as it is intended and leave everything set to true. 
    //All these settings are balanced with each other, the mod is supposed to be hardcore and unforgivng like EFT is supposed to be. Either way, enjoy :)

    //Removes weight limit and fall damage changes if set to false
    static weightChanges = false;

    //Removes the speed changes if set to false
    static speedChanges = false;

    //Removes the inertia changes if set to false
    static inertiaChanges = false;

    //All items examined if set to true 
    static allExamined = false;

    //Bots no longer have tiered loadouts and will use vanilla loadouts, if set to false. This also disables changes made to botconfig (durability, bot ratios, loot limits) and custom loot generation functions that override AKI-SPT's
    static botChanges = true;

    //Disables recoil changes if set to false
    static recoilChanges = false;

    //If set to true, enabled experimental recoil changes
    static experimentalRecoil = false;

    //Disables tiered flea and custom flea blacklist if set to false
    static fleaChanges = false;

    //Disables custom trader assorts if set to false.
    static traderChanges = false;

    //Diables Armour and Ammo changes if set to false, the core of Realism Mod. Player health will also no longer be adjusted and starting profiles no longer changed
    static realism = true;

    //Enable dev logging if set to true. Will flood console with logs, for my personal use.
    static logEverything = false;
}

module.exports = Config; 