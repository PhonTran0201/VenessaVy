import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";


export class ClaimSettingTabRecipientManagementInsurance extends BasePage {

  public async validateNameValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-name')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Name: ", [actualValue, expectedValue, "Incorrect Name!"]);
    } catch (error) {
      console.log("validateNameValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }

  public async validateNIN_OrganizationValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-organization')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate NIN_Organization: ", [actualValue, expectedValue, "Incorrect NIN_Organization!"]);
    } catch (error) {
      console.log("validateNIN_OrganizationValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }

  public async validateAddressValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-address')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Address: ", [actualValue, expectedValue, "Incorrect Address!"]);
    } catch (error) {
      console.log("validateAddressValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }

  public async validatePhoneValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-phone')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Phone: ", [actualValue, expectedValue, "Incorrect Phone!"]);
    } catch (error) {
      console.log("validatePhoneValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }

  public async validateEmailValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-email')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Email: ", [actualValue, expectedValue, "Incorrect Email!"]);
    } catch (error) {
      console.log("validateEmailValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }

  public async validateCustomerTypeValueOnRecipientListByRow(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//app-claim-recipient-list//tbody//tr[${positionRow}]//td[contains(@class,'pgs-claim-recipient-customer-type')]//*[self::*[text()]]`);
      let lblValue = await this.getFieldType(lblxpath);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate CustomerType: ", [actualValue, expectedValue, "Incorrect CustomerType!"]);
    } catch (error) {
      console.log("validateCustomerTypeValueOnRecipientListByRow");
      console.log(error);
      return false;
    }
  }
}


