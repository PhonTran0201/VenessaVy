import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, waitUntilHorizontalProgressBarLoaded, selectDropdownOption, selectDropdownOption_v2 } from "../../../../../shared/functions";

export class AccountSearchFilter {
  //#region Locator of elements on "Search and Filter" form
  private txtNameSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Name ']]//input");
  private txtOrgNo_NINSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Org.No/NIN ']]//input[@id]");
  private txtEmailSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Email ']]//input[@id]");
  private txtPhoneSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Phone ']]//input[@id]");
  private cmbKAMSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' KAM ']]//input");
  private cmbStatusSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Status ']]//input");
  private cmbTypeSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[@id='pgs-account-filter-type']");
  private txtAddressSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Address ']]//input[@id]");
  private txtPostcodeSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Postcode ']]//input[@id]");
  private txtCitySearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' City ']]//input[@id]");
  private cmbCountrySearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//div[./label[text()=' Country ']]//input");

  private txtQuoteReferenceSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'quote') and contains(@id,'number')]");
  private txtPolicyReferenceSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'policy') and contains(@id,'number')]");
  private dtpPolicyStartDateFromSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'Policy') and contains(@id,'Start-from')]");
  private dtpPolicyStartDateToSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'Policy') and contains(@id,'Start-to')]");
  private dtpPolicyEndDateFromSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'Policy') and contains(@id,'End-from')]");
  private dtpPolicyEndDateToSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'Policy') and contains(@id,'End-to')]");
  private cmbProductSearchFilter = By.xpath("//*[contains(local-name(), 'filter')]//input[contains(@id,'policy') and contains(@id,'product')]");

  //#endregion

  constructor(private driverService: SeleniumWebDriverService) { }

  //#region Input valide data to Search and Filter Account form
  public async inputNameOnSearchAndFilterForm(Name: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtNameSearchFilter, Name);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("inputNameOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputOrgNo_NinOnSearchAndFilterForm(OrgNo_NIN: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtOrgNo_NINSearchFilter, OrgNo_NIN);
      let validationMessage = By.xpath("//label[@for='pgs-account-filter-ssn']/following-sibling::div/formly-validation-message");
      if (await this.driverService.isExisted(validationMessage)) {
        logWarningMessage(OrgNo_NIN + ": Format of Org.No/NIN is not correct!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("inputOrgNo_NinOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputEmailOnSearchAndFilterForm(Email: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmailSearchFilter, Email);
      let validationMessage = By.xpath("//label[@for='pgs-account-filter-email']/following-sibling::div/formly-validation-message");
      if (await this.driverService.isExisted(validationMessage)) {
        logWarningMessage(Email + ": Format of Email is not correct!");
        return false;
      }

      return true;
    } catch (error) {
      console.log("inputEmailOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPhoneOnSearchAndFilterForm(Phone: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPhoneSearchFilter, Phone);
      let validationMessage = By.xpath("//label[@for='pgs-account-filter-phone']/following-sibling::div/formly-validation-message");
      if (await this.driverService.isExisted(validationMessage)) {
        logWarningMessage(Phone + ": Format of Phone is not correct!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("inputPhoneOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputKamOnSearchAndFilterForm(KAM: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-customer-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.cmbKAMSearchFilter);
      if (!(await this.driverService.isExisted(By.xpath("//*[@id='pgs-account-filter-kam' and (@aria-activedescendant)]")))) {
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
      }
      await this.driverService.setText(this.cmbKAMSearchFilter, KAM);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found KAM with name "${KAM}"`);
        return false;
      }
      await selectDropdownOption_v2(KAM, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputKamOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputStatusOnSearchAndFilterForm(Status: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-customer-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbStatusSearchFilter, Status);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found Status with name "${Status}"`);
        return false;
      }
      await selectDropdownOption(Status, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputStatusOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputTypeOnSearchAndFilterForm(Type: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-customer-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbTypeSearchFilter, Type);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found Type with name "${Type}"`);
        return false;
      }
      await selectDropdownOption(Type, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputTypeOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputAddressOnSearchAndFilterForm(Address: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddressSearchFilter, Address);
      return true;
    } catch (error) {
      console.log("inputAddressOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeOnSearchAndFilterForm(Postcode: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcodeSearchFilter, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputCityOnSearchAndFilterForm(City: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCitySearchFilter, City);
      return true;
    } catch (error) {
      console.log("inputCityOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputCountryOnSearchAndFilterForm(Country: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-customer-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbCountrySearchFilter, Country);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found Country with name "${Country}"`);
        return false;
      }
      await selectDropdownOption(Country, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputCountryOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputQuoteReferenceOnSearchAndFilterForm(QuoteReference: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtQuoteReferenceSearchFilter, QuoteReference);
      return true;
    } catch (error) {
      console.log("inputQuoteReferenceOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyReferenceOnSearchAndFilterForm(PolicyReference: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPolicyReferenceSearchFilter, PolicyReference);
      return true;
    } catch (error) {
      console.log("inputPolicyReferenceOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyStartDateFromOnSearchAndFilterForm(PolicyStartDateFrom: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpPolicyStartDateFromSearchFilter, PolicyStartDateFrom);
      return true;
    } catch (error) {
      console.log("inputPolicyStartDateFromOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyStartDateToOnSearchAndFilterForm(PolicyStartDateTo: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpPolicyStartDateToSearchFilter, PolicyStartDateTo);
      return true;
    } catch (error) {
      console.log("inputPolicyStartDateToOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyEndDateFromOnSearchAndFilterForm(PolicyEndDateFrom: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpPolicyEndDateFromSearchFilter, PolicyEndDateFrom);
      return true;
    } catch (error) {
      console.log("inputPolicyEndDateFromOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyEndDateToOnSearchAndFilterForm(PolicyEndDateTo: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpPolicyEndDateToSearchFilter, PolicyEndDateTo);
      return true;
    } catch (error) {
      console.log("inputPolicyEndDateToOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputProductOnSearchAndFilterForm(Product: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-customer-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProductSearchFilter, Product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found Product with name "${Product}"`);
        return false;
      }
      await selectDropdownOption(Product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  //#endregion
  public async inputInvalidDataToSearchAndFilterForm(OrgNo_NIN: string,
    Email: string,
    Phone: string,
    PolicyStartDateFrom: string,
    PolicyStartDateTo: string,
    PolicyEndDateFrom: string,
    PolicyEndDateTo: string
  ): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameSearchFilter);
      await this.driverService.waitUntilElementLoaded(By.xpath("//ng-progress/div[@class='ng-progress-bar']"));

      if (OrgNo_NIN) {
        await this.driverService.setText(this.txtOrgNo_NINSearchFilter, OrgNo_NIN);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[@for='pgs-account-filter-ssn']/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("OrgNo/NIN: Should be shows validation error message when input incorrect format of OrgNo/NIN!");
          return false;
        }
      }
      if (Email) {
        await this.driverService.setText(this.txtEmailSearchFilter, Email);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[@for='pgs-account-filter-email']/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("Email: Should be shows validation error message when input incorrect format of Email!");
          return false;
        }
      }
      if (Phone) {
        await this.driverService.setText(this.txtPhoneSearchFilter, Phone);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[@for='pgs-account-filter-phone']/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("Phone: Should be shows validation error message when input incorrect format of Phone!");
          return false;
        }
      }
      if (PolicyStartDateFrom) {
        await this.driverService.setText(this.dtpPolicyStartDateFromSearchFilter, PolicyStartDateFrom);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Policy start date from')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("PolicyStartDateFrom: Should be shows validation error message when input incorrect format!");
          return false;
        }
      }
      if (PolicyStartDateTo) {
        await this.driverService.setText(this.dtpPolicyStartDateToSearchFilter, PolicyStartDateTo);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Policy start date to')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("PolicyStartDateTo: Should be shows validation error message when input incorrect format!");
          return false;
        }
      }

      if (PolicyEndDateFrom) {
        await this.driverService.setText(this.dtpPolicyEndDateFromSearchFilter, PolicyEndDateFrom);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Policy end date from')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("PolicyEndDateFrom: Should be shows validation error message when input incorrect format!");
          return false;
        }
      }
      if (PolicyEndDateTo) {
        await this.driverService.setText(this.dtpPolicyEndDateToSearchFilter, PolicyEndDateTo);
        await this.driverService.pressTabCurrentElement();
        let validationMessage = By.xpath("//label[contains(text(),'Policy end date to')]/following-sibling::div/formly-validation-message");
        if (!(await this.driverService.isExisted(validationMessage))) {
          logWarningMessage("PolicyEndDateTo: Should be shows validation error message when input incorrect format!");
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
