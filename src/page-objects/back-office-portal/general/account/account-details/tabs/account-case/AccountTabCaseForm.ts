import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { CaseForm } from "../../../../case/case-form/CaseForm";


/**
 * Case form in Account detail
 */
export class AccountTabCaseForm extends CaseForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}