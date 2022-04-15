/*
エレシュキガル
*/

"use strict";



class configurator {
    static initialization() {
        const generator = require('./main/generator');
        const bots = require('./settings/bots');
        const ragfair = require('./settings/ragfair');
        const raids = require('./settings/raids');
        const server = require('./settings/server');
        const weather = require('./settings/weather');
        const traders = require('./settings/traders');
        const quests = require('./settings/quests');

        //Create the config
        if (generator.isConfigGenerated()) {
            ragfair.applyValues();
            weather.applyValues();
            bots.applyValues();
            raids.applyValues();
            server.applyValues();
            traders.applyValues();
            quests.applyValues();
            //VFS.writeFile(`./test.json`, JsonUtil.serialize(HealthConfig, true));
        } else {
            generator.createConfig();
            Logger.error("[AKI-Config]: New configuration file created, please restart your server to use it.");
            
        }

    }
}

module.exports = configurator;