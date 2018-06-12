import winston from 'winston';

require('winston-papertrail').Papertrail;

const winstonPapertrail = new winston.transports.Papertrail({
    host: process.env.PAPERTRAIL_HOST || 'fakeurl.com',
    port: process.env.PAPERTRAIL_PORT || 12345
});

const logger = new winston.Logger({ transports: [winstonPapertrail] });

export default logger;
