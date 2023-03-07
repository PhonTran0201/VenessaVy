import { JsonFormatter } from "@cucumber/cucumber";
import { By, WebElement } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";
import { toastError } from "../../../../../shared/variables";

export class LeadForm {
  private cmbOrganization = By.xpath("//app-lead-form//div[@class='form-group' and .//label[text()=' Organization ']]//input");
  private txtFirstName = By.xpath(`//input[@id="pgs-lead-form-first-name"]`);
  private txtLastName = By.xpath(`//input[@id="pgs-lead-form-last-name"]`);
  private txtCompany = By.xpath(`//input[@id="pgs-lead-form-company-name"]`);
  private txtJobTitle = By.xpath(`//input[@id="pgs-lead-form-job-title"]`);
  private txtEmail = By.xpath(`//input[@id="pgs-lead-form-email"]`);
  private txtMobile = By.xpath(`//input[@id="pgs-lead-form-mobile"]`);
  private txtAddress = By.xpath(`//input[@id="pgs-lead-form-address"]`);
  private txtPostcode = By.xpath(`//input[@id="pgs-lead-form-post-code"]`);
  private txtCity = By.xpath(`//input[@id="pgs-lead-form-city"]`);
  private cmbCountry = By.xpath(`//input[@id="pgs-lead-form-country"]`);
  private txtSource = By.xpath(`//input[@id="pgs-lead-form-source"]`);
  private txtKAM = By.xpath(`//input[@id="pgs-lead-form-kam"]`);
  private statusField = By.xpath(`//input[@id="pgs-lead-form-status"]`);
  private tblMoreInfo = By.xpath('//app-lead-form//li[2]//a');
  private tblBasicInfo = By.xpath("//app-lead-form//li[1]//a");

  private moreInfoBtn = By.xpath("//app-lead-form//li/a[text()='More Info']");
  private basicInfoBtn = By.xpath("//app-lead-form//li/a[text()='Basic Info']");


  // Oganization on Edit Form
  private txtEditFormOrganization = By.xpath(`//app-task-form//formly-org-autocomplete//span[contains(@class,"ng-value-label")]`);

  constructor(private driverService: SeleniumWebDriverService) { }

