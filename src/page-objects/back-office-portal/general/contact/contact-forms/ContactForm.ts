import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";


export class ContactForm {

  protected contactList = By.xpath("//app-contact-list");

  //Global contact input
  protected txtSearchAccount = By.xpath("//*[@id='pgs-contact-form-customer-id']");
  protected txtFirstName = By.xpath("//input[@id='pgs-contact-form-firstname']");
  protected txtLastName = By.xpath("//input[@id='pgs-contact-form-lastname']");
  protected DateOfBirth = By.xpath("//input[@id='pgs-contact-form-dateofbirth']");
  protected txtEmail = By.xpath("//input[@id='pgs-contact-form-email']");
  protected txtPhone = By.xpath("//input[@id='pgs-contact-form-phone']");
  protected txtAddress = By.xpath("//input[@id='pgs-contact-form-address']");
  protected txtPostcode = By.xpath("//input[@id='pgs-contact-form-postcode']");
  protected txtCity = By.xpath("//input[@id='pgs-contact-form-city']");
  protected cmbCountry = By.xpath("//input[@id='pgs-contact-form-country']");
  protected cmbType = By.xpath("//app-contact-form//formly-group//formly-field[not(contains(@style,'none'))]//input[@id='pgs-contact-form-role']");
  protected txtTitle = By.xpath("//app-contact-form//formly-group//formly-field[not(contains(@style,'none'))]//input[@id='pgs-contact-form-jobtitle']");


  //value of input fields in Edit Contact
  protected txtSearchAccountValue = By.xpath(`//app-contact-form//div[./label[@for='pgs-contact-form-customer-id']]//span[contains(@class,'ng-value-label')]`);
  protected txtFirstNameValue = By.xpath(`//label[@for="pgs-contact-form-firstname"]/following::formly-input//input[@id="pgs-contact-form-firstname"]`);
  protected txtLastNameValue = By.xpath(`//label[@for="pgs-contact-form-lastname"]/following::formly-input//input[@id="pgs-contact-form-lastname"]`);
  protected dtpDateOfBirthValue = By.xpath(`//label[@for="pgs-contact-form-dateofbirth"]/following::formly-datepicker//input[@id="pgs-contact-form-dateofbirth"]`);
  protected txtEmailValue = By.xpath(`//label[@for="pgs-contact-form-email"]/following::formly-input//input[@id="pgs-contact-form-email"]`);
  protected txtPhoneValue = By.xpath(`//label[@for="pgs-contact-form-phone"]/following::formly-input//input[@id="pgs-contact-form-phone"]`);
  protected txtAddressValue = By.xpath(`//label[@for="pgs-contact-form-address"]/following::formly-input//input[@id="pgs-contact-form-address"]`);
  protected txtPostcodeValue = By.xpath(`//label[@for="pgs-contact-form-postcode"]/following::formly-input//input[@id="pgs-contact-form-postcode"]`);
  protected txtCityValue = By.xpath(`//label[@for="pgs-contact-form-city"]/following::formly-input//input[@id="pgs-contact-form-city"]`);
  protected cmbCountryValue = By.xpath(`//app-contact-form//div[./label[@for='pgs-contact-form-country']]//span[contains(@class,'ng-value-label')]`);
  protected txtTitleValue = By.xpath(`//label[@for="pgs-contact-form-jobtitle"]/following::formly-input//input[@id="pgs-contact-form-jobtitle"]`);


  constructor(protected driverService: SeleniumWebDriverService) { }

