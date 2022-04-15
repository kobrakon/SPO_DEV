'use strict';

class BalancedMeds {
    constructor() {
        this.mod = "DeadW0lf-BalancedMeds";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.start.bind(this);
    }

    start(){
        const config = require('./config.json');
        const ids = require('./items.json');
        const database = DatabaseServer.tables;
        const items = database.templates.items;

        Object.entries(ids).forEach(([key, value]) => {
            items[key]._props.MaxHpResource = config[value].maxHpResource; // setting max hp resource or max use count
            items[key]._props.hpResourceRate = config[value].hpResourceRate; // setting healing rate
            items[key]._props.medUseTime = config[value].medUseTime; // setting med use time
            if(config[value].duration != -1 && items[key]._props.effects_damage.Pain){
                items[key]._props.effects_damage.Pain.duration = config[value].duration; // setting effect duration
            }
            if (items[key]._props.effects_health.Energy) {
                items[key]._props.effects_health.Energy.value = config[value].energy; // setting energy penalty
            }
            if (items[key]._props.effects_health.Hydration) {
                items[key]._props.effects_health.Hydration.value = config[value].hydration; // setting hydration penalty
            }
            if(items[key]._props.effects_damage.DestroyedPart) {
                items[key]._props.effects_damage.DestroyedPart.healthPenaltyMin = config[value].healthPenaltyMin;
                items[key]._props.effects_damage.DestroyedPart.healthPenaltyMax = config[value].healthPenaltyMax;
            }
        });
        Logger.info(`Loading: ${this.mod} is successful.`);
    }

}
module.exports.BalancedMeds = BalancedMeds;