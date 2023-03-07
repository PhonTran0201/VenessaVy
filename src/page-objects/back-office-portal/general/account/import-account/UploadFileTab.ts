import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
const remote = require("selenium-webdriver/remote");

export class UploadFileTab {
    constructor(protected driverService: SeleniumWebDriverService) { }

    protected inputFile = By.xpath("//input[@type='file']");
    protected txtName = By.xpath("//*[contains(@class,'upload-table')]");
    protected cmbAccountType = By.xpath('//app-sale-import//*[contains(label,"Type")]//input');
 

    public async inputUploadFileOnImportAccountForm(UploadDocuments: string) {
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
          console.log("inputUploadFileOnImportAccountForm");
          console.log(error);
          return false;
        }
      }

      public async inputAccountTypeOnImportAccountForm(Type:string){
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbAccountType);
            await this.driverService.setText(this.cmbAccountType, Type);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Type,"",this.driverService);
            return true;
        } catch (error) {
            console.log("inputAccountTypeOnImportAccountForm");
            console.log(error);
            return false;
        }
      }
}