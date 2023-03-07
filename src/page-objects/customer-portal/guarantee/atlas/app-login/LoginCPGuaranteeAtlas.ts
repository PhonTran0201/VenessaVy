import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { LoginCP } from "../../../general/app-login/LoginCP";

export class LoginCPGuaranteeAtlas extends LoginCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
