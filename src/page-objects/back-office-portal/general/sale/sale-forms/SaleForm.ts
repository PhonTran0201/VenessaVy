import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
var _ = require('lodash');


export class SaleForm extends BasePage{
  private cmbChooseFromExistingAccount = By.xpath("//*[@id='pgs-sale-sale-customer']");

  //Account Info
  private cmbOrganization = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-sale-organization')]//input");

  //1. Person
  private txtFirstNameAccountInfoPerson = By.xpath("//*[@id='pgs-sale-account-firstname']");
  private txtLastNameAccountInfoPerson = By.xpath("//*[@id='pgs-sale-account-lastname']");
  //2. Company
  private txtCompanyNameAccountInfo = By.xpath("//*[@id='pgs-sale-account-fullname']");

  //Contact on Sale Company form
  private cmbChooseFromExistingContactCompany = By.xpath("//*[@id='pgs-sale-contact-id']");
  private txtFirstNameContactCompany = By.xpath("//*[@id='pgs-sale-contact-firstname']");
  private txtLastNameContactCompany = By.xpath("//*[@id='pgs-sale-contact-lastname']");
  private txtEmailContactCompany = By.xpath("//*[@id='pgs-sale-contact-email']");
  private txtPhoneContactCompany = By.xpath("//*[@id='pgs-sale-contact-phone']");

  private txtSSN_OrgAccountInfo = By.xpath("//*[@id='pgs-sale-account-ssn']");
  private txtEmailAccountInfo = By.xpath("//*[@id='pgs-sale-account-email']");
  private cmbKAMAccountInfo = By.xpath("//*[@id='pgs-sale-account-kam']");

  // Sale old field
  private cmbPipelineSales = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-pipeline')]//input");
  private cmbSalesStageSales = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-sales-stage')]//input");
  private txtSalesNameSales = By.xpath("//app-sales-form//input[contains(@class,'pgs-json-schema-control-sales-name')]");
  private cmbSalesRepSales = By.xpath("//app-sales-form//*[contains(@class,'pgs-json-schema-control-sales-rep.')]//input");
  private cmbProductSales = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-product')]//input");
  private dtpClosedDateSales = By.xpath("//app-sales-form//input[contains(@class,'pgs-json-schema-control-close-date')]");
  private cmbTeamSales = By.xpath("//app-sales-form//div[./label[text()=' Team ']]//input");
  private cmbTeamSalesValue = By.xpath("//app-sales-form//div[./label[text()=' Team ']]//span[contains(@class,'ng-value-label')]");
  private cmbTeamMemberSales = By.xpath("//app-sales-form//div[./label[text()=' Team Member ']]//input");
  private cmbTeamMemberSalesValue = By.xpath("//app-sales-form//div[./label[text()=' Team Member ']]//span[contains(@class,'ng-value-label')]");
  private txtPhoneSales = By.xpath("//app-sales-form//div[./label[text()=' Phone ']]//input[@id]");
  private dtpTimeToCallSales = By.xpath("//app-sales-form//app-date-time-layout[./label[text()=' Time To Call ']]//input[@id]");
  private txtTotalDealAmountSales = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-amount') or contains(@class,'pgs-json-schema-control-total-deal-amount')]//input");
  private cmbCurrencySales = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-currency')]//input");

