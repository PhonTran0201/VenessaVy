import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class UnderwritingAdjustmentReasonForm {
    private txtUnderwritingAdjustmentReason = By.xpath("//app-underwriting-adjustment-reason//textarea[@id='reason']");
    private btnOk = By.xpath("//app-underwriting-adjustment-reason//button[@id='btn-ok']");
    constructor(private driverService: SeleniumWebDriverService) { }


    public async inputUnderwritingAdjustmentReason(Reason: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtUnderwritingAdjustmentReason);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtUnderwritingAdjustmentReason, Reason);
            return true;
        } catch (error) {
            console.log("inputUnderwritingAdjustmentReason");
            console.log(error);
            return false;
        }
    }

    public async validateValueUnderwritingAdjustmentReason(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtUnderwritingAdjustmentReason);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtUnderwritingAdjustmentReason, 'value');
            return await this.driverService.validateRecord("Validate ValueUnderwritingAdjustmentReason!",
                [actualValue, expectedValue, "Incorrect ValueUnderwritingAdjustmentReason!"]);
        } catch (error) {
            console.log('validateValueUnderwritingAdjustmentReason');
            console.log(error);
            return false;
        }
    }

    public async pressOkButton(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnOk);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnOk);
            return true;
        } catch (error) {
            console.log('pressOkButton');
            console.log(error);
            return false;
        }
    }
}