'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _email = require('./email');

var email = _interopRequireWildcard(_email);

var _browsers = require('./browsers');

var _browsers2 = _interopRequireDefault(_browsers);

var _compare = require('./compare');

var _jasmine = require('jasmine');

var _jasmine2 = _interopRequireDefault(_jasmine);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The comparison functions', function () {
    it('should comapre two arrays for new browsers', function (done) {
        var initList = void 0;

        _browsers2.default.get().then(function (resp) {
            initList = resp;
            return _browsers2.default.get();
        }).then(function (newList) {
            newList.ie['somethingnew'] = 'u';

            var ieThen = (0, _keys2.default)(initList.ie);
            var ieNow = (0, _keys2.default)(newList.ie);

            var diffIe = (0, _compare.compare)(ieNow)(ieThen);
            expect(diffIe.length).toBe(1);
            expect(diffIe[0]).toBe('somethingnew');
            done();
        });
    });

    it('should check the browsers versions', function (done) {
        var browsersThen = void 0;

        spyOn(email, 'send').and.callFake(function (diff) {
            expect(diff).toEqual('Internet Explorer has introduced version 11.');
            done();
        });

        _browsers2.default.get().then(function (resp) {
            // lets fake the release of IE11
            delete resp.ie['11'];
            (0, _compare.check)(resp);
        });
    });

    it('should handle when a new browser key is introduced', function (done) {
        var browsersThen = void 0;

        spyOn(email, 'send').and.callFake(function (diff) {
            expect(diff).toEqual('A new browser has been introduced with the key: "and_qq".');
            done();
        });

        _browsers2.default.get().then(function (resp) {
            // lets fake the release of QQ Browser
            delete resp.and_qq;
            (0, _compare.check)(resp);
        });
    });
});