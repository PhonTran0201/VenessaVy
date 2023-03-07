import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";
import { validateApproximateCurrency } from "../../../../../shared/tenant-setting/tenant-setting";


export class TerminatePolicyFormInsurance {
    constructor(protected driverService: SeleniumWebDriverService) { }

    private dtpEffectiveFrom = By.xpath("//input[@id='effectiveDate']");
    private cmbReason = By.xpath("//select[@id='reason']");
    private lblNewPremium = By.xpath("//span[@id='premium']");
    private btnTerminateInPopup = By.xpath("//*[contains(local-name(),'termination')]//button[contains(text(),'Terminate') and not (@disabled)]");
    private btnRecalculate = By.xpath("//button[text()=' Recalculate ' and not (@disabled)]")
    private lblCurrentPeriod = By.xpath("//*[contains(local-name(),'termination')]//label[contains(text(),'Current period')]//following-sibling::span");
    private lblCurrentPremium = By.xpath("//*[contains(local-name(),'termination')]//label[contains(text(),'Current premium')]//following-sibling::span");


    public async inputDataToTerminatePolicyForm(
        EffectiveFrom: string,
        Reason: string
    ): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpEffectiveFrom);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.dtpEffectiveFrom, EffectiveFrom);
            await this.driverService.click(this.cmbReason);
            await this.driverService.setText(this.cmbReason, Reason);
            await this.driverService.pressEnterCurrentElement();
            await this.driverService.waitForSeconds(5000);
            await this.driverService.click(this.btnRecalculate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            let txtErrorMessage = By.xpath("//app-policy-termination//div[contains(@class,'invalid-feedback')]");
            let len = (await this.driverService.findElements(txtErrorMessage)).length;
            if (len > 0) {
                logWarningMessage("Terminate policy form has error validation messages:");
                for (let i = 1; i <= len; i++) {
                    logWarningMessage("\t" + await this.driverService.getText(By.xpath(`(//app-policy-termination//div[contains(@class,'invalid-feedback')])[${i}]`)));
                }
                return false;
            }

            return true;
        } catch (error) {
            console.log("inputDataToTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCurrentPeriodTerminatePolicyForm(expectedValue: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCurrentPeriod);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            let actualValue = await this.driverService.getText(this.lblCurrentPeriod);
            let temp = await this.driverService.validateRecord(
                "Check Current Period",
                [actualValue, expectedValue, "Incorrect Current Period!"]
            );
            return temp;
        } catch (error) {
            console.log("validateCurrentPeriodTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCurrentPremiumTerminatePolicyForm(expectedValue: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCurrentPremium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            let actualValue = await this.driverService.getText(this.lblCurrentPremium);
            let temp = await this.driverService.validateRecord(
                "Check Current Premium",
                [actualValue, expectedValue, "Incorrect Current Premium!"]
            );
            return temp;
        } catch (error) {
            console.log("validateCurrentPremiumTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }

    public async validateNewPremiumTerminatePolicyForm(NewPremium: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblNewPremium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            let actualPremium = await this.driverService.getText(this.lblNewPremium);
            if (validateApproximateCurrency(NewPremium, actualPremium)) {
                return true;
            }
            let temp = await this.driverService.validateRecord(
                "Check New premium",
                [actualPremium, NewPremium, "Incorrect new premium!"]
            );
            return temp;
        } catch (error) {
            console.log("validateNewPremiumTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }

    public async clickTerminatePolicyAtTerminatePolicyForm(): Promise<boolean> {
        try {
            //Check new premium

            await this.driverService.waitUntilElementLoaded(this.btnTerminateInPopup);
            await this.driverService.click(this.btnTerminateInPopup);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await this.driverService.waitForSeconds(2000);
            return true;
        } catch (error) {
            console.log("clickTerminatePolicyAtTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }
}