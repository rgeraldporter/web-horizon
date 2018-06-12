import cron from 'node-cron';
import { check } from './lib/compare';
import browsers from './lib/browsers';
import logger from './lib/logger';
import storage from 'node-persist';

require('dotenv').config();

storage.initSync();

const doCheck = () =>
    check(storage.getItemSync('browsers')).then(newBrowsers => {
        storage.setItemSync('browsers', newBrowsers);
    });

// @todo switch to cache via storage like songster does for settings
// init
browsers.get().then(resp => {
    storage.setItemSync('browsers', resp);
    cron.schedule('0 * * * *', doCheck);

    // first time run through.
    doCheck();
});
