import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, selectDropdownOption, logSuccessMessage } from "../../../../../shared/functions";


export class LeadSearchFilter {

  //Element at Search and Filter
  private btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");
  private txtFirstNameSearchFilter = By.xpath("//input[@id='pgs-lead-search-firstname-field']");
  private txtLastNameSearchFilter = By.xpath("//input[@id='pgs-lead-search-lastname-field']");
  private txtMobileSearchFilter = By.xpath("//input[@id='pgs-lead-search-phone-field']");
  private txtEmailSearchFilter = By.xpath("//input[@id='pgs-lead-search-email-field']");
  private cmbKAMSearchFilter = By.xpath("//input[@id='pgs-lead-search-KAM-field']");
  private txtCompanyNameSearchFilter = By.xpath("//input[@id='pgs-lead-search-company-field']");
  private txtAddressSearchFilter = By.xpath("//input[@id='pgs-lead-search-address-field']");
  private txtPostcodeSearchFilter = By.xpath("//input[@id='pgs-lead-search-postcode-field']");
  private txtCitySearchFilter = By.xpath("//input[@id='pgs-lead-search-city-field']");
  private cmbCountrySearchFilter = By.xpath("//input[@id='pgs-lead-search-country-field']");

  //Button clear all for each field
  private btnClearAllFirstName = By.xpath("//label[@for='pgs-lead-search-firstname-field']//following-sibling::*//button");
  private btnClearAllLastName = By.xpath("//label[@for='pgs-lead-search-lastname-field']//following-sibling::*//button");
  private btnClearAllMobile = By.xpath("//label[@for='pgs-lead-search-phone-field']//following-sibling::*//button");
  private btnClearAllEmail = By.xpath("//label[@for='pgs-lead-search-email-field']//following-sibling::*//button");
  private btnClearAllKAM = By.xpath("//label[@for='pgs-lead-search-KAM-field']//following-sibling::*//span[@title='Clear all']");
  private btnClearAllCompanyName = By.xpath("//label[@for='pgs-lead-search-company-field']//following-sibling::*//button");
  private btnClearAllAddress = By.xpath("//label[@for='pgs-lead-search-address-field']//following-sibling::*//button");
  private btnClearAllPostcode = By.xpath("//label[@for='pgs-lead-search-postcode-field']//following-sibling::*//button");
  private btnClearAllCity = By.xpath("//label[@for='pgs-lead-search-city-field']//following-sibling::*//button");
  private btnClearAllCountry = By.xpath("//label[@for='pgs-lead-search-country-field']//following-sibling::*//span[@title='Clear all']");



  constructor(private driverService: SeleniumWebDriverService) { }


  public async searchAndFilterLeadByFirstNameAndLastName(firstName: string, lastName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
      await this.driverService.click(this.btnSearchAndFilter);
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-lead-list//div[contains(@class,'show-right-side')]"));
      await this.driverService.waitForSeconds(2000);
      await this.driverService.setText(this.txtFirstNameSearchFilter, firstName);
      await this.driverService.setText(this.txtLastNameSearchFilter, lastName);
      await this.driverService.pressEnterCurrentElement();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("searchAndFilterLeadByFirstNameAndLastName");
      console.log(error);
      return false;
    }
  }

  //#region input value to each fields of Search and Filter form

  public async inputFirstNameOnSearchAndFilterFormForLead(FirstName: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtFirstNameSearchFilter, FirstName);
      return true;
    } catch (error) {
      console.log("inputFirstNameOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputLastNameOnSearchAndFilterFormForLead(LastName: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLastNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtLastNameSearchFilter, LastName);
      return true;
    } catch (error) {
      console.log("inputLastNameOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputMobileOnSearchAndFilterFormForLead(Mobile: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtMobileSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtMobileSearchFilter, Mobile);
      let validationMessage = By.xpath("//label[@for='pgs-lead-search-phone-field']/following-sibling::div/formly-validation-message");
      if (await this.driverService.isExisted(validationMessage)) {
        logWarningMessage(Mobile + ": Format of Mobile is not correct!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("inputMobileOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputEmailOnSearchAndFilterFormForLead(Email: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmailSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmailSearchFilter, Email);
      let validationMessage = By.xpath("//label[@for='pgs-lead-search-email-field']/following-sibling::div/formly-validation-message");
      if (await this.driverService.isExisted(validationMessage)) {
        logWarningMessage(Email + ": Format of Email is not correct!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("inputEmailOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputKAMOnSearchAndFilterFormForLead(KAM: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-lead-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.cmbKAMSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbKAMSearchFilter, KAM);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found KAM with name "${KAM}"`);
        return false;
      }
      await selectDropdownOption(KAM, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputKAMOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputCompanyNameOnSearchAndFilterFormForLead(CompanyName: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCompanyNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCompanyNameSearchFilter, CompanyName);
      return true;
    } catch (error) {
      console.log("inputCompanyNameOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputAddressOnSearchAndFilterFormForLead(Address: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddressSearchFilter, Address);
      return true;
    } catch (error) {
      console.log("inputAddressOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeOnSearchAndFilterFormForLead(Postcode: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcodeSearchFilter, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputCityOnSearchAndFilterFormForLead(City: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCitySearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCitySearchFilter, City);
      return true;
    } catch (error) {
      console.log("inputCityOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  public async inputCountryOnSearchAndFilterFormForLead(Country: string): Promise<boolean> {
    try {
      let lblNoItemsFound = By.xpath("//app-lead-filter//div[text()='No items found']");
      await this.driverService.waitUntilElementLoaded(this.cmbCountrySearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbCountrySearchFilter, Country);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      if (await this.driverService.isExisted(lblNoItemsFound)) {
        logWarningMessage(`Not found Country with name "${Country}"`);
        return false;
      }
      await selectDropdownOption(Country, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputCountryOnSearchAndFilterFormForLead");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region check the Existence of button clear all for each field when click "Clear" Button
  public async checkBtnClearAllOfFirstNameOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllFirstName)) {
        return false;
      }
      else {
        logSuccessMessage("First Name : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfFirstNameOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfLastNameOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLastNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllLastName)) {
        return false;
      }
      else {
        logSuccessMessage("Last Name : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfLastNameOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfMobileOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtMobileSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllMobile)) {
        return false;
      }
      else {
        logSuccessMessage("Mobile : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfMobileOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfEmailOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmailSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllEmail)) {
        return false;
      }
      else {
        logSuccessMessage("Email : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfEmailOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfKAMOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbKAMSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllKAM)) {
        return false;
      }
      else {
        logSuccessMessage("KAM : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfKAMOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfCompanyNameOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCompanyNameSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllCompanyName)) {
        return false;
      }
      else {
        logSuccessMessage("Company Name : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfCompanyNameOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfAddressOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllAddress)) {
        return false;
      }
      else {
        logSuccessMessage("Address : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfAddressOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfPostcodeOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllPostcode)) {
        return false;
      }
      else {
        logSuccessMessage("Postcode : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfPostcodeOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfCityOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCitySearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllCity)) {
        return false;
      }
      else {
        logSuccessMessage("City : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfCityOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfCountryOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCountrySearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllCountry)) {
        return false;
      }
      else {
        logSuccessMessage("Country : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfCountryOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  //#endregion
}