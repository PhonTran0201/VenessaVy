import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { addMinute, compareDate, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class HistoryList {
  //#region Attribute
  protected strRootXpath = "";
  //#region Field on top of table
  private txtSearchKeyword = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id,'Description')]");
  private dtpFrom = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id,'OccurredTime.startDate')]");
  private dtpTo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id,'OccurredTime.endDate')]");
  private btnSearch = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[./*[contains(@class,'fa-search')]]");  
  //#endregion
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Methods
  //#region Elements on top of table
  /**
   * inputSearchKeyword
   */
  public async inputSearchKeyword(searchKeyword: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSearchKeyword);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.setText(this.txtSearchKeyword, searchKeyword);
      return true;
    } catch (error) {
      console.log('inputSearchKeyword');
      console.log(error);
      return false;
    }
  }

  public async inputSearchFrom(from: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpFrom);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.setText(this.dtpFrom, from);
      return true;
    } catch (error) {
      console.log('inputSearchFrom');
      console.log(error);
      return false;
    }
  }

  public async inputSearchTo(to: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpTo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.setText(this.dtpTo, to);
      return true;
    } catch (error) {
      console.log('inputSearchTo');
      console.log(error);
      return false;
    }
  }

  public async pressSearchButton() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSearch);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnSearch);
      return true;
    } catch (error) {
      console.log('pressSearchButton');
      console.log(error);
      return false;
    }
  }
  //#endregion 

  //#region Methods to validate values on History list
  public async validateTypeOnHistoryList(expectedValue: string, positionRow = 1, isUsedForSearch: boolean = false) {
    try {
      const lblActualValue = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td[1]//*[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(lblActualValue);
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate Type",
          [acctualValue, expectedValue, "Incorrect Type"]
        );
      }
      return await this.driverService.validateRecord("Validate Type",
        [acctualValue, expectedValue, "Incorrect Type"]
      );
    } catch (error) {
      console.log('validateTypeOnHistoryList');
      console.log(error);
      return false;
    }
  }
  public async validateDescriptionOnHistoryList(expectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//*[contains(local-name(),'description')]//*[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Description",
        [acctualValue, expectedValue, "Incorrect Description"]
      );
    } catch (error) {
      console.log('validateDescriptionOnHistoryList');
      console.log(error);
      return false;
    }
  }
  public async validateTimestampOnHistoryList(expectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(lblActualValue);

      if (compareDate(acctualValue, addMinute(expectedValue, 3)) === 1 && compareDate(addMinute(expectedValue, -3), acctualValue) === 1) {
        logSuccessMessage("Timestamp is correctly!");
        return true;
      }
      else {
        return await this.driverService.validateRecord("Validate Timestamp",
          [acctualValue, expectedValue, "Incorrect Timestamp"]
        );
      }
    } catch (error) {
      console.log('validateTimestampOnHistoryList');
      console.log(error);
      return false;
    }
  }
  public async validateUpdatedByOnHistoryList(expectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-queue-owner-col//*[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate UpdatedBy",
        [acctualValue, expectedValue, "Incorrect UpdatedBy"]
      );
    } catch (error) {
      console.log('validateUpdatedByOnHistoryList');
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Get value on list
  public async getValueHistoryList(nameOfColumn: string, positionRow: number = 1) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Type": {
          temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td[1]//*[text()]`);
          break;
        }
        case "Description": {
          temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-event-description//*[text()]`);
          break;
        }
        case "Timestamp": {
          temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
          break;
        }
        case "Updated by": {
          temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-queue-owner-col//*[text()]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return "";
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);
      return actualValue;
    } catch (error) {
      console.log("getValueHistoryList");
      console.log(error);
      return "";
    }
  }
  //#endregion
  //#endregion
}