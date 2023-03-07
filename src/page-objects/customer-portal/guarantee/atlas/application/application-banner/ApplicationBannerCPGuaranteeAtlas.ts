
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationBannerCP } from "../../../../general/application/application-banner/ApplicationBannerCP";

export class ApplicationBannerCPGuaranteeAtlas extends ApplicationBannerCP {
 
  constructor(driverService: SeleniumWebDriverService) { 
    super(driverService);
  }
}