import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AppNavigationCP } from "../../../../general/app-header/app-navigation/AppNavigationCP";


/**
 * AppNavigation: Navigation bar contains menu buttons: Frame agreements, Applications, Guarantees,...
 */
export class AppNavigationCPGuaranteeAtlas extends AppNavigationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}