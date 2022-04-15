'use strict';

class UsefulFoodsAndDrinks {
    constructor() {
        this.mod = "DeadW0lf-UsefulFoodsAndDrinks";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.start.bind(this);
    }

    start(){
        const config = require('./config.json');
        const ids = require('./items.json');
        const database = DatabaseServer.tables;
        const items = database.templates.items;

        Object.entries(ids).forEach(([key, value]) => {
            items[key]._props.MaxResource = config[value].maxResource; // setting max resource ammount or uses
            if(items[key]._props.effects_damage.Pain){
                items[key]._props.effects_damage.Pain.duration = config[value].painDuration; // setting effect duration
            }
            if (items[key]._props.effects_health.Energy) {
                items[key]._props.effects_health.Energy.value = config[value].energy; // setting energy penalty
            }
            if (items[key]._props.effects_health.Hydration) {
                items[key]._props.effects_health.Hydration.value = config[value].hydration; // setting hydration penalty
            }
        });
        Logger.info(`Loading: ${this.mod} is successful.`);
    }

}
module.exports.UsefulFoodsAndDrinks = UsefulFoodsAndDrinks;