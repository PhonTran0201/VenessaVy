import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded } from "../../../../../../shared/functions";

export class SelectACurrencyForm extends BasePage {
    private btnSelect = By.xpath(`//app-generate-summary-form//button[contains(text(),'Select') and not(@disabled])`);
    private btnCancel = By.xpath(`//app-generate-summary-form//button[contains(text(),'Cancel') and not(@disabled])`);
    private statusRadioCurrency = By.xpath(`//app-generate-summary-form//input[@type='radio']`);
    private lblRadioCurrency = By.xpath(`//app-generate-summary-form//label[.//input[@type='radio']]`);


    public async ticktoSelectACurrency() {
        try {
            await this.driverService.waitUntilElementVisible(this.lblRadioCurrency);
            await this.driverService.click(this.lblRadioCurrency);
            await this.driverService.waitForSeconds(500);
            return true;
        } catch (error) {
            console.log('ticktoSelectACurrency');
            console.log(error);
            return false;
        }
    }
    
    public async pressSelectButton() {
        try {
            let btn = await this.getFieldType(this.btnSelect);
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressSelectButton');
            console.log(error);
            return false;
        }
    }

    public async pressCancelButton() {
        try {
            let btn = await this.getFieldType(this.btnCancel);
            await btn.click();
            return true;
        } catch (error) {
            console.log('pressCancelButton');
            console.log(error);
            return false;
        }
    }
}