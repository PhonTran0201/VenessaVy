import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { Login } from "../../../back-office-portal/general/login-logout/Login";

export class LoginTP24Seven extends Login {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected txtUsername = By.xpath("//input[@name='email']");
  protected txtPassword = By.xpath("//input[@name='password']");
  protected btnLogin = By.xpath("//button[@name='submit']");

  protected lblMainPageTitle = By.xpath("//div[@id = 'root']//h4[text()='Customers']");

  // Check Page name after press login
  public async isNavigatingInMainPageByName(pageName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblMainPageTitle);
      await this.driverService.waitForSeconds(5000);
      const actualValue = await (await this.driverService.getText(this.lblMainPageTitle)).trim();
      return await this.driverService.validateRecord("Validate Page title after login",
        [actualValue.toLocaleLowerCase(), pageName.toLocaleLowerCase(), "Incorrect page title!"]);
    } catch (error) {
      console.log('isNavigatingInMainPageByName');
      console.log(error);
      return false;
    }
  }


}
