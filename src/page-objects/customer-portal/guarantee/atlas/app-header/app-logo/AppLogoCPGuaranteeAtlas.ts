import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AppLogoCP } from "../../../../general/app-header/app-logo/AppLogoCP";


/**
 * AppLogo: Logo on Header (Hogs, Atlas,...) 
 */
export class AppLogoCPGuaranteeAtlas extends AppLogoCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}