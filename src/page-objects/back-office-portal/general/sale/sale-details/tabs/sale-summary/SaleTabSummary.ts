import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded } from "../../../../../../../shared/functions";


export class SaleTabSummary {
    // Elements Sale left side detail
    private lblDtStage = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Sales Stage']/following-sibling::*");


    constructor(private driverService: SeleniumWebDriverService) { }

    public async checkSelectingItemAtSaleProcessBar() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblDtStage);
            const actualStage = await this.driverService.getText(this.lblDtStage);
            let selectingItem = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-process//li[contains(@class,'nav-item-done') and contains(@class,'nav-item-active')]/div[text()='${actualStage}']`);
            await this.driverService.waitUntilElementLoaded(selectingItem);
            return true;
        } catch (error) {
            console.log("checkSelectingItemAtSaleProcessBar");
            console.log(error);
            return false;
        }
    }

    public async clickItemAtSaleProcessBar(stageName: string) {
        try {
            const item = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-process//li/div[text()='${stageName}']/following-sibling::div`);
            await this.driverService.waitUntilElementLoaded(item);
            await this.driverService.click(item);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("clickItemAtSaleProcessBar");
            console.log(error);
            return false;
        }
    }
}
