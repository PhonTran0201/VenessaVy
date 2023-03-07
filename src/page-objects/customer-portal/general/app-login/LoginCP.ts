import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { Login } from "../../../back-office-portal/general/login-logout/Login";
import { SystemLanguageIndex as sli } from "../../../../shared/system-language-index/SystemLanguageIndex";
export class LoginCP extends Login{
  protected txtUsername = [
    By.xpath("//*[@placeholder='Enter username']"),
    By.xpath("//*[@placeholder='Legg inn brukernavn']"),
    By.xpath("//*[@placeholder='Enter username']")
  ][sli.getValue()];
  protected txtPassword = [
    By.xpath("//*[@placeholder='Enter password']"),
    By.xpath("//*[@placeholder='Legg inn passord']"),
    By.xpath("//*[@placeholder='Enter password']")
  ][sli.getValue()];
  protected btnLogin = [
    By.xpath(`//app-login//button//*[text()=' Login '] | //app-login//button[text()='Login']`),
    By.xpath(`//app-login//button//*[text()=' Logg inn ']`),
    By.xpath(`//app-login//button//*[text()=' Login '] | //app-login//button[text()='Login']`)
  ][sli.getValue()];
  protected hrefResetPassword = [
    By.xpath(`//app-login//a[text()='Reset password.']`),
    By.xpath(`//app-login//a[text()='Tilbakestille passord.']`),
    By.xpath(`//app-login//a[text()='Reset password.']`)
  ][sli.getValue()];

  protected txtCustomerId = By.xpath(`//app-login//div[label[text()='Customer Id']]/input`);
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected lblMainPageTitle = By.xpath("//main//div[contains(@class,'banner-title')]//*[text()]");

  public async inputCustomerId(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtCustomerId);
      await this.driverService.setText(this.txtCustomerId, value);
      return true;
    } catch (error) {
      console.log('inputCustomerId');
      console.log(error);
      return false;
    }
  }
}
