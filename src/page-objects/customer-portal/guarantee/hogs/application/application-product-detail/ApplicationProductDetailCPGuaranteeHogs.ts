import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationProductDetailCP } from "../../../../general/application/application-product-detail/ApplicationProductDetailCP";

/**
 * Application Product Detail Customer Portal
 * There is a dropdown with name Debtor
 */
export class ApplicationProductDetailCPGuaranteeHogs extends ApplicationProductDetailCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}