import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AppNavigationCP } from "../../../../customer-portal/general/app-header/app-navigation/AppNavigationCP";


/**
 * AppNavigation: Navigation bar contains menu buttons: Frame agreements, Applications, Guarantees,...
 */
export class AppNavigationAGS extends AppNavigationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}