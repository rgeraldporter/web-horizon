import * as email from './email';
import logger from './logger';
import browsers from './browsers';
import twitter from './twitter';

const compare = val1 => val2 => val1.reduce(
    (prev, current) => ~val2.indexOf(current) ? prev : prev.concat([ current ]),
    []
);

// accounts for if a new browser comes out we don't have a name for...
const getBrowserName = key =>
    browsers.name[key]
        ? browsers.name[key].name
        : key;

const compareVersions = then => now => browserKeys => {
    browserKeys.forEach(key => {
        const versionsThen = then[key] ? Object.keys(then[key]) : {}; // in case its a new browser
        const versionsNow = Object.keys(now[key]);
        const diffVersions = compare(versionsNow)(versionsThen);
        const notice = diffVersions.reduce(
            (prev, current) => {
                const browserName = getBrowserName(key);
                prev += `${browserName} has introduced version ${current}.`;
                return prev;
            },
            ''
        );

        if (notice.length) {
            email.send(notice);
            twitter.post(notice + ' #browsers #web #webdev');
        }
    });
};

const handleDiffBrowsers = diff =>
    diff.forEach(
        browser => email.send('A new browser has been introduced with the key: "' + browser + '".')
    );

const check = browsersThen => {
    return browsers
        .get()
        .then(browsersNow  => {
            logger.info('Running a comparison.');

            // 1. Check to see if any new browser types
            const browserKeysThen = Object.keys(browsersThen);
            const browserKeysNow = Object.keys(browsersNow);
            const diffBrowsers = compare(browserKeysNow)(browserKeysThen);
            handleDiffBrowsers(diffBrowsers);

            // 2. Check each type for new versions
            compareVersions(browsersThen)(browsersNow)(browserKeysNow);

            // 3. Adopt new list via return
            return browsersNow;
        })
        .catch(err => {
            logger.error('Encountered an error.', err);
        });
};

export {compare, check}