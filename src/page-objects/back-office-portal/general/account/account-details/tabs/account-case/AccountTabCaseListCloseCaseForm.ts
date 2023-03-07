import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { CaseCloseCaseForm } from "../../../../case/case-list/CaseCloseCaseForm";

export class AccountTabCaseListCloseCaseForm extends CaseCloseCaseForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}
