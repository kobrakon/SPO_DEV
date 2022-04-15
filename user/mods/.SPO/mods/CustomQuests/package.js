"use strict";

const path = require('path');

const QuestsLoader = require('./src/QuestsLoader');
const OnStartHandler = require('./src/OnStartHandler');

const DEFAULT_QUESTS_DIR = "quests";

class CustomQuests {
    constructor() {
        const mod = require("./package.json")
        const config = require('./config/config.json');

        this.config = config;
        this.questDirectory = path.join(__dirname, config.quest_directory || DEFAULT_QUESTS_DIR);

        if (!config.enabled) {
            Logger.warning(`=> Custom Quests: disabled from the config file`);
            return;
        }

        Logger.info(`Loading: Custom Quests v${mod.version}`);

        ModLoader.onLoad[mod.name] = this.onLoad.bind(this);
    }


    onLoad() {
        const onStart = new OnStartHandler(this.config);

        onStart.beforeCustomQuestsLoaded();

        const questsLoader = new QuestsLoader(this.questDirectory);
        const loadedQuests = questsLoader.loadAll();

        onStart.afterCustomQuestsLoaded(loadedQuests);

        Logger.success(`=> Custom Quests: ${loadedQuests.length} quests loaded`)
    }
}

module.exports = new CustomQuests();