"use strict";

const fs = require('fs');
const path = require('path');
const modPackage = require("./package.json");
const basename = require('path').basename;

const MODULE_DLL_NAME = 'module.dll';

const TML_PREFIX_FOLDER = 'TML_DLLS_'

const ROOT_MODS = 'user/mods/';

const TRAP_MODLOADER = basename(__dirname);

const ATF_ID = 'AdvancedTraderFramework';

function getLoadorderPath() {
    return `${ModLoader.basepath}loadorder.json`;
}

function getModPath(modName) {
    return path.join(ModLoader.basepath, modName);
}

function importMods() {
    // get mods
    if (!VFS.exists(ModLoader.basepath)) {
        // no mods folder found
        VFS.createDir(ModLoader.basepath);
        return;
    }

    Logger.log("TrapModLoader: loading mods...");

    const loadorderFile = getLoadorderPath();

    let mods;
    // if loadorder.json exists: load it, otherwise get filesystem default order
    if (VFS.exists(loadorderFile)) {
        mods = JsonUtil.deserialize(VFS.readFile(loadorderFile));
    }
    else {
        mods = VFS.getDirs(ModLoader.basepath);

        VFS.writeFile(loadorderFile, JsonUtil.serialize(mods, true));
        Logger.info("TrapModLoader: loadorder.json file generated");
    }


    // Used to check all errors before stopping the load execution
    let errorsFound = false;


    const loadedMods = {};
    for (const mod of mods) {
        if (ModLoader.validMod(mod)) {
            loadedMods[mod] = JsonUtil.deserialize(VFS.readFile(`${ModLoader.getModPath(mod)}/package.json`));
        } else {
            Logger.error(`=> skipped loading: '${mod}' not found`)
        }
    }

    for (const modToValidate of Object.values(loadedMods)) {
        // Returns if any mod dependency is not satisfied
        if (!ModLoader.areModDependenciesFulfilled(modToValidate, loadedMods)) {
            errorsFound = true;
        }

        // Returns if at least two incompatible mods are found
        if (!ModLoader.isModCompatible(modToValidate, loadedMods)) {
            errorsFound = true;
        }

        // Returns if mod isnt compatible with this verison of aki
        if (!ModLoader.isModCombatibleWithAki(modToValidate)) {
            errorsFound = true;
        }
    }

    if (errorsFound) {
        return;
    }

    // add mods
    for (const mod of mods) {
        if (ModLoader.validMod(mod)) {
            ModLoader.addMod(mod);
        }
    }

    return;
}

function getModlist() {
    // if loadorder.json exists: load it, otherwise generate load order
    const loadOrderPath = getLoadorderPath();

    if (VFS.exists(loadOrderPath)) {
        return JsonUtil.deserialize(VFS.readFile(loadOrderPath));
    }
    else {
        return Object.keys(ModLoader.getLoadOrder(ModLoader.imported));
    }
}

function executeMods(modlist) {
    // import mod classes
    for (const mod of modlist) {
        const packageMod = ModLoader.imported[mod];
        if (packageMod && "main" in ModLoader.imported[mod]) {
            ModLoader.importClass(mod, `${ModLoader.getModPath(mod)}${ModLoader.imported[mod].main}`);
        }
    }
}

function loadMods() {
    // load mods
    for (const mod in ModLoader.onLoad) {
        ModLoader.onLoad[mod]();
    }

    // update the handbook lookup with modded items
    HandbookController.load();
}

// ATF = Advanced Trader Framework
function getATFModname(modlist) {
    for (const mod of modlist) {
        const packageMod = ModLoader.imported[mod];
        if (packageMod && packageMod.name === ATF_ID) {
            return mod;
        }
    }
}

