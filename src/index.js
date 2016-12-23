import cron from 'node-cron';
import {compareCheck} from './lib/compare';

// every hour
cron.schedule('0 * * * *', compareCheck);

// first time run through.
compareCheck();
