import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormPreviewCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormPreviewCP";


export class AmendmentFormPreviewCPGuaranteeAtlas extends AmendmentFormPreviewCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}