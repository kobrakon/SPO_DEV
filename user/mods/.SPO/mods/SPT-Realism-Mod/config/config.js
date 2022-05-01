"use strict";

class Config {

    //A NOTE ON CONFIGURATION: I encourage you try this mod as it is intended and leave everything set to true. 
    //All these settings are balanced with each other, the mod is supposed to be hardcore and unforgivng like EFT is supposed to be. Either way, enjoy :)

    //Removes weight limit and fall damage changes if set to false.
    static weight_changes = false;

    //Removes the speed and stamina changes if set to false.
    static speed_changes = false;

    //Removes the inertia changes if set to false.
    static inertia_changes = false;

    //All items examined if set to true. 
    static all_examined = false;

    //Bots will no longer have tiered loadouts and will use vanilla loadouts, if set to false. 
    //This also disables changes made to botconfig (durability, bot ratios, loot limits) and custom loot generation functions that override AKI-SPT's.
    static bot_changes = true;

    //Disables global recoil changes if set to false.
    static recoil_changes = false;

    //Enables experimental recoil changes if set to true. Probably not balanced, looking for feedback.
    static experimental_recoil = false;

    //Disables fleamarket changes if set to false (min flea level, cost, amount of offers/listings, quantity of stackd items, etc.).
    static flea_changes = false;

    //Enables tiered flea and custom flea blacklist if set to true. MAKE SURE TO SET flea_changes TO FALSETiered flea is bugged with AKI 2.3.x or newer due to changes in flea server code. 
    //Linked Search/Filter by item won't work and traders won't show up on fleamarket unless you have unlocked that category of item. It's disabled by defualt.
    static tiered_flea = false;

    //Disables custom trader assorts if set to false.
    static trader_changes = false;

    //Disables Armour and Ammo changes if set to false, the core of Realism Mod. Player and bot health will also no longer be adjusted and starting profiles no longer changed.
    //If disabled, current armour durablity and player health will not be corrected but max durability/health will be.
    static realism = true;

    //Enables changes to medical items if set to true. WARNING: med changes will change the uses of all your stashed med items. 
    //If you disable it, all your med items current uses will still be whatever this mod set it to. 
    static med_changes = true;

    //Removes all in-raid item count restrictions if set to true. For example, you can carry as much cash, BTC, LEDX etc. as you like in raid.
    static remove_inraid_restrictions = true;

    //Enable dev logging if set to true. Will flood console with logs, for my personal use.
    static logEverything = false;
}

module.exports = Config; 