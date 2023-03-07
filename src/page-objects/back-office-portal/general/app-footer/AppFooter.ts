import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logInfoMessage, logSuccessMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { GlobalPageObject } from "../GlobalPageObject/GlobalPageObject";

/**
 * Footer of System
 */
export class AppFooter {
  constructor(private driverService: SeleniumWebDriverService) { }

  //App follow up menu
  protected btnCase = By.xpath(`//app-follow-menu//*[@id='pgs-case']`);
  protected btnNote = By.xpath(`//app-follow-menu//*[@id='pgs-note']`);
  protected btnSupport = By.xpath(`//app-footer//a[contains(text(), 'Support')]`);
  protected btnBugReport = By.xpath(`//app-footer//a[contains(text(), 'Bug Report')]`);
  protected lblTenant = By.xpath(`//app-footer//*[contains(@class, 'tenant-name')]`);
  protected lblCopyright = By.xpath(`//app-footer//*[contains(@class, 'copyright')]`);



  //#region Buttons on App follow up menu
  public async pressNoteOnAppFollowUp() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNote);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const globalPageObject = new GlobalPageObject(this.driverService);
      await globalPageObject.closeAllToastError();
      await globalPageObject.closeAllToastSuccess();
      await globalPageObject.closeOpeningForm();

      await this.driverService.click(this.btnNote);
      return true;
    } catch (error) {
      console.log("pressNoteOnAppFollowUp");
      console.log(error);
      return false;
    }
  }

  public async pressCaseOnAppFollowUp() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCase);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const globalPageObject = new GlobalPageObject(this.driverService);
      await globalPageObject.closeAllToastError();
      await globalPageObject.closeAllToastSuccess();
      await this.driverService.click(this.btnCase);
      return true;
    } catch (error) {
      console.log("pressCaseOnAppFollowUp");
      console.log(error);
      return false;
    }
  }

  public async validateTenantNameIsVisible(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTenant);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await (await this.driverService.getText(this.lblTenant)).replace("Tenant: ", "").trim();;
      return await this.driverService.validateRecord("Validate Tenant name: ",
        [ActualValue, ExpectedValue, "Incorrect Tenant name!"]
      );
    } catch (error) {
      console.log('validateTenantNameIsVisible');
      console.log(error);
      return false;
    }
  }

  public async validateCopyrightIsVisible(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCopyright);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await await this.driverService.getText(this.lblCopyright);
      return await this.driverService.validateRecord("Validate Copyright: ",
        [ActualValue, ExpectedValue, "Incorrect Copyright!"]
      );
    } catch (error) {
      console.log('validateCopyrightIsVisible');
      console.log(error);
      return false;
    }
  }
  public async validatebtnSupportIsVisible() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      logInfoMessage(`Validate Support button... `);
      if (await this.driverService.isExisted(this.btnSupport)) {
        logSuccessMessage('Test passed');
        return true;
      } else {
        logSuccessMessage('Test Failed!');
        return false;
      }
    } catch (error) {
      console.log('validatebtnSupportIsVisible');
      console.log(error);
      return false;
    }
  }

  public async validatebtnBugReportIsVisible() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      logInfoMessage(`Validate BugReport button... `);
      if (await this.driverService.isExisted(this.btnBugReport)) {
        logSuccessMessage('Test passed');
        return true;
      } else {
        logSuccessMessage('Test Failed!');
        return false;
      }
    } catch (error) {
      console.log('validatebtnBugReportIsVisible');
      console.log(error);
      return false;
    }
  }

  //#endregion
}