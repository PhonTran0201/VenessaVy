import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../../../shared/functions";


const remote = require("selenium-webdriver/remote");

export class CaseDetailsInfoDetailAttachments {

  constructor(private driverService: SeleniumWebDriverService) { }

  public async uploadFileAttachment(UploadDocuments: string) {
    try {
      const inputUploadFile = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-attachment//input[contains(@type,'file')]");
      await this.driverService.waitUntilElementLoaded(inputUploadFile);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(inputUploadFile)).sendKeys(UploadDocuments);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("uploadFileAttachment");
      console.log(error);
      return true;
    }
  }
  public async downloadFileAttachment(filePath: string) {
    try {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      const btnFileAttachment = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-attachment//div[contains(@class,'file-item')]//*[text()='${fileName}']`);
      await this.driverService.waitUntilElementLoaded(btnFileAttachment);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(btnFileAttachment);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.pressEnterCurrentElement();
      return true;
    } catch (error) {
      console.log("downloadFileAttachment");
      console.log(error);
      return true;
    }
  }
  public async removeFileAttachment(filePath: string) {
    try {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      const btnRemoveFileAttachment = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-attachment//div[contains(@class,'file-item') and .//div[text()='${fileName}']]/span[contains(@class,'delete-file')]`);
      await this.driverService.waitUntilElementLoaded(btnRemoveFileAttachment);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(btnRemoveFileAttachment);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("removeFileAttachment");
      console.log(error);
      return true;
    }
  }
  public async checkFileAttachmentExist(filePath: string) {
    try {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      const fileAttachment = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-attachment//div[contains(@class,'file-item')]//div[@title='${fileName}']`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return await this.driverService.isExisted(fileAttachment);
    } catch (error) {
      console.log("checkFileAttachmentExist");
      console.log(error);
      return true;
    }
  }
}
