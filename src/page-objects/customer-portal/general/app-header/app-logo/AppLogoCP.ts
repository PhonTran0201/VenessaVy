import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


/**
 * AppLogo: Logo on Header (Hogs, Atlas,...) 
 */
export class AppLogoCP {
    constructor(protected driverService: SeleniumWebDriverService) { }
    protected hrefLogo = By.xpath(`//app-header//img[@alt='Logo']`);

    public async pressLogoBrand() {
        try {
            await this.driverService.waitUntilElementLoaded(this.hrefLogo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.hrefLogo);
            return true;
        } catch (error) {
            console.log('pressLogoBrand');
            console.log(error);
            return false;
        }
    }

}