import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationFormPreviewCP } from "../../../../general/application/application-forms/ApplicationFormPreviewCP";

export class ApplicationFormPreviewCPGuaranteeAtlas extends ApplicationFormPreviewCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}