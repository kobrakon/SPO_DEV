"use strict";

const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const config = require("../config/config.js");

class WeaponsGlobals {

    static loadGlobalWeps() {

        if (config.experimental_recoil == true) {

            for (let i in itemDB) {
                let fileData = itemDB[i];
                if (fileData._props.weapClass === "smg"
                    || fileData._props.weapClass === "shotgun"
                    || fileData._props.weapClass === "assaultCarbine"
                    || fileData._props.weapClass === "sniperRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "machinegun"
                    || fileData._props.weapClass === "marksmanRifle"
                    || fileData._props.weapClass === "assaultRifle"
                ) {
                    fileData._props.CameraRecoil *= 0.5;
                    fileData._props.CameraSnap = 3.5;
                }
                if (fileData._props.weapClass === "pistol"
                ) {
                    fileData._props.CameraRecoil *= 0.25;
                    fileData._props.CameraSnap = 3.5;
                }
            }

            globalDB.Aiming.RecoilCrank = true;
            globalDB.Aiming.AimProceduralIntensity = 0.7;
            globalDB.Aiming.RecoilHandDamping = 0.55;
            globalDB.Aiming.RecoilDamping = 0.75;
            globalDB.Aiming.RecoilConvergenceMult *= 2.55;
            globalDB.Aiming.RecoilVertBonus = 50;
            globalDB.Aiming.RecoilBackBonus = -80;

            if (config.logEverything == true) {
                Logger.info("Experimental Recoil Enabled");
            }
        }
        if (config.recoil_changes == true && config.experimentalRecoil != true) {

            for (let i in itemDB) {
                let fileData = itemDB[i];
                if (fileData._props.weapClass === "smg"
                    || fileData._props.weapClass === "shotgun"
                    || fileData._props.weapClass === "assaultCarbine"
                    || fileData._props.weapClass === "sniperRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "machinegun"
                    || fileData._props.weapClass === "marksmanRifle"
                    || fileData._props.weapClass === "assaultRifle"
                ) {
                    fileData._props.CameraRecoil *= 0.6;
                }
                if (fileData._props.weapClass === "pistol"
                ) {
                    fileData._props.CameraRecoil *= 0.4;
                }
            }

            globalDB.Aiming.RecoilVertBonus = 30;
            globalDB.Aiming.RecoilBackBonus = 30;
            globalDB.Aiming.AimProceduralIntensity = 0.8;
            globalDB.Aiming.RecoilHandDamping = 0.57;
            globalDB.Aiming.RecoilDamping = 0.78;
            globalDB.Aiming.RecoilConvergenceMult *= 1.55;

            if (config.logEverything == true) {
                Logger.info("Experimental Recoil Disabled");
            }
        }

        if (config.logEverything == true) {
            Logger.info("Weapons Loaded");
        }

        // //set min/max durability for bots, might be redundant
        // if (fileData._parent === "5447b5fc4bdc2d87278b4567"
        //     || fileData._parent === "5447b5cf4bdc2d65278b4567"
        //     || fileData._parent === "5447b6094bdc2dc3278b4567"
        //     || fileData._parent === "5447b5f14bdc2d61278b4567"
        //     || fileData._parent === "5447b6254bdc2dc3278b4568"
        //     || fileData._parent === "5447b6194bdc2d67278b4567"
        //     || fileData._parent === "5447b5e04bdc2d62278b4567") {
        //     fileData._props.durabSpawnMin = 60;
        //     fileData._props.durabSpawnMax = 100;
        // }
    }
}

module.exports = WeaponsGlobals; 