import { compareDesc } from "date-fns";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { TableManager } from "../../../../../core/fields/TableManager";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ClaimListInsurance extends BasePage {
  //Xpath of elements on Claim list
  private btnCreate = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Create')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Create')])[1])[last()]`);

  //Xpath of elements at first row Claim list
  private btnEdit = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-action')]//*[contains(@class,'fa-edit')]`);
  private lblReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date')) and not(contains(@class,'handler'))]//*[self::*[text()]]`);
  private lblAccountName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
  private lblObjectName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-object-name')]//*[self::*[text()]]`);
  private lblDateOfLoss = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-claim-date')]//*[self::*[text()]]`);
  private lblReportedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
  private lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
  private lblPolicy = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-product-data')]//*[self::*[text()]]`);
  private lblProduct = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-product-id')]//*[self::*[text()]]`);
  private lblClaimHandler = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-claim-handler')]//*[self::*[text()]]`);
  private lblOrganization = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-claim-organization')]//*[self::*[text()]]`);

  private locTable = By.css(".table.c-table.table-striped.table-hover");
  public async pressCreateNewClaim() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCreate);
      return true;
    } catch (error) {
      console.log("pressCreateNewClaim\n" + error);
      return false;
    }
  }

  // Validate values at claim list
  public async validateValueClaimList(expectedValue: string, nameOfColumn: string, positionRow: number = 1) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Reference": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date')) and not(contains(@class,'handler'))]//*[self::*[text()]]`);
          break;
        }
        case "Account name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
          break;
        }
        case "Object name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-object-name')]//*[self::*[text()]]`);
          break;
        }
        case "Date of loss": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-date')]//*[self::*[text()]]`);
          break;
        }
        case "Reported date": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
          break;
        }
        case "Status": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
          break;
        }
        case "Policy": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-data') or contains(@class,'pgs-claim-policy-data')]//*[self::*[text()]]`);
          break;
        }
        case "Product": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-id')]//*[self::*[text()]]`);
          break;
        }
        case "Claim handler": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-handler')]//*[self::*[text()]]`);
          break;
        }
        case "Organization": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-organization')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);
      if (nameOfColumn.localeCompare("Claim handler") === 0) {
        return await this.driverService.validateRecordUsedForSearch(`Validate column "${nameOfColumn}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
        );
      }
      return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
        [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
      );
    } catch (error) {
      console.log("validateValueClaimList");
      console.log(error);
      return false;
    }
  }

  //#region : get value at claim list*/
  public async getReferenceIdClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      const lblReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date')) and not(contains(@class,'handler'))]//*[self::*[text()]]`);
      const result = parseInt(await this.driverService.getText(lblReference));
      return result;
    } catch (error) {
      console.log("getReferenceIdClaimList");
      console.log(error);
      return -1;
    }
  }

  public async getAccountNameClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblAccountName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(lblAccountName);
      return result;
    } catch (error) {
      console.log("getAccountNameClaimList");
      console.log(error);
      return "";
    }
  }

  public async getObjectNameClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-object-name')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getObjectNameClaimList");
      console.log(error);
      return "";
    }
  }
  public async getDateOfLossClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-date')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getDateOfLossClaimList");
      console.log(error);
      return "";
    }
  }

  public async getReportedDateClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getReportedDateClaimList");
      console.log(error);
      return "";
    }
  }

  public async getStatusClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getStatusClaimList");
      console.log(error);
      return "";
    }
  }

  public async getPolicyClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-data') or contains(@class,'pgs-claim-policy-data')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getPolicyClaimList");
      console.log(error);
      return "";
    }
  }

  public async getProductClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-id')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getProductClaimList");
      console.log(error);
      return "";
    }
  }

  public async getClaimHandlerClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-handler')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getClaimHandlerClaimList");
      console.log(error);
      return "";
    }
  }

  public async getOrganizationClaimList(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-organization')]//*[self::*[text()]]`);
      const result = await this.driverService.getText(temp);
      return result;
    } catch (error) {
      console.log("getOrganizationClaimList");
      console.log(error);
      return "";
    }
  }
  //#endregion

  public async pressEditClaim(positionRow: number = 1) {
    try {
      const btnEdit = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-action')]//*[contains(@class,'fa-edit')]`);
      await this.driverService.waitUntilElementLoaded(btnEdit);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(btnEdit);

      return true;
    } catch (error) {
      console.log("pressEditClaim");
      console.log(error);
      return false;
    }
  }

  public async verifyButtonsOnTopOfClaimTable() {
    try {
      let countError = 0;
      logWarningMessage("\tVerify buttons at claim list:");
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      //Verify "Create" button
      if (!(await this.driverService.isExisted(this.btnCreate))) {
        logWarningMessage(`\t\tCan't find "Create" button on Claim list`);
        countError++;
      }

      return countError === 0;
    } catch (error) {
      console.log("verifyButtonsOnTopOfClaimTable");
      console.log(error);
      return false;
    }
  }

  public async verifyColumnsOfClaimTable() {
    try {
      let countError = 0;
      logWarningMessage('\tVerify columns of Claim list:');
      const columns = ["Action", "Reference", "Account name", "Object name", "Date of loss", "Reported date", "Status", "Policy", "Product", "Claim handler", "Organization"];
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      for (const column of columns) {
        const titleAction = By.xpath(`//table//th//span[text()='${column}']`);
        if (!(await this.driverService.isExisted(titleAction))) {
          logWarningMessage(`\t\tClaim list is missing "${column}" column!`);
          countError++;
        }
      }
      return countError === 0;
    } catch (error) {
      console.log("verifyColumnsOfClaimTable");
      console.log(error);
      return false;
    }
  }

  public async checkColumnReportedDateSortedDescending() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

      const lblReportedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
      const len = await (await this.driverService.findElements(lblReportedDate)).length;
      for (let i = 1; i < len; i++) {
        const lblCurrentReportedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]//td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);
        const lblPreviousReportedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i + 1}]//td[contains(@class,'pgs-claim-reported-date')]//*[self::*[text()]]`);

        let temp = (await this.driverService.getText(lblCurrentReportedDate)).trim();
        const currentReportedDate = new Date(parseInt(temp.substring(6, 10)), parseInt(temp.substring(3, 5)), parseInt(temp.substring(0, 2)));

        temp = (await this.driverService.getText(lblPreviousReportedDate)).trim();
        const previousReportedDate = new Date(parseInt(temp.substring(6, 10)), parseInt(temp.substring(3, 5)), parseInt(temp.substring(0, 2)));
        logInfoMessage(previousReportedDate.toDateString());
        if (compareDesc(currentReportedDate, previousReportedDate) > 0) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log("checkColumnReportedDateSortedDescending");
      console.log(error);
      return false;
    }
  }

  //#region  Validate result of Search and Filter
  //1. At claim list
  public async validateSearchAndFilterReference(reference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblReference);
      let actualReference = (await this.driverService.getText(this.lblReference)).toLowerCase();
      return actualReference.includes(reference.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterReference");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterObjectName(objectName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblObjectName);
      let actualObjectName = (await this.driverService.getText(this.lblObjectName)).toLowerCase();
      return actualObjectName.includes(objectName.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterObjectName");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterAccount(Account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAccountName);
      let actualAccount = await this.driverService.getText(this.lblAccountName);
      return actualAccount.includes(Account);
    } catch (error) {
      console.log("validateSearchAndFilterAccount");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region  Click on element on claim list
  public async pressReferenceIdClaimList(positionRow: number) {
    try {
      const lblReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date')) and not(contains(@class,'handler'))]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblReference);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(lblReference);

      return true;
    } catch (error) {
      console.log("pressReferenceIdClaimList");
      console.log(error);
      return false;
    }
  }

  public async pressAccountNameClaimList(positionRow: number) {
    try {
      const lblAccountName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(lblAccountName);

      return true;
    } catch (error) {
      console.log("pressAccountNameClaimList");
      console.log(error);
      return false;
    }
  }

  public async pressPolicyClaimList(positionRow: number) {
    try {
      const lblPolicy = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-data') or contains(@class,'pgs-claim-policy-data')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblPolicy);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(lblPolicy);

      return true;
    } catch (error) {
      console.log("pressPolicyClaimList");
      console.log(error);
      return false;
    }
  }
  public async pressStatusClaimListByReferenceId(referenceId: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[.//*[text()='${referenceId}']]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementVisible(lbl);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(lbl);
      return true;
    } catch (error) {
      console.log("pressStatusClaimListByReferenceId");
      console.log(error);
      return false;
    }
  }
  public async validateStatusClaimListByReferenceId(expectedValue: string, referenceId: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[.//*[text()='${referenceId}']]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementVisible(lbl);
      const actualValue = await this.driverService.getText(lbl);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return await this.driverService.validateRecord("Validate Status",
        [actualValue, expectedValue, "Incorrect status!"]);
    } catch (error) {
      console.log("validateStatusClaimListByReferenceId");
      console.log(error);
      return false;
    }
  }

  public async hasNoData(): Promise<boolean> {
    try {
      let eleTable = await this.getFieldType(this.locTable);
      const result = await (eleTable as TableManager).hasNodata();
      return result;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  //#endregion
}