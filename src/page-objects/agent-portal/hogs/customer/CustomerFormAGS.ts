import { By } from "selenium-webdriver";
import { tryParse } from "selenium-webdriver/http";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { AccountForm } from "../../../back-office-portal/general/account/account-forms/AccountForm";
import { ApplicationFormBasicInformation } from "../../../back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";

export class CustomerFormAGS extends AccountForm {
  constructor(protected driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected txtOrgNo = By.xpath("//input[contains(@placeholder,'Enter Org No')]");
  protected btnNext = By.xpath("//button[.//span[text()='Next']]");
  protected btnNextNotSendToR = By.xpath("//button[.//span[text()='Next (Not send to R)']]");

  //Basic information
  protected txtCompanyName = By.xpath(`//input[contains(@id,"input_Name")]`);
  protected cmbProduct = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Product')]]//input");
  protected txtAddress = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Address')]]//input");
  protected txtPostcode = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Postcode')]]//input");
  protected txtCity = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'City')]]//input");
  protected txtContractAmount = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Contract Amount')]]//input");
  protected txtNumberOfEmployees = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Number of employees')]]//input");
  protected txtCurrency = By.xpath(`//input[contains(@id,"Currency")]`);
  protected txtGuaranteeAmount = By.xpath("//*[contains(local-name(),'form')]//div[.//label[text()=' Guarantee Amount ']]//input");
  protected txtStartDate = By.xpath("//*[contains(local-name(),'form')]//div[.//label[text()=' Start Date ']]//input");
  protected txtEndDate = By.xpath("//*[contains(local-name(),'form')]//div[.//label[text()=' End Date ']]//input");
  protected cmbIndustry = By.xpath("//*[contains(local-name(),'form')]//div[.//label[contains(text(),'Industry')]]//input");

  protected dtpStartDate = By.xpath(`//input[contains(@id,"Phase1StartDate")]`);


  public async clickNextNotSendToR() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNextNotSendToR);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnNextNotSendToR);
      return true;
    } catch (error) {
      console.log("clickNextNotSendToR");
      console.log(error);
      return false;
    }
  }
  public async clickNext() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNext);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
      await this.driverService.click(this.btnNext);
      await this.driverService.waitForSeconds(3000);
      await this.driverService.waitForSeconds(3000);
      await this.driverService.waitForSeconds(3000);
      return true;
    } catch (error) {
      console.log("clickNext");
      console.log(error);
      return false;
    }
  }

  //#region input Basic information form

  public async inputProductOnBasicInformationCustomerForm(product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProduct);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProduct, product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await selectDropdownOption(product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputAddressOnBasicInformationCustomerForm(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddress, Address);
      return true;
    } catch (error) {
      console.log("inputAddressOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeOnBasicInformationCustomerForm(Postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcode, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }
  public async inputCityOnBasicInformationCustomerForm(City: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCity, City);
      return true;
    } catch (error) {
      console.log("inputCityOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }
  public async inputContractAmountOnBasicInformationCustomerForm(ContractAmount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtContractAmount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtContractAmount, ContractAmount);
      return true;
    } catch (error) {
      console.log("inputContractAmountOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputNumberOfEmployeesOnBasicInformationCustomerForm(NumberOfEmployees: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNumberOfEmployees);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNumberOfEmployees, NumberOfEmployees);
      return true;
    } catch (error) {
      console.log("inputNumberOfEmployeesOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeAmountOnBasicInformationCustomerForm(GuaranteeAmount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeAmount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeAmount, GuaranteeAmount);
      return true;
    } catch (error) {
      console.log("inputGuaranteeAmountOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputStartDateOnBasicInformationCustomerForm(StartDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtStartDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtStartDate, StartDate);
      return true;
    } catch (error) {
      console.log("inputStartDateOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputEndDateOnBasicInformationCustomerForm(EndDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEndDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEndDate, EndDate);
      return true;
    } catch (error) {
      console.log("inputEndDateOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  public async inputIndustryOnBasicInformationCustomerForm(Industry: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbIndustry);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbIndustry, Industry);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await selectDropdownOption(Industry, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputIndustryOnBasicInformationCustomerForm");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //validate basic info after inputting Org No
  public async validateOrgNoOnBasicInformationCustomerForm(OrgNo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrgNo);
      const ActualOrgNo = await this.driverService.getAttributeValue(this.txtOrgNo, "value");
      return await this.driverService.validateRecord(`Validate field OrgNo`, [ActualOrgNo, OrgNo, `Incorrect OrgNo!`]);
    } catch (error) {
      console.log(`validateOrgNoOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateCompanyNameOnBasicInformationCustomerForm(name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCompanyName);
      const ActualCompanyName = await this.driverService.getAttributeValue(this.txtCompanyName, "value");
      return await this.driverService.validateRecord(`Validate field Company Name`, [ActualCompanyName, name, `Incorrect Company Name!`]);
    } catch (error) {
      console.log(`validateCompanyNameOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateAddressOnBasicInformationCustomerForm(address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      const ActualAddress = await this.driverService.getAttributeValue(this.txtAddress, "value");
      return await this.driverService.validateRecord(`Validate field Address`, [ActualAddress, address, `Incorrect Address!`]);
    } catch (error) {
      console.log(`validateAddressOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validatePostcodeOnBasicInformationCustomerForm(postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode);
      const ActualPostcode = await this.driverService.getAttributeValue(this.txtPostcode, "value");
      return await this.driverService.validateRecord(`Validate field Postcode`, [ActualPostcode, postcode, `Incorrect Postcode!`]);
    } catch (error) {
      console.log(`validatePostcodeOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateCityOnBasicInformationCustomerForm(city: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity);
      const ActualCity = await this.driverService.getAttributeValue(this.txtCity, "value");
      return await this.driverService.validateRecord(`Validate field City`, [ActualCity, city, `Incorrect City!`]);
    } catch (error) {
      console.log(`validateCityOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateCurrencyOnBasicInformationCustomerForm(currency: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCurrency);
      const ActualCurrency = await this.driverService.getAttributeValue(this.txtCurrency, "value");
      return await this.driverService.validateRecord(`Validate field Currency`, [ActualCurrency, currency, `Incorrect Currency!`]);
    } catch (error) {
      console.log(`validateCurrencyOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateStartDateOnBasicInformationCustomerForm(startDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpStartDate);
      const ActualStartDate = await this.driverService.getAttributeValue(this.dtpStartDate, "value");
      return await this.driverService.validateRecord(`Validate field StartDate`, [ActualStartDate, startDate, `Incorrect Currency!`]);
    } catch (error) {
      console.log(`validateStartDateOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }

  public async validateIndustryOnBasicInformationCustomerForm(industry: string) {
    try {
      const cmbIndustry = By.xpath(`(//div[text()="Select industry"]//following::span[@class="ng-value-label"])[1]`);
      await this.driverService.waitUntilElementLoaded(cmbIndustry);
      const ActualIndustry = await this.driverService.getText(cmbIndustry);
      return await this.driverService.validateRecord(`Validate field Industry`, [ActualIndustry, industry, `Incorrect Industry!`]);
    } catch (error) {
      console.log(`validateIndustryOnBasicInformationCustomerForm`);
      console.log(error);
      return false;
    }
  }
}
