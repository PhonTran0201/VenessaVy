import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationFormBasicInformationCP } from "../../../../general/application/application-forms/ApplicationFormBasicInformationCP";


/**
 * Application Form section Basic Information Customer Portal
 */
export class ApplicationFormBasicInformationCPGuaranteeHogs extends ApplicationFormBasicInformationCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}