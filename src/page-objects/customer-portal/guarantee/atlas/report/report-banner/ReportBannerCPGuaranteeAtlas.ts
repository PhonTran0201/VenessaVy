import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ReportBannerCP } from "../../../../general/report/report-banner/ReportBannerCP";

export class ReportBannerCPGuaranteeAtlas extends ReportBannerCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}