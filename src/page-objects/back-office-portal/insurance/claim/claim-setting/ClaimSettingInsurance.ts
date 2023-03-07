import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ClaimSettingInsurance {

  constructor(private driverService: SeleniumWebDriverService) { }

  /**
   * 
   * @param nameOfTab Claim types, Cause types,...
   * This will open a tab at Claim setting
   */
  public async openTabOnClaimSetting(nameOfTab: string) {
    try {
      const btnTab = By.xpath(`//app-claim-setting//ul[contains(@role,'tablist')]//a[@title='${nameOfTab}']`);
      await this.driverService.waitUntilElementLoaded(btnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(btnTab);
      return true;
    } catch (error) {
      console.log('openTabOnClaimSetting');
      console.log(error);
      return false;
    }
  }
}