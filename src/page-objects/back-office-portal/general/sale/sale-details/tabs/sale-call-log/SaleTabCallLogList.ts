import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../../../core/fields/ConfirmDialogManager";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";
import { getNumberDecimalSeparator } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { ClaimTimeTracking } from "../../../../../insurance/claim/claim-details/tabs/claim-time-tracking/ClaimTabTimeTracking";

export class SaleTabCallLogList extends ClaimTimeTracking {
    protected strRootPath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]"
    private tabCallLog = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[@title='Call Log']`);
    public async navigateToCallLogTab() {
        try {
            let element = await this.getFieldType(this.tabCallLog);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async validateCallerValue(expectedValue: string, position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-1-row-${position}')]`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate Caller: ", [actualValue, expectedValue, "Incorrect Caller!"]);
        } catch (error) {
            console.log(`validateCallerValue`);
            console.log(error);
            return false;
        }
    }

    async validateResultValue(expectedValue: string, position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-2-row-${position}')]`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate Result: ", [actualValue, expectedValue, "Incorrect Result!"]);
        } catch (error) {
            console.log(`validateResultValue`);
            console.log(error);
            return false;
        }
    }

    async validateDateAndTimeValue(expectedValue: string, position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-4-row-${position}')]`));
            let actualValue = await ele.getValue();
            if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
                expectedValue = actualValue;
            }
            return await this.driverService.validateRecord("Validate Date And Time: ", [actualValue, expectedValue, "Incorrect Date And Time!"]);
        } catch (error) {
            console.log(`validateDateAndTimeValue`);
            console.log(error);
            return false;
        }
    }

    async validateNumberValue(expectedValue: string, position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-3-row-${position}')]`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate Number: ", [actualValue, expectedValue, "Incorrect Number!"]);
        } catch (error) {
            console.log(`validateNumberValue`);
            console.log(error);
            return false;
        }
    }

    async validateDurationValue(expectedValue: string, TypeOfDuration: string, position: number = 0) {
        try {
            let Duration = await this.formatDurationTime(expectedValue, TypeOfDuration);
            let element = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-5-row-${position}')]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate duration: ", [actualValue, Duration, 'Incorrect Duration!']);
        } catch (error) {
            console.log('validateDuration');
            console.log(error);
            return false;
        }
    }

    async validateCallLogList(
        Caller: string,
        Result: string,
        DateAndTime: string,
        NumberPhone: string,
        Duration: string,
        TypeOfDuration: string,
        position: number = 0) {
        try {
            if (
                await this.validateCallerValue(Caller, position) &&
                await this.validateResultValue(Result, position) &&
                await this.validateDateAndTimeValue(DateAndTime, position) &&
                await this.validateNumberValue(NumberPhone, position) &&
                await this.validateDurationValue(Duration, TypeOfDuration, position)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateCallLogList`);
            console.log(error);
            return false;
        }
    }


    public async editCallLogByRow(position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-0-row-${position}')]//button[./i[contains(@class,'fa-edit')]]`));
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`editCallLogByRow`);
            console.log(error);
            return false;
        }
    }

    public async deleteCallLogByRow(position: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-0-row-${position}')]//button[./i[contains(@class,'fa-trash')]]`));
            await ele.click();
            const confirmDialog = new ConfirmDialogManager(this.driverService);
            await confirmDialog.confirm("Yes");
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`deleteCallLogByRow`);
            console.log(error);
            return false;
        }
    }

    async validateActionButtonDisabled() {
        try {
            let btnEdit = By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-0-row-0')]//button[./i[contains(@class,'fa-edit')] and @disabled]`);
            let btnDelete = By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-0-row-0')]//button[./i[contains(@class,'fa-trash')] and @disabled]`);
            if (await this.driverService.isExisted(btnEdit) && await this.driverService.isExisted(btnDelete)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateActionButtonDisabled`);
            console.log(error);
            return false;
        }
    }

    async moveMouseToDeleteCallLogButton(positionRow:number = 0){
        try {
            let ele  = By.xpath(`${this.strRootPath}//app-sale-call-logs//tbody//td[contains(@id,'column-0-row-${positionRow}')]//button[./i[contains(@class,'fa-trash')]]`);
            await this.driverService.mouseHover(ele);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`moveMouseToDeleteCallLogButton`);
            console.log(error);
            return false;
        }
    }
    async validateTooltipWindow(message: string) {
        try {
            let tooltipXpath = By.xpath(`//ngb-tooltip-window//*[contains(text(),'${message}')]`);
            if (await this.driverService.isExisted(tooltipXpath)) {
                return true;
            } return false;
        } catch (error) {
            console.log(`validateTooltipWindow`);
            console.log(error);
            return false;
        }
    }
}

