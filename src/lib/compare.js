import { email } from './email';
import logger from './logger';

const caniuse = require('caniuse-api');
const stable = caniuse.getLatestStableBrowsers();

const compareCheck = () => {
    const stableNow = caniuse.getLatestStableBrowsers();
    const diff = stableNow.reduce(compareStable, []);
    logger.info('compared diff', diff);
    return diff.length ? email(diff) : null;
};

const compareStable = (prev, current) => 
        ~stable.indexOf(current) ? prev : prev.concat([current]);

export { compareStable, compareCheck };
