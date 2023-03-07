import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";


/**
 * Mouse, keyboard,...
 * Scope to access is all browser, that we don't need to implements from any interface
 */
export class GlobalPeripherals {
    constructor(protected driverService: SeleniumWebDriverService) { }

    // Press key board
    public async pressEnterCurrentElement() {
        try {
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("pressEnterCurrentElement\n" + error);
            return false;
        }
    }

    public async pressTabCurrentElement() {
        try {
            await this.driverService.pressTabCurrentElement();
            return true;
        } catch (error) {
            console.log("pressTabCurrentElement\n" + error);
            return false;
        }
    }

    public async pressPageUpCurrentElement() {
        try {
            await this.driverService.pressPageUpCurrentElement();
            return true;
        } catch (error) {
            console.log("pressPageUpCurrentElement\n" + error);
            return false;
        }
    }

    public async pressPageDownCurrentElement() {
        try {
            await this.driverService.pressPageDownCurrentElement();
            return true;
        } catch (error) {
            console.log("pressPageDownCurrentElement\n" + error);
            return false;
        }
    }

}