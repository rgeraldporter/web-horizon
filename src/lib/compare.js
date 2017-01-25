import * as email from './email';
import logger from './logger';
import browsers from './browsers';

const compare = val1 => val2 => val1.reduce(
    (prev, current) => ~val2.indexOf(current) ? prev : prev.concat([ current ]),
    []
);

const compareVersions = then => now => browserKeys => {
    browserKeys.forEach(key => {
        const versionsThen = Object.keys(then[key]);
        const versionsNow = Object.keys(now[key]);
        const diffVersions = compare(versionsNow)(versionsThen);
        const notice = diffVersions.reduce(
            (prev, current) => {
                const browserName = browsers.name[key].name;
                prev += `${browserName} has introduced version ${current}.`;
                return prev;
            },
            ''
        );
        notice.length && email.send(notice);
    });
};

const check = browsersThen => {
    return browsers
        .get()
        .then(resp => {
            const browsersNow = resp;
            logger.info('Running a comparison.');

            // 1. Check to see if any new browser types
            const browserKeysThen = Object.keys(browsersThen);
            const browserKeysNow = Object.keys(browsersNow);
            const diffBrowsers = compare(browserKeysNow)(browserKeysThen);
            diffBrowsers.length && email.send(diffBrowsers);

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