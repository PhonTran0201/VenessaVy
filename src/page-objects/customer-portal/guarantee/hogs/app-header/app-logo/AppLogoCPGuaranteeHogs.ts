import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AppLogoCP } from "../../../../general/app-header/app-logo/AppLogoCP";


/**
 * AppLogo: Logo on Header (Hogs, Atlas,...) 
 */
export class AppLogoCPGuaranteeHogs extends AppLogoCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}