// Advanced Trader Framework hack
function hijackATFexportPresetsMethod(ATFClass) {
    const modPath = path.normalize(path.join(__dirname, '..'));

    ATFClass.exportPresets = (keyword = 'export') => {
        let presetList = {};
        let profilesPath = path.normalize(path.join(modPath, '../profiles/'));

        let profileIDs = fs.readdirSync(profilesPath);
        Logger.info("ATF: Profiles:  " + profileIDs + "  found");

        profileIDs.forEach(profileFileName => {
            if (path.extname(profileFileName) == ".json") {
                let profile = require(profilesPath + profileFileName);
                if (profile.weaponbuilds != undefined) {
                    Object.values(profile.weaponbuilds).map((preset) => {
                        if (preset.name.includes(keyword)) {
                            presetList[preset.name] = Mod.convertPresetToTrade(preset);
                        }
                    });
                }
            }
        });

        let allPresetNames = Object.keys(presetList);

        Object.values(allPresetNames).map((presetName) => {
            Mod.writeFile(modPath + "/utility/exportedPresets/" + presetName + ".json", JSON.stringify(presetList[presetName], null, "\t"));
            Logger.info("ATF: Exporting Preset: " + presetName);
        });

    }
}

function wipeTmlLibraries() {
    VFS.getDirs(ROOT_MODS)
        .filter(dir => dir.startsWith(TML_PREFIX_FOLDER))
        .forEach(dir => {
            const dirPath = path.join(ROOT_MODS, dir);

            VFS.removeDir(dirPath);
            Logger.info(`=> TrapModLoader: wiped '${dirPath}'`)
        });
}

// TODO: should be recursive
function getClientDlls(modName) {
    const modPath = getModPath(modName);
    return VFS.getFiles(modPath).filter(fileName => fileName.endsWith('.dll'));
}

function getClientMods(modlist) {
    return modlist.filter(modName => {
        return getClientDlls(modName).some(fileName => fileName === MODULE_DLL_NAME);
    })
}

function createTmlLibraries(modlist) {
    getClientMods(modlist).forEach(modName => {
        // 1. create the folder

        const newFolderPath = path.join(ROOT_MODS, TML_PREFIX_FOLDER + modName)
        fs.mkdirSync(newFolderPath);

        // 2. copy package.json
        const packageJson = require(`./mods/${modName}/package.json`);

        // remove main field
        delete packageJson.main

        // write packageJson
        const stringifiedPackageJson = JSON.stringify(packageJson, undefined, 4);
        fs.writeFileSync(path.join(newFolderPath, 'package.json'), stringifiedPackageJson);

        // 3. copy dlls files
        const modPath = getModPath(modName);

        getClientDlls(modName).forEach(dllName => {
            const dllPath = path.join(modPath, dllName);
            VFS.copyFile(dllPath, path.join(newFolderPath, dllName))
            Logger.success(`=> TrapModLoader: ${modName} '${dllName}' copied`);
        });
    });
}

class TrapModLoader {
    constructor() {
        this.hijacked = false;
        this.saved = {};


        Logger.info(`Loading: ${modPackage.name} v${modPackage.version}`);

        // wipe TML libraries
        wipeTmlLibraries();

        ModLoader.onLoad[modPackage.name] = this.onLoad.bind(this);
    }


    onLoad() {
        this.hijackModLoader();

        // get all mods package.json
        importMods();

        const modlist = getModlist().filter(modName => ModLoader.validMod(modName));

        // import scripts
        executeMods(modlist);

        const atfModname = getATFModname(modlist);

        // if Advanced Trader Framework mod is installed
        if (atfModname) {
            hijackATFexportPresetsMethod(globalThis[atfModname].mod.constructor)
            Logger.success('=> TrapModLoader: AdvancedTraderFramework exportPresets method hijacked');
        }

        // call onLoad methods
        loadMods()

        // create TML libraries
        createTmlLibraries(modlist);

        this.restoreModLoader();
    }

    hijackModLoader() {
        if (this.hijacked) {
            return;
        }

        // save
        this.saved.basePath = ModLoader.basePath;
        this.saved.imported = ModLoader.imported;
        this.saved.onLoad = ModLoader.onLoad;

        // hijack
        ModLoader.basepath = `user/mods/${TRAP_MODLOADER}/mods/`;
        ModLoader.imported = {};
        ModLoader.onLoad = {};

        this.hijacked = true;
    }

    restoreModLoader() {
        if (!this.hijacked) {
            return;
        }

        ModLoader.basePath = this.saved.basePath;
        ModLoader.imported = this.saved.imported;
        ModLoader.onLoad = this.saved.onLoad;

        this.saved = {};
        this.hijacked = false;
    }
}

module.exports = new TrapModLoader();