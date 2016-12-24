import {compare, compareCheck} from './compare';
import Promise from 'bluebird';
import browsers from './browsers';

describe('The comparison functions', () => {

    it('should comapre two arrays for new browsers', done => {

        let initList;

        browsers.get()
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
});
