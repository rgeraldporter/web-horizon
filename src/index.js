import cron from 'node-cron';
import {check} from './lib/compare';
import browsers from './lib/browsers';

let browsersThen;

const doCheck = () => check(browsersThen);

// init
browsers.get()
    .then(resp => {
        browsersThen = resp;
        cron.schedule('0 * * * *', doCheck);

        // first time run through.
        doCheck();
    });