  public async inputAccountOnContactForm(Account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtSearchAccount, Account);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await selectDropdownOption(Account, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputAccountOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputFirstNameOnContactForm(FirstName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtFirstName, FirstName);
      return true;
    } catch (error) {
      console.log("inputFirstNameOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputLastNameOnContactForm(LastName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLastName);
      await this.driverService.setText(this.txtLastName, LastName);
      return true;
    } catch (error) {
      console.log("inputLastNameOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputBirthdayOnContactForm(Birthday: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.DateOfBirth);
      await this.driverService.setText(this.DateOfBirth, Birthday);
      return true;
    } catch (error) {
      console.log("inputBirthdayOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputEmailOnContactForm(Email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmail);
      await this.driverService.setText(this.txtEmail, Email);
      return true;
    } catch (error) {
      console.log("inputEmailOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputPhoneOnContactForm(Phone: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhone);
      await this.driverService.setText(this.txtPhone, Phone);
      return true;
    } catch (error) {
      console.log("inputPhoneOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputAddressOnContactForm(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      await this.driverService.setText(this.txtAddress, Address);
      return true;
    } catch (error) {
      console.log("inputAddressOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeOnContactForm(Postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode);
      await this.driverService.setText(this.txtPostcode, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputCityOnContactForm(City: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity);
      await this.driverService.setText(this.txtCity, City);
      return true;
    } catch (error) {
      console.log("inputCityOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputCountryOnContactForm(Country: string) {
    try {
      await this.driverService.setText(this.cmbCountry, Country);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Country, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputCountryOnContactForm");
      console.log(error);
      return false;
    }
  }

  public async inputTypeOrTitleOnContactForm(Role: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCountry);
      if (await this.driverService.isExisted(this.cmbType)) {
        await this.driverService.setText(this.cmbType, Role);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(Role, "", this.driverService);
      } else {
        await this.driverService.setText(this.txtTitle, Role);
      }
      return true;
    } catch (error) {
      console.log(error);
      console.log("can't find Type or Title element");
      return false;
    }
  }

  public async validateFields(valField: ValidateField): Promise<ValidateField> {
    let valFieldResult = new ValidateField(valField.nameField, valField.index, valField.status, valField.message, valField.toastMessage);
    try {
      await this.driverService.waitForSeconds(2000);

      let txtValidattionMessage = By.xpath(`//*[contains(local-name(), 'form')]//formly-validation-message`);
      //let txtValidationToastMessage = By.xpath(`//div[@id="toast-container"]/div/div`)
      if (await this.driverService.isExisted(txtValidattionMessage)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        while (await this.driverService.isExisted(By.xpath(`(//*[contains(local-name(), 'form')]//formly-validation-message)[${countErrorField}]`))) {
          let errorMessage: string = (await this.driverService.getText(txtValidattionMessage)).toString();
          valFieldResult.message.push(errorMessage);
          countErrorField++;
        }
      } else {
        await this.driverService.waitForSeconds(2000);
      }
      return valFieldResult;
    } catch (error) {
      console.log("validateField");
      console.log(error);
      return valFieldResult;
    }
  }
  // #region Verify value on Contact form
  public async validateValueOnForm(expectedValue: String, fieldName: String) {
    try {
      // await this.driverService.waitUntilElementLoaded(this.btnCreate);

      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      // await this.enterEditContactForm();
      let temp = By.xpath(`//div`);
      let actualValue = "";
      switch (fieldName) {
        case "Search Account": {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          temp = this.txtSearchAccountValue;
          break;
        }
        case "First Name": {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          temp = this.txtFirstNameValue;
          break;
        }
        case "Last Name": {
          temp = this.txtLastNameValue;
          break;
        }
        case "Date Of Birth": {
          temp = this.dtpDateOfBirthValue;
          break;
        }
        case "Email": {
          temp = this.txtEmailValue;
          break;
        }
        case "Phone": {
          temp = this.txtPhoneValue;
          break;
        }
        case "Address": {
          temp = this.txtAddressValue;
          break;
        }
        case "Postcode": {
          temp = this.txtPostcodeValue;
          break;
        }
        case "City": {
          temp = this.txtCityValue;
          break;
        }
        case "Country": {
          await this.driverService.pressPageDownCurrentElement();
          temp = this.cmbCountryValue;
          break;
        }
        case "Title": {
          temp = this.txtTitleValue;
          break;
        }
        default: {
          logWarningMessage(`Field with name "${fieldName}" is NOT found!`);
          return false;
        }
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (fieldName.localeCompare("Country") === 0 || fieldName.localeCompare("Search Account") == 0) {
        actualValue = await this.driverService.getText(temp);
      } else {
        actualValue = await this.driverService.getAttributeValue(temp, "value");
      }
      // actualValue = await this.driverService.getAttributeValue(temp, "value");
      return await this.driverService.validateRecord(`Validate field "${fieldName}"`, [actualValue, expectedValue, `Incorrect "${fieldName}~"`]);
    } catch (error) {
      console.log(`Can not find field ${fieldName} with expected value`);
      console.log(error);
      return false;
    }
  }

  //#endregion
  //#region  Clear old data on Contact form
  public async clearOldDataOnContactForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const btnClear = By.xpath("//app-contact-form//div[contains(@class,'modal-body')]//*[contains(@class,'btn-clear') or @title='Clear all']");
      let count = 0;
      while (await this.driverService.isExisted(btnClear) && count++ < 20) {
        await this.driverService.click(btnClear);
      }
      return true;
    } catch (error) {
      console.log('clearOldDataOnContactForm');
      console.log(error);
      return false;
    }
  }
  //#endregion
}
