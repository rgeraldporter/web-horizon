import Promise from 'bluebird';
import bhttp from 'bhttp';

const dataUrl = 'https://raw.githubusercontent.com/Fyrd/caniuse/master/sample-data.json';

const get = () => Promise
    .try(() => bhttp.get(dataUrl))
    .then(response => JSON.parse(response.body.toString()).stats);

export default { get }