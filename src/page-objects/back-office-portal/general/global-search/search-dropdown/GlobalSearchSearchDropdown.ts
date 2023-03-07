import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";


/**
 * Dropdown global search - advanced search
 */
export class GlobalSearchSearchDropdown {
  constructor(private driverService: SeleniumWebDriverService) { }

  private cmbSearchTypeExpanded = By.xpath("(//app-global-search//formly-wrapper-form-field)[1]//div[@aria-expanded='true']//input");
  private cmbSearchTypeCollapsed = By.xpath("(//app-global-search//formly-wrapper-form-field)[1]//div[@aria-expanded='false']//input");

  private txtSearchExpaned = By.xpath("(//app-global-search//formly-wrapper-form-field)[2]//div[@aria-expanded='true']//input");
  private txtSearchCollapsed = By.xpath("(//app-global-search//formly-wrapper-form-field)[2]//div[@aria-expanded='false']//input");
  private txtSearch = By.xpath("(//app-global-search//formly-wrapper-form-field)[2]//div//input");

  private optionNoItemsFoundType = By.xpath("(//app-global-search//formly-wrapper-form-field)[1]//div[contains(text(),'No items found')]");
  private optionNoItemsFoundEntity = By.xpath("(//app-global-search//formly-wrapper-form-field)[2]//div[contains(text(),'No items found')]");

  //#region - Dropdown Search Type
  public async selectEntityType(entityType: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchTypeCollapsed);
      await this.driverService.setText(this.cmbSearchTypeCollapsed, entityType);
      await this.driverService.waitForSeconds(1000);
      await this.driverService.pressEnterCurrentElement();
      if (await this.driverService.isExisted(this.optionNoItemsFoundType)) {
        logWarningMessage(`\t"${entityType}" Not found!`);
        return false;
      }
      return true;
    } catch (error) {
      console.log("selectEntityType");
      console.log(error);
      return false;
    }
  }

  public async checkOptionEntityAtSearchTypeDropdownExist(typeName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchTypeExpanded);
      const optionGlobalSearch = By.xpath(`//app-global-search//div[contains(@class,'ng-option')]//*[text()=' ${typeName} ']`);
      return await this.driverService.isExisted(optionGlobalSearch);
    } catch (error) {
      console.log("checkOptionEntityDropdownAtGlobalSearchExist\n" + error);
      return false;
    }
  }

  public async clickDropdownSearchType() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchTypeCollapsed);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.cmbSearchTypeCollapsed);
      return true;
    } catch (error) {
      console.log("clickDropdownSearchType\n" + error);
      return false;
    }
  }
  //#endregion

  //#region - Global search dropdown
  public async inputSearchField(name: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSearch);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      // await this.driverService.click(this.txtSearch);
      await this.driverService.setText(this.txtSearch, name || "");
      if (name) {
        await waitUntilHorizontalProgressBarLoaded(this.driverService, 60000);
      }
      await this.driverService.waitForSeconds(1000);
      if (await this.driverService.isExisted(this.optionNoItemsFoundEntity)) {
        logWarningMessage(`\t"${name}" Not found!`);
        return false;
      }
      return true;
    } catch (error) {
      console.log("inputSearchField");
      console.log(error);
      return false;
    }
  }

  public async selectFirstEntityInSearchDropdown(name: string): Promise<boolean> {
    try {
      let firstOption = By.xpath(`((//app-global-search//formly-wrapper-form-field)[2]//ng-dropdown-panel//div[@role='option']/div[contains(@title,'${name}')])[1]`);

      await this.driverService.waitUntilElementLoaded(firstOption);
      await this.driverService.click(firstOption);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("selectFirstEntityInSearchDropdown");
      console.log(error);
      return false;
    }
  }

  public async checkOptionResultSuggestAtSearchDropdownExist(typeName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSearchExpaned);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      const optionSearchField = By.xpath(`(//app-global-search//formly-wrapper-form-field)[2]//div[text()='${typeName}']`);
      return await this.driverService.isExisted(optionSearchField);
    } catch (error) {
      console.log("checkOptionResultSuggestAtSearchDropdownExist\n" + error);
      return false;
    }
  }
  //#endregion

  //#region - Assert result after select a sugguested option in Global search dropdown
  public async assertSearchAnAccount(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//app-customer-page//div[@role='tabpanel' and contains(@class,'tab-pane') and contains(@class,'active')]/app-customer-detail//*[contains(@title,'${name}')]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      return true;
    } catch (error) {
      console.log("assertSearchAnAccount");
      console.log(error);
      return false;
    }
  }
  public async assertSearchALead(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//app-lead-page//div[@role='tabpanel' and contains(@class,'tab-pane') and contains(@class,'active')]/app-lead-detail//*[contains(@title,'${name}')]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      return true;
    } catch (error) {
      console.log("assertSearchALead");
      console.log(error);
      return false;
    }
  }

  public async assertSearchAContact(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//app-contact-page//div[@role='tabpanel' and contains(@class,'tab-pane') and contains(@class,'active')]/app-contact-details//*[contains(@title,'${name}')]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      return true;
    } catch (error) {
      console.log("assertSearchAContact");
      console.log(error);
      return false;
    }
  }

  public async assertSearchASale(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//app-sale-page//div[@role='tabpanel' and contains(@class,'tab-pane') and contains(@class,'active')]/app-sale-details//*[contains(@title,'${name}')]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      return true;
    } catch (error) {
      console.log("assertSearchASale");
      console.log(error);
      return false;
    }
  }

  public async assertSearchACase(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//app-task-page//div[@role='tabpanel' and contains(@class,'tab-pane') and contains(@class,'active')]/app-task-detail//*[contains(@title,'${name}')]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      return true;
    } catch (error) {
      console.log("assertSearchACase");
      console.log(error);
      return false;
    }
  }

  public async assertSearchANote(name: string): Promise<boolean> {
    try {
      let lblAccountName = By.xpath(`//ngb-modal-window//app-note-form//*[@id='pgs-note-form-header']`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      let actualName = await this.driverService.getAttributeValue(lblAccountName, "value");
      if (actualName.localeCompare(name) !== 0) {
        logWarningMessage(`\tThe opening Note is "${actualName}"\n\tExpected Note is "${name}"`);
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertSearchACase");
      console.log(error);
      return false;
    }
  }
  //#endregion

}
