//extend account tab document list
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, logWarningMessage, logInfoMessage, selectDropdownOption } from "../../../../../../../shared/functions";
import { AccountTabDocumentList } from "../../../../../general/account/account-details/tabs/account-document/AccountTabDocumentList";



const remote = require("selenium-webdriver/remote");

export class AccountTabDocumentListGuarantee extends AccountTabDocumentList {

  private inputFile = By.xpath("//*[contains(local-name(),'form')]//app-document-tab//input[@type='file']");
  private btnUpload = By.xpath("//*[contains(local-name(),'form')]//button[@id='pgs-guar-upload-document']");
  private cmbTypeUpload = By.xpath("//*[@id = 'pgs-cus-doc-tag']");


  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //Used in Document tab
  public async assertUploadDocument(
    Name: string,
    Tags: string,
    Description: string,
    CreatedDate: string,
    TotalRecord: number = 1,
    CreateBy: string = ""
  ) {
    let actualName: string = "";
    let actualTags: string = "";
    let actualDescription: string = "";
    let actualCreatedDate: string = "";

    try {
      const lblName = By.xpath(`//tbody/tr[${TotalRecord}]//app-download-link-col/a`);
      const lblDescription = By.xpath(`//app-customer-document-list//table/tbody/tr[${TotalRecord}]/td[4]/span`);
      const lblTags = By.xpath(`//app-customer-document-list//table/tbody/tr[${TotalRecord}]/td[5]//span`);
      const lblCreatedDate = By.xpath(`//app-customer-document-list//table/tbody/tr[${TotalRecord}]/td[7]/span`);
      // await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(lblName);
      // await reloadTable(this.driverService);
      actualName = await this.driverService.getText(lblName);
      actualTags = await this.driverService.getText(lblTags);
      actualDescription = await this.driverService.getText(lblDescription);
      actualCreatedDate = await this.driverService.getText(lblCreatedDate);

      // await this.driverService.click(this.btnCloseCurrentAccount);
    } catch (error) {
      console.log("assertUploadDocument");
      console.log(error);
      return false;
    }

    //Maximize delay time is 3 minutes.
    if (actualCreatedDate.localeCompare(CreatedDate) !== 0) {
      if (Number(actualCreatedDate.substring(14, 16)) - Number(CreatedDate.substring(14, 16)) < 3) {
        CreatedDate = actualCreatedDate;
      }
    }

    if (actualName.toLowerCase().includes(Name.toLowerCase())) {
      Name = actualName;
    }

    if (actualTags.toLowerCase().includes(Tags.toLowerCase())) {
      Tags = actualTags;
    }

    if (actualDescription.toLowerCase().includes(Description.toLowerCase())) {
      Description = actualDescription;
    }

    return await this.driverService.validateRecord(
      "Upload document successfully",
      [actualName, Name, "Assert at Name: Incorrect Name"],
      [actualTags, Tags, "Assert at Tags: Incorrect Tags"],
      [actualDescription, Description, "Assert at Description: Incorrect Description"],
      [actualCreatedDate, CreatedDate, "Assert at CreatedDate: Incorrect CreatedDate"]
    );
  }


