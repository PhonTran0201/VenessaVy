import * as dotenv from 'dotenv';
import { argv } from 'node:process';
import { logInfoMessage } from './functions';

export const env = () => {
    //dotenv.config();
    // argv.forEach((val, index) => {
    //     console.log(`${index}: ${val}`);
    // });
    let fileEnv = './uat.env';
    // if (argv[3].includes('@Staging')) {
    //     fileEnv = './staging.env';
    // } 
    fileEnv = './staging.env';
    //logInfoMessage(`\nfileEnv : ${argv}`);
    dotenv.config({path: fileEnv});
    //logInfoMessage(`\nRunning PID : ${process.pid}`);
    return {
        DEFAULT_URL: process.env.DEFAULT_URL ?? '',
        ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? '',
        RUN_ONLY_API: process.env.RUN_ONLY_API ?? 'false',
        API_DEFAULT_URL: process.env.API_DEFAULT_URL ?? '',
        API_DEFAULT_USERNAME: process.env.API_DEFAULT_USERNAME ?? '',
        API_DEFAULT_PASSWORD: process.env.API_DEFAULT_PASSWORD ?? '',
        API_DEFAULT_AUTH_CONTENT_TYPE_HEADER: process.env.API_DEFAULT_AUTH_CONTENT_TYPE_HEADER ?? '',
        API_DEFAULT_AUTH_X_AMZ_TARGET: process.env.API_DEFAULT_AUTH_X_AMZ_TARGET ?? '',
        API_DEFAULT_AUTH_DOMAIN: process.env.API_DEFAULT_AUTH_DOMAIN ?? '',
        API_DEFAULT_CLIENT_ID: process.env.API_DEFAULT_CLIENT_ID ?? '',
        API_DEFAULT_AUTHFLOW: process.env.API_DEFAULT_AUTHFLOW ?? '',
        API_DEFAULT_ACCEPT_HEADER: process.env.API_DEFAULT_ACCEPT_HEADER ?? '',
        API_DEFAULT_CONTENT_TYPE_HEADER: process.env.API_DEFAULT_CONTENT_TYPE_HEADER ?? '',
        ENVIRONMENT: process.env.ENVIRONMENT ?? '',
        DATA_FILE: `data/${process.env.ENVIRONMENT}_data.json` ?? '',
    }
}