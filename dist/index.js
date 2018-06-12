'use strict';

require('dotenv').config();

var cron = require('node-cron');

var _require = require('./lib/compare'),
    check = _require.check;

var browsers = require('./lib/browsers');
var logger = require('./lib/logger');
var storage = require('node-persist');

storage.initSync();

var doCheck = function doCheck() {
    return check(storage.getItemSync('browsers')).then(function (newBrowsers) {
        storage.setItemSync('browsers', newBrowsers);
    });
};

// @todo switch to cache via storage like songster does for settings
// init
browsers.get().then(function (resp) {
    storage.setItemSync('browsers', resp);
    cron.schedule('0 * * * *', doCheck);

    // first time run through.
    doCheck();
});