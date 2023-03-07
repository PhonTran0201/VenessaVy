import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { FrameAgreementListCP } from "../../../../general/frame-agreement/frame-agreement-list/FrameAgreementListCP";

export class FrameAgreementListCPGuaranteeHogs extends FrameAgreementListCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
