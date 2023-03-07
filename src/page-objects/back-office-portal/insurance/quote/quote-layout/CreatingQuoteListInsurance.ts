import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class CreatingQuoteListInsurance {
    constructor(protected driverService: SeleniumWebDriverService) { }
    private purchaseBtn = By.xpath('//*[@id="btn-purchase-po"]');

    public async clickPurchase() {
        try {
            await this.driverService.waitUntilElementLoaded(this.purchaseBtn);
            await this.driverService.click(this.purchaseBtn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}