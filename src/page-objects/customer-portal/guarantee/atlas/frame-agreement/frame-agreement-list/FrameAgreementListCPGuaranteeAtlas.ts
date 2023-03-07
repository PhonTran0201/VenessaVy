import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { FrameAgreementListCP } from "../../../../general/frame-agreement/frame-agreement-list/FrameAgreementListCP";

export class FrameAgreementListCPGuaranteeAtlas extends FrameAgreementListCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
