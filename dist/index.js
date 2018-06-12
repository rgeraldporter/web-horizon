'use strict';

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _compare = require('./lib/compare');

var _browsers = require('./lib/browsers');

var _browsers2 = _interopRequireDefault(_browsers);

var _logger = require('./lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

_nodePersist2.default.initSync();

var doCheck = function doCheck() {
    return (0, _compare.check)(_nodePersist2.default.getItemSync('browsers')).then(function (newBrowsers) {
        _nodePersist2.default.setItemSync('browsers', newBrowsers);
    });
};

// @todo switch to cache via storage like songster does for settings
// init
_browsers2.default.get().then(function (resp) {
    _nodePersist2.default.setItemSync('browsers', resp);
    _nodeCron2.default.schedule('0 * * * *', doCheck);

    // first time run through.
    doCheck();
});