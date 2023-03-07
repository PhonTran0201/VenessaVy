import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";


export class AccountSetting {
  // private btnSettingAccount = By.xpath(
  //   "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'card') and not(contains(@class,'body')) and .//h4[text()='Account']]//button"
  // );

  //Element at Settings account form
  private formSetting = By.xpath(`//app-configuration-setting-page//div[@class="c-page-content"]`);
  private txtAccountRefStart = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_REFERENCE")]//input`);
  private txtAccountCountry = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_COUNTRY")]//input`);
  private txtPhonePrefix = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_PHONE_PREFIX")]//input`);
  private txtAccountType = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_TYPE")]//input`);

  private btnClearAccountCountry = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_COUNTRY")]//span[@title="Clear all"]`);
  private btnClearPhonePrefix = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_PHONE_PREFIX")]//span[@title="Clear all"]`);
  private btnClearAccountType = By.xpath(`//app-configuration-setting-page//tr/*[contains(@class,"td-module-config-ACCOUNT_TYPE")]//span[@title="Clear all"]`);
  private btnSaveForm = By.xpath(`//app-configuration-setting-page//button[contains(text(),"Save")]`);
  private swExtLookupOrgNo = By.xpath(`//app-configuration-setting-page//tr[td/@title="External lookup on Org.No field (requires external API configured)"]//button`);
  private swExtLookUpSSN = By.xpath(`//app-configuration-setting-page//tr[td/@title="External lookup on SSN field (requires external API configured)"]//button`);
  private swModulus11 = By.xpath(`//app-configuration-setting-page//tr[td/@title="Modulus 11 verification for SSN/Org.No"]//button`);
  private swScoringFeature = By.xpath(
    `//app-configuration-setting-page//tr[td/@title="Scoring Feature (requires external scoring API and internal scoring algorithm defined. Go to Scoring Management to configure)"]//button`
  );
  private cmbShowCustomerLifetime = By.xpath(`//app-configuration-setting-page//tr[td/@title="Show Customer Lifetime"]//input`);
  private lblShowCustomerLifetime = By.xpath(`//app-configuration-setting-page//tr[td/@title="Show Customer Lifetime"]//span[contains(@class,'ng-value-label')]`);


  constructor(private driverService: SeleniumWebDriverService) { }

  public async chooseAccountCountry(countries: string[]) {
    try {
      await this.driverService.waitUntilElementLoaded(this.formSetting);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(this.btnClearAccountCountry)) await this.driverService.click(this.btnClearAccountCountry);
      for (const country of countries) {
        await this.driverService.setText(this.txtAccountCountry, country);
        await selectDropdownOption(country, "", this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      return true;
    } catch (error) {
      console.log("chooseAccountCountry");
      console.log(error);
      return false;
    }
  }

  public async enterAccountReferenceStartValue(value: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.formSetting);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.txtAccountRefStart, value);
      // await selectDropdownOption(value, "", this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("enterAccountReferenceStartValue");
      console.log(error);
      return false;
    }
  }

  public async enterAccountPhonePrefix(phonePrefix: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.formSetting);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      if (await this.driverService.isExisted(this.btnClearPhonePrefix)) await this.driverService.click(this.btnClearPhonePrefix);

      await this.driverService.setText(this.txtPhonePrefix, phonePrefix);
      await selectDropdownOption(phonePrefix, "", this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      return true;
    } catch (error) {
      console.log("enterAccountPhonePrefix");
      console.log(error);
      return false;
    }
  }

  public async chooseAccountType(types: string[]) {
    try {
      await this.driverService.waitUntilElementLoaded(this.formSetting);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      if (await this.driverService.isExisted(this.btnClearAccountType)) await this.driverService.click(this.btnClearAccountType);
      for (const type of types) {
        await this.driverService.setText(this.txtAccountType, type);
        await selectDropdownOption(type, "", this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }

      return true;
    } catch (error) {
      console.log("chooseAccountType");
      console.log(error);
      return false;
    }
  }

  public async saveSettingForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      // await this.driverService.click(this.formSetting);
      await this.driverService.click(this.btnSaveForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000); 
      return true;
    } catch (error) {
      console.log("saveSettingForm");
      console.log(error);
      return false;
    }
  }

  public async chooseShowCustomerLifetime(option: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbShowCustomerLifetime);
      await this.driverService.scrollElementToView(await this.driverService.findElement(this.cmbShowCustomerLifetime));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.cmbShowCustomerLifetime, option);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let xpathOption = By.xpath(`//ng-dropdown-panel//div/*[self::*[contains(text(),'${option}')]]`);
      if (await this.driverService.isExisted(xpathOption)) {
        await this.driverService.click(xpathOption);
      }else{
        await this.driverService.pressEnter(this.cmbShowCustomerLifetime);
      }
      return true;
    } catch (error) {
      console.log(`chooseShowCustomerLifetime`);
      console.log(error);
      return false;
    }
  }

  public async validateCustomerLifetime(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbShowCustomerLifetime);
      let actualValue = await this.driverService.getText(this.lblShowCustomerLifetime);
      return await this.driverService.validateRecord(`Validate Customer Lifetime: `, [actualValue, expectedValue, 'Incorrect Customer Lifetime!']);
    } catch (error) {
      console.log(`validateCustomerLifetime`);
      console.log(error);
      return false;
    }
  }

  //begin of button functions
  //get value of the button: toggle on/off = true/false
  public async getExtLookupOrgStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    let buttonStatus = await this.driverService.getAttributeValue(this.swExtLookupOrgNo, "aria-checked");
    if (buttonStatus === `true`) {
      return true;
    } else return false;
  }

  public async changeExtLookupOrgStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    try {
      await this.driverService.click(this.swExtLookupOrgNo);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("changeExtLookupOrgStatus");
      console.log(error);
      return false;
    }
  }

  public async getExtLookupSSNStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    let buttonStatus = await this.driverService.getAttributeValue(this.swExtLookUpSSN, "aria-checked");
    if (buttonStatus === `true`) {
      return true;
    } else return false;
  }

  public async changeExtLookupSSNStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    try {
      await this.driverService.click(this.swExtLookUpSSN);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("changeExtLookupOrgStatus");
      console.log(error);
      return false;
    }
  }

  public async getModulus11Status() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    let buttonStatus = await this.driverService.getAttributeValue(this.swModulus11, "aria-checked");
    if (buttonStatus === `true`) {
      return true;
    } else return false;
  }

  public async changeModulus11Status() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    try {
      await this.driverService.click(this.swModulus11);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("changeExtLookupOrgStatus");
      console.log(error);
      return false;
    }
  }

  public async getScoringFeatureStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    let buttonStatus = await this.driverService.getAttributeValue(this.swScoringFeature, "aria-checked");
    if (buttonStatus === `true`) {
      return true;
    } else return false;
  }

  public async changeScoringFeatureStatus() {
    await this.driverService.waitUntilElementLoaded(this.formSetting);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    try {
      await this.driverService.click(this.swScoringFeature);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("changeExtLookupOrgStatus");
      console.log(error);
      return false;
    }
  }
  //end of button functions
}
