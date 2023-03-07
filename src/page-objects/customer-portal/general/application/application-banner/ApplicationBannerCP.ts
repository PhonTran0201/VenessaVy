import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { SystemLanguageIndex as sli } from "../../../../../shared/system-language-index/SystemLanguageIndex";
export class ApplicationBannerCP {
  protected txtSearchKeyword = [
    By.xpath("//app-application-list//input[@placeholder='Enter search keyword']"),
    By.xpath("//app-application-list//input[@placeholder='Søk etter tittel']")
  ][sli.getValue()];
  protected btnSearchKeyword = [
    By.xpath("//app-application-list//div[./input[@placeholder='Enter search keyword']]//button")
  ][sli.getValue()];

  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Input values
  public async inputSearchKeyword(searchKeyword: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSearchKeyword);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.setText(this.txtSearchKeyword, searchKeyword);
      return true;
    } catch (error) {
      console.log('inputSearchKeyword');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Press buttons
  public async pressSearchButton() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSearchKeyword);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.txtSearchKeyword);
      return true;
    } catch (error) {
      console.log('pressSearchButton');
      console.log(error);
      return false;
    }
  }
  //#endregion
}
