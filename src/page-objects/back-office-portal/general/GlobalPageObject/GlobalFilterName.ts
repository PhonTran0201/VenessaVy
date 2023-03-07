import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

/**
 * "Filter Name" is a form which opened after press "Save" button on Search And Filter form
 */
export class GlobalFilterName {
  //Element at Filter Name form
  private txtFilterName = By.xpath("//app-c-filter-name-form//input[contains(@placeholder,'Enter filter name')]");
  private radioGlobalFilter = By.xpath("//app-c-filter-name-form//formly-field-radio//label[contains(text(),'Global Filter')]");
  private radioPrivateFilter = By.xpath("//app-c-filter-name-form//formly-field-radio//label[contains(text(),'Private Filter')]");
  private btnSaveFilterName = By.xpath("//app-c-filter-name-form//button//span[text()='Save']");
  private cmbSelectFilter = By.xpath(`//input[contains(@id,"filter-dropdown")]`);


  constructor(private driverService: SeleniumWebDriverService) { }
  //#region /*Begin: Filter Name form*/
  public async inputFilterNameFilterNameForm(FilterName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFilterName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.txtFilterName, FilterName);
      return true;
    } catch (error) {
      console.log("inputFilterNameFilterNameForm");
      console.log(error);
      return false;
    }
  }

  public async selectFilterTypeFilterNameForm(FilterType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.radioGlobalFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (FilterType.localeCompare("Global Filter") === 0 || FilterType.toLowerCase().includes("global")) {
        await this.driverService.click(this.radioGlobalFilter);
      }
      else {
        await this.driverService.click(this.radioPrivateFilter);
      }
      return true;
    } catch (error) {
      console.log("selectFilterTypeFilterNameForm");
      console.log(error);
      return false;
    }
  }
  //#endregion /*End: Filter Name form*/


  public async inputDataToFilterNameForm(
    FilterName: string,
    FilterType: string
  ): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFilterName);
      await this.driverService.waitUntilElementLoaded(By.xpath("//ng-progress/div[@class='ng-progress-bar']"));

      if (FilterName) {
        await this.driverService.setText(this.txtFilterName, FilterName);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Filter name')]/following-sibling::div/formly-validation-message");
        if (await this.driverService.isExisted(validationMessage)) {
          logWarningMessage(FilterName + ": Format of Filter Name is not correct!");
          return false;
        }
      }
      else {
        await this.driverService.click(this.txtFilterName);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Filter name')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("Filter Name: Should be shows validation error message when leave blank Filter Name!");
          return false;
        }
      }
      if (FilterType.localeCompare("Global") === 0 || FilterType.localeCompare("Private") === 0) {
        if (FilterType.localeCompare("Global") === 0) {
          await this.driverService.waitUntilElementLoaded(this.radioGlobalFilter);
          await this.driverService.click(this.radioGlobalFilter);
        }
        else {
          await this.driverService.waitUntilElementLoaded(this.radioPrivateFilter);
          await this.driverService.click(this.radioPrivateFilter);
        }
      }
      else {
        logWarningMessage(`Incorrect Filter Type: FilterType must be "Global" or "Private"!`);
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async pressSaveAtFilterNameForm(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveFilterName);
      await this.driverService.click(this.btnSaveFilterName);
      if (await this.driverService.isExisted(By.xpath("//app-c-filter-name-form//formly-validation-message"))) {
        logWarningMessage("Input data is not correct format!");
        return false;
      }
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.waitForSeconds(2000);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async assertRecentFilterNameCreatedOnDropdown(
    FilterName: string,
  ): Promise<boolean> {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.waitUntilElementLoaded(this.cmbSelectFilter);
      await this.driverService.click(this.cmbSelectFilter);
      let lblRecentFilter = By.xpath(`(//div/span[text()='Recent Filter']/parent::div/following-sibling::div//div[@title='${FilterName}'])[1]`);
      logInfoMessage(`Checking if ${FilterName} is created on Recent Filter or not?`);
      if (!(await this.driverService.isExisted(lblRecentFilter))) {
        logWarningMessage(`"Recent Filter": "${FilterName}" should be found at first option!`);
        return false;
      }
      logInfoMessage(`\n\t${FilterName} has been created on Recent Filter successfully!`);
      return true;
    } catch (error) {
      console.log("assertRecentFilterNameCreatedOnDropdown");
      console.log(error);
      return false;
    }
  }

  public async assertFilterTypeAndFilterNameCreatedOnDropdown(
    FilterName: string,
    FilterType: string = `Global`
  ): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbSelectFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
      if(!(await this.driverService.isExisted(By.xpath(`(//div/span[text()='${FilterType} Filter'])`)))){
         await this.driverService.click(this.cmbSelectFilter);
      }
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      logInfoMessage(`Checking if ${FilterName} is created or not?`);
      let lblTypeFilter = By.xpath(`(//div/span[text()='${FilterType} Filter']/parent::div/following-sibling::div//div[@title='${FilterName}'])[1]`);
      if (!(await this.driverService.isExisted(lblTypeFilter))) {
        logWarningMessage(`"${FilterType} Filter": "${FilterName}" should be found at first option!`);
        return false;
      }
      logInfoMessage(`\n\t${FilterName} has been created on ${FilterType} Filter successfully!`);
      return true;
    } catch (error) {
      console.log("assertFilterTypeAndFilterNameCreatedOnDropdown");
      console.log(error);
      return false;
    }
  }
}
