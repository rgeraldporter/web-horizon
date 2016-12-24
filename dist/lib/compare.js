'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compareCheck = exports.compareStable = undefined;

var _email = require('./email');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var caniuse = require('caniuse-api');
var stable = caniuse.getLatestStableBrowsers();

var compareCheck = function compareCheck() {
    var stableNow = caniuse.getLatestStableBrowsers();
    var diff = stableNow.reduce(compareStable, []);
    _logger2.default.info('compared diff', diff);
    return diff.length ? (0, _email.email)(diff) : null;
};

var compareStable = function compareStable(prev, current) {
    return ~stable.indexOf(current) ? prev : prev.concat([current]);
};

exports.compareStable = compareStable;
exports.compareCheck = compareCheck;