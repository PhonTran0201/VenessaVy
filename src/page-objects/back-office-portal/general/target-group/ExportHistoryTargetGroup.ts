import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded } from "../../../../shared/functions";

export class ExportHistoryTargetGroup extends BasePage {
    public async getNameValueByRow(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-export-history//tbody//tr[${positionRow}]//td[1]`));
            return await element.getValue();
        } catch (error) {
            console.log(`getNameValueByRow`);
            console.log(error);
            return "";
        }
    }

    public async validateCreatedDateValue(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-export-history//tbody//tr[${positionRow}]//td[2]`));
            let actualValue = await element.getValue();
            if (actualValue.localeCompare(expectedValue) !== 0) {
                if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
                    expectedValue = actualValue;
                }
            }
            return await this.driverService.validateRecord("Validate created date: ", [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log(`validateCreatedDateValue`);
            console.log(error);
            return false;
        }
    }

    public async downloadExportDocument(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-export-history//tbody//tr[${positionRow}]//td[3]//button`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`downloadExportDocument`);
            console.log(error);
            return false;
        }
    }

    public async closeExportHistoryForm() {
        try {
            let element = await this.getFieldType(By.xpath(`//app-export-history//*[@id='close-btn']`));
            await element.click();
            return true;
        } catch (error) {
            console.log(`closeExportHistoryForm`);
            console.log(error);
            return false;
        }
    }

}