  //SALE NEW FIELDS ACCORDING TO PBI
  private txtAnnualContractValue = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-annual-contract-value')]//input");
  private txtCloseQuarter = By.xpath("//app-sales-form//input[contains(@class,'pgs-json-schema-control-close-quarter')]");
  private txtType = By.xpath("//app-sales-form//ng-select[contains(@class,'pgs-json-schema-control-sales-type')]//input");
  private txtDealSource = By.xpath("//app-sales-form//ng-select[contains(@class,'pgs-json-schema-control-deal-source')]//input");
  private cmbProductPL = By.xpath("//app-sales-form//ng-select[contains(@class,'pgs-json-schema-control-product-p&l')]//input");
  private txtDealStatus = By.xpath("//app-sales-form//ng-select[contains(@class,'pgs-json-schema-control-sales-status')]//input");
  private txtRegion = By.xpath("//app-sales-form//ng-select[contains(@class,'pgs-json-schema-control-region')]//input");
  private txtCAPEX = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-capex')]//input");
  private txtRiskChallenge = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-risks-/-challenges')]//input");
  private txtARR = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-arr')]//input");
  private txtMaintenance = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-license-&-maintenance')]//input");
  private txtProfessionalService = By.xpath("//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-professional-service')]//input");
  private txtDealPeriod = By.xpath("//app-sales-form//textarea[contains(@class,'pgs-json-schema-control-deal-period')]");
  private txtDescription = By.xpath("//app-sales-form//textarea[contains(@class,'pgs-json-schema-control-description')]");

  private txtValidationMessage = By.xpath("//app-sales-form//formly-validation-message | //app-sales-form//div[contains(@class,'invalid-feedback')]");

  //btn save create sale
  private btnSaveCreateSale = By.xpath("//button[@type='submit' and @form='pgs-sale-form']");
  private btnCloseSaleForm = By.xpath(`//app-sales-form//button[@aria-label='Close']`);

  //Varsam sale field
  private txtAmount = By.xpath(`//app-sales-form//input[@placeholder="Enter Amount"]`);

  //#region Input data for each fields on Sale form
  public async inputChooseFromExistingAccountOnSaleForm(nameAccount: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbChooseFromExistingAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.cmbChooseFromExistingAccount, nameAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(nameAccount, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputChooseFromExistingAccountOnSaleForm");
      console.log(error);
      return false;
    }
  }

