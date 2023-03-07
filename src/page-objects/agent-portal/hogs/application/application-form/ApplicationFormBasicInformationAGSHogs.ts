import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logFailMessage, logSuccessMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormBasicInformation } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";


export class ApplicationFormBasicInformationAGSHogs extends ApplicationFormBasicInformation {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}