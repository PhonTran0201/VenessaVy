import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../../shared/functions";

export class AddMemberHouseholdForm extends BasePage{
    protected cmbCustomerName = By.xpath(`//app-add-household-member-form//input[@id='pgs-household-form-name']`);
    public async inputCustomerName(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCustomerName);
            await this.driverService.setText(this.cmbCustomerName, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('inputCustomerName');
            console.log(error);
            return false;
        }
    }
}