  //#region region Account info section
  public async inputOrganizationAccountInfoOnSaleForm(Organization: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbOrganization, Organization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Organization, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputOrganizationAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputFirstNameAccountInfoOnSaleForm(firstName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtFirstNameAccountInfoPerson, firstName);
      return true;
    } catch (error) {
      console.log("inputFirstNameAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputLastNameAccountInfoOnSaleForm(lastName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtLastNameAccountInfoPerson, lastName);
      return true;
    } catch (error) {
      console.log("inputLastNameAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputCompanyNameAccountInfoOnSaleForm(companyName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCompanyNameAccountInfo, companyName);
      return true;
    } catch (error) {
      console.log("inputCompanyNameAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputSSN_ORGAccountInfoOnSaleForm(SSN_ORG: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSSN_OrgAccountInfo, SSN_ORG);
      return true;
    } catch (error) {
      console.log("inputSSN_ORGAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputEmailAccountInfoOnSaleForm(email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmailAccountInfo, email);
      return true;
    } catch (error) {
      console.log("inputEmailAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputKAMAccountInfoOnSaleForm(KAM: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      await this.driverService.setText(this.cmbKAMAccountInfo, KAM);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(KAM, "", this.driverService);
      await this.driverService.pressEnter(this.cmbKAMAccountInfo);
      return true;
    } catch (error) {
      console.log("inputKAMAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region  Sales section
  public async inputPipelineSalesOnSaleForm(pipeline: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbPipelineSales, pipeline);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(pipeline, "", this.driverService);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputPipelineSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputSalesStageSalesAccountInfoOnSaleForm(stage: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSalesStageSales, stage);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(stage, "", this.driverService);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputSalesStageSalesAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputSaleNameSalesOnSaleForm(saleName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSalesNameSales, saleName);
      return true;
    } catch (error) {
      console.log("inputSaleNameSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputProductSalesOnSaleForm(product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProductSales, product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputSalesRepSalesOnSaleForm(SalesRep: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSalesRepSales, SalesRep);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(SalesRep, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputSalesRepSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputCurrencySalesOnSaleForm(currency: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbCurrencySales, currency);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      // await selectDropdownOption(currency, "", this.driverService);
      await this.driverService.pressEnterCurrentElement();

      return true;
    } catch (error) {
      console.log("inputCurrencySalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputTotalDealAmountSalesOnSaleForm(amount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtTotalDealAmountSales, amount);
      return true;
    } catch (error) {
      console.log("inputTotalDealAmountSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputClosedDateSalesOnSaleForm(closeDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpClosedDateSales, closeDate);
      return true;
    } catch (error) {
      console.log("inputClosedDateSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputTeamOnSaleForm(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbTeamSales);
      await this.driverService.setText(this.cmbTeamSales, value);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await selectDropdownOption(value, '', this.driverService);
      return true;
    } catch (error) {
      console.log('inputTeamOnSaleForm');
      console.log(error);
      return false;
    }
  }

  public async inputTeamMemberOnSaleForm(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbTeamMemberSales);
      await this.driverService.setText(this.cmbTeamMemberSales, value);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await selectDropdownOption(value, '', this.driverService);
      return true;
    } catch (error) {
      console.log('inputTeamMemberOnSaleForm');
      console.log(error);
      return false;
    }
  }

  public async inputPhoneOnSaleForm(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtPhoneSales);
      await this.driverService.setText(this.txtPhoneSales, value);
      return true;
    } catch (error) {
      console.log('inputPhoneOnSaleForm');
      console.log(error);
      return false;
    }
  }

  public async inputTimeToCallOnSaleForm(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.dtpTimeToCallSales);
      await this.driverService.setText(this.dtpTimeToCallSales, value);
      return true;
    } catch (error) {
      console.log('inputTimeToCallOnSaleForm');
      console.log(error);
      return false;
    }
  }

  public async inputAnnualContractValueSalesOnSaleForm(anualcontractValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAnnualContractValue, anualcontractValue);
      return true;
    } catch (error) {
      console.log("inputAnnualContractValueSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputCloseQuarterSalesOnSaleForm(closeQuarter: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCloseQuarter, closeQuarter);
      return true;
    } catch (error) {
      console.log("inputCloseQuarterSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputSalesTypeSalesOnSaleForm(type: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtType, type);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(type, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputFirstNameAccountInfoOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputDealSourceSalesOnSaleForm(dealSource: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDealSource, dealSource);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(dealSource, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputDealSourceSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputProductPlSalesOnSaleForm(productPL: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProductPL, productPL);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(productPL, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductPlSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputDealStatusSalesOnSaleForm(dealStatus: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDealStatus, dealStatus);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

      await this.driverService.pressEnter(this.txtDealStatus);

      return true;
    } catch (error) {
      console.log("inputDealStatusSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputRegionSalesOnSaleForm(region: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtRegion, region);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(region, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputRegionSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputCAPEXSalesOnSaleForm(capex: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCAPEX, capex);

      return true;
    } catch (error) {
      console.log("inputCAPEXSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputRisksChallengesSalesOnSaleForm(riskchallenges: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtRiskChallenge, riskchallenges);

      return true;
    } catch (error) {
      console.log("inputRisksChallengesSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputARRSalesOnSaleForm(arr: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtARR, arr);

      return true;
    } catch (error) {
      console.log("inputARRSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputLicenseAndMaintenanceSalesOnSaleForm(maintenance: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtMaintenance, maintenance);

      return true;
    } catch (error) {
      console.log("inputLicenseAndMaintenanceSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputProfessionalServiceSalesOnSaleForm(professionalservice: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProfessionalService, professionalservice);

      return true;
    } catch (error) {
      console.log("inputProfessionalServiceSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputDealPeriodSalesOnSaleForm(dealperiod: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDealPeriod, dealperiod);

      return true;
    } catch (error) {
      console.log("inputDealPeriodSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputDescriptionSalesOnSaleForm(description: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDescription, description);

      return true;
    } catch (error) {
      console.log("inputDescriptionSalesOnSaleForm");
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Contact section
  public async inputChooseFromExistingContractOnSaleForm(ExistingContact: string){
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbChooseFromExistingContactCompany, ExistingContact);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(ExistingContact, "", this.driverService);

      return true;
    } catch (error) {
      console.log("inputChooseFromExistingContractOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputFirstNameContactOnSaleForm(FirstName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtFirstNameContactCompany, FirstName);

      return true;
    } catch (error) {
      console.log("inputFirstNameContactOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputLastNameContactOnSaleForm(LastName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtLastNameContactCompany, LastName);

      return true;
    } catch (error) {
      console.log("inputLastNameContactOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputEmailContactOnSaleForm(Email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmailContactCompany, Email);

      return true;
    } catch (error) {
      console.log("inputEmailContactOnSaleForm");
      console.log(error);
      return false;
    }
  }

  public async inputPhoneContactOnSaleForm(Phone: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPhoneContactCompany, Phone);

      return true;
    } catch (error) {
      console.log("inputPhoneContactOnSaleForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#endregion


  public async getAllFieldsAtCreateSaleFormSalesSectionAndCompare(fieldNames: string[] = []) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-sales-form//app-field-layout//label[.="SALES"]`))
      let currentElements = await this.driverService.findElements(By.xpath(`//app-sales-form//section-widget//label[contains(@for,"")][not(contains(.,"SALES"))]`))
      let labels: string[] = []
      for (const ele of currentElements) {
        labels.push(await ele.getText())
      }
      labels.sort()
      fieldNames.sort()
      if (_.isEqual(fieldNames, labels)) {
        return true
      } else {
        throw new Error("Expected fields are not the same as current fields")
      }
    }
    catch (error) {
      console.log(`getAllFieldsAtCreateSaleFormSalesSectionAndCompare`)
      console.log(error);
      return false;
    }
  }


  //#region Validate value at Sale form
  public async validateValueSaleForm(expectedValue: string, nameOfField: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPipelineSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = "";
      switch (nameOfField) {
        case "Pipeline": {
          const pipeline = By.xpath("//app-sales-form//label[contains(text(),'Pipeline')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          // logInfoMessage("Waiting for 6s...");
          // await this.driverService.waitForSeconds(6000);
          actualValue = await this.driverService.getText(pipeline);
          break;
        }
        case "Sales Stage": {
          const salesStage = By.xpath("//app-sales-form//label[contains(text(),'Sales Stage')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(salesStage);
          break;
        }
        case "Sales Name": {
          actualValue = await this.driverService.getAttributeValue(this.txtSalesNameSales, "value");
          break;
        }
        case "Sales Rep.": {
          const salesRep = By.xpath("//app-sales-form//label[contains(text(),'Sales Rep.')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(salesRep);
          break;
        }
        case "Product": {
          const productSales = By.xpath(
            "//app-sales-form//formly-field[contains(@class,'pgs-json-schema-control-product')]//label[contains(text(),'Product')]/following-sibling::*//span[contains(@class,'ng-value-label')]"
          );
          actualValue = await this.driverService.getText(productSales);
          break;
        }
        case "Close Date": {
          actualValue = await this.driverService.getAttributeValue(this.dtpClosedDateSales, "value");
          break;
        }
        case "Team": {
          actualValue = await this.driverService.getText(this.cmbTeamSalesValue);
          break;
        }
        case "Team Member": {
          actualValue = await this.driverService.getText(this.cmbTeamMemberSalesValue);
          break;
        }
        case "Phone": {
          actualValue = await this.driverService.getAttributeValue(this.txtPhoneSales, "value");
          break;
        }
        case "Time To Call": {
          actualValue = await this.driverService.getAttributeValue(this.dtpTimeToCallSales, "value");
          break;
        }
        case "Currency": {
          const actualCurrency = await this.driverService.getText(By.xpath("//app-sales-form//label[contains(text(),'Currency')]/following-sibling::*//span[contains(@class,'ng-value-label')]"));
          actualValue = actualCurrency.substr(-4, 3); // get text in ('')
          break;
        }
        case "Total Deal Amount": {
          actualValue = await this.driverService.getAttributeValue(this.txtTotalDealAmountSales, "value");
          break;
        }
        case "Annual Contract Value": {
          actualValue = await this.driverService.getAttributeValue(this.txtAnnualContractValue, "value");
          break;
        }
        case "Close Quarter": {
          actualValue = await this.driverService.getAttributeValue(this.txtCloseQuarter, "value");
          break;
        }
        case "Sales Type": {
          const saleType = By.xpath("//app-sales-form//label[contains(text(),'Sales Type')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(saleType);
          break;
        }
        case "Deal Source": {
          const dealSource = By.xpath("//app-sales-form//label[contains(text(),'Deal Source')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(dealSource);
          break;
        }
        case "Product P&L": {
          const productPL = By.xpath("//app-sales-form//label[contains(text(),'Product P&L')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(productPL);
          break;
        }
        case "Sales Status": {
          const salesStatus = By.xpath("//app-sales-form//label[contains(text(),'Sales Status')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(salesStatus);
          break;
        }
        case "Region": {
          const region = By.xpath("//app-sales-form//label[contains(text(),'Region')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
          actualValue = await this.driverService.getText(region);
          break;
        }
        case "CAPEX": {
          actualValue = await this.driverService.getAttributeValue(this.txtCAPEX, "value");
          break;
        }
        case "Risks / Challenges": {
          actualValue = await this.driverService.getAttributeValue(this.txtRiskChallenge, "value");
          break;
        }
        case "ARR": {
          actualValue = await this.driverService.getAttributeValue(this.txtARR, "value");
          break;
        }
        case "License & Maintenance": {
          actualValue = await this.driverService.getAttributeValue(this.txtMaintenance, "value");
          break;
        }
        case "Professional Service": {
          actualValue = await this.driverService.getAttributeValue(this.txtProfessionalService, "value");
          break;
        }
        case "Deal Period": {
          actualValue = await this.driverService.getAttributeValue(this.txtDealPeriod, "value");
          break;
        }
        case "Description": {
          actualValue = await this.driverService.getAttributeValue(this.txtDescription, "value");
          break;
        }
        case "Amount": {
          actualValue = await this.driverService.getAttributeValue(this.txtAmount, "value");
          break;
        }
        default:
          logWarningMessage(`Field with name "${nameOfField}" is NOT found!`);
          return false;
      }
      let result = await this.driverService.validateRecord(`Validate field "${nameOfField}"`, [actualValue, expectedValue, `Incorrect "${nameOfField}"!`]);
      if (result) {
        return result;
      } else {
        throw new Error(`Incorrect "${nameOfField}"!`)
      }
    } catch (error) {
      console.log("validateValueSaleForm\n" + error);
      return false;
    }
  }

  public async checkValidationErrorMessageExisted() {
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    return await this.driverService.isExisted(this.txtValidationMessage);
  }
  //#endregion

  //#region Press buttions on Sale form
  public async saveCreateSalePerson() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveCreateSale);
      await this.driverService.click(this.btnSaveCreateSale);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      logInfoMessage("Wait for loading in 10s...");
      await this.driverService.waitForSeconds(10000);
      //await this.driverService.waitUntilElementIsNotVisible(this.toastMessage);
      return true;
    } catch (error) {
      console.log("saveCreateSalePerson");
      console.log(error);
      return false;
    }
  }
  public async pressCloseSaleFormButton(){
    try {
      const element = await this.getFieldType(this.btnCloseSaleForm);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressCloseSaleFormButton');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region  Clear old data on Sale form
  public async clearOldDataOnSaleForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSalesNameSales);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const btnClear = By.xpath("//app-sales-form//div[contains(@class,'modal-body')]//*[contains(@class,'btn-clear') or @title='Clear all']");
      let count = 0;
      while (await this.driverService.isExisted(btnClear) && count++ < 20) {
        await this.driverService.click(btnClear);
      }
      return true;
    } catch (error) {
      console.log('clearOldDataOnSaleForm');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Get value sale form
  public async getValueTimeToCall() {
    try {
      const element = await this.getFieldType(this.dtpTimeToCallSales);
      const result = await element.getValue();
      return result;
    } catch (error) {
      console.log('getValueTimeToCall');
      console.log(error);
      return '';
    }
  }
  //#endregion
}
