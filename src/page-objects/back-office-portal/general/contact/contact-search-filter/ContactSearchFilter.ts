import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";


export class ContactSearchFilter {
  //Element at Search and Filter
  private btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");

  //Search / Filter forms
  private txtNameSearchFilter = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[@id='pgs-contact-filter-fullname']");
  private txtEmailSearchFilter = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id, 'filter-email')]");
  private txtPhoneSearchFilter = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id, 'filter-phone')]");
  private txtAccountSearchFilter = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[contains(@id, 'filter-account')]")


  constructor(private driverService: SeleniumWebDriverService) { }


  public async searchAndFilterContactByName(name: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
      await this.driverService.click(this.btnSearchAndFilter);
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-contact-list//div[contains(@class,'show-right-side')]"));
      await this.driverService.waitForSeconds(2000);
      await this.driverService.setText(this.txtNameSearchFilter, name);
      await this.driverService.pressEnterCurrentElement();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("searchAndFilterContactByName");
      console.log(error);
      return false;
    }
  }
  //#region input fields on Search and Filter form
  public async inputNameOnSearchAndFilterForm(name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtNameSearchFilter, name);
      return true;
    } catch (error) {
      console.log(`inputNameToSearchAndFilterForm`);
      console.log(error);
      return false;
    }
  }
  public async inputEmailOnSearchAndFilterForm(email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmailSearchFilter);
      // await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtEmailSearchFilter, email);
      return true;
    } catch (error) {
      console.log("inputEmailToSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPhoneOnSearchAndFilterForm(phone: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhoneSearchFilter);
      // await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtPhoneSearchFilter, phone);
      return true;
    } catch (error) {
      console.log("inputPhoneToSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputAccountOnSearchAndFilterForm(account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAccountSearchFilter);
      // await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtAccountSearchFilter, account);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(account, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputAccountToSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async inputInvalidDataToSearchAndFilterForm(email: string, phone: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);

      if (email) {
        await this.driverService.setText(this.txtEmailSearchFilter, email);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(@for,'email')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("Email: Should be shows validation error message when input incorrect format of Email!");
          return false;
        }
      }
      if (phone) {
        await this.driverService.setText(this.txtPhoneSearchFilter, phone);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(@for,'phone')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("Phone: Should be shows validation error message when input incorrect format of Phone!");
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //end validate result function

  //return true if search and filter form is empty
  public async validateClearedSearchAndFilterForm() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);

      let btnClearName = By.xpath(`//input[contains(@id,"filter-fullname")]/preceding-sibling::button`);
      let btnClearEmail = By.xpath(`//input[contains(@id,"filter-email")]/preceding-sibling::button`);
      let btnClearPhone = By.xpath(`//input[contains(@id,"filter-phone")]/preceding-sibling::button`);
      let btnClearAccount = By.xpath(`//span[@title="Clear all" and preceding-sibling::div//div[contains(text(),"Search account")]]`);

      if (!(await this.driverService.isExisted(btnClearName)
        || await this.driverService.isExisted(btnClearEmail)
        || await this.driverService.isExisted(btnClearPhone)
        || await this.driverService.isExisted(btnClearAccount))) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`validateClearedSearchAndFilterForm`);
      console.log(error);
      return false;
    }
  }

}

