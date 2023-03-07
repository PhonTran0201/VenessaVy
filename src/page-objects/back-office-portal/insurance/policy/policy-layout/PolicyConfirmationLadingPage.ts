import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalPolicyInsurance } from "./GlobalPolicyInsurance";

export class PolicyConfirmationLadingPage {
  constructor(protected driverService: SeleniumWebDriverService) { }

  protected strRootXpath = "";
  protected successAlert = By.xpath(`${this.strRootXpath}//*[text()='Policies have been created successfully!.']`);
  protected successRefNum = By.xpath(`${this.strRootXpath}//app-confirmation-step//app-detail-card-col/a`);

  public async checkPurchaseSuccessful(): Promise<boolean> {
    try {
      let msg: string;
      await this.driverService.waitUntilElementLoaded(this.successAlert);
      msg = await this.driverService.getText(this.successAlert);

      if (
        msg.localeCompare("POLICIES HAVE BEEN CREATED SUCCESSFULLY!.") ===
        0
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async showPoliciesCreatedSuccess(): Promise<boolean> {
    if (await this.checkPurchaseSuccessful()) {
      logInfoMessage("POLICIES CREATED");
      await this.driverService.waitUntilElementLoaded(this.successRefNum);
      GlobalPolicyInsurance.realSuccessRefNum = await this.driverService.getText(
        this.successRefNum
      );
      return true;
    } else {
      logWarningMessage(`System don't show Success message: \n\t"POLICIES HAVE BEEN CREATED SUCCESSFULLY!."`);
      return false;
    }
  }

  public async validateReferenceOnPolicyConfirmationPageByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`${this.strRootXpath}//app-confirmation-step//table//tbody//tr[${positionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let actualValue = await this.driverService.getText(lblValue);
      return await this.driverService.validateRecord("Validate Reference: ", [actualValue, expectedValue, "Incorrect Reference"]);

    } catch (error) {
      console.log('validateReferenceOnPolicyConfirmationPageByRow');
      console.log(error);
      return false;
    }
  }

  public async validateProductOnPolicyConfirmationPageByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`${this.strRootXpath}//app-confirmation-step//table//tbody//tr[${positionRow}]//td[2]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let actualValue = await this.driverService.getText(lblValue);
      return await this.driverService.validateRecord("Validate Product: ", [actualValue, expectedValue, "Incorrect Product"]);

    } catch (error) {
      console.log('validateProductOnPolicyConfirmationPageByRow');
      console.log(error);
      return false;
    }
  }

  public async validatePolicyTermOnPolicyConfirmationPageByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`${this.strRootXpath}//app-confirmation-step//table//tbody//tr[${positionRow}]//td[3]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let actualValue = await this.driverService.getText(lblValue);
      return await this.driverService.validateRecord("Validate PolicyTerm: ", [actualValue, expectedValue, "Incorrect PolicyTerm"]);

    } catch (error) {
      console.log('validatePolicyTermOnPolicyConfirmationPageByRow');
      console.log(error);
      return false;
    }
  }

  public async openPolicyDetailFromPolicyConfirmationPageByRow(positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`${this.strRootXpath}//app-confirmation-step//table//tbody//tr[${positionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await this.driverService.click(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openPolicyDetailFromPolicyConfirmationPageByRow');
      console.log(error);
      return false;
    }
  }
}