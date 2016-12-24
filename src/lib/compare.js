import { email } from './email';
import logger from './logger';
import browsers from './browsers';

const compare = val1 => val2 => val1.reduce((prev, current) =>
    ~val2.indexOf(current) ? prev : prev.concat([current]),
    []
);

const check = browsersThen => {
    let browsersNow;
    browsers.get()
        .then(resp => {
            browsersNow = resp;
            // 1. Check to see if any new browser types
            const browserKeysThen = Object.keys(browsersThen);
            const browserKeysNow = Object.keys(browsersNow);
            const diffBrowsers = compare(browserKeysNow)(browserKeysThen);
            console.log('diffBrowsers', diffBrowsers);
            diffBrowsers.length && email(diffBrowsers);
            // 2. Check each type for new versions
            browserKeysNow.map((key, index) => {
                const versionsThen = Object.keys(browsersThen[key]);
                const versionsNow = Object.keys(browsersNow[key]);
                const diffVersions = compare(versionsNow)(versionsThen);
                console.log('diffVersions', diffVersions);
                diffVersions.length && email(diffVersions);
            });
            // 3. Adopt new list via return
            return browsersNow;
        });
};

export { compare, check };
