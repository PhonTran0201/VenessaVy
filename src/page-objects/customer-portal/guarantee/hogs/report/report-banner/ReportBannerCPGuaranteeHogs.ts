import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ReportBannerCP } from "../../../../general/report/report-banner/ReportBannerCP";

export class ReportBannerCPGuaranteeHogs extends ReportBannerCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}