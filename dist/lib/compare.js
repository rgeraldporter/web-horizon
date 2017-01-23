'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.check = exports.compare = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _email = require('./email');

var email = _interopRequireWildcard(_email);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _browsers = require('./browsers');

var _browsers2 = _interopRequireDefault(_browsers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compare = function compare(val1) {
    return function (val2) {
        return val1.reduce(function (prev, current) {
            return ~val2.indexOf(current) ? prev : prev.concat([current]);
        }, []);
    };
};

var check = function check(browsersThen) {
    var browsersNow = void 0;
    return _browsers2.default.get().then(function (resp) {
        browsersNow = resp;
        _logger2.default.info('Running a comparison.');
        // 1. Check to see if any new browser types
        var browserKeysThen = (0, _keys2.default)(browsersThen);
        var browserKeysNow = (0, _keys2.default)(browsersNow);
        var diffBrowsers = compare(browserKeysNow)(browserKeysThen);
        diffBrowsers.length && email.send(diffBrowsers);
        // 2. Check each type for new versions
        browserKeysNow.map(function (key, index) {
            var versionsThen = (0, _keys2.default)(browsersThen[key]);
            var versionsNow = (0, _keys2.default)(browsersNow[key]);
            var diffVersions = compare(versionsNow)(versionsThen);
            diffVersions.length && email.send([key].concat(diffVersions));
        });
        // 3. Adopt new list via return
        return browsersNow;
    });
};

exports.compare = compare;
exports.check = check;