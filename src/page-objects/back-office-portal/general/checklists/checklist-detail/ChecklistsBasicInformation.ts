import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logSuccessMessage } from "../../../../../shared/functions";
import { ChecklistsForm } from "../checklists-form/ChecklistsForm";

export class ChecklistsBasicInformation extends ChecklistsForm {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
      }
    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]";

    private titlePageBasicInformation = By.xpath(`${this.strRootXpath}//app-checklist-definition-basic-information//*[text()='Basic Information']`);

    protected txtName = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-name' and not(@disabled)]`);
    protected lblOrganization = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-organization']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    protected dtpDeadline = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-deadline' and not(@disabled)]`);
    protected cmbTargetGroup = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-target-group' and not(disabled)]`);
    protected cmbProduct = By.xpath(`${this.strRootXpath}//*[@id='entity-layout-popup-product' and not(@disabled)]`);
    protected cmbEmailTemplate = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-email-template' and not(@disabled)]`);
    protected cmbNotificationTemplate = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-notification-template' and not(@disabled)]`);
    protected txtDescription = By.xpath(`${this.strRootXpath}//*[@id='pgs-checklist-form-description' and not(@disabled)]`);

    protected lblStatus = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-status']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    protected lblTargetGroup = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-target-group']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblProduct = By.xpath(`${this.strRootXpath}//div[./label[@for ='entity-layout-popup-product']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblEmailTemplate = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-email-template']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblNotificationTemplate = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-notification-template']]//ng-select[not(contains(@class,'ng-select-disabled'))]//span[contains(@class,'ng-value-label')]`);
    protected lblDescription = By.xpath(`${this.strRootXpath}//*[@id = 'pgs-checklist-form-description' and not(@disabled)]`);
    
    private lblNameDisabled = By.xpath(`${this.strRootXpath}//*[@id = 'pgs-checklist-form-name' and @disabled]`);
    private lblDeadlineDisabled = By.xpath(`${this.strRootXpath}//*[@id = 'pgs-checklist-form-deadline' and @disabled]`);
    private lblTargetGroupDisabled = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-target-group']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    private lblProductDisabled = By.xpath(`${this.strRootXpath}//div[./label[@for ='entity-layout-popup-product']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    private lblEmailTemplateDisabled = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-email-template']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    private lblNotificationTemplateDisabled = By.xpath(`${this.strRootXpath}//div[./label[@for ='pgs-checklist-form-notification-template']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    private lblDescriptionDisabled = By.xpath(`${this.strRootXpath}//*[@id = 'pgs-checklist-form-description' and @disabled]`);

    //button xpath disabled
    private btnSaveDisabled = By.xpath(`${this.strRootXpath}//app-checklist-definition-basic-information//button[contains(text(),'Save') and @disabled]`);
    private btnCompleleDisappear = By.xpath(`${this.strRootXpath}//app-checklist-definition-basic-information//button[contains(text(),'Complete')]`);



    public async validateOrganizationValue(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.titlePageBasicInformation);
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
            await this.driverService.waitUntilElementLoaded(this.titlePageBasicInformation);
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblNameDisabled);
            } else {
                element = await this.getFieldType(this.txtName);
            }
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Name: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateNameValue');
            console.log(error);
            return false;
        }
    }


    public async validateDeadlineValue(expectedValue: string, IsDisabledField: boolean = false) {
        try {
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblDeadlineDisabled);
            } else {
                element = await this.getFieldType(this.dtpDeadline);
            }
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
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblTargetGroupDisabled); //
            } else {
                element = await this.getFieldType(this.lblTargetGroup);
            }
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
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblProductDisabled);
            } else {
                element = await this.getFieldType(this.lblProduct);
            }
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
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblEmailTemplateDisabled);
            } else {
                element = await this.getFieldType(this.lblEmailTemplate);
            }
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
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblNotificationTemplateDisabled);
            } else {
                element = await this.getFieldType(this.lblNotificationTemplate);
            }
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
            let element;
            if (IsDisabledField) {
                element = await this.getFieldType(this.lblDescriptionDisabled);
            } else {
                element = await this.getFieldType(this.lblDescription);
            }
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Description: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateDescriptionValue');
            console.log(error);
            return false;
        }
    }

    //#region validate button disabled
    public async validateSaveButtonDisabled() {
        try {
            logSuccessMessage(`Validating save button disabled...`);
            if (await this.driverService.isExisted(this.btnSaveDisabled)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateSaveButtonDisabled`);
            console.log(error);
            return false;
        }
    }
    public async validateCompletedButtonIsDisappear() {
        try {
            logSuccessMessage(`Validating Completed button is disappear...`);
            if (!await this.driverService.isExisted(this.btnCompleleDisappear)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateCompletedButtonIsDisappear`);
            console.log(error);
            return false;
        }
    }
    //#endregion


}