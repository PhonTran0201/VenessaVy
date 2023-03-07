import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class RiskCheckForm {

    constructor(private driverService: SeleniumWebDriverService) { }

    public async validateRiskFactorCheckedOnRiskCheckForm(riskFactorName: string) {
        try {
            let attrIsCheckedRiskFactor = By.xpath(`//app-customer-risk-check//div[./label[contains(text(),'${riskFactorName}')]]//input`);
            await this.driverService.waitUntilElementLoaded(attrIsCheckedRiskFactor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            return await this.driverService.getAttributeValue(attrIsCheckedRiskFactor, "checked") === 'true';
        } catch (error) {
            console.log("validateRiskFactorCheckedOnRiskCheckForm");
            console.log(error);
            return false;
        }
    }

    public async tickRiskFactorOnRiskCheckForm(riskFactorName: string) {
        try {
            let cbxRiskFactor = By.xpath(`//app-customer-risk-check//label[contains(text(),'${riskFactorName}')]`);
            await this.driverService.waitUntilElementLoaded(cbxRiskFactor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(cbxRiskFactor);
            return true;
        } catch (error) {
            console.log("tickRiskFactorOnRiskCheckForm");
            console.log(error);
            return false;
        }
    }

}