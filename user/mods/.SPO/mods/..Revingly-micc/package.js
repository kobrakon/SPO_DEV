const { Mod } = require("./src/mod.js");

ModLoader.onLoad[Mod.MOD_NAME] = Mod.Start
