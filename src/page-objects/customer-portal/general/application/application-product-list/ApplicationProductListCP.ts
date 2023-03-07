import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

/**
 * Application Product List Customer Portal
 */
export class ApplicationProductListCP {
  constructor(protected driverService: SeleniumWebDriverService) { }
  protected lblTitleBannerProducts = By.xpath("//app-application-form//div[contains(@class,'banner-title')]/h2[text()='Products']");
  public async pressPaymentGuaranteeByProductName(productName: string){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTitleBannerProducts);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const btnProduct = By.xpath(`//app-application-form//div[./div[contains(@class,'thumbnail-caption')]/h6[text()='${productName}']]//a`);
      await this.driverService.click(btnProduct);
      return true;
    } catch (error) {
      console.log('pressPaymentGuaranteeByProductName');
      console.log(error);
      return false;
    }
  }
}
