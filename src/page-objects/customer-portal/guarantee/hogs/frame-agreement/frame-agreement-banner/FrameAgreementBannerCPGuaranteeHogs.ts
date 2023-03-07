import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { FrameAgreementBannerCP } from "../../../../general/frame-agreement/frame-agreement-banner/FrameAgreementBannerCP";

export class FrameAgreementBannerCPGuaranteeHogs extends FrameAgreementBannerCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
