import mailgunMod from 'mailgun-js';
import logger from './logger';

require('dotenv').config();

const mailgunConig = {
    domain: 'sandbox6903d7f2aaef455a92d834c00c70b586.mailgun.org',
    apiKey: process.env.MAILGUN_KEY || null
};

const message = {
    from: 'WebHorizons.org Reports <no-reply@webhorizon.org>',
    to: 'browser-releases@googlegroups.com',
    subject: 'Horizons Browser Report'
};

const send = notice => {
    const mailgun = mailgunMod(mailgunConig);

    const emailMessage = Object.assign(message, { text: notice });
    notice &&
        mailgun.messages().send(emailMessage, (error, body) => {
            logger.info('Emailed: ', body);
        });
};

export { send };
