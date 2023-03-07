import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AppLogoCP } from "../../../../customer-portal/general/app-header/app-logo/AppLogoCP";


/**
 * AppLogo: Logo on Header (Hogs, Atlas,...) 
 */
export class AppLogoAGS extends AppLogoCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}