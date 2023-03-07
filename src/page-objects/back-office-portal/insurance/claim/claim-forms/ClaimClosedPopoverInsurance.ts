import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";

export class ClaimClosedPopoverInsurance extends BasePage{
    private lblTitle = By.xpath(`//ngb-popover-window//h3/b`);
    private lblResolution = By.xpath(`//ngb-popover-window//div[./span[text()=' Resolution: ']]/span[2]`);
    private lblActionDate = By.xpath(`//ngb-popover-window//div[./span[text()=' Action date: ']]/span[2]`);
    private lblDateClaimsPaid = By.xpath(`//ngb-popover-window//div[./span[text()=' Date Claims Paid (Final): ']]/span[2]`);
    private lblDateFeesPaid = By.xpath(`//ngb-popover-window//div[./span[text()=' Date Fees Paid (Final): ']]/span[2]`);
    private lblComment = By.xpath(`//ngb-popover-window//div[./span[text()=' Comment: ']]/span[2]`);

    public async validateValueTitle(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblTitle);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Title!',
                [actualValue, expectedValue, 'Incorrect Title!']);
        } catch (error) {
            console.log('validateValueTitle');
            console.log(error);
            return false;
        }
    }
    public async validateValueResolution(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblResolution);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Resolution!',
                [actualValue, expectedValue, 'Incorrect Resolution!']);
        } catch (error) {
            console.log('validateValueResolution');
            console.log(error);
            return false;
        }
    }
    public async validateValueActionDate(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblActionDate);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Action Date!',
                [actualValue, expectedValue, 'Incorrect Action Date!']);
        } catch (error) {
            console.log('validateValueActionDate');
            console.log(error);
            return false;
        }
    }
    public async validateValueDateClaimsPaid(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblDateClaimsPaid);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Date Claims Paid!',
                [actualValue, expectedValue, 'Incorrect Date Claims Paid!']);
        } catch (error) {
            console.log('validateValueDateClaimsPaid');
            console.log(error);
            return false;
        }
    }
    public async validateValueDateFeesPaids(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblDateFeesPaid);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Date Fees Paid!',
                [actualValue, expectedValue, 'Incorrect Date Fees Paid!']);
        } catch (error) {
            console.log('validateValueDateFeesPaids');
            console.log(error);
            return false;
        }
    }
    public async validateValueComment(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblComment);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Comment!',
                [actualValue, expectedValue, 'Incorrect Comment!']);
        } catch (error) {
            console.log('validateValueComment');
            console.log(error);
            return false;
        }
    }
}