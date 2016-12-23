import {compareStable, compareCheck} from './compare';
import Promise from 'bluebird';

const caniuse = require('caniuse-api');
const stable = caniuse.getLatestStableBrowsers();

describe('The comparison functions', () => {

    it('should comapre two arrays for new browsers', () => {

        const stableNow = caniuse.getLatestStableBrowsers();
        stableNow.push('new browser');
        const diff = stableNow.reduce(compareStable, []);
        expect(diff.length).toBe(1);
    });
});
