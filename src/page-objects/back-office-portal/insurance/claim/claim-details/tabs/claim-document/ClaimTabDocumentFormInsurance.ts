import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logInfoMessage } from "../../../../../../../shared/functions";


const remote = require("selenium-webdriver/remote");

export class ClaimTabDocumentFormInsurance {

  //Element on Claim document form
  private txtFileName = By.xpath(`//*[@id="pgs-cus-doc-filename"] | //app-claim-detail-tab-documents-form//div[./label[text()=' File Name ']]//input`);
  private cmbDocumentType = By.xpath("//app-claim-detail-tab-documents-form//div[./label[text()=' Document Type ']]//input");
  private btnUploadFile = By.xpath("//app-claim-detail-tab-documents-form//div[./div/button[text()=' Upload files ']]//input");


  constructor(private driverService: SeleniumWebDriverService) { }

  //#region // Methods at Document form
  public async inputFileNameDocumentForm(fileName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFileName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtFileName, fileName);
      return true;
    } catch (error) {
      console.log('inputFileNameDocumentForm');
      console.log(error);
      return false;
    }
  }

  public async inputDocumentTypeDocumentForm(documentType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbDocumentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.cmbDocumentType, documentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(documentType, "", this.driverService);
      return true;
    } catch (error) {
      console.log('inputDocumentTypeDocumentForm');
      console.log(error);
      return false;
    }
  }

  public async inputFileDocumentForm(UploadDocuments: string) {
    try {
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(this.btnUploadFile)).sendKeys(
        UploadDocuments
      );
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("inputFileDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async checkValidationOnClaimDocumentFormExist() {
    const validation = By.xpath(`//app-claim-detail-tab-documents-form//formly-validation-message`);
    return await this.driverService.isExisted(validation);
  }
  //#endregion
}