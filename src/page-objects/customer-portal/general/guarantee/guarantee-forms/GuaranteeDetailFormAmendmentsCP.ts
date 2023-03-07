import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormAmendments } from "../../../../back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormAmendments";

export class GuaranteeDetailFormAmendmentsCP extends GuaranteeDetailFormAmendments {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}