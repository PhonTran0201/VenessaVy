import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";


export class ClaimTabDocumentListInsurance {
  //Element at Claim document list
  private btnUploadDocument = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Upload Document') or contains(text(),'Upload document ')]");

  constructor(private driverService: SeleniumWebDriverService) { }

  //#region /*Begin: Methods on Claim document list*/
  public async openDocumentForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnUploadDocument);
      return true;
    } catch (error) {
      console.log('openDocumentForm');
      console.log(error);
      return false;
    }
  }
  //#region // Validate values at Claim Document list
  public async validateValueClaimDocumentList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Type": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[3]//*[self::*[text()]]`);
          break;
        }
        case "File Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[4]//*[self::*[text()]]`);
          break;
        }
        case "Size": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[5]//*[self::*[text()]]`);
          break;
        }
        case "Uploaded By": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[6]//*[self::*[text()]]`);
          break;
        }
        case "Date": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[7]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      //Maximize delay time is 3 minutes.
      if (nameOfColumn.localeCompare("Date") === 0 && actualValue.localeCompare(expectedValue) !== 0) {
        if (Number(actualValue.substring(14, 16)) - Number(expectedValue.substring(14, 16)) < 3) {
          expectedValue = actualValue;
        }
      }

      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch(`Validate column "${nameOfColumn}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
        );
      }
      else {
        return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
        );
      }
    } catch (error) {
      console.log("validateValueClaimDocumentList");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async DownloadDocumentByName(selectedDocument: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      for (let i = 1; i <= 30; i++) {
        let lblFileName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[4]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblFileName)) {
          let nameAccount = await this.driverService.getText(lblFileName);
          if (nameAccount.localeCompare(selectedDocument) === 0) {
            await this.driverService.click(lblFileName);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("DownloadDocumentByName");
      console.log(error);
      return false;
    }
  }

  public async RemoveDocumentByName(selectedDocument: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      for (let i = 1; i <= 30; i++) {
        let lblFileName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[4]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblFileName)) {
          let nameAccount = await this.driverService.getText(lblFileName);
          if (nameAccount.localeCompare(selectedDocument) === 0) {
            const btnRemove = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]//i[contains(@class,'fa-trash')]`);
            await this.driverService.click(btnRemove);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("RemoveDocumentByName");
      console.log(error);
      return false;
    }
  }

  public async getPositionRowDocumentByName(selectedDocument: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      for (let i = 1; i <= 30; i++) {
        let lblFileName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[4]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblFileName)) {
          let nameAccount = await this.driverService.getText(lblFileName);
          if (nameAccount.localeCompare(selectedDocument) === 0) {
            return i;
          }
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return -1;
    } catch (error) {
      console.log("getPositionRowDocumentByName");
      console.log(error);
      return -1;
    }
  }

  //#region  //Get value Claim document list
  public async getValueClaimDocumentList(nameOfColumn: string, positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Type": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[3]//*[self::*[text()]]`);
          break;
        }
        case "File Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[4]//*[self::*[text()]]`);
          break;
        }
        case "Size": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[5]//*[self::*[text()]]`);
          break;
        }
        case "Uploaded By": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[6]//*[self::*[text()]]`);
          break;
        }
        case "Date": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[7]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return "";
      }

      return await this.driverService.getText(temp);
    } catch (error) {
      console.log("getValueClaimDocumentList");
      console.log(error);
      return "";
    }
  }
  //#endregion
  //#endregion
}