import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const logPath = 'logs';
// Create the logs directory if it does not exist
if (!existsSync(logPath)) {
    mkdirSync(logPath);
}

// tslint:disable: no-var-requires
const winston = require('winston');
require('winston-daily-rotate-file');

const errorTransport = new (winston.transports.DailyRotateFile)({
    level: 'error',
    filename: join(logPath, 'error-%DATE%.log'),
    datePattern: 'YYYY.MM.DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const debugTransport = new (winston.transports.DailyRotateFile)({
    level: 'debug',
    filename: join(logPath, 'debug-%DATE%.log'),
    datePattern: 'YYYY.MM.DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const myFormat = winston.format.printf(({ level, message, timestamp }: any) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat,
    ),
    transports: [
        errorTransport,
        debugTransport,
    ],
});

export function error(message: string) {
    logger.error(message);
}

export function warning(message: string) {
    logger.warning(message);
}

export function info(message: string) {
    logger.info(message);
}

export function debug(message: string) {
    logger.debug(message);
}
