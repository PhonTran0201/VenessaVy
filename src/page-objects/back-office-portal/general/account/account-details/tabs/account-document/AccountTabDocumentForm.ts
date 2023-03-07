import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage } from "../../../../../../../shared/functions";

const remote = require("selenium-webdriver/remote");

export class AccountTabDocumentForm {
  //Locator of elements at "Document" form
  protected txtName = By.xpath("//app-customer-document-form//*[@id='pgs-cus-doc-filename']");
  protected cmbTags = By.xpath("//app-customer-document-form//*[@id='pgs-cus-doc-tag']");
  protected txtDescription = By.xpath("//app-customer-document-form//*[@id='pgs-cus-doc-descriptipn']");
  protected inputFile = By.xpath("//app-customer-document-form//input[@type='file']");
  protected clearTagsbtn = By.xpath("//app-customer-document-form//*[@title='Clear all']");

  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Input data on Document form
  public async inputNameOnDocumentForm(Name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtName, Name);
      await this.driverService.pressTab(this.txtName);
      return true;
    } catch (error) {
      console.log("inputNameOnDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async inputTagOnDocumentForm(Tags: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbTags);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      // if (await this.driverService.isExisted(this.clearTagsbtn)) {
      //   await this.driverService.click(this.clearTagsbtn);
      // }
      await this.driverService.sendKeys(this.cmbTags, Tags);
      await this.driverService.pressEnter(this.cmbTags);
      await this.driverService.pressTab(this.cmbTags);
      return true;
    } catch (error) {
      console.log("inputTagOnDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async inputDescriptionOnDocumentForm(Description: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescription);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDescription, Description);
      return true;
    } catch (error) {
      console.log("inputDescriptionOnDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async inputUploadFileOnDocumentForm(UploadDocuments: string) {
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
      await this.driverService.click(this.txtName);
      return true;
    } catch (error) {
      console.log("inputUploadFileOnDocumentForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async validateFields(valField: ValidateField): Promise<ValidateField> {
    let valFieldResult = new ValidateField(
      valField.nameField,
      valField.index,
      valField.status,
      valField.message,
      valField.toastMessage
    );
    try {
      await this.driverService.waitForSeconds(2000);

      let txtValidattionMessage = By.xpath(`(//div[contains(@class,'invalid-feedback')]/formly-validation-message)[1]`);
      //let txtValidationToastMessage = By.xpath(`//div[@id="toast-container"]/div/div`)
      if (await this.driverService.isExisted(txtValidattionMessage)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        while (
          await this.driverService.isExisted(
            By.xpath(`(//div[contains(@class,'invalid-feedback')]/formly-validation-message)[${countErrorField}]`)
          )
        ) {
          let errorMessage: string = (
            await this.driverService.getText(txtValidattionMessage)
          ).toString();
          valFieldResult.message.push(errorMessage);
          countErrorField++;
        }
      }
      else {
        await this.driverService.waitForSeconds(2000);
      }
      return valFieldResult;
    } catch (error) {
      console.log("validateField");
      console.log(error);
      return valFieldResult;
    }
  }
}
