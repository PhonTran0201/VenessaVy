import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationFormContractAndGuaranteeCP } from "../../../../general/application/application-forms/ApplicationFormContractAndGuaranteeCP";


/**
 * Application Form section Contact and Guarantee Customer Portal
 */
export class ApplicationFormContractAndGuaranteeCPGuaranteeHogs extends ApplicationFormContractAndGuaranteeCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}