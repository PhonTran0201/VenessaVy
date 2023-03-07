import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";


/**
 * Header
 */
export class GlobalHeaderCP {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpaths
    protected btnFrameAgreementsMenu = By.xpath(`//app-header//li[.//*[text()=' Frame agreements ']]`);
    protected btnApplicationsMenu = By.xpath(`//app-header//li[.//*[text()=' Applications ']]`);
    protected btnGuaranteesMenu = By.xpath(`//app-header//li[.//*[text()=' Guarantees ']]`);

    //#endregion

    //#region Methods
    public async navigateToMainFrameAgreement() {
        try {
          await this.driverService.waitUntilElementLoaded(this.btnFrameAgreementsMenu);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await this.driverService.click(this.btnFrameAgreementsMenu);
          return true;
        } catch (error) {
          console.log("navigateToMainFrameAgreement");
          console.log(error);
          return false;
        }
      }
      public async navigateToMainApplication() {
        try {
          await this.driverService.waitUntilElementLoaded(this.btnApplicationsMenu);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await this.driverService.click(this.btnApplicationsMenu);
          return true;
        } catch (error) {
          console.log("navigateToMainApplication");
          console.log(error);
          return false;
        }
      }
      public async navigateToMainGuarantee() {
        try {
          await this.driverService.waitUntilElementLoaded(this.btnGuaranteesMenu);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await this.driverService.click(this.btnGuaranteesMenu);
          return true;
        } catch (error) {
          console.log("navigateToMainGuarantee");
          console.log(error);
          return false;
        }
      }
    //#endregion
}