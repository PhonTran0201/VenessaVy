import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { LoginCP } from "../../../customer-portal/general/app-login/LoginCP";

export class LoginAGSHogs extends LoginCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}
