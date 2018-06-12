'use strict';

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _compare = require('./lib/compare');

var _browsers = require('./lib/browsers');

var _browsers2 = _interopRequireDefault(_browsers);

var _logger = require('./lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = require('node-persist');

require('dotenv').config();

storage.initSync();

var doCheck = function doCheck() {
    return (0, _compare.check)(storage.getItemSync('browsers')).then(function (newBrowsers) {
        storage.setItemSync('browsers', newBrowsers);
    });
};

// @todo switch to cache via storage like songster does for settings
// init
_browsers2.default.get().then(function (resp) {
    storage.setItemSync('browsers', resp);
    _nodeCron2.default.schedule('0 * * * *', doCheck);

    // first time run through.
    doCheck();
});