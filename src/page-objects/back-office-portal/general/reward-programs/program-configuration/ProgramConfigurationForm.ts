import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ProgramConfigurationForm extends BasePage {
    private txtName = By.xpath(`//*[@id='pgs-loyalty-program-name']`);
    private dtpStartDate = By.xpath(`//*[@id='pgs-loyalty-program-start-date']`);
    private dtpEndDate = By.xpath(`//*[@id='pgs-loyalty-program-end-date']`);
    private cmbNotificationTemplate = By.xpath(`//ng-select//div[.//*[@id='pgs-loyalty-program-document-template'] and contains(@class,'ng-select-container')]//input`);
    private cmbEmailTemplate = By.xpath(`//ng-select//div[.//*[@id='pgs-loyalty-program-mail-template'] and contains(@class,'ng-select-container')]//input`);
    private txtDescription = By.xpath(`//*[@id='pgs-loyalty-program-description']`);

    private labelNotificationTemplate = By.xpath(`//div[.//*[@id='pgs-loyalty-program-document-template'] and @class='ng-value-container' ]//span[contains(@class,'ng-value-label')]`);
    private labelEmailTemplate = By.xpath(`//div[.//*[@id='pgs-loyalty-program-mail-template'] and @class='ng-value-container' ]//span[contains(@class,'ng-value-label')]`);


    //#region input value
    public async inputName(Name: string) {
        try {
            let element = await this.getFieldType(this.txtName);
            await element.setValue(Name);
            return true;
        } catch (error) {
            console.log(`inputName`);
            console.log(error);
            return false;
        }
    }

    public async inputStartDate(StartDate: string) {
        try {
            let element = await this.getFieldType(this.dtpStartDate);
            await element.setValue(StartDate);
            return true;
        } catch (error) {
            console.log(`inputStartDate`);
            console.log(error);
            return false;
        }
    }
    public async inputEndDate(EndDate: string) {
        try {
            let element = await this.getFieldType(this.dtpEndDate);
            await element.setValue(EndDate);
            return true;
        } catch (error) {
            console.log(`inputEndDate`);
            console.log(error);
            return false;
        }
    }

    public async inputNotificationTemplate(NotificationTemplate: string) {
        try {
            await this.driverService.setText(this.cmbNotificationTemplate, NotificationTemplate)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(NotificationTemplate, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputNotificationTemplate`);
            console.log(error);
            return false;
        }
    }

    public async inputEmailTemplate(EmailTemplate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbEmailTemplate);
            await this.driverService.setText(this.cmbEmailTemplate, EmailTemplate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(EmailTemplate, "", this.driverService)
            return true;
        } catch (error) {
            console.log(`inputEmailTemplate`);
            console.log(error);
            return false;
        }
    }

    public async inputDescription(Description: string) {
        try {
            let element = await this.getFieldType(this.txtDescription);
            await element.setValue(Description);
            return true;
        } catch (error) {
            console.log(`inputDescription`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region validate value on form
    public async validateNameValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtName);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate Name: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateNameValue`);
            console.log(error);
            return false;
        }
    }

    public async validateStartDateValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.dtpStartDate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate StartDate: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateStartDateValue`);
            console.log(error);
            return false;
        }
    }
    public async validateEndDateValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.dtpEndDate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate EndDate: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateEndDateValue`);
            console.log(error);
            return false;
        }
    }
    public async validateNotificationTemplateValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.labelNotificationTemplate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate NotificationTemplate: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateNotificationTemplateValue`);
            console.log(error);
            return false;
        }
    }

    public async validateEmailTemplateValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.labelEmailTemplate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate EmailTemplate: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateEmailTemplateValue`);
            console.log(error);
            return false;
        }
    }
    public async validateDescriptionValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtDescription);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord('validate Description: ', [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateDescriptionValue`);
            console.log(error);
            return false;
        }
    }
    //#endregion
}