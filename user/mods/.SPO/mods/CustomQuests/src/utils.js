const crypto = require('crypto');

const utils = {
  ALL_LOCALES: Object.keys(DatabaseServer.tables.locales.global),
  getSHA256: function (input) {
    return crypto.createHash('sha256').update(input).digest('hex')
  }
};

module.exports = utils;