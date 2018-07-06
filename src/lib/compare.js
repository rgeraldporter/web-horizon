import * as email from './email';
import logger from './logger';
import browsers from './browsers';
import * as twitter from './twitter';
import { Inquiry, InquiryP, Pass, Fail } from 'inquiry-monad';

const compare = val =>
    val.now.reduce(
        (acc, current) =>
            ~val.before.indexOf(current) ? acc : acc.concat([current]),
        []
    );

const compareKeys = val => {
    logger.info('compareKeys val', val);
    const browserKeysBefore = Object.keys(val.before);
    const browserKeysNow = Object.keys(val.now);

    const diffKeys = compare({
        now: browserKeysNow,
        before: browserKeysBefore
    });

    return diffKeys.length
        ? Fail(diffKeys)
        : Pass('Browser keys are identical');
};

// accounts for if a new browser comes out we don't have a name for...
const getBrowserName = key =>
    browsers.name[key] ? browsers.name[key].name : key;

const compareVersions = val => {
    const browserKeysNow = Object.keys(val.now);
    const now = val.now;
    const before = val.before;

    const diff = browserKeysNow.reduce((acc, key) => {
        const versionsBefore = before[key] ? Object.keys(before[key]) : []; // in case its a new browser
        const versionsNow = Object.keys(now[key]);
        const diffVersions = compare({
            now: versionsNow,
            before: versionsBefore
        });
        return diffVersions.length
            ? acc.concat([{ key, diff: diffVersions }])
            : acc;
    }, []);

    return diff.length ? Fail(diff) : Pass(`No new browser versions`);
};

const handleDiffBrowsers = diff =>
    diff.forEach(browser =>
        email.send(
            'A new browser has been introduced with the key: "' + browser + '".\n\n'
        )
    );

const check = browsersBefore => {
    return browsers
        .get()
        .then(browsersNow => {
            logger.info('Running a comparison.');

            return Inquiry.subject({ before: browsersBefore, now: browsersNow })
                .inquire(compareKeys)
                .breakpoint(x => {
                    const fails = x.fail.join();
                    handleDiffBrowsers(fails);
                    x.fail = Fail([]); // re-init
                    return Inquiry.of(x);
                })
                .inquire(compareVersions)
                .breakpoint(x => {
                    const fails = x.fail.join();
                    const notice = fails.reduce((prev, current) => {
                        const browserName = getBrowserName(current.key);
                        prev += `${browserName} has introduced version(s): ${current.diff.toString()}.\n\n`;
                        return prev;
                    }, '');

                    if (notice.length) {
                        email.send(notice);
                        twitter.post(notice + ' #browsers #web #webdev');
                    }

                    x.fail = Fail([]);
                    return Inquiry.of(x);
                })
                .chain(x => x.subject.join().now);
        })
        .catch(err => {
            logger.error('Encountered an error.', err);
        });
};

export { compare, check };
