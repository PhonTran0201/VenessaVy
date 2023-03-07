import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class ConsentForm {
    constructor(private driverService: SeleniumWebDriverService) { }


    public async validateConsentsCheckedOnConsentsForm(Name: string) {
        try {
            let attrIsChecked = By.xpath(`//app-compliance-customer-modal//tr[./td[contains(text(),'${Name}')]]//input`);
            await this.driverService.waitUntilElementLoaded(attrIsChecked);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            return await this.driverService.getAttributeValue(attrIsChecked, "checked") === 'true';
        } catch (error) {
            console.log("validateConsentsCheckedOnConsentsForm");
            console.log(error);
            return false;
        }
    }

    public async validateConsentsAllCheckedOnConsentsForm() {
        try {
            let attrIsChecked = By.xpath(`//app-compliance-customer-modal//th//input`);
            await this.driverService.waitUntilElementLoaded(attrIsChecked);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            return await this.driverService.getAttributeValue(attrIsChecked, "checked") === 'true';
        } catch (error) {
            console.log("validateConsentsAllCheckedOnConsentsForm");
            console.log(error);
            return false;
        }
    }

    public async tickConsentOnConsentForm(Name: string) {
        try {
            let cbxConsent = By.xpath(`//app-compliance-customer-modal//tr[./td[contains(text(),'${Name}')]]//span`);
            await this.driverService.waitUntilElementLoaded(cbxConsent);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(cbxConsent);
            return true;
        } catch (error) {
            console.log("tickConsentOnConsentForm");
            console.log(error);
            return false;
        }
    }


    public async validateLastUpdatedOnConsentsForm(Name: string, expectedValue) {
        try {
            let lblxpath = By.xpath(`//app-compliance-customer-modal//tr[./td[contains(text(),'${Name}')]]//td[3]`);
            await this.driverService.waitUntilElementLoaded(lblxpath);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let actualValue = await this.driverService.getText(lblxpath);
            //Maximize delay time is 3 minutes.
            if (actualValue.localeCompare(expectedValue) !== 0) {
                if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
                    expectedValue = actualValue;
                }
            }
            return await this.driverService.validateRecord("Assert Last Updated: ", [actualValue, expectedValue, "Incorrect Datetime!"]);
        } catch (error) {
            console.log("validateLastUpdatedOnConsentsForm");
            console.log(error);
            return false;
        }
    }

    public async validateUpdatedByOnConsentsForm(Name: string, expectedValue) {
        try {
            let lblxpath = By.xpath(`//app-compliance-customer-modal//tr[./td[contains(text(),'${Name}')]]//td[4]`);
            await this.driverService.waitUntilElementLoaded(lblxpath);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let actualValue = await this.driverService.getText(lblxpath);
            return this.driverService.validateRecord("Assert Updated Name: ", [actualValue, expectedValue, "Incorrect Updated Name!"]);
        } catch (error) {
            console.log("validateUpdatedByOnConsentsForm");
            console.log(error);
            return false;
        }
    }




}