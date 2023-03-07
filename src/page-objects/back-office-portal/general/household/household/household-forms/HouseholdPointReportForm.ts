import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../../GlobalPageObject/GlobalDateTimeContainer";


export class HouseholdPointReportForm extends BasePage{
    protected dtpToDate = By.xpath(`//app-household-point-report-form//input[@id='pgs-household-to-date']`);

    public async inputCloseDateToSearchAndFilter(CloseDateTo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpToDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpToDate);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(CloseDateTo);
            return true;
        } catch (error) {
            console.log("inputCloseDateToSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async pressDownloadButtonByRow(){
        try {
            const btn = By.xpath(`//app-household-point-report-form//tbody//tr[1]/td//button[@id='pgs-household-download-btn']`);
            const element = await this.getFieldType(btn);
            await element.click();
            return true;
        } catch (error) {
            console.log('');
            console.log(error);
            return false;
        }
    }

    public async validateValueDocumentNameByRow(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`//app-household-point-report-form//tbody//tr[${positionRow}]/td[2]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Document Name!',
                [actualValue, expectedValue, 'Incorrect Document Name!']);
        } catch (error) {
            console.log('validateValueDocumentNameByRow');
            console.log(error);
            return false;
        }
    }
    public async validateValueCreatedDateByRow(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`//app-household-point-report-form//tbody//tr[${positionRow}]/td[3]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Created Date!',
                [actualValue, expectedValue, 'Incorrect Created Date!']);
        } catch (error) {
            console.log('validateValueCreatedDateByRow');
            console.log(error);
            return false;
        }
    }
}