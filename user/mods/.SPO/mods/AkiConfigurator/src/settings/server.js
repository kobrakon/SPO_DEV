/*
エレシュキガル
*/

"use strict";

class server
{
    static applyValues()
    {

        const config = require('../../config/config.json');

            DatabaseServer.tables.server = config["Server values"].HTTP;

            HideoutConfig = config["Server values"].Hideout;

            HealthConfig = config["Server values"].Health;
    }
}

module.exports = server;