import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../shared/functions";


export class CaseAssignForm {
  protected cmbAssignedTo = By.xpath('//input[@id="pgs-assign-task-form-assignee"]');

  constructor(protected driverService: SeleniumWebDriverService) { }

  public async selectAssignee(assignedTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignedTo);
      await this.driverService.click(this.cmbAssignedTo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(assignedTo, "", this.driverService);
      return true;
    } catch (error) {
      console.log("selectAssignee");
      console.log(error);
      return false;
    }
  }
}
