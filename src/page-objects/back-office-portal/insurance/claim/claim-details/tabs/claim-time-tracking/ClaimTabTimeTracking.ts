import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../../../core/fields/ConfirmDialogManager";
import { LabelFieldManager } from "../../../../../../../core/fields/LabelFieldManager";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";
import { currencyToNumber, getCurrencyGroupSeparator, getNumberDecimalSeparator, numberToCurrency } from "../../../../../../../shared/tenant-setting/tenant-setting";

export class ClaimTimeTracking extends BasePage {
    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]";
    private tabTimeTracking = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[@title = 'Time Tracking']`);
    private btnLogTime = By.xpath(`${this.strRootXpath}//button[@id='create-customer-dropdown']`);
    private lblTotalTimeSPent = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-summary//*[contains(text(),'Total time spent:')]//b`);

    public async navidateToTimeTrackingTab() {
        try {
            let element = await this.getFieldType(this.tabTimeTracking);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`navidateToTimeTrackingTab`);
            console.log(error);
            return false;
        }
    }

    public async pressLogTimeButton() {
        try {
            let element = await this.getFieldType(this.btnLogTime);
            await element.click();
            await this.driverService.waitUntilElementVisible(By.xpath(`//app-worklog-form`));
            return true;
        } catch (error) {
            console.log(`pressLogTimeButton`);
            console.log(error);
            return false;
        }
    }

    public async getTotalTimeSpent() {
        try {
            let element = await this.getFieldType(this.lblTotalTimeSPent);
            return await (await element as LabelFieldManager).getValue();
        } catch (error) {
            console.log(`getTotalTimeSpent`);
            console.log(error);;
            return false;
        }
    }
    public async getDurationByRow(row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//app-worklog-time-spent-cell//div`));
            return await element.getValue();
        } catch (error) {
            console.log(`getDurationByRow`);
            console.log(error);
            return "";
        }
    }
    public async validateTotalTimeSpentOnLeftSide(expectedValue:string) {
        try {
            let element = await this.getFieldType(this.lblTotalTimeSPent);
            let actualValue =  await (await element as LabelFieldManager).getValue();
            return this.driverService.validateRecord("Validate Total Time Spent: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log(`getTotalTimeSpent`);
            console.log(error);;
            return false;
        }
    }

    //#region validate value on list
    public async validateUser(expectedValue: string, row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//app-worklog-user-cell//div`));
            let actualValue = await (element as LabelFieldManager).getValue();
            return await this.driverService.validateRecord('Validate User Name: ', [actualValue, expectedValue, 'Incorrect User!'])
        } catch (error) {
            console.log(`validateUser`);
            console.log(error);
            return false;
        }
    }

    public async validateDate(expectedValue: string, row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//td[3]//span`));
            let actualValue = await (element as LabelFieldManager).getValue();
            return await this.driverService.validateRecord('Validate Date Name: ', [actualValue, expectedValue, 'Incorrect Date!'])
        } catch (error) {
            console.log(`validateDate`);
            console.log(error);
            return false;
        }
    }

    public async validateDuration(expectedValue: string, row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//app-worklog-time-spent-cell//div`));
            let actualValue = await (element as LabelFieldManager).getValue();
            return await this.driverService.validateRecord('Validate Duration: ', [actualValue, expectedValue, 'Incorrect Duration!'])
        } catch (error) {
            console.log(`validateDuration`);
            console.log(error);
            return false;
        }
    }

    public async validateDescription(expectedValue: string, row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//td[5]//span`));
            let actualValue = await (element as LabelFieldManager).getValue();
            return await this.driverService.validateRecord('Validate Description: ', [actualValue, expectedValue, 'Incorrect Description!'])
        } catch (error) {
            console.log(`validateDescription`);
            console.log(error);
            return false;
        }
    }

    //#endregion


    //#region edit/delete by row
public async pressEditByRow(row:number){
    try {
        let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//button[.//i[contains(@class,'fa-edit')]]`));
        await element.click();
        return true;
    } catch (error) {
        console.log(`pressEditByRow`);
        console.log(error);
        return false;
    }
}

public async pressDeleteByRow(row:number){
    try {
        let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//tbody//tr[${row}]//button[@id='pgs-worklog-action-delete-btn']`));
        await element.click();
        const confirmDialog = new ConfirmDialogManager(this.driverService);
        await confirmDialog.confirm("Yes");
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
        return true;
    } catch (error) {
        console.log(`pressDeleteByRow`);
        console.log(error);
        return false;
    }
}
    //#endregion

    /**
     * 
     * @param Duration : Total duration ex: "119" (minutes)
     * @param TimeUnit : the Unit of Duration ex: Minute || Hour
     * @returns 1 Hour 59 Minutes 
     */
    public async formatDurationTime(Duration: string, TimeUnit: string = "Minute") {
        let TotalMinutes = parseFloat(Duration.replace(getNumberDecimalSeparator(), "."));
        if (TimeUnit.toLocaleLowerCase().localeCompare('hour') === 0) {
            TotalMinutes = TotalMinutes * 60;
        }
        let hours = Math.floor(TotalMinutes / 60);
        let minutes = TotalMinutes % 60;

        let formatHour = hours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, getCurrencyGroupSeparator()) + " Hour";
        let formatMinutes = minutes + " Minute";

        if (hours > 1) {
            formatHour += "s";
        } else if (hours < 1) {
            formatHour = "";
        }

        if (minutes > 1) {
            formatMinutes += "s";
        } else if (minutes < 1) {
            formatMinutes = "";
        }

        return (formatHour + " " + formatMinutes).trim();
    }

    /**
     * 
     * @param TotalTime ex:           1 Hour 59 Minutes || 2 Hours || 59 Minutes
     * @returns convert to minutes ex: 119 (minutes)    || 120     || 59
     */
    public async convertDurationTimeToTotalMinutes(TotalTime: string = "1 Hour 59 Minutes") {
        let hours: number = 0, minutes: number = 0
        if (TotalTime.includes("Hour") && TotalTime.includes("Minute")) {
            hours = currencyToNumber(TotalTime.split("Hour")[0]);
            minutes = currencyToNumber(TotalTime.split("Hour")[1].match(/\d+/g));
        } else if (TotalTime.includes("Hour") && !TotalTime.includes("Minute")) {
            hours = currencyToNumber(TotalTime.match(/\d+/g));
        } else {
            minutes = currencyToNumber(TotalTime.match(/\d+/g));
        }
        return ((hours * 60) + minutes);
    }


}