import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logSuccessMessage, selectDropdownOption, selectTheFirstDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ChecklistsForm extends BasePage {
    protected cmbOrganization = By.xpath(`//app-checklist-definition-form//*[@id='pgs-checklist-form-organization' and not(@disabled)]`);
    protected txtName = By.xpath(`//app-checklist-definition-form//input[@id='pgs-checklist-form-name' and not(@disabled)]`);
    protected dtpDeadline = By.xpath(`//app-checklist-definition-form//*[@id='pgs-checklist-form-deadline' and not(@disabled)]`);
    protected cmbTargetGroup = By.xpath(`//app-checklist-definition-form//*[@id='pgs-checklist-form-target-group' and not(disabled)]`);
    protected cmbProduct = By.xpath(`//app-checklist-definition-form//*[@id='entity-layout-popup-product' and not(@disabled)]`);
    protected cmbEmailTemplate = By.xpath(`//app-checklist-definition-form//ng-select[.//*[@id='pgs-checklist-form-email-template' and not(@disabled)]]`);
    protected cmbNotificationTemplate = By.xpath(`//app-checklist-definition-form//ng-select[.//*[@id='pgs-checklist-form-notification-template' and not(@disabled)]]`);
    protected txtDescription = By.xpath(`//app-checklist-definition-form//*[@id='pgs-checklist-form-description' and not(@disabled)]`);

    protected lblOrganization = By.xpath(`//app-checklist-definition-form//div[./label[@for ='pgs-checklist-form-organization']]//ng-select[contains(@class,'ng-select')]//span[contains(@class,'ng-value-label')]`);

    // Value in input field
    protected lblStatus = By.xpath(`//app-checklist-definition-form//div[./label[@for ='pgs-checklist-form-status']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    protected lblTargetGroup = By.xpath(`//app-checklist-definition-form//div[./label[@for ='pgs-checklist-form-target-group']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblProduct = By.xpath(`//app-checklist-definition-form//div[./label[@for ='entity-layout-popup-product']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblEmailTemplate = By.xpath(`//app-checklist-definition-form//div[./label[@for ='pgs-checklist-form-email-template']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblNotificationTemplate = By.xpath(`//app-checklist-definition-form//div[./label[@for ='pgs-checklist-form-notification-template']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblDescription = By.xpath(`//app-checklist-definition-form//*[@id = 'pgs-checklist-form-description' and not(@disabled)]`);

    public async inputOrganization(inputValue: string) {
        try {
            let input = this.getFieldType(this.cmbOrganization);
            await (await input).setValue(inputValue);
            await selectDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputOrganization`);
            console.log(error);
            return false;
        }
    }


    public async inputName(inputValue: string) {
        try {
            let input = this.getFieldType(this.txtName);
            await (await input).setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputName`);
            console.log(error);
            return false;
        }
    }

    public async inputDeadline(inputValue: string) {
        try {
            let input = this.getFieldType(this.dtpDeadline);
            await (await input).setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputDeadline`);
            console.log(error);
            return false;
        }
    }

    public async inputTargetGroup(inputValue: string) {
        try {
            let input = this.getFieldType(this.cmbTargetGroup);
            await (await input).setValue(inputValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectTheFirstDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputTargetGroup`);
            console.log(error);
            return false;
        }
    }

    public async inputProduct(inputValue: string) {
        try {
            let input = this.getFieldType(this.cmbProduct);
            await (await input).setValue(inputValue);
            await selectDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputProduct`);
            console.log(error);
            return false;
        }
    }

    public async inputEmailTemplate(inputValue: string) {
        try {
            let input = this.getFieldType(this.cmbEmailTemplate);
            await (await input).setValue(inputValue);
            // await selectDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputEmailTemplate`);
            console.log(error);
            return false;
        }
    }

    public async inputNotificationTemplate(inputValue: string) {
        try {
            let input = this.getFieldType(this.cmbNotificationTemplate);
            await (await input).setValue(inputValue);
            // await selectDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputNotificationTemplate`);
            console.log(error);
            return false;
        }
    }

    public async inputDescription(inputValue: string) {
        try {
            let input = this.getFieldType(this.txtDescription);
            await (await input).setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputDescription`);
            console.log(error);
            return false;
        }
    }


    public async validateRequiredField(fieldName: string) {
        try {
            let xpath = By.xpath(`//app-checklist-definition-form//div[./label[contains(text(),'${fieldName}')]]//formly-validation-message[text()='This field is required']`);
            if (await this.driverService.isExisted(xpath)) {
                logSuccessMessage(`validate required field '${fieldName}' : Test passed!`);
                return true;
            }
            return false
        } catch (error) {
            console.log(`validateRequiredField`);
            console.log(error);
            return false;
        }
    }

 
    public async validateOrganizationValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblOrganization);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Organization: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateOrganizationValue');
            console.log(error);
            return false;
        }
    }

    public async validateNameValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.txtName);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Name: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateNameValue');
            console.log(error);
            return false;
        }
    }

    public async validateStatusValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblStatus);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Status: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateStatusValue');
            console.log(error);
            return false;
        }
    }

    public async validateDeadlineValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.dtpDeadline);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Deadline: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateDeadlineValue');
            console.log(error);
            return false;
        }
    }

    public async validateTargetGroupValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.lblTargetGroup);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate TargetGroup: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateTargetGroupValue');
            console.log(error);
            return false;
        }
    }

    public async validateProductValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element =  await this.getFieldType(this.lblProduct);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Product: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateProductValue');
            console.log(error);
            return false;
        }
    }

    public async validateEmailTemplateValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.lblEmailTemplate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate EmailTemplate: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateEmailTemplateValue');
            console.log(error);
            return false;
        }
    }

    public async validateNotificationTemplateValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.lblNotificationTemplate);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate NotificationTemplate: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateNotificationTemplateValue');
            console.log(error);
            return false;
        }
    }

    public async validateDescriptionValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element = await this.getFieldType(this.lblDescription);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Description: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateDescriptionValue');
            console.log(error);
            return false;
        }
    }

}