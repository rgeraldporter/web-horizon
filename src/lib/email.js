import mailgunMod from 'mailgun-js';
import logger from './logger';

const mailgunConig = {
    domain: 'sandbox6903d7f2aaef455a92d834c00c70b586.mailgun.org',
    apiKey: process.env.MAILGUN_KEY || null
};

const message = {
    from: 'Web-Horizons <rob@inpictures.ca>',
    to: 'rob@weeverapps.com',
    subject: 'Horizons Browser Report'
};

const send = diff => {

    const mailgun = mailgunMod(mailgunConig);

    const emailMessage = Object.assign(message, {text: diff.toString()})
    diff && mailgun.messages().send(emailMessage, (error, body) => {
        logger.info('Emailed: ', body);
    });
};

export {send};
