import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationListCP } from "../../../../general/application/application-list/ApplicationListCP";

/**
 * Application List Customer Portal
 */
export class ApplicationListCPGuaranteeAtlas extends ApplicationListCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
