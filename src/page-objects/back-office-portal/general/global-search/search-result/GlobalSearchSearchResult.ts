import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, closeToastMessage, getCurrentDateTime } from "../../../../../shared/functions";
import { resultColumn } from "../../../../../shared/variables";

export class GlobalSearchSearchResult {
  constructor(private driverService: SeleniumWebDriverService) { }

  private btnExport = By.xpath("//button[@id='pgs-global-search-export']");
  private btnExportHistory = By.xpath("//button[@id='pgs-global-search-export-history']");

  //Elements at Accounts list
  private lblAccountName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-customer-name')]//*[self::*[text()]])[last()]`);

  //Elements at Contacts list
  private lblContactName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-contact-name')]//*[self::*[text()]])[last()]`);

  //Elements at Leads list
  private lblLeadName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-lead-name')]//*[self::*[text()]])[last()]`);

  //Elements at Notes list
  private lblNoteName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-note-title')]//*[self::*[text()]])[last()]`);

  //Elements at Policies list
  private lblPolicyName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-policy-reference')]//*[self::*[text()]])[last()]`);

  //Elements at Quotes list
  private lblQuoteName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-quote-reference')]//*[self::*[text()]])[last()]`);

  //Elements at Sales list
  private lblSaleName = By.xpath(`(//table//tr[1]//app-opportunity-cell//*[self::*[text()]])[last()]`);

  //Elements at Cases list
  private lblCaseName = By.xpath(`(//table//tr[1]//td[contains(@class,'pgs-search-task-case-title')]//*[self::*[text()]])[last()]`);


  public async checkSearchResultTab(Name: string, numberOfResult: string = "") {
    try {
      const searchResultTab = numberOfResult
        ? By.xpath(`//app-global-search-result//ul[contains(@role,'tablist')]//a[text()=' ${Name} (${numberOfResult}) ']`)
        : By.xpath(`//app-global-search-result//ul[contains(@role,'tablist')]//a[contains(text(),'${Name}')]`);

      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.waitUntilElementLoaded(searchResultTab);
      return true;
    } catch (error) {
      console.log("checkSearchResultTab\n" + error);
      return false;
    }
  }

  public async checkSearchResultTabIsFocused(Name: string) {
    try {
      const searchResultTab = By.xpath(`//app-global-search-result//ul[contains(@role,'tablist')]//a[contains(text(),'${Name}') and contains(@class,'active')]`);
      const searchResultTableName = By.xpath(`//app-global-search-result//h3[text()='${Name}']`);
      await this.driverService.waitUntilElementVisible(searchResultTab);
      await this.driverService.waitUntilElementVisible(searchResultTableName);
      return true;
    } catch (error) {
      console.log("checkSearchResultTab\n" + error);
      return false;
    }
  }

  public async clickTabAtSearchResult(Name: string) {
    try {
      const searchResultTab = By.xpath(`//app-global-search-result//ul[contains(@role,'tablist')]//li[@title='${Name}']/a`);
      await this.driverService.waitUntilElementLoaded(searchResultTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(searchResultTab);
      return true;
    } catch (error) {
      console.log("clickTabAtSearchResult\n" + error);
      return false;
    }
  }

  public async checkColumnAtListExist(columnName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-global-search-result"));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const lblColumnName = By.xpath(`//app-global-search-result//table//th//span[text()='${columnName}']`);
      return await this.driverService.isExisted(lblColumnName);
    } catch (error) {
      console.log("checkColumnAtListExist\n" + error);
      return false;
    }
  }

  public async pressExportButton() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnExport);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnExport);
      return true;
    } catch (error) {
      console.log("pressExportButton\n" + error);
      return false;
    }
  }

  public async openExportHistoryForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnExportHistory);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(this.btnExportHistory);
      return true;
    } catch (error) {
      console.log("openExportHistoryForm\n" + error);
      return false;
    }
  }

  public async pressDownloadExportedData(positionRow: number = 1) {
    try {
      const btnDownload = By.xpath(`(//app-export-history//*[contains(@class,'fa-download')])[${positionRow}]`);
      await this.driverService.waitUntilElementLoaded(btnDownload);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(btnDownload);
      return true;
    } catch (error) {
      console.log("pressDownloadExportedData\n" + error);
      return false;
    }
  }

  public async openFirstAccount() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAccountName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblAccountName);
      return true;
    } catch (error) {
      console.log("openFirstAccount\n" + error);
      return false;
    }
  }

  public async openFirstContact() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblContactName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblContactName);
      return true;
    } catch (error) {
      console.log("openFirstContact\n" + error);
      return false;
    }
  }

  public async openFirstLead() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblLeadName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblLeadName);
      return true;
    } catch (error) {
      console.log("openFirstLead\n" + error);
      return false;
    }
  }

  public async openFirstNote() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblNoteName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblNoteName);
      return true;
    } catch (error) {
      console.log("openFirstNote\n" + error);
      return false;
    }
  }

  public async openFirstPolicy() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPolicyName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblPolicyName);
      return true;
    } catch (error) {
      console.log("openFirstPolicy\n" + error);
      return false;
    }
  }

  public async openFirstQuote() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblQuoteName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblQuoteName);
      return true;
    } catch (error) {
      console.log("openFirstQoute\n" + error);
      return false;
    }
  }

  public async openFirstSale() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblSaleName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblSaleName);
      return true;
    } catch (error) {
      console.log("openFirstSale\n" + error);
      return false;
    }
  }

  public async openFirstCase() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.lblCaseName);
      return true;
    } catch (error) {
      console.log("openFirstCase\n" + error);
      return false;
    }
  }


  //#region Methods at Account tab Search Result
  public async checkNameAccountAtAccountTab(expectedName: string, positionRow: number = 1) {
    try {
      const lblAccountName = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-search-customer-name')]//*[self::*[text()]])[last()]`);
      await this.driverService.waitUntilElementLoaded(lblAccountName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const actualName = await (await this.driverService.getText(lblAccountName)).toLowerCase();
      return actualName.includes(expectedName.toLowerCase());
    } catch (error) {
      console.log("checkNameAccountAtAccountTab\n" + error);
      return false;
    }
  }
  //#endregion

  public async verifySearchedPagesOnSearchResult(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];

    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-global-search-result`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
      let options = await this.driverService.findElements(By.xpath(`//app-global-search-result//ul//li[contains(@class,"nav-item")]`));
      let allOptions: string[] = [];
      for (const option of await options) {
        let text = await (await option.getText()).match(`^[^\(]+`);
        allOptions.push(text![0].trim().toUpperCase());
      }

      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn("Global and Advanced Search", `2 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
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
            result.push(new resultColumn("Global and Advanced Search", `2 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }
      return result;
    } catch (error) {
      console.log(`verifySearchedPagesOnSearchResult`);
      console.log(error);
      return result;
    }
  }
}