  //Used in Detail form
  public async inputUploadFileOnDocumentInDetailForm(UploadDocuments: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.inputFile);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(this.inputFile)).sendKeys(UploadDocuments);
      await this.driverService.waitForSeconds(3000);
      return true;
    } catch (error) {
      console.log("inputUploadFileOnDocumentInDetailForm");
      console.log(error);
      return false;
    }
  }

  public async inputTypeOfUploadedDocument(type: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbTypeUpload);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbTypeUpload, type);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(type, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputTypeOfUploadedDocument");
      console.log(error);
      return false;
    }
  }

  public async navigateToDocumentTabInDetailForm() {
    try {
      const tabDocument = By.xpath("//*[contains(local-name(),'form')]//a[text()='Documents']");
      await this.driverService.waitUntilElementLoaded(tabDocument);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(tabDocument);
      return true;
    } catch (error) {
      console.log("navigateToDocumentTabInDetailForm");
      console.log(error);
      return false;
    }
  }

  public async clickBtnUploadInDetailForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnUpload);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnUpload);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("clickBtnUploadInDetailForm");
      console.log(error);
      return false;
    }
  }

  public async assertDocumentInDetailForm(Name: string, UploadedDate: string, Type: string, TotalRecord: number = 1) {
    let actualName: string = "";
    let actualUploadedDate: string = "";
    let actualType: string = "";
    try {
      for (let i = 1; i <= TotalRecord; i++) {
        logInfoMessage("=>\t Line i = " + i);
        // await this.driverService.waitForSeconds(3000);
        const lblName = By.xpath(`//*[contains(local-name(),'form')]//app-document-tab//tbody//tr[${i}]//td[2]//span`);
        const lblType = By.xpath(`//*[contains(local-name(),'form')]//app-document-tab//tbody//tr[${i}]//td[3]//span`);
        const lblUploadedDate = By.xpath(`//*[contains(local-name(),'form')]//app-document-tab//tbody//tr[${i}]//td[5]//span`);
        await this.driverService.waitUntilElementLoaded(By.xpath("//*[contains(local-name(),'form')]//tbody"));
        actualName = await this.driverService.getText(lblName);
        actualType = await this.driverService.getText(lblType);
        actualUploadedDate = await this.driverService.getText(lblUploadedDate);


        if (actualName.toLowerCase().includes(Name.toLowerCase())) {
          if (UploadedDate.toLowerCase().includes(actualUploadedDate.toLowerCase())) {
            UploadedDate = actualUploadedDate;
          }

          // if (actualName.toLowerCase().localeCompare(Name.toLowerCase()) === 0) {
          Name = actualName;
          // }

          return await this.driverService.validateRecord(
            "The document is created successfully",
            [actualName, Name, "Assert at Name: Incorrect Name"],
            [actualType, Type, "Assert at Type: Incorrect Type"],
            [actualUploadedDate, UploadedDate, "Assert at Created Date: Incorrect Uploaded Date"]
          );
        }
      }
      return false;
    } catch (error) {
      console.log("assertDocumentInDetailForm");
      console.log(error);
      return false;
    }
  }

  public async downloadDocumentByNameinFrameAgreementDetail(selectedDocument: string) {
    try {
      await this.driverService.waitForSeconds(3000);
      const lblName = By.xpath("//app-customer-frame-agreement-document-tab//tbody//td[2]//span");
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-customer-frame-agreement-document-tab//tbody"));
      if ((await this.driverService.isExisted(lblName)) === false) {
        // logWarningMessage(
        //   `Can't find document with name \"${selectedDocument}\" into Document List`
        // );
      } else {
        let nameDoc = await this.driverService.getText(lblName);
        if (nameDoc.toLowerCase().includes(selectedDocument.toLowerCase())) {
          let btnDownload = By.xpath(`//app-customer-frame-agreement-document-tab//*[@id='pgs-doc-c-download']`);
          await this.driverService.click(btnDownload);
          await waitUntilHorizontalProgressBarLoaded(this.driverService);
          return true;
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("downloadDocumentByNameinFrameAgreementDetail");
      console.log(error);
      return false;
    }
  }

  public async downloadDocumentByNameInDetailForm(selectedDocument: string, TotalRecord: number = 1) {
    try {
      await this.driverService.waitForSeconds(3000);
      const lblName = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${TotalRecord}]//td[2]//span`);
      await this.driverService.waitUntilElementLoaded(lblName);
      if ((await this.driverService.isExisted(lblName)) === false) {
        // logWarningMessage(
        //   `Can't find document with name \"${selectedDocument}\" into Document List`
        // );
      } else {
        let nameDoc = await this.driverService.getText(lblName);
        if (nameDoc.toLowerCase().includes(selectedDocument.toLowerCase())) {
          let btnDownload = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${TotalRecord}]//*[@id='pgs-doc-c-download']`);
          await this.driverService.click(btnDownload);
          await waitUntilHorizontalProgressBarLoaded(this.driverService);
          return true;
        }
      }
      logWarningMessage(`Can't find document with name \"${selectedDocument}\" in Document List`);
      return false;
    } catch (error) {
      console.log("downloadDocumentByNameInDetailForm");
      console.log(error);
      return false;
    }
  }

  public async getNumberOfTotalRecordsInDocumentTabDetailForm() {
    try {
      let lblTotalNumberRecord = By.xpath("//*[contains(local-name(),'form')]//div[contains(text(),'Total') and contains(text(),'records')]");
      await this.driverService.waitUntilElementLoaded(lblTotalNumberRecord);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let temp = await this.driverService.getText(lblTotalNumberRecord);
      let result = parseInt(temp.replace(/^\D+/g, ''));
      return result;
    } catch (error) {
      console.log("getNumberOfTotalRecordsInDocumentTabDetailForm");
      console.log(error);
      return -1;
    }
  }


  //Guarantee function
  public async tickCheckBoxByGuaranteeRow(posisionRow: number = 1) {
    try {
      let checkBoxGuarantee = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${posisionRow}]//span[@class='check']`);
      await this.driverService.waitForElementEnabled(checkBoxGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(checkBoxGuarantee);
      return true;
    } catch (error) {
      console.log("tickCheckBoxByGuaranteeRow");
      console.log(error);
      return false;
    }
  }


  public async clickAmendButtonInGuaranteeDetailForm() {
    try {
      const btnAmend = By.xpath(`//app-guarantee-form//button[text()=' Amend ']`);
      await this.driverService.waitForElementEnabled(btnAmend);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(btnAmend);
      return true;
    } catch (error) {
      console.log("clickAmendButtonInGuaranteeDetailForm");
      console.log(error);
      return false;
    }
  }
  public async openApplicationByRowOnApplicationList(posisionRow: number = 1) {
    try {
      const lblApplication = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${posisionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(lblApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(lblApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openApplicationByRowOnApplicationList');
      console.log(error);
      return false;
    }
  }

  public async approveApplicationOnApplicationDetailForm() {
    try {
      const btnAprove = By.xpath(`//app-application-form//button[@title='Approve']`);
      await this.driverService.waitUntilElementLoaded(btnAprove);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(btnAprove);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return true;
    } catch (error) {
      console.log('approveApplicationOnApplicationDetailForm');
      console.log(error);
      return false;
    }
  }

  public async assertTheExistRecordOnDocumentList(posisionRow: number) {
    try {
      let xpathRecord = By.xpath(`//app-customer-document-list//table//tr[${posisionRow}]//app-download-link-col`);
      logInfoMessage(`assert the exist document at line ${posisionRow}`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(xpathRecord)) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('assertTheExistRecordOnDocumentList');
      console.log(error);
      return false;
    }
  }

}