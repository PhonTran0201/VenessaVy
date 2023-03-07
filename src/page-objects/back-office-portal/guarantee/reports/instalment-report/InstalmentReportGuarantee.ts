import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class InstalmentReports {
    constructor(private driverService: SeleniumWebDriverService) { };


    //only look for first ten Frame Agreement numbers
    public async openInstalmentBasedOnNumber(number: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-instalment-report-list`));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let temp = By.xpath(`//app-instalment-report-list//tr/td[1]//a[contains(text(),"${number}")]`);
            await this.driverService.waitUntilElementLoaded(temp);
            await this.driverService.click(temp);
            await this.driverService.waitForSeconds(3000);
            return true;
        } catch (error) {
            console.log(`openInstalmentBasedOnNumber`);
            console.log(error);
            return false;
        }
    }

    public async validatePostedDateInInstalmentReports(ExpectedValue: string) {
        try {
            let lblValue = By.xpath(`//app-instalment-form//formly-datepicker/div`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            if (ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase())) {
                ExpectedValue = ActualValue;
            }
            return await this.driverService.validateRecord(`Validate Posted date`, [ActualValue, ExpectedValue, `Incorrect Posted date`]);
        } catch (error) {
            console.log(`validatePostedDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateStartDateInInstalmentReports(ExpectedValue: string) {
        try {
            let lblValue = By.xpath(`//app-instalment-form//tbody//td[2]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Start date`, [ActualValue, ExpectedValue, `Incorrect Start date`]);
        } catch (error) {
            console.log(`validateStartDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateEndDateInInstalmentReports(ExpectedValue: string) {
        try {
            let lblValue = By.xpath(`//app-instalment-form//tbody//td[3]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate End date`, [ActualValue, ExpectedValue, `Incorrect End date`]);
        } catch (error) {
            console.log(`validateEndDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateAmountInInstalmentReports(ExpectedValue: string) {
        try {
            let lblValue = By.xpath(`//app-instalment-form//tbody//td[contains(text(),'Total')]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Amount`, [ActualValue, ExpectedValue, `Incorrect Amount`]);
        } catch (error) {
            console.log(`validateAmountOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateInstalmentAccountAfterSearch(accountName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-instalment-report-list`));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let allOptions = await this.driverService.findElements(By.xpath(`//app-instalment-report-list`));
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
            console.log(`validateInstalmentAccountAfterSearch`)
            console.log(error);
            return false;
        }
    }
}

