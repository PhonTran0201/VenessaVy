import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { FrameAgreementBannerCP } from "../../../../general/frame-agreement/frame-agreement-banner/FrameAgreementBannerCP";

export class FrameAgreementBannerCPGuaranteeAtlas extends FrameAgreementBannerCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
