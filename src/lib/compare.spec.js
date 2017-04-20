import Promise from 'bluebird';
import * as email from './email';
import browsers from './browsers';
import {compare, check} from './compare';
import jasmine from 'jasmine';

describe('The comparison functions', () => {
    it('should comapre two arrays for new browsers', done => {
        let initList;

        browsers
            .get()
            .then(resp => {
                initList = resp;
                return browsers.get();
            })
            .then(newList => {
                newList.ie['somethingnew'] = 'u';

                const ieThen = Object.keys(initList.ie);
                const ieNow = Object.keys(newList.ie);

                const diffIe = compare(ieNow)(ieThen);
                expect(diffIe.length).toBe(1);
                expect(diffIe[0]).toBe('somethingnew');
                done();
            });
    });

    it('should check the browsers versions', done => {
        let browsersThen;

        spyOn(email, 'send').and.callFake(diff => {
            expect(diff).toEqual('Internet Explorer has introduced version 11.');
            done();
        });

        browsers.get().then(resp => {
            // lets fake the release of IE11
            delete resp.ie['11'];
            check(resp);
        });
    });

    it('should handle when a new browser key is introduced', done => {
        let browsersThen;

        spyOn(email, 'send').and.callFake(diff => {
            expect(diff).toEqual('A new browser has been introduced with the key: "and_qq".');
            done();
        });

        browsers.get().then(resp => {
            // lets fake the release of QQ Browser
            delete resp.and_qq;
            check(resp);
        });
    });
});