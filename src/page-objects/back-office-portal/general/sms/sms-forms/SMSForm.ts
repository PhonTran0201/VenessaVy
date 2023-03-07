// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class SMSForm extends BasePage {
  protected cmbOrganization: By = By.xpath(`//app-sms-form//input[contains(@id,'organizationId')]`);
  protected txtPhoneNumber: By = By.xpath(`//app-sms-form//input[contains(@id,'pgs-sms-f-phone-num')]`);
  protected cmbTemplate: By = By.xpath(`//app-sms-form//input[contains(@id,'pgs-sms-f-temp-id')]`);
  protected txtCustomer: By = By.xpath(`//app-sms-form//input[contains(@id,'pgs-sms-f-cus-id')]`);
  protected txtContent: By = By.xpath(`//app-sms-form//textarea[contains(@id,'pgs-sms-f-content')]`);


  protected cmbOrganizationValue: By = By.xpath(`//app-sms-form//ng-select[.//input[contains(@id,'organizationId')]]//span[contains(@class,'ng-value-label')]`);
  protected cmbTemplateValue: By = By.xpath(`//app-sms-form//ng-select[.//input[contains(@id,'pgs-sms-f-temp-id')]]//span[contains(@class,'ng-value-label')]`);

  protected btnCloseSMSForm: By = By.xpath(`//app-sms-form//button[contains(@id,'close-btn')]`);
  protected btnSend: By = By.xpath(`//app-sms-form//button[contains(@id,'pgs-send-f-sms-send-btn')]`);
  protected btnCancel: By = By.xpath(`//app-sms-form//button[contains(@id,'cancel-btn')]`);


  //#region Input field
  async inputOrganization(value) {
    try {
      let ele = await this.getFieldType(this.cmbOrganization);
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async inputPhoneNumber(value) {
    try {
      let ele = await this.getFieldType(this.txtPhoneNumber);
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async inputTemplate(value) {
    try {
      let ele = await this.getFieldType(this.cmbTemplate);
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async inputCustomer(value) {
    try {
      let ele = await this.getFieldType(this.txtCustomer);
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async inputContent(value) {
    try {
      let ele = await this.getFieldType(this.txtContent);
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Press buttons
  async pressCloseFormButton() {
    try {
      let ele = await this.getFieldType(this.btnCloseSMSForm);
      await ele.click();
      await this.waitPageProgressCompleted();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async pressSendButton() {
    try {
      let ele = await this.getFieldType(this.btnSend);
      await ele.click();
      await this.waitPageProgressCompleted();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async pressCancelButton() {
    try {
      let ele = await this.getFieldType(this.btnCancel);
      await ele.click();
      await this.waitPageProgressCompleted();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Validate value
  public async validateValueOrganization(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.cmbOrganizationValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(this.cmbOrganizationValue);
      return await this.driverService.validateRecord('Validate Organization!',
        [actualValue, expectedValue, 'Incorrect Organization!']);
    } catch (error) {
      console.log('validateValueOrganization');
      console.log(error);
      return false;
    }
  }
  public async validateValuePhoneNumber(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.txtPhoneNumber);
      const actualValue = await this.driverService.getAttributeValue(this.txtPhoneNumber,'value');
      return await this.driverService.validateRecord('Validate Phone Number!',
        [actualValue, expectedValue, 'Incorrect Phone Number!']);
    } catch (error) {
      console.log('validateValuePhoneNumber');
      console.log(error);
      return false;
    }
  }
  public async validateValueTemplate(expectedValue: string){
    try {
      const element = await this.getFieldType(this.cmbTemplateValue);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate Template!',
        [actualValue, expectedValue, 'Incorrect Template!']);
    } catch (error) {
      console.log('validateValueTemplate');
      console.log(error);
      return false;
    }
  }
  public async validateValueCustomer(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.txtCustomer);
      const actualValue = await this.driverService.getAttributeValue(this.txtCustomer,'value');
      return await this.driverService.validateRecord('Validate Customer!',
        [actualValue, expectedValue, 'Incorrect Customer!']);
    } catch (error) {
      console.log('validateValueCustomer');
      console.log(error);
      return false;
    }
  }
  public async validateValueContent(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.txtContent);
      const actualValue = await this.driverService.getAttributeValue(this.txtContent,'value');
      return await this.driverService.validateRecord('Validate Content!',
        [actualValue, expectedValue, 'Incorrect Content!']);
    } catch (error) {
      console.log('validateValueContent');
      console.log(error);
      return false;
    }
  }
  //#endregion


}