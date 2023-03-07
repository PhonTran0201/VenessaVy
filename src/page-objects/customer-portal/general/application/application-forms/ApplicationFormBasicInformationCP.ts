import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormBasicInformation } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";

/**
 * Application Form section Basic Information Customer Portal
 */
export class ApplicationFormBasicInformationCP extends ApplicationFormBasicInformation {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}