import Promise from 'bluebird';
import bhttp from 'bhttp';

const dataUrl =
    'https://raw.githubusercontent.com/Fyrd/caniuse/master/sample-data.json';

const get = () =>
    Promise.try(() => bhttp.get(dataUrl)).then(
        response => JSON.parse(response.body.toString()).stats
    );

const name = {
    ios_saf: {
        name: 'Mobile Safari'
    },
    ie: {
        name: 'Internet Explorer'
    },
    edge: {
        name: 'Microsoft Edge'
    },
    firefox: {
        name: 'Firefox'
    },
    chrome: {
        name: 'Chrome'
    },
    safari: {
        name: 'Safari'
    },
    opera: {
        name: 'Opera'
    },
    op_mini: {
        name: 'Opera Mini'
    },
    android: {
        name: 'Android Browser'
    },
    bb: {
        name: 'BlackBerry Browser'
    },
    op_mob: {
        name: 'Opera Mobile'
    },
    and_chr: {
        name: 'Android Chrome'
    },
    and_ff: {
        name: 'Android Firefox'
    },
    ie_mob: {
        name: 'Internet Explorer Mobile'
    },
    and_uc: {
        name: 'Android UC Browser'
    },
    samsung: {
        name: 'Samsung Browser'
    },
    and_qq: {
        name: 'Android QQ Browser'
    },
    baidu: {
        name: 'Baidu Browser'
    }
};

export default { get, name };
