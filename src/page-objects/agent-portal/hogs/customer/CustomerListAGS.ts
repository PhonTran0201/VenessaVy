import { Verify } from "crypto";
import { isThisSecond } from "date-fns";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { AccountList } from "../../../back-office-portal/general/account/account-list/AccountList";


export class CustomerListAGS extends AccountList {
  constructor(protected driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected btnApplyForGuarantee = By.xpath("//*[contains(local-name(),'list')]//button[contains(text(),'Apply for guarantee')]");
  protected btnApplyForFrameAgreement = By.xpath("//*[contains(local-name(),'list')]//button[contains(text(),'Apply for frame agreement')]");
  protected lblNameAccount = By.xpath("//*[contains(local-name(),'list')]//table//tr[1]//td[1]//*[self::*[text()]]");
  protected lblOrgNoAccount = By.xpath("//*[contains(local-name(),'list')]//table//tr[1]//td[contains(@class,'org')]//*[self::*[text()]]");
  protected lblPhoneAccount = By.xpath("//*[contains(local-name(),'list')]//table//tr[1]//td[contains(@class,'phone')]//*[self::*[text()]]");
  protected lblAddressAccount = By.xpath("//*[contains(local-name(),'list')]//table//tr[1]//td[4]//*[self::*[text()]]");
  protected txtSearchCustomer = By.xpath("//input[@placeholder = 'Search']");
  protected btnSearch = By.xpath("//div[@class='input-group-append']//button[@type = 'submit']");

  public async clickApplyForGuaranteeButton() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnApplyForGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnApplyForGuarantee);
      return true;
    } catch (error) {
      console.log("clickApplyForGuaranteeButton");
      console.log(error);
      return false;
    }
  }
  public async clickApplyForFrameAgreementButton() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnApplyForFrameAgreement);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnApplyForFrameAgreement);
      return true;
    } catch (error) {
      console.log("clickApplyForFrameAgreementButton");
      console.log(error);
      return false;
    }
  }

  public async validateNameOnCustomerList(expectedValue: string, positionRow:number = 1) {
    try {
      let lblxpath = By.xpath(`//*[contains(local-name(),'list')]//table//tr[${positionRow}]//td[1]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblxpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let actualValue = await this.driverService.getText(lblxpath);
      return this.driverService.validateTestCase("Assert Customer Name: ", [actualValue, expectedValue, "Incorrect customer name!"]);
    } catch (error) {
      console.log("validateNameOnCustomerList");
      console.log(error);
      return false;
    }
  }

  public async validateOrgNoOnCustomerList(expectedValue: string, positionRow:number = 1) {
    try {
      let lblxpath = By.xpath(`//*[contains(local-name(),'list')]//table//tr[${positionRow}]//td[contains(@class,'org')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblxpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let actualValue = await this.driverService.getText(lblxpath);
      return this.driverService.validateTestCase("Assert OrgNo: ", [actualValue, expectedValue, "Incorrect OrgNo!"]);
    } catch (error) {
      console.log("validateOrgNoOnCustomerList");
      console.log(error);
      return false;
    }
  }

  public async validatePhoneOnCustomerList(expectedValue: string, positionRow:number = 1) {
    try {
      let lblxpath = By.xpath(`//*[contains(local-name(),'list')]//table//tr[${positionRow}]//td[contains(@class,'phone')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblxpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let actualValue = await this.driverService.getText(lblxpath);
      return this.driverService.validateTestCase("Assert phone: ", [actualValue, expectedValue, "Incorrect phone!"]);
    } catch (error) {
      console.log("validatePhoneOnCustomerList");
      console.log(error);
      return false;
    }
  }

  public async validateAddressOnCustomerList(expectedValue: string, positionRow:number = 1) {
    try {
      let lblxpath = By.xpath(`//*[contains(local-name(),'list')]//table//tr[${positionRow}]//td[4]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblxpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let actualValue = await this.driverService.getText(lblxpath);
      return this.driverService.validateTestCase("Assert Address: ", [actualValue, expectedValue, "Incorrect Address!"]);
    } catch (error) {
      console.log("validateAddressOnCustomerList");
      console.log(error);
      return false;
    }
  }

  public async searchCustomer(customerName: string){
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSearchCustomer, 10);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtSearchCustomer, customerName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnSearch);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log('searchCustomer');
      console.log(error);
      return false;
    }
  }

  public async openDetailAccountByName(selectedAccount: string) {
    try {
      await this.reloadAccountList();
      await this.driverService.waitUntilElementLoaded(this.lblNameAccount);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//table//tr[${i}]//td//app-customer-link//*[self::*[text()]])[last()]`);
        if (await this.driverService.isExisted(lblName)) {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedAccount) === 0) {
            await this.driverService.pressEnter(lblName);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
          }
        } 
      }
      logWarningMessage(`Can't find account with name \"${selectedAccount}\" into Account List`);
      return false;
    } catch (error) {
      console.log("openDetailAccountByName");
      console.log(error);
      return false;
    }
  }
}
