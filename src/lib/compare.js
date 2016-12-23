import { email } from './email';

const caniuse = require('caniuse-api');

const stable = caniuse.getLatestStableBrowsers();

const compareCheck = () => {
    const stableNow = caniuse.getLatestStableBrowsers();
    console.log('comparing...');
    const diff = stableNow.reduce(compareStable, []);
    console.log('compared diff', diff);
    return diff.length ? email(diff) : null;
};

const compareStable = (prev, current) => 
        ~stable.indexOf(current) ? prev : prev.concat([current]);

export { compareStable, compareCheck };
