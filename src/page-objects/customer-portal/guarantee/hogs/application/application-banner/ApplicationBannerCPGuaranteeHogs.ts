
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationBannerCP } from "../../../../general/application/application-banner/ApplicationBannerCP";

export class ApplicationBannerCPGuaranteeHogs extends ApplicationBannerCP {
 
  constructor(driverService: SeleniumWebDriverService) { 
    super(driverService);
  }
}