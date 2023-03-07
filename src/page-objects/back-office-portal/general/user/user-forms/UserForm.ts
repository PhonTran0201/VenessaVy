import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../shared/functions";


export class UserForm {
  // Xpath on User form
  private userNameField = By.id("pgs-user-form-username");
  private displayNameField = By.id("pgs-user-form-display-name");
  private emailField = By.id("pgs-user-form-email");
  private lblNoItemsFound = By.xpath(`//div[contains(text(),"No items found")]`);
  private assignroleField = By.id("pgs-user-form-role-ids");
  private organizationField = By.id("pgs-user-form-org-id");
  private languageField = By.xpath("//app-user-form//*[@id='pgs-user-form-language-code']");

  private clearAssignRole = By.xpath("//div[@class='modal-body']//formly-group//label[text()=' Assign role ']/following-sibling::formly-autocomplete//span[@title='Clear all']");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async inputLanguage(Language: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.languageField);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.languageField, Language);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(this.lblNoItemsFound)) {
        return false;
      }
      await selectDropdownOption(Language, "", this.driverService);
      return true;
    } catch (error) {
      console.log(`inputLanguage`);
      console.log(error);
      return false;
    }
  }

  public async inputUser(
    userName: string,
    displayName: string,
    email: string,
    assign: string,
    organization: string,
    language: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.userNameField);
      await this.driverService.waitUntilElementLoaded(this.displayNameField);
      // await this.driverService.clearOldDataIntoField(this.firstNameField);
      await this.driverService.waitForSeconds(2000);

      await this.driverService.setText(this.userNameField, userName);
      await this.driverService.setText(this.displayNameField, displayName);
      await this.driverService.setText(this.emailField, email);

      await this.driverService.waitUntilElementLoaded(this.assignroleField);

      await this.driverService.setText(this.assignroleField, assign);
      await this.driverService.pressEnter(this.assignroleField);

      await this.driverService.setText(this.organizationField, organization);
      await this.driverService.pressEnter(this.organizationField);

      await this.driverService.setText(this.languageField, language);
      await this.driverService.pressEnter(this.languageField);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async editUser(displayName: string, email: string, assign: string, organization: string, language: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.userNameField);
      await this.driverService.waitUntilElementLoaded(this.displayNameField);
      // await this.driverService.clearOldDataIntoField(this.firstNameField);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.displayNameField, displayName);
      await this.driverService.setText(this.emailField, email);

      //await this.driverService.waitUntilElementLoaded(this.assignroleField);

      await this.driverService.click(this.clearAssignRole);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      //await this.driverService.clearText(this.assignroleFieldAfter);
      await this.driverService.setText(this.assignroleField, assign);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      //await this.driverService.waitUntilElementLoaded(this.assignroleFieldAfter);
      await this.driverService.pressEnter(this.assignroleField);

      await this.driverService.setText(this.organizationField, organization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.pressEnterCurrentElement();

      await this.driverService.setText(this.languageField, language);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.pressEnterCurrentElement();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
