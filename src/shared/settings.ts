import {Capabilities} from 'selenium-webdriver';

//setting chrome options to start the browser fully maximized
var chromeOptions = {
    'args': ['--no-sandbox, --disable-dev-shm-usage, --disable-gpu']
};
var capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', chromeOptions);

export const settings = {
    outputs: {
        path: 'outputs',
        screenShotPath: '/screenshot',
    },


    // We need to re-consider the config structure, in the future, we can run test once for all browsers: chrome, firex,..
    selenium: {
        serverUrl: 'http://localhost:4444/wd/hub',
        capabilities,
    },
    download: {
        default_directory: __dirname.substring(0, __dirname.lastIndexOf("pegasus-core-aut-crm") + "pegasus-core-aut-crm".length) + "\\downloads"
    }
};