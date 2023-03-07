import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GlobalHeaderCP } from "../../../general/GlobalPageObject/GlobalHeaderCP";


/**
 * Header
 */
export class GlobalHeaderCPGuaranteeAtlas extends GlobalHeaderCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}