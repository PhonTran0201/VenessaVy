import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { LoginInterface } from "../../../../interfaces/general/login-logout/LoginInterface";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { Helpers } from "../../../../shared/helpers";

export class Login implements LoginInterface {
  protected txtUsername = By.xpath("//app-login//*[@id='pgs-home-login-username']");
  protected txtPassword = By.xpath("//app-login//*[@id='pgs-home-login-password']");
  protected btnLogin = By.xpath("//app-login//*[@id='pgs-login-submit-button']/span");
  protected hrefResetPassword = By.xpath("//app-login//*[@id='login-reset-password-link']");


  protected lblMainPageTitle = By.xpath("//app-dashboard//*[contains(@class,'page-title')]");

  constructor(protected driverService: SeleniumWebDriverService) { }
  public inputCustomerId(CustomerId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async navigate(data: string) {
    try {
      await this.driverService.goto(data);
      return true;
    } catch (error) {
      console.log("navigate");
      console.log(error);
      return false;
    }
  }

  //#region Input login form
  public async inputLogin(data: string, type: string) {
    await this.driverService.waitUntilElementLoaded(this.txtUsername);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    if (type == "username") {
      await this.driverService.setText(this.txtUsername, data);
    } else if (type == "password") {
      const passwordDecode = Helpers.decode(data);
      // console.log('password encode:', data);
      // console.log('password decode:', passwordDecode);
      await this.driverService.setText(this.txtPassword, passwordDecode);
    }
  }

  public async inputUsername(username: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtUsername);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtUsername, username);
      return true;
    } catch (error) {
      console.log("inputUsername");
      console.log(error);
      return false;
    }
  }

  public async inputPassword(passwordEncoded: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPassword);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPassword, Helpers.decode(passwordEncoded));
      return true;
    } catch (error) {
      console.log("inputPassword");
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Press elements on Login form
  public async pressLogin() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnLogin);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnLogin);

      return true;
    } catch (error) {
      console.log("pressLogin");
      console.log(error);
      return false;
    }
  }

  public async pressResetPassword() {
    try {
      await this.driverService.waitUntilElementLoaded(this.hrefResetPassword);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.hrefResetPassword);

      return true;
    } catch (error) {
      console.log("pressResetPassword");
      console.log(error);
      return false;
    }
  }
  //#endregion


  // Check Page name after press login
  public async isNavigatingInMainPageByName(pageName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);


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
