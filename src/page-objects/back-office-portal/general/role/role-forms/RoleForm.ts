import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class RoleForm {
  private txtName = By.xpath("//app-role-form//*[@id='pgs-role-form-name']");
  private txtDescription = By.xpath("//app-role-form//*[@id='pgs-role-form-description']");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async inputNameOnRoleForm(Name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtName, Name);
      return true;
    } catch (error) {
      console.log("inputNameOnRoleForm\n" + error);
      return false;
    }
  }

  public async inputDescriptionOnRoleForm(Description: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescription);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtDescription, Description);
      return true;
    } catch (error) {
      console.log("inputDescriptionOnRoleForm\n" + error);
      return false;
    }
  }
}
