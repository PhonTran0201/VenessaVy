import { By } from "selenium-webdriver";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { AccountForm } from "../../account/account-forms/AccountForm";

export class CustomerAttachForm extends AccountForm {
    public tabNewCustomer = By.xpath(`//*[contains(local-name(),'form')]//a[contains(@title,'New customer')]`);
    public tabExistingCustomer = By.xpath(`//*[contains(local-name(),'form')]//a[contains(@title,'Existing customer')]`);
    public txtAccountSearch = By.xpath(`//app-customer-attach-form//div[./label[text()=' Account ']]//div[@id]//input`);
    public btnClealAllAccountSearch = By.xpath(`//app-customer-attach-form//div[./label[text()=' Account ']]//div[@id]//span[@title ='Clear all']`)
    public async clickNewCustomerTab() {
        try {
            let ele = await this.getFieldType(this.tabNewCustomer);
            await ele.click();
            await this.driverService.waitUntilElementVisible(this.txtNIN);
            return true;
        } catch (error) {
            console.log(`clickNewCustomerTab`);
            console.log(error);
            return false;
        }

    }
    public async clickExistingCustomerTab() {
        try {
            let ele = await this.getFieldType(this.tabExistingCustomer);
            await ele.click();
            await this.driverService.waitUntilElementVisible(this.txtAccountSearch);
            return true;
        } catch (error) {
            console.log(`clickExistingCustomerTab`);
            console.log(error);
            return false;
        }

    }
    public async inputAccounttoSearchExistingCustomer(valueInput: string, ExpectedOption: string) {
        try {
            let ele = await this.getFieldType(this.txtAccountSearch);
            await ele.setValue(valueInput);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(ExpectedOption, "", this.driverService);
            await this.driverService.waitUntilElementVisible(this.txtNIN);
            return true;
        } catch (error) {
            console.log(`inputAccounttoSearchExistingCustomer`);
            console.log(error);
            return false;
        }
    }

    public async clearAccountSearchField() {
        try {
            let ele = await this.getFieldType(this.btnClealAllAccountSearch);
            await ele.click();
            await this.driverService.waitForElementInVisible(this.txtNIN);
            return true
        } catch (error) {
            console.log(`clearAccountSearchField`);
            console.log(error);
            return false;
        }
    }
}