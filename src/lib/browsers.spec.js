import browsers from './browsers.js';
import Promise from 'bluebird';

describe('The browser value', () => {
    it('should exist', done => {
        browsers
            .get()
            .then(list => {
                expect(list.ie['10']).toBe('u');
                done();
            })
            .catch(err => {
                console.error('err', err);
            });
    });
});
