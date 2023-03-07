import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { getCurrentDateTime, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { resultColumn } from "../../../../../shared/variables";


export class GlobalSearchSearchFilterForm extends BasePage {

  //Elements at form Search & filter
  private cmbEntityTypeSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-global-search-type']`);
  private cmbEntityTypeSearchAndFilterValue = By.xpath(`//app-global-search-result//form//ng-select[.//*[@id='pgs-global-search-type']]//span[contains(@class,'ng-value-label')]`);

  private txtKeywordSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-global-search-keyword']`);
  private cmbPropertiesSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-global-search-picked-field']`);

  /*Sub elements of Properties*/
  private txtNameSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-fullname']`);
  private txtOrgNoSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-ssn']`);
  private txtEmailSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-email']`);
  private txtPhoneSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-phone']`);
  private cmbKAMSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-kam']`);
  private cmbStatusSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-status']`);
  private cmbTypeSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-type']`);
  private txtAddressSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-address']`);
  private txtPostcodeSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-postcode']`);
  private txtCitySearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-city']`);
  private cmbCountrySearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-country']`);
  private txtQuoteReferenceSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-quote-number']`);
  private txtPolicyReferenceSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-policy-number']`);
  private dtpPolicyStartDateFromSearchAndFilter = By.xpath(`//app-global-search-result//label[contains(text(),'Policy start date from')]/following-sibling::formly-datepicker//input`);
  private dtpPolicyStartDateToSearchAndFilter = By.xpath(`//app-global-search-result//label[contains(text(),'Policy start date to')]/following-sibling::formly-datepicker//input`);
  private dtpPolicyEndDateFromSearchAndFilter = By.xpath(`//app-global-search-result//label[contains(text(),'Policy end date from')]/following-sibling::formly-datepicker//input`);
  private dtpPolicyEndDateToSearchAndFilter = By.xpath(`//app-global-search-result//label[contains(text(),'Policy end date to')]/following-sibling::formly-datepicker//input`);
  private cmbProductSearchAndFilter = By.xpath(`//app-global-search-result//form//*[@id='pgs-account-filter-policy-product']`);



  public async inputEntityTypeAtSearchAndFilter(entityType: string) {
    try {
      if (entityType) {
        await this.driverService.waitUntilElementLoaded(this.cmbEntityTypeSearchAndFilter);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
        await this.driverService.setText(this.cmbEntityTypeSearchAndFilter, entityType);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(entityType, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputEntityTypeAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async validateValueEntityTypeAtSearchAndFilter(expectedValue: string) {
    try {
      const element = await this.getFieldType(this.cmbEntityTypeSearchAndFilterValue);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate EntityTypeSearchAndFilter!',
        [actualValue, expectedValue, 'Incorrect EntityTypeSearchAndFilter!']);
    } catch (error) {
      console.log('validateValueEntityTypeAtSearchAndFilter');
      console.log(error);
      return false;
    }
  }

  public async inputKeywordAtSearchAndFilter(keyword: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtKeywordSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500, 60000);
      await this.driverService.setText(this.cmbEntityTypeSearchAndFilter, keyword);
      return true;
    } catch (error) {
      console.log("inputKeywordAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async inputPropertyAtSearchAndFilter(property: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPropertiesSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.cmbPropertiesSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(property, "", this.driverService);
      await this.driverService.click(this.cmbPropertiesSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log("inputPropertyAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async expandPropertiesAtSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPropertiesSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.cmbPropertiesSearchAndFilter);
      return true;
    } catch (error) {
      console.log("expandPropertiesAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async checkPropertyExistAtSearchAndFilter(PropertyName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const property = By.xpath(`//app-global-search-result//label[contains(text(),'${PropertyName}')]/following-sibling::*//input`);
      return await this.driverService.isExisted(property);
    } catch (error) {
      console.log("checkPropertyExistAtSearchAndFilter\n" + error);
      return false;
    }
  }
  //Input sub elements of Properties

  //Type "Account"
  public async inputQuoteReferenceAtSearchAndFilter(quoteReference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtQuoteReferenceSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtQuoteReferenceSearchAndFilter, quoteReference);
      return true;
    } catch (error) {
      console.log("inputQuoteReferenceAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async inputPolicyReferenceAtSearchAndFilter(policyReference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPolicyReferenceSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtPolicyReferenceSearchAndFilter, policyReference);
      return true;
    } catch (error) {
      console.log("inputPolicyReferenceAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async inputPolicyStartDateFromAtSearchAndFilter(policyStartDateFrom: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpPolicyStartDateFromSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.dtpPolicyStartDateFromSearchAndFilter, policyStartDateFrom);
      return true;
    } catch (error) {
      console.log("inputPolicyStartDateFromAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async inputPolicyStartDateToAtSearchAndFilter(policyStartDateTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpPolicyStartDateToSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.dtpPolicyStartDateToSearchAndFilter, policyStartDateTo);
      return true;
    } catch (error) {
      console.log("inputPolicyStartDateToAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async inputProductAtSearchAndFilter(product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProductSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.cmbProductSearchAndFilter, product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductAtSearchAndFilter\n" + error);
      return false;
    }
  }

  public async verifySearchAndFilterFields(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-global-search-result`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`//app-global-search-result//label[contains(@for,"global-search")]`));
      let allOptions: string[] = [];
      for (const option of await options) {
        let text = await (await option.getText())
        allOptions.push(text.toUpperCase());;
      }
      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn(`Advanced Search's "Search and Filter" pane`, `3 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
        }
      }
      let extraOptions = allOptions.filter(option => !itemList.includes(option));

      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn(`Advanced Search's "Search and Filter" pane`, `3 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }

      return result;
    } catch (error) {
      console.log(`verifySearchAndFilterFields`);
      console.log(error);
      return result;
    }
  }
}
