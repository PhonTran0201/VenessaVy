import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { CaseAssignForm } from "../../../../case/case-list/CaseAssignForm";

export class AccountTabCaseListAssignForm extends CaseAssignForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}
