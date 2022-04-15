"use strict";

const DB = DatabaseServer.tables;
const itemDB = DB.templates.items;
const globalDB = DB.globals.config;
const config = require("../config/config.js");

class Weapons {

    static LoadWeps() {

        if (config.experimentalRecoil == true) {

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
        }
        if (config.recoilChanges == true && config.experimentalRecoil != true) {

            //increase autocompensation to make guns more snappy
            globalDB.Aiming.RecoilConvergenceMult *= 1.55;

            //increase base recoil for all weapons to increase for autocomp increase
            globalDB.Aiming.RecoilVertBonus = 30;
            globalDB.Aiming.RecoilBackBonus = 30;
        }

        if (config.logEverything == true) {
            Logger.info("Weapons Loaded");
        }
    }
}

module.exports = Weapons; 