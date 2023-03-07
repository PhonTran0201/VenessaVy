import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationProductListCP } from "../../../../general/application/application-product-list/ApplicationProductListCP";

/**
 * Application Product List Customer Portal
 */
export class ApplicationProductListCPGuaranteeAtlas extends ApplicationProductListCP {
  constructor(driverService: SeleniumWebDriverService) { 
    super(driverService);
  }
}