  //#region input to search and filter form
  public async inputOrganizationOnLeadForm(Organization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1000);
      await this.driverService.setText(this.cmbOrganization, Organization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Organization, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputOrganizationOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputFirstNameOnLeadForm(FirstName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtFirstName, FirstName);
      return true;
    } catch (error) {
      console.log("inputFirstNameOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputLastNameOnLeadForm(LastName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLastName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtLastName, LastName);
      return true;
    } catch (error) {
      console.log("inputLastNameOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputCompanyNameOnLeadForm(CompanyName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCompany);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCompany, CompanyName);
      return true;
    } catch (error) {
      console.log("inputCompanyNameOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputJobTitleOnLeadForm(JobTitle: string) {
    try {
      await this.driverService.setText(this.txtJobTitle, JobTitle);
      return true;
    } catch (error) {
      console.log("inputJobTitleOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputEmailOnLeadForm(Email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmail);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmail, Email);
      return true;
    } catch (error) {
      console.log("inputEmailOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputMobileOnLeadForm(Mobile: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtMobile);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtMobile, Mobile);
      return true;
    } catch (error) {
      console.log("inputMobileOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputAddressOnLeadForm(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddress, Address);
      return true;
    } catch (error) {
      console.log("inputAddressOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeOnLeadForm(Postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcode, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputCityOnLeadForm(City: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCity, City);
      return true;
    } catch (error) {
      console.log("inputCityOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputCountryOnLeadForm(Country: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCountry);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbCountry, Country);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(Country, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputCountryOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputKAMOnLeadForm(KAM: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtKAM);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtKAM, KAM);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(KAM, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputKAMOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputStatusOnLeadForm(Status: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSource);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSource, Status);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(Status, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputStatusOnLeadForm");
      console.log(error);
      return false;
    }
  }

  public async inputSourceOnLeadForm(Source: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSource);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSource, Source);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(Source, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputCompanyOnLeadForm");
      console.log(error);
      return false;
    }
  }

  //#endregion

  public async pressMoreInfo() {
    try {
      await this.driverService.waitUntilElementLoaded(this.moreInfoBtn);
      await this.driverService.click(this.moreInfoBtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async pressBasicInfo() {
    try {
      await this.driverService.waitUntilElementLoaded(this.basicInfoBtn);
      await this.driverService.click(this.basicInfoBtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async validateFields(valField: ValidateField): Promise<ValidateField> {
    let valFieldResult = new ValidateField(valField.nameField, valField.index, valField.status, valField.message, valField.toastMessage);
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      let txtValidattionMessage = By.xpath(`(//div[contains(@class,'invalid-feedback')]/span)[1]`);
      if (await this.driverService.isExisted(txtValidattionMessage)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        while (await this.driverService.isExisted(By.xpath(`(//div[contains(@class,'invalid-feedback')]/span)[${countErrorField}]`))) {
          let errorMessage: string = (await this.driverService.getText(txtValidattionMessage)).toString();
          valFieldResult.message.push(errorMessage);
          countErrorField++;
        }
      }
      if (await this.driverService.isExisted(toastError)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        let errortoastMessage: string = (await this.driverService.getText(toastError)).toString();
        valFieldResult.toastMessage.push(errortoastMessage);
        countErrorField++;
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

  public async validateValueOnLeadForm(expectedValue: String, fieldName: String, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      let temp = By.xpath(`//div`);
      let actualValue = "";
      switch (fieldName) {
        case "Organization": {
          temp = this.txtEditFormOrganization;
          break;
        }
        case "First Name": {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          temp = this.txtFirstName;
          break;
        }
        case "Last Name": {
          temp = this.txtLastName;
          break;
        }
        case "Company Name": {
          temp = this.txtCompany;
          break;
        }
        case "Job Title": {
          temp = this.txtJobTitle;
          break;
        }
        case "Email": {
          temp = this.txtEmail;
          break;
        }
        case "Mobile": {
          temp = this.txtMobile;
          break;
        }
        case "Address": {
          temp = this.txtAddress;
          break;
        }
        case "Postcode": {
          temp = this.txtPostcode;
          break;
        }
        case "City": {
          temp = this.txtCity;
          break;
        }
        case "Country": {
          temp = By.xpath(`//label[@for="pgs-lead-form-country"]/following-sibling::*//span[contains(@class,"ng-value-label")]`);
          break;
        }
        case "KAM": {
          temp = By.xpath(`//label[@for="pgs-lead-form-kam"]/following-sibling::*//div[contains(@class,'ng-value')]//img/following-sibling::div`);
          break;
        }
        case "Source": {
          temp = By.xpath(`//label[@for="pgs-lead-form-source"]/following-sibling::*//span[contains(@class,"ng-value-label")]`);
          break;
        }
        default: {
          logWarningMessage(`Field with name "${fieldName}" is NOT found!`);
          return false;
        }
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (fieldName == "Country") {
        let element = await this.driverService.findElement(temp);
        await this.driverService.scrollElementToView(element);
        actualValue = await this.driverService.getText(temp);
      }
      else if (fieldName == "KAM" || fieldName == "Source") {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        actualValue = await this.driverService.getText(temp);
      }
      else actualValue = await this.driverService.getAttributeValue(temp, "value");
      if (isUsedForSearch) {
        return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
      }
      else {
        return await this.driverService.validateRecord(`Validate field "${fieldName}"`, [actualValue, expectedValue, `Incorrect "${fieldName}~"`]);
      }
    } catch (error) {
      console.log(`Can not find field ${fieldName} with expected value`);
      console.log(error);
      return false;
    }
  }
}
