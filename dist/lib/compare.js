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

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compare = function compare(val1) {
    return function (val2) {
        return val1.reduce(function (prev, current) {
            return ~val2.indexOf(current) ? prev : prev.concat([current]);
        }, []);
    };
};

// accounts for if a new browser comes out we don't have a name for...
var getBrowserName = function getBrowserName(key) {
    return _browsers2.default.name[key] ? _browsers2.default.name[key].name : key;
};

var compareVersions = function compareVersions(then) {
    return function (now) {
        return function (browserKeys) {
            browserKeys.forEach(function (key) {
                var versionsThen = then[key] ? (0, _keys2.default)(then[key]) : {}; // in case its a new browser
                var versionsNow = (0, _keys2.default)(now[key]);
                var diffVersions = compare(versionsNow)(versionsThen);
                var notice = diffVersions.reduce(function (prev, current) {
                    var browserName = getBrowserName(key);
                    prev += browserName + ' has introduced version ' + current + '.';
                    return prev;
                }, '');

                if (notice.length) {
                    email.send(notice);
                    _twitter2.default.post(notice + ' #browsers #web #webdev');
                }
            });
        };
    };
};

var handleDiffBrowsers = function handleDiffBrowsers(diff) {
    return diff.forEach(function (browser) {
        return email.send('A new browser has been introduced with the key: "' + browser + '".');
    });
};

var check = function check(browsersThen) {
    return _browsers2.default.get().then(function (browsersNow) {
        _logger2.default.info('Running a comparison.');

        // 1. Check to see if any new browser types
        var browserKeysThen = (0, _keys2.default)(browsersThen);
        var browserKeysNow = (0, _keys2.default)(browsersNow);
        var diffBrowsers = compare(browserKeysNow)(browserKeysThen);
        handleDiffBrowsers(diffBrowsers);

        // 2. Check each type for new versions
        compareVersions(browsersThen)(browsersNow)(browserKeysNow);

        // 3. Adopt new list via return
        return browsersNow;
    }).catch(function (err) {
        _logger2.default.error('Encountered an error.', err);
    });
};

exports.compare = compare;
exports.check = check;