import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class ClaimDetailsLeftSideInsurance extends BasePage {

  //Elements at Claim detail
  private lblDtStatus = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//div[contains(@class,'card-header')]//small/span");
  private lblDtTitle = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//div[contains(@class,'card-header')]//h4");

  private lblDtReference = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Reference']/following-sibling::*");
  private lblDtAssingedTo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Assigned to']/following-sibling::*");
  private lblDtAccount = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Account']/following-sibling::*");
  private lblDtOrganization = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Organization']/following-sibling::*");
  private lblDtProduct = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Product']/following-sibling::*");
  private lblDtObjectName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Object Name']/following-sibling::*");
  private lblDtReportedDate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Reported Date']/following-sibling::*");
  private lblDtDateOfLoss = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Date of loss']/following-sibling::*");
  private lblDtPhoneNumber = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Phone Number']/following-sibling::*");
  private lblDtEmail = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='Email']/following-sibling::*");
  private lblDtOrgNo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//label[text()='NIN/Org. No.']/following-sibling::*");


  private lblDtIndeminityOutstadingReserve = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[2]/td[2]");
  private lblDtIndeminityTotalPayment = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[2]/td[3]");
  private lblDtExpenseOutstandingReserve = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[3]/td[2]");
  private lblDtExpenseTotalPayment = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[3]/td[3]");

  private lblDtTotalRecoveryEstimated = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[5]/td[2]");
  private lblDtTotalRecoveryReceived = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//tr[5]/td[3]");

  private btnCloseClaim = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//button[@id='claim-close-btn']");
  private btnReopenClaim = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//button[@id='claim-reopen-btn']");


  //#region Header
  public async pressStatusButtonClaimDetail() {
    try {
      const element = await this.getFieldType(this.lblDtStatus);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressStatusButtonClaimDetail');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Validate values at claim detail
  public async validateValueClaimDetail(expectedValue: string, nameOfFiled: string) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfFiled) {
        case "Status": {
          temp = this.lblDtStatus;
          break;
        }
        case "Reference": {
          temp = this.lblDtReference;
          break;
        }
        case "Assigned To": {
          temp = this.lblDtAssingedTo;
          break;
        }
        case "Account": {
          temp = this.lblDtAccount;
          break;
        }
        case "Organization": {
          temp = this.lblDtOrganization;
          break;
        }
        case "Product": {
          temp = this.lblDtProduct;
          break;
        }
        case "Object Name": {
          temp = this.lblDtObjectName;
          break;
        }
        case "Reported Date": {
          temp = this.lblDtReportedDate;
          break;
        }
        case "Date Of Loss": {
          temp = this.lblDtDateOfLoss;
          break;
        }
        case "Phone Number": {
          temp = this.lblDtPhoneNumber;
          break;
        }
        case "Email": {
          temp = this.lblDtEmail;
          break;
        }
        case "NIN/Org. No.": {
          temp = this.lblDtOrgNo;
          break;
        }



        case "Indemnity Outstanding Reserve": {
          temp = this.lblDtIndeminityOutstadingReserve;
          break;
        }
        case "Indemnity Total Payment": {
          temp = this.lblDtIndeminityTotalPayment;
          break;
        }
        case "Expense Outstanding Reserve": {
          temp = this.lblDtExpenseOutstandingReserve;
          break;
        }
        case "Expense Total Payment": {
          temp = this.lblDtExpenseTotalPayment;
          break;
        }

        case "Total Recovery Estimated": {
          temp = this.lblDtTotalRecoveryEstimated;
          break;
        }
        case "Total Recovery Received": {
          temp = this.lblDtTotalRecoveryReceived;
          break;
        }
        default:
          logWarningMessage(`Field with name "${nameOfFiled}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      if (nameOfFiled.localeCompare("Assigned To") === 0) {
        return await this.driverService.validateRecordUsedForSearch(`Validate field "${nameOfFiled}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfFiled}"!`]
        );
      }
      return await this.driverService.validateRecord(`Validate field "${nameOfFiled}"`,
        [actualValue, expectedValue, `Incorrect "${nameOfFiled}"!`]
      );
    } catch (error) {
      console.log("validateValueClaimDetail");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Press button
  public async pressCloseClaim() {
    try {
      await this.driverService.waitUntilElementVisible(this.btnCloseClaim);
      await this.driverService.click(this.btnCloseClaim);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public async pressReopeClaim(){
    try {
      const element = await this.getFieldType(this.btnReopenClaim);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressReopeClaim');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Check element exist
  public async isOutstandingReserveLableExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const label = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//b[text()='Outstanding Reserve']");
      return await this.driverService.isExisted(label);
    } catch (error) {
      console.log('isOutstandingReserveLableExist');
      console.log(error);
      return false;
    }
  }

  public async isTotalPaymentLableExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const label = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//b[text()='Payment']");
      return await this.driverService.isExisted(label);
    } catch (error) {
      console.log('isTotalPaymentLableExist');
      console.log(error);
      return false;
    }
  }

  public async isTotalRecoveryEstimatedLableExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const label = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//b[text()='Recovery']");
      return await this.driverService.isExisted(label);
    } catch (error) {
      console.log('isTotalRecoveryEstimatedLableExist');
      console.log(error);
      return false;
    }
  }

  public async isTotalRecoveryReceivedLableExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const label = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side//table//b[text()='Received']");
      return await this.driverService.isExisted(label);
    } catch (error) {
      console.log('isTotalRecoveryReceivedLableExist');
      console.log(error);
      return false;
    }
  }
  //#endregion

}