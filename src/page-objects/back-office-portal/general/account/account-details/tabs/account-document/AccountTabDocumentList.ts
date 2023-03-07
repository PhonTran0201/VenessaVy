import { strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { DebugElement } from "../../../../../../../core/fields/DebugElement";
import { TableManager } from "../../../../../../../core/fields/TableManager";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, reloadTable, logWarningMessage } from "../../../../../../../shared/functions";
import { StepScreenshot } from "../../../../../../../shared/stepscreenshot";


const downloadsFolder = require("downloads-folder");
const fs = require("fs");
export class AccountTabDocumentList extends BasePage {
  //#region Attribure
  //#region Top on table
  protected btnUploadDocument = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-upload-doc']");
  protected btnDownloadDocument = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-download-doc']");
  protected btnGenerateDocument = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id="pgs-generate-report" or contains(text(),'Generate Document')]`);
  protected txtsearchDocument = By.xpath("//app-customer-document-list//*[contains(@class,'input-search')]//input");
  //#endregion

  //#region Locator of elements at the first row of Document list
  protected lblName = By.xpath("//tbody/tr[1]//app-download-link-col/a");
  protected lblDescription = By.xpath("//app-customer-document-list//table/tbody/tr/td[4]/span");
  protected lblTags = By.xpath("//app-customer-document-list//table/tbody/tr/td[5]//span");
  protected lblCreatedDate = By.xpath("//app-customer-document-list//table/tbody/tr/td[7]/span");
  protected lblCreatedBy = By.xpath("//app-customer-document-list//table/tbody/tr/app-queue-owner-col/span");

  //#endregion

  //Buttons at Action column
  protected btnDelete = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//*[contains(@class,'fa-trash')]");
  protected btnDownload = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//*[contains(@class,'fa-download')]");
  //#endregion
  constructor(protected driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //#region Methods on Top of table
  public async openUploadDocumentPopup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUploadDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnUploadDocument);
    } catch (error) {
      console.log("openUploadDocumentPopup");
      console.log(error);
    }
  }

  public async verifyGenerateDocumentButton() {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//c-details-layout`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let temp = await this.driverService.isExisted(this.btnGenerateDocument);
      return temp;
    } catch (error) {
      console.log(`verifyGenerateDocumentButton`);
      console.log(error);
      return false;
    }
  }

  public async searchDocumentOnDocumentTab(searchName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtsearchDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.txtsearchDocument, searchName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.txtsearchDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.txtsearchDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.pressEnterCurrentElement();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      return true;
    } catch (error) {
      console.log("searchDocumentOnDocumentTab");
      console.log(error);
      return false;
    }
  }

  public async openGenerateDocumentsForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnGenerateDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      let btnDropdown = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[./i[contains(@class,'fa-chevron-down')]]`);
      if(await this.driverService.isExisted(btnDropdown)){
        await this.driverService.click(btnDropdown);
      }
      await this.driverService.click(this.btnGenerateDocument);
      return true;
    } catch (error) {
      console.log('openGenerateDocumentsForm');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Methods on Table
  public async downloadDocumentByNameInDocumentTab(selectedDocument: string, TotalRecord: number = 1) {
    try {
      const lblName = By.xpath(`//tbody/tr[${TotalRecord}]//app-download-link-col/a`);
      await this.driverService.waitUntilElementLoaded(lblName);
      if ((await this.driverService.isExisted(lblName)) === false) {
        // logWarningMessage(
        //   `Can't find document with name \"${selectedDocument}\" into Document List`
        // );
      } else {
        let nameDoc = await this.driverService.getText(lblName);
        if (nameDoc.toLowerCase().includes(selectedDocument.toLowerCase())) {
          let btnDownload = By.xpath(`//tbody/tr[${TotalRecord}]//*[@id='pgs-doc-c-download']`);
          await this.driverService.click(btnDownload);
          await waitUntilHorizontalProgressBarLoaded(this.driverService);
          return true;
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("downloadDocumentByNameTab");
      console.log(error);
      return false;
    }
  }
  public async deleteValidDocument() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnDelete);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnDelete);
      return true;
    } catch (error) {
      console.log("deleteValidDocument");
      console.log(error);
      return false;
    }
  }
  public async downloadDocument() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnDownload);
      await this.driverService.click(this.btnDownload);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.pressEnterCurrentElement();
      return true;
      //WebElement currentElement = driver.switchTo().activeElement();
    } catch (error) {
      console.log("downloadDocument");
      console.log(error);
      return false;
    }
  }
  public async DownloadDocumentByName(selectedDocument: string) {
    try {
      await this.driverService.waitForSeconds(3000);
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-download-link-col//a)[1]'));
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//app-download-link-col//a)[${i}]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // logWarningMessage(
          //   `Can't find document with name \"${selectedDocument}\" into Document List`
          // );
        } else {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedDocument) === 0) {
            let btnDownload = By.xpath(`(//app-document-action-cell/button[2])[${i}]`);
            await this.driverService.click(btnDownload);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("Download Document By Name");
      console.log(error);
      return false;
    }
  }
  public async DeleteDocumentByName(selectedDocument: string) {
    try {
      await this.driverService.waitForSeconds(3000);
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-download-link-col//a)[1]'));
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//app-download-link-col//a)[${i}]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // logWarningMessage(
          //   `Can't find document with name \"${selectedDocument}\" into Document List`
          // );
        } else {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedDocument) === 0) {
            let btnDelete = By.xpath(`(//app-document-action-cell/button[1])[${i}]`);
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("Delete Document By Name");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Assert values on Table

  public async assertUploadDocument(
    Name: string,
    Tags: string,
    Description: string,
    CreatedDate: string,
    posisionRow: number = 1,
    CreateBy: string
  ) {
    let actualName: string = "";
    let actualTags: string = "";
    let actualDescription: string = "";
    let actualCreatedDate: string = "";
    let actualCreatedBy: string = "";
    let lblName = By.xpath(`//tbody/tr[${posisionRow}]//app-download-link-col/a`);
    let lblDescription = By.xpath(`//app-customer-document-list//table/tbody/tr[${posisionRow}]/td[4]/span`);
    let lblTags = By.xpath(`//app-customer-document-list//table/tbody/tr[${posisionRow}]/td[5]//span`);
    let lblCreatedDate = By.xpath(`//app-customer-document-list//table/tbody/tr[${posisionRow}]/td[7]/span`);
    let lblCreatedBy = By.xpath(`//app-customer-document-list//table/tbody/tr[${posisionRow}]//app-queue-owner-col/span`);

    try {

      await this.driverService.waitUntilElementLoaded(lblName);
      actualName = await this.driverService.getText(lblName);
      actualTags = await this.driverService.getText(lblTags);
      actualDescription = await this.driverService.getText(lblDescription);
      actualCreatedDate = await this.driverService.getText(lblCreatedDate);
      actualCreatedBy = await this.driverService.getText(lblCreatedBy);

      // await this.driverService.click(this.btnCloseCurrentAccount);
    } catch (error) {
      console.log("assertUploadDocument");
      console.log(error);
      return false;
    }

    if(actualName.includes(Name)) {
      Name = actualName;
    }
    //Maximize delay time is 3 minutes.
    if (actualCreatedDate.localeCompare(CreatedDate) !== 0) {
      if (Number(actualCreatedDate.substring(14, 16)) - Number(CreatedDate.substring(14, 16)) < 3) {
        CreatedDate = actualCreatedDate;
      }
    }

    if(actualDescription.includes(Description)){
      Description = actualDescription;
    }
    
    return await this.driverService.validateRecord(
      "Upload document successfully",
      [actualName, Name, "Assert at Name: Incorrect Name"],
      [actualTags, Tags, "Assert at Tags: Incorrect Tags"],
      [actualDescription, Description, "Assert at Description: Incorrect Description"],
      [actualCreatedDate, CreatedDate, "Assert at CreatedDate: Incorrect CreatedDate"],
      [actualCreatedBy, CreateBy, "Assert at CreatedBy: Incorrect CreatedBy"]
    );
  }

  public async assertDeleteValidDocument() {
    await this.driverService.waitForSeconds(5000);
    if (await this.driverService.isExisted(this.lblName)) {
      await this.driverService.validateTestCase(
        "Delete document successfully",
        ["1", "0", "Can't delete the Document"]
      );
    }
    else {
      await this.driverService.validateTestCase(
        "Delete document successfully",
        ["1", "1", ""]
      );
    }
  }

  public async assertDownloadDocument(fileNameDownload: string) {
    await this.driverService.waitForSeconds(4000);
    const fileName = fileNameDownload;
    let path = "";
    if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
      // path = "/home/seluser/Downloads/" + fileName;
      return;//When run on Jenkins, Chrome browser was run on an image docker, and file downloaded found on there.
    }
    else {
      path = downloadsFolder() + "\\" + fileName;;
    }
    logWarningMessage("Path file downloaded: " + path);
    if (fs.existsSync(path)) {
      await this.driverService.validateTestCase(
        "Download document successfully",
        ["1", "1", ""]
      );
    } else {
      await this.driverService.validateTestCase(
        "Download document successfully",
        ["1", "0", "Can't download the Document"]
      );
    }
  }

  public async assertDeleteDocument(
    positionRow: number = 1,
    name: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete document "${name}"`);
    } else {
      let actualName: string = "";
      let txtName = By.xpath(
        `//table/tbody/tr[${positionRow}]//app-download-link-col/a`
      );

      try {
        await reloadTable(this.driverService);
        await this.driverService.waitForSeconds(4000);
        await reloadTable(this.driverService);
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await (
            await this.driverService.findElement(txtName)
          ).getText();
        } else {
          console.info("Delete document passed");
          return;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
      }
      notStrictEqual(actualName, name, "Assert at Document Name");
    }
  }

  public async assertDocumentExistence(
    positionRow: number = 1,
    Name: string,
    Tags: string,
    Description: string,
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", Tags, `Note does not exist "${Tags}"`);
    } else {
      let actualName: string = "";
      let actualTags: string = "";
      let actualDescription: string = "";

      let lblName = By.xpath(`//tbody/tr[${positionRow}]//app-download-link-col/a`);
      let lblDescription = By.xpath(
        `//app-customer-document-list//table/tbody/tr[${positionRow}]/td[3]/span`
      );
      let lblTags = By.xpath(
        `//app-customer-document-list//table/tbody/tr[${positionRow}]/td[4]//span`
      );
      try {
        if (await this.driverService.isExisted(lblName)) {
          await this.driverService.waitUntilElementLoaded(lblName);
          actualName = await (
            await this.driverService.findElement(lblName)
          ).getText();
          actualTags = await (
            await this.driverService.findElement(lblTags)
          ).getText();
          actualDescription = await (await this.driverService.findElement(lblDescription)
          ).getText();
        } else {
          console.info("Case does not exist");
          return;
        }
      } catch (error) {
        console.error("Assert Assign note");
        console.error(error);
      }
      notStrictEqual(actualName, Name, "Assert at Name");
      notStrictEqual(actualTags, Tags, "Assert at Description");
      notStrictEqual(actualDescription, Description, "Assert at Priority");
    }
  }
  //#endregion  

  //#region Validate values on list
  public async validateValueDocumentList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]//app-download-link-col//*[text()]`);
          break;
        }
        case "Description": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]//td[4]//*[text()]`);
          break;
        }
        case "Document tags": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]//app-tag-cell//*[text()]`);
          break;
        }
        case "Created by": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]//app-queue-owner-col//*[text()]`);
          break;
        }
        case "Created date": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]//td[7]//*[text()]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getText(temp);
      //Maximize delay time is 3 minutes.
      if (nameOfColumn.localeCompare("Created date") === 0 && actualValue.localeCompare(expectedValue) !== 0) {
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
      console.log("validateValueDocumentList");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async findDocumentByName(Name: string) {
    try {

      let tbDocumentName = await this.getFieldType(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-document-list//table[contains(@class,'table-striped')]`));
      let row = await (tbDocumentName as TableManager).findRowElementByValue(Name);
      await DebugElement.getInstance().dump(row);
      await (tbDocumentName as TableManager).setCheckboxStateByValue(Name);
      return true;
    } catch (error) {
      console.log("findDocumentByName");
      console.log(error);
      return false;
    }
  }

  public async tickCheckAllDocumentOnHeader(posisionRow: number = 1) {
    try {
      let checkBoxDocument = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-check-box-cell-header//span[@class='check']`);
      await this.driverService.waitForElementEnabled(checkBoxDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(checkBoxDocument);
      return true;
    } catch (error) {
      console.log("tickCheckAllDocumentOnHeader");
      console.log(error);
      return false;
    }
  }

  public async tickCheckBoxDocumentByRow(posisionRow: number = 1) {
    try {
      let checkBoxDocument = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${posisionRow}]//span[@class='check']`);
      await this.driverService.waitForElementEnabled(checkBoxDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(checkBoxDocument);
      return true;
    } catch (error) {
      console.log("tickCheckBoxDocumentRow");
      console.log(error);
      return false;
    }
  }
   public async validateCheckeBoxIsTickedByRowOnDocumentList(posisionRow: number = 1) {
    try {
        let attrIsChecked = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${posisionRow}]//label[@class = 'input-check']//input`);
        await this.driverService.waitUntilElementLoaded(attrIsChecked);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        return await this.driverService.getAttributeValue(attrIsChecked, "checked") === 'true';
    } catch (error) {
        console.log("validateCheckeBoxIsTickedByRowOnDocumentList");
        console.log(error);
        return false;
    }
}
  public async getDocumentNameByRow(posisionRow: number = 1) {
    try {
      let DocumentName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${posisionRow}]//app-download-link-col//*[text()]`);
      await this.driverService.waitForElementEnabled(DocumentName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return await this.driverService.getText(DocumentName);
    } catch (error) {
      console.log("getDocumentNameByRow");
      console.log(error);
      return "";
    }
  }

  public async pressBtnDownLoadDocumentInList() {
    try {
      let btnDownload = By.xpath("//*[@id='pgs-download-doc']");
      await this.driverService.waitUntilElementLoaded(btnDownload);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(btnDownload);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      StepScreenshot.getInstance().captureThisStep(true);
      return true;
    } catch (error) {
      console.log("pressBtnDownLoadDocumentInList");
      console.log(error);
      return false;
    }
  }
}
