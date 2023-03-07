import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { FrameAgreementFormDetailCP } from "../../../../general/frame-agreement/frame-agreement-form-detail/FrameAgreementFormDetailCP";

export class FrameAgreementFormCPGuaranteeAtlas extends FrameAgreementFormDetailCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}