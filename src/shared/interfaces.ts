import { WebDriver } from 'selenium-webdriver';
import { SeleniumWebDriverService } from '../core/selenium-webdriver.service';

export interface ICommonContext {
    driver: WebDriver;
    driverService: SeleniumWebDriverService;
}
