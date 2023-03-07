import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { LoginCP } from "../../general/app-login/LoginCP";
import { AppNavigationCPVarsam } from "../app-header/app-navigation/AppNavigationCPVarsam";

export class LoginCPVarsam extends LoginCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  // Check Page name after press login
  public async isNavigatingInMainPageByName(pageName: string) {
    try {
      const appNavigationCPVarsam = new AppNavigationCPVarsam();
      const actualValue = await appNavigationCPVarsam.getItemVavigationBarActive();
      return await this.driverService.validateRecord("Validate Page title after login",
        [actualValue.toLocaleLowerCase(), pageName.toLocaleLowerCase(), "Incorrect page title!"]);
    } catch (error) {
      console.log('isNavigatingInMainPageByName');
      console.log(error);
      return false;
    }
  }
}