import { Builder } from 'selenium-webdriver';
import { settings } from '../shared/settings';
import { DownloadFilePathGlobalVariable } from '../shared/variables';

let chrome = require('selenium-webdriver/chrome');
export class Utilities {

    public static createSeleniumDriverSession() {

        if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) { //Build on Jenkins
            return new Builder().forBrowser('chrome')
                // Enable to use remote selenium hub.
                .usingServer(settings.selenium.serverUrl)
                .withCapabilities(settings.selenium.capabilities)
                .setChromeOptions(new chrome.Options()
                    .setUserPreferences({
                        'download.prompt_for_download': false,
                        'directory_upgrade': true,
                        'safebrowsing.enabled': true,
                        'profile.default_content_settings.popups': false,
                        'credentials_enable_service': false
                    }))
                .build();

        } else { //Build on local
            return new Builder().forBrowser('chrome')
                // Enable to use remote selenium hub.
                .withCapabilities(settings.selenium.capabilities)
                // .setChromeOptions(new chrome.Options()
                //     .setUserPreferences({ 'download.default_directory': `${DownloadFilePathGlobalVariable}` }))
                .build();
        }
    }

}