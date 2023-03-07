import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";

export class ClaimTabRelatedClaimsListInsurance {
  constructor(private driverService: SeleniumWebDriverService) { }

  // Validate values at Related claims list
  public async validateValueRelatedClaimsList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Reference": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date'))]//*[self::*[text()]]`);
          break;
        }
        case "Account name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
          break;
        }
        case "Status": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
          break;
        }
        case "Date of loss": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-date')]//*[self::*[text()]]`);
          break;
        }
        case "Policy": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-data')]//*[self::*[text()]]`);
          break;
        }
        case "Product": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-id')]//*[self::*[text()]]`);
          break;
        }
        case "Object name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-object-name')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      if (isUsedForSearch) {
        return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
      }
      else {
        return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
        );
      }
    } catch (error) {
      console.log("validateValueRelatedClaimsList");
      console.log(error);
      return false;
    }
  }


  //Get value Related claims list
  public async getValueRelatedClaimsList(nameOfColumn: string, positionRow: number = 1) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Reference": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim') and not(contains(@class,'date'))]//*[self::*[text()]]`);
          break;
        }
        case "Account name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-customer-name')]//*[self::*[text()]]`);
          break;
        }
        case "Status": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-status')]//*[self::*[text()]]`);
          break;
        }
        case "Date of loss": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-claim-date')]//*[self::*[text()]]`);
          break;
        }
        case "Policy": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-data')]//*[self::*[text()]]`);
          break;
        }
        case "Product": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-product-id')]//*[self::*[text()]]`);
          break;
        }
        case "Object name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-claim-object-name')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return "";
      }

      return await this.driverService.getText(temp);
    } catch (error) {
      console.log("getValueRelatedClaimsList");
      console.log(error);
      return "";
    }
  }
}