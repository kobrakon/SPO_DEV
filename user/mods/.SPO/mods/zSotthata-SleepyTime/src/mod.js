"use strict";


class SleepyTime
{
    constructor()
    {
        this.mod = require ("../package.json")
        Logger.info (`Loading: ${this.mod.name} ${this.mod.version}`);
        ModLoader.onLoad[this.mod.name] = this.on_load.bind (this)
    }


    on_load()
    {
        this.locations = DatabaseServer.tables.locations;
        this.locations_map = {
            "bigmap"        : "Customs",
            "factory4_day"  : "Factory",
            "factory4_night": "Factory",
            "interchange"   : "Interchange",
            "laboratory"    : "The Lab",
            "lighthouse"    : "Lighthouse",
            "rezervbase"    : "Reserve",
            "shoreline"     : "Shoreline",
            "woods"         : "Woods",
        };

        const config = require ("../config/config.json");

        // Save off our instance for use in the hooked function since
        // the hook's `this` will be the `LocationController`
        // instance.
        var _this = this;

        var lc_generate = LocationController.generate;
        LocationController.generate = function (location)
        {
            _this.generate (location);
            return lc_generate (location);
        }

        // Used for printing changes once a player enters a raid.
        this.old_distances = {};
        for (const map in this.locations_map)
        {
            if (map in this.locations)
            {
                var bot_data = this.locations[map].base.BotLocationModifier;

                // The old values are saved off to display on raid start.
                this.old_distances[map] = [
                    bot_data.DistToActivate,
                    bot_data.DistToSleep,
                ];

                let new_distance = config["activation-distance"];
                if (config.overrides && map in config.overrides)
                {
                    new_distance = config.overrides[map];
                }

                // If an entry is null, it remains unchanged.
                if (new_distance)
                {
                    bot_data["DistToActivate"] = Math.round (new_distance);
                    bot_data["DistToSleep"] = Math.round (bot_data["DistToActivate"] * 1.2);
                }

                // NOTE(sott): Uncomment to print all results at server start.
                // this.generate(map);
            }
            else
            {
                Logger.error (`Could not locate ${map} in database!`)
            }
        }

        if (config["allow-all-to-sleep"])
        {
            this.allow_all_to_sleep();
        }
    }


    allow_all_to_sleep()
    {
        const bot_types = DatabaseServer.tables.bots.types;
        for (const type in bot_types)
        {
            const difficulties = bot_types[type].difficulty;
            for (const difficulty in difficulties)
            {
                let mind = difficulties[difficulty].Mind
                if (mind)
                {
                    mind.CAN_STAND_BY = true;
                }
            }
        }
    }


    generate (map)
    {
        // Purely for output. Doesn't do any real work.

        const green = "\x1b[1m\x1b[32m";
        const red = "\x1b[1m\x1b[31m";
        const reset = "\x1b[0m";

        const format = function (label, val1, val2)
        {
            const delta = val2 - val1;
            if (typeof val1 == 'undefined')
            {
                var val1_str = `${red}${val1}${reset}`;
            }
            else
            {
                var val1_str = `${val1}`;
            }

            let str = `${label}: ${val1_str} -> `;
            if (delta > 0)
            {
                str += red;
            }
            else if (delta < 0)
            {
                str += green;
            }

            str += `${val2}${reset}`;
            return str;
        }

        let str = `${reset}${this.locations_map[map]}: `;
        str += format (
            "activate",
            this.old_distances[map][0],
            this.locations[map].base.BotLocationModifier["DistToActivate"]
        );
        str += ", "
        str += format (
            "sleep",
            this.old_distances[map][1],
            this.locations[map].base.BotLocationModifier["DistToSleep"]
        );

        Logger.info (str);
    }
}


module.exports.Mod = SleepyTime;
