import cron from 'node-cron';
import {check} from './lib/compare';
import browsers from './lib/browsers';
import logger from './lib/logger';

let browsersThen;

const doCheck = () =>
    check(browsersThen).then(newBrowsers => {
        browsersThen = newBrowsers;
        logger.info('Updated to: ', browsersThen);
    });

// init
browsers.get().then(resp => {
    browsersThen = resp;
    cron.schedule('0 * * * *', doCheck);

    // first time run through.
    doCheck();
});