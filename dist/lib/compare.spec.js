'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _compare = require('./compare');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _browsers = require('./browsers');

var _browsers2 = _interopRequireDefault(_browsers);

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
});