import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class FrameAgreementReports {
    constructor(private driverService: SeleniumWebDriverService) { };


    //only look for first ten Frame Agreement numbers
    public async openFrameAgreementBasedOnNumber(number: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-frame-agreement-report-list`));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let temp = By.xpath(`//app-frame-agreement-report-list//tr/td[1]//a[contains(text(),"${number}")]`);
            await this.driverService.waitUntilElementLoaded(temp);
            await this.driverService.click(temp);
            await this.driverService.waitForSeconds(3000);
            return true;
        } catch (error) {
            console.log(`openFrameAgreementBasedOnNumber`);
            console.log(error);
            return false;
        }
    }

    public async validateFrameAgreementAccountAfterSearch(accountName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-report-customer-column`));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let allOptions = await this.driverService.findElements(By.xpath(`//app-report-customer-column`));
            let tempArr: string[] = []
            for (const option of await allOptions) {
                tempArr.push(await option.getText());
            };
            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] == accountName) {
                    return true;
                }
            }
            return false
        } catch (error) {
            console.log(`validateFrameAgreementAccountAfterSearch`)
            console.log(error);
            return false;
        }
    }



}