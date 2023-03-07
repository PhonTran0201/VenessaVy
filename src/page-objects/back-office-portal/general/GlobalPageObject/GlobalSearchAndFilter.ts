import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, closeToastMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../shared/functions";

export class GlobalSearchAndFilter {
  protected btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");
  protected btnCloseSearchAndFilterForm = By.xpath("//div[contains(@class,'card-header')]/button/i[contains(@class,'fa-times')]");

  // Buttons on form
  protected btnSearchSearchFilter = By.xpath("//*[contains(local-name(),'filter')]//span[contains(@class,'fa-loading')]");
  protected btnClearSearchFilter = By.xpath("//*[contains(local-name(),'filter')]//button[text()='Clear ']");
  protected btnSaveSearchFilter = By.xpath("//*[contains(local-name(),'filter')]//button[not (@disabled)]/span[text()='Save']");

  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Open/Close Search Filter form
  public async openSearchAndFilterForm() {
    try {
      let formSearchAndFilterExpanded = By.xpath("//div[contains(@class,'show-right-side')]");
      if (!(await this.driverService.isExisted(formSearchAndFilterExpanded))) {
        await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
        await this.driverService.click(this.btnSearchAndFilter);
        await this.driverService.waitUntilElementLoaded(formSearchAndFilterExpanded);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      return true;
    } catch (error) {
      console.log("openSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkFormSearchFilterShowing(){
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const searchFilterFormShowing = By.xpath(`//c-page-layout/div[contains(@class,'show-right-side')]`);
      return await this.driverService.isExisted(searchFilterFormShowing);
    } catch (error) {
      console.log("checkFormSearchFilterShowing");
      console.log(error);
      return false;
    }
  }

  public async closeSearchAndFilterForm() {
    try {
      let formSearchAndFilterClosed = By.xpath("//app-customer-list//div[@class='c-page-wrapper']");
      if (!(await this.driverService.isExisted(formSearchAndFilterClosed))) {
        await this.driverService.waitUntilElementLoaded(this.btnCloseSearchAndFilterForm);
        await this.driverService.click(this.btnCloseSearchAndFilterForm);
        await this.driverService.waitUntilElementLoaded(formSearchAndFilterClosed);
        await this.driverService.waitForSeconds(2000);
      }
      return true;
    } catch (error) {
      console.log("closeSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Press button on Search Filter form
  public async pressSearchAtSearchAndFilter(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSearchSearchFilter);
      await closeToastMessage(this.driverService);
      await this.driverService.click(this.btnSearchSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(2000);
      if (await this.driverService.isExisted(By.xpath("//app-customer-filter//formly-validation-message"))) {
        logWarningMessage("Input data is not correct format!");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async pressSaveAtSearchAndFilter(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveSearchFilter);
      await closeToastMessage(this.driverService);
      await this.driverService.click(this.btnSaveSearchFilter);
      if (await this.driverService.isExisted(By.xpath("//app-customer-filter//formly-validation-message"))) {
        logWarningMessage("Input data is not correct format!");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async pressClearAtSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnClearSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await closeToastMessage(this.driverService);
      await this.driverService.click(this.btnClearSearchFilter);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      if (await this.driverService.isExisted(By.xpath("//formly-validation-message"))) {
        logWarningMessage("Validation message has NOT been deleted after press Clear filter");
        return false;
      }
      return true;
    } catch (error) {
      console.log("pressClearAtSearchAndFilter");
      console.log(error);
      return false;
    }
  }
  //#endregion
}
