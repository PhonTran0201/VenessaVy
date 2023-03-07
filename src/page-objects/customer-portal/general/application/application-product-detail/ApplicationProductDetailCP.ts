import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

/**
 * Application Product Detail Customer Portal
 * There is a dropdown with name Debtor
 */
export class ApplicationProductDetailCP {
  constructor(protected driverService: SeleniumWebDriverService) { }
  protected lblTitleBannerProductDetail = By.xpath("//app-application-form//div[contains(@class,'banner-title')]/h2[text()='Product detail']");
  protected lblProductName = By.xpath("//app-application-form//div[contains(@class,'main-content')]/h2");
  protected cmbDebtor = By.xpath("//app-application-form//div[contains(@class,'form-group') and ./label[text()=' Debtor ']]//input");
  protected cmbDebtorValue = By.xpath("//app-application-form//div[contains(@class,'form-group') and ./label[text()=' Debtor ']]//*[contains(@class,'ng-value-label')]");
  //#region Validate values
  public async validateProductName(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProductName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(this.lblProductName);
      return await this.driverService.validateRecord("Validate Product name",
        [actualValue, expectedValue, "Incorrect Product name"]
      );
    } catch (error) {
      console.log('validateProductName');
      console.log(error);
      return false;
    }
  }
  public async validateDebtor(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(this.cmbDebtorValue);
      return await this.driverService.validateRecord("Validate Debtor",
        [actualValue, expectedValue, "Incorrect Debtor"]
      );
    } catch (error) {
      console.log('validateDebtor');
      console.log(error);
      return false;
    }
  }
  //#endregion
}
