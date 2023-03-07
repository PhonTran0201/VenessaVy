import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AppTopRightMenuCP } from "../../../../general/app-header/app-top-right-menu/AppTopRightMenuCP";

/**
 * AppTopRightMenu: App Top rigth menu contains: Language, Agent Name, User profile
 */
export class AppTopRightMenuCPGuaranteeAtlas extends AppTopRightMenuCP {


    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}