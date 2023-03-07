import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { logFailMessage, selectDropdownOption } from "../../../../../../../shared/functions";
import { getNumberDecimalSeparator } from "../../../../../../../shared/tenant-setting/tenant-setting";

export class LogTimeForm extends BasePage {
    private txtStartDate = By.xpath(`//*[@id= 'pgs-worklog-worklog-start-date']`);
    private txtDuration = By.xpath(`//*[@id= 'pgs-worklog-worklog-duration']`);
    private cmbTypeOfDuration = By.xpath(`//ng-select//*[@id= 'pgs-worklog-worklog-time-type']`);
    private lblTypeOfDuration = By.xpath(`//ng-select[.//*[@id= 'pgs-worklog-worklog-time-type']]//span[contains(@class,'ng-value-label')]`);



    private txtDescription = By.xpath(`//*[@id= 'pgs-worklog-worklog-description']`);
    private btnSave = By.xpath(`//button[contains(@id, 'pgs-cus-per-save')]`);
    private requireDate = By.xpath(`//div[./label[contains(text(),'Date')]]//formly-validation-message[contains(text(),'This field is required')]`);
    private requireDuration = By.xpath(`//div[./label[contains(text(),'Duration')]]//formly-validation-message[contains(text(),'This field is required')]`);
    private requireCorrectDurationFormat = By.xpath(`//div[./label[contains(text(),'Duration')]]//formly-validation-message[contains(text(),'Please enter the correct duration')]`);


    public async inputStartDate(StartDate: string) {
        try {
            let element = await this.getFieldType(this.txtStartDate);
            await element.setValue(StartDate);
            return true;
        } catch (error) {
            console.log(`inputStartDate`);
            console.log(error);
            return false;
        }
    }

    public async inputDuration(Duration: string, TypeOfDuration: string) {
        try {
            if (Duration.includes(getNumberDecimalSeparator()) && TypeOfDuration.toLocaleLowerCase().localeCompare('hour') != 0) {
                logFailMessage("input incorrectly Type Of Duration!");
                return false;
            }
            let element = await this.getFieldType(this.txtDuration);
            await element.setValue(Duration);
            return true;
        } catch (error) {
            console.log(`inputDuration`);
            console.log(error);
            return false;
        }
    }

    public async inputTypeOfDuration(TypeOfDuration: string) {
        try {
            let element = await this.getFieldType(this.cmbTypeOfDuration);
            await element.setValue(TypeOfDuration);
            await selectDropdownOption(TypeOfDuration, "", this.driverService)
            return true;
        } catch (error) {
            console.log(`inputTypeOfDuration`);
            console.log(error);
            return false;
        }
    }

    public async inputDescription(description: string) {
        try {
            let element = await this.getFieldType(this.txtDescription);
            await element.setValue(description);
            return true;
        } catch (error) {
            console.log(`inputDescription`);
            console.log(error);
            return false;
        }
    }

    public async validateRequiredField() {
        try {
            await this.driverService.setText(this.txtStartDate, " ");
            await this.driverService.click(this.txtDuration);
            await this.driverService.click(this.btnSave);
            if (!(await this.driverService.isExisted(this.requireDate)) || !(await this.driverService.isExisted(this.requireDuration))) {
                return false;
            }
            await this.driverService.setText(this.txtDuration, "0");
            if (!(await this.driverService.isExisted(this.requireCorrectDurationFormat))) {
                return false;
            }
            await this.driverService.setText(this.txtDuration, ("1.5").replace(".", getNumberDecimalSeparator()));
            await this.driverService.setText(this.cmbTypeOfDuration, "Minute");
            await selectDropdownOption("Minute", "", this.driverService);
            if (!(await this.driverService.isExisted(this.requireCorrectDurationFormat))) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(`validateRequiredField`);
            console.log(error);
            return false;
        }
    }


    //#region Validate the value on form
    public async validateStartDate(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtStartDate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate start date: ", [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log('validateStartDate');
            console.log(error);
            return false;
        }
    }

    public async validateDuration(expectedValue: string, TypeOfDuration: string) {
        try {
            let duration: any = parseFloat(expectedValue);
            if (TypeOfDuration.toLocaleLowerCase().localeCompare('minute') === 0 && duration > 59) {
                duration = (duration / 60).toFixed(2);
            }
            let element = await this.getFieldType(this.txtDuration);
            let actualValue = parseFloat(await (await element.getValue()).replace(getNumberDecimalSeparator(), ".")).toFixed(2);
            return await this.driverService.validateRecord("Validate duration: ", [actualValue, duration, 'Incorrect value!']);
        } catch (error) {
            console.log('validateDuration');
            console.log(error);
            return false;
        }
    }


    public async validateTypeOfDuration(TypeOfDuration: string, Duration: string) {
        try {
            let duration: any = parseFloat(Duration);
            if (TypeOfDuration.toLocaleLowerCase().localeCompare('minute') === 0 && duration > 59) {
                TypeOfDuration = 'Hour';
            }
            let element = await this.getFieldType(this.lblTypeOfDuration);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Type Of Duration: ", [actualValue, TypeOfDuration, 'Incorrect value!']);
        } catch (error) {
            console.log('validateTypeOfDuration');
            console.log(error);
            return false;
        }
    }

    public async validateDescription(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtDescription);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Description: ", [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log('validateDescription');
            console.log(error);
            return false;
        }
    }
    //#endregion



} 