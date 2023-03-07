import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormAmendmentsCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormAmendmentsCP";

export class GuaranteeDetailFormAmendmentsCPGuaranteeAtlas extends GuaranteeDetailFormAmendmentsCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}