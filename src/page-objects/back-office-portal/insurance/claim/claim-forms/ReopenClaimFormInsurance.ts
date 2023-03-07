import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";

export class ReopenClaimFormInsurance extends BasePage {
    protected lblConfirmQuestion = By.xpath(`//app-claim-reopen-form//div[text()]`);
    protected txtReason = By.xpath(`//app-claim-reopen-form//textarea[@id='pgs-claim-form-claim-element-name']`);

    public async validateValueConfirmQuestion(expectedValue: string) {
        try {
            const element = await this.getFieldType(this.lblConfirmQuestion);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Confirm Question!',
                [actualValue, expectedValue, 'Incorrect Confirm Question!']);
        } catch (error) {
            console.log('validateValueConfirmQuestion');
            console.log(error);
            return false;
        }
    }

    public async inputReason(value: string) {
        try {
            const element = await this.getFieldType(this.txtReason);
            await element.setValue(value);
            return true;
        } catch (error) {
            console.log('inputReason');
            console.log(error);
            return false;
        }
    }
}