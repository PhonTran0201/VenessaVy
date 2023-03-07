import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, logWarningMessage } from "../../../../../../../shared/functions";
import { locator_progressbarNotActive } from "../../../../../../../shared/variables";

export class AccountTabSMS {
  constructor(private driverService: SeleniumWebDriverService) { }

  private sendSMSForm = By.xpath("//app-sms-form");

  private btnSendSMS = By.xpath("//button[@id='send-sms-btn']");

  private txtPhoneNumber = By.xpath("//app-sms-form//input[@id='pgs-sms-f-phone-num']");
  private cmbTemplate = By.xpath("//app-sms-form//input[@id='pgs-sms-f-temp-id']");

  private txtContent = By.xpath("//app-sms-form//textarea[@id='pgs-sms-f-content']");

  private btnSend = By.xpath("//app-sms-form//button[@id='pgs-send-f-sms-send-btn']");


  public async openSendSmsForm(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSendSMS);
      await this.driverService.click(this.btnSendSMS);
      await this.driverService.waitUntilElementLoaded(this.sendSMSForm);
      await this.driverService.waitForSeconds(1000);
      return true;
    } catch (error) {
      console.log("openSendSmsForm");
      console.log(error);
      return false;
    }
  }

  public async inputDatoToSendSmsForm(
    phoneNumber: string,
    template: string,
    customer: string,
    content: string
  ): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber);

      await this.driverService.setText(this.txtPhoneNumber, phoneNumber);

      await this.driverService.click(this.cmbTemplate);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.setText(this.cmbTemplate, template);
      await this.driverService.waitForSeconds(2000);
      await this.driverService.waitUntilElementLoaded(locator_progressbarNotActive);
      await this.driverService.pressEnterCurrentElement();

      await this.driverService.setText(this.txtContent, content);
      await this.driverService.pressTabCurrentElement();

      let lblErrorMessage = By.xpath("//app-sms-form//formly-validation-message");
      let len = (await this.driverService.findElements(lblErrorMessage)).length;
      if (len > 0) {
        logWarningMessage("Data sms is not correct with error validation messages:");
        for (let i = 1; i <= len; i++) {
          let errorMessage = await this.driverService.getText(By.xpath(`(//app-sms-form//formly-validation-message)[${i}]`));
          logWarningMessage("\t" + errorMessage);
        }
        return false;
      }

      return true;
    } catch (error) {
      console.log("inputDatoToSendSmsForm");
      console.log(error);
      return false;
    }
  }

  public async clickSend(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSend);
      await this.driverService.click(this.btnSend);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.waitForSeconds(2000);
      return true;
    } catch (error) {
      console.log("clickSend");
      console.log(error);
      return false;
    }
  }

  public async assertSendSMS(
    phoneNumber: string,
    template: string,
    customer: string,
    content: string
  ): Promise<boolean> {
    try {
      let lblTo = By.xpath(`//app-customer-sms-list//tbody/tr[1]/td[2]//span`);
      let lblMessage = By.xpath(`//app-customer-sms-list//tbody/tr[1]/td[3]//a`);
      let actualPhoneNumber = await this.driverService.getText(lblTo);
      let actualContent = await this.driverService.getText(lblMessage);

      let temp = await this.driverService.validateRecord("Send SMS",
        [actualPhoneNumber, phoneNumber, "Incorrect phone number!"],
        [actualContent, content, "Incorrect content!"]
      );
      return temp;
    } catch (error) {
      console.log("assertSendSMS");
      console.log(error);
      return false;
    }
  }
}
