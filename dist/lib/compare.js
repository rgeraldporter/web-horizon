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

var twitter = _interopRequireWildcard(_twitter);

var _inquiryMonad = require('inquiry-monad');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compare = function compare(val) {
    return val.now.reduce(function (acc, current) {
        return ~val.before.indexOf(current) ? acc : acc.concat([current]);
    }, []);
};

var compareKeys = function compareKeys(val) {
    _logger2.default.info('compareKeys val', val);
    var browserKeysBefore = (0, _keys2.default)(val.before);
    var browserKeysNow = (0, _keys2.default)(val.now);

    var diffKeys = compare({
        now: browserKeysNow,
        before: browserKeysBefore
    });

    return diffKeys.length ? (0, _inquiryMonad.Fail)(diffKeys) : (0, _inquiryMonad.Pass)('Browser keys are identical');
};

// accounts for if a new browser comes out we don't have a name for...
var getBrowserName = function getBrowserName(key) {
    return _browsers2.default.name[key] ? _browsers2.default.name[key].name : key;
};

var compareVersions = function compareVersions(val) {
    var browserKeysNow = (0, _keys2.default)(val.now);
    var now = val.now;
    var before = val.before;

    var diff = browserKeysNow.reduce(function (acc, key) {
        var versionsBefore = before[key] ? (0, _keys2.default)(before[key]) : []; // in case its a new browser
        var versionsNow = (0, _keys2.default)(now[key]);
        var diffVersions = compare({
            now: versionsNow,
            before: versionsBefore
        });
        return diffVersions.length ? acc.concat([{ key: key, diff: diffVersions }]) : acc;
    }, []);

    return diff.length ? (0, _inquiryMonad.Fail)(diff) : (0, _inquiryMonad.Pass)('No new browser versions');
};

var handleDiffBrowsers = function handleDiffBrowsers(diff) {
    return diff.forEach(function (browser) {
        return email.send('A new browser has been introduced with the key: "' + browser + '".\n\n');
    });
};

var check = function check(browsersBefore) {
    return _browsers2.default.get().then(function (browsersNow) {
        _logger2.default.info('Running a comparison.');

        return _inquiryMonad.Inquiry.subject({ before: browsersBefore, now: browsersNow }).inquire(compareKeys).breakpoint(function (x) {
            var fails = x.fail.join();
            handleDiffBrowsers(fails);
            x.fail = (0, _inquiryMonad.Fail)([]); // re-init
            return _inquiryMonad.Inquiry.of(x);
        }).inquire(compareVersions).breakpoint(function (x) {
            var fails = x.fail.join();
            var notice = fails.reduce(function (prev, current) {
                var browserName = getBrowserName(current.key);
                prev += browserName + ' has introduced version(s): ' + current.diff.toString() + '.\n\n';
                return prev;
            }, '');

            if (notice.length) {
                email.send(notice);
                twitter.post(notice + ' #browsers #web #webdev');
            }

            x.fail = (0, _inquiryMonad.Fail)([]);
            return _inquiryMonad.Inquiry.of(x);
        }).chain(function (x) {
            return x.subject.join().now;
        });
    }).catch(function (err) {
        _logger2.default.error('Encountered an error.', err);
    });
};

exports.compare = compare;
exports.check = check;