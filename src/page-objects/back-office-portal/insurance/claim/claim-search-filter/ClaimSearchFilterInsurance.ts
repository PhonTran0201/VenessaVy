import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { TableManager } from "../../../../../core/fields/TableManager";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ClaimSearchFilterInsurance extends BasePage {

  //Xpath of elements of Search And Filter form
  private txtReferenceSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claimId']");
  private txtObjectNameSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-objectName']");
  private cmbAccountSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-account']");
  private cmbStatusSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claim-status']");
  private dtpDateOfLossFromSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-dateOfLoss-from']");
  private dtpDateOfLossToSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-dateOfLoss-to']");
  private dtpReportedDateFromSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-reportedDate-from']");
  private dtpReportedDateToSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-reportedDate-to']");
  private txtPolicyReferenceSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claim-policy-reference']");
  private cmbClaimHandlerSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claim-claim-handler']");
  private cmbProductSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claim-product']");
  private cmbOrganizationSearchAndFilter = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-claim-organization']");
  private txtOrgNo_NIN = By.xpath("//app-claim-filter//*[@id='pgs-claim-filter-account-ssn']");

  //Element for clear field
  private btnClearClaimHandler = By.xpath("//app-claim-filter//div[./*[@for='pgs-claim-filter-claim-claim-handler']]//span[@title='Clear all']");
  
  private btnClearReference = By.xpath(`//div[./label[@for='pgs-claim-filter-claimId']]//button[contains(@class,'btn-clear')]`);
  private btnClearObjectName = By.xpath(`//div[./label[@for='pgs-claim-filter-objectName']]//button[contains(@class,'btn-clear')]`);
  private btnClearAccount = By.xpath(`//div[./label[@for='pgs-claim-filter-account']]//ng-select//span[@title='Clear all']`);
  private btnClearOrgNo_NIN = By.xpath(`//div[./label[@for='pgs-claim-filter-account']]//ng-select//span[@title='Clear all']`);
  private btnClearStatus = By.xpath(`//div[./label[@for='pgs-claim-filter-claim-status']]//ng-select//span[@title='Clear all']`);
  private btnClearPolicyReference = By.xpath(`//div[./label[@for='pgs-claim-filter-claim-policy-reference']]//button[contains(@class,'btn-clear')]`);
  private btnClearProduct = By.xpath(`//div[./label[@for='pgs-claim-filter-claim-product']]//ng-select//span[@title='Clear all']`);
  private btnClearOrganization = By.xpath(`//div[./label[@for='pgs-claim-filter-claim-organization']]//ng-select//span[@title='Clear all']`);
 
  private locTable = By.css(".table.c-table.table-striped.table-hover");


  //Search and filter form
  public async clearAllDefaultFieldsSearchFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbStatusSearchAndFilter);
      await this.driverService.pressTab(this.cmbStatusSearchAndFilter);
      await this.driverService.pressBackspace(this.dtpDateOfLossFromSearchAndFilter);
      await this.driverService.pressTab(this.dtpDateOfLossFromSearchAndFilter);
      await this.driverService.pressBackspace(this.dtpDateOfLossToSearchAndFilter);
      await this.driverService.pressTab(this.txtPolicyReferenceSearchAndFilter);
      await this.driverService.pressBackspace(this.dtpDateOfLossToSearchAndFilter);
      if (await this.driverService.isExisted(this.btnClearClaimHandler)) {
        await this.driverService.click(this.btnClearClaimHandler);
      }
      return true;
    } catch (error) {
      console.log("clearAllDefaultFieldsSearchFilterForm");
      console.log(error);
      return false;
    }
  }

  //#region Input values
  public async inputReferenceSearchAndFilterForm(Reference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtReferenceSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.txtReferenceSearchAndFilter, Reference);
      return true;
    } catch (error) {
      console.log("inputReferenceSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputObjectNameSearchAndFilterForm(ObjectName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtObjectNameSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.txtObjectNameSearchAndFilter, ObjectName);
      return true;
    } catch (error) {
      console.log("inputObjectNameSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputAccountSearchAndFilterForm(Account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAccountSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.cmbAccountSearchAndFilter, Account);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Account, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputAccountSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputStatusSearchAndFilterForm(Status: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbStatusSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.cmbStatusSearchAndFilter, Status);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Status, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputStatusSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputDateOfLossFromSearchAndFilterForm(DateOfLossFrom: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfLossFromSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.dtpDateOfLossFromSearchAndFilter, DateOfLossFrom);
      return true;
    } catch (error) {
      console.log("inputDateOfLossFromSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputDateOfLossToSearchAndFilterForm(DateOfLossTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfLossToSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.dtpDateOfLossToSearchAndFilter, DateOfLossTo);
      return true;
    } catch (error) {
      console.log("inputDateOfLossToSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputReportedDateFromSearchAndFilterForm(ReportedDateFrom: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpReportedDateFromSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.dtpReportedDateFromSearchAndFilter, ReportedDateFrom);
      return true;
    } catch (error) {
      console.log("inputReportedDateFromSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputReportedDateToSearchAndFilterForm(ReportedDateTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpReportedDateToSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.dtpReportedDateToSearchAndFilter, ReportedDateTo);
      return true;
    } catch (error) {
      console.log("inputReportedDateToSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputPolicyReferenceSearchAndFilterForm(PolicyReference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPolicyReferenceSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.txtPolicyReferenceSearchAndFilter, PolicyReference);
      return true;
    } catch (error) {
      console.log("inputPolicyReferenceSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputClaimHandlerSearchAndFilterForm(ClaimHandler: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbClaimHandlerSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.cmbClaimHandlerSearchAndFilter, ClaimHandler);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(ClaimHandler, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputClaimHandlerSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputProductSearchAndFilterForm(Product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProductSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.cmbProductSearchAndFilter, Product);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputOrganizationSearchAndFilterForm(Organization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganizationSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.setText(this.cmbOrganizationSearchAndFilter, Organization);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Organization, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputOrganizationSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async inputOrgNo_NinOnSearchAndFilterForm(OrgNo_NIN: string) {
    try {
      let element = await this.getFieldType(this.txtOrgNo_NIN);
      await element.setValue(OrgNo_NIN);
      return true;
    } catch (error) {
      console.log("inputOrgNo_NinOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  
  //#endregion

  public async validateClearedSearchAndFilterClaimForm() {
    try {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await this.driverService.waitUntilElementLoaded(this.cmbAccountSearchAndFilter);
   
       if (!(await this.driverService.isExisted(this.btnClearReference)
            || await this.driverService.isExisted(this.btnClearObjectName)
            || await this.driverService.isExisted(this.btnClearAccount)
            || await this.driverService.isExisted(this.btnClearOrgNo_NIN)
            || await this.driverService.isExisted(this.btnClearStatus)
            || await this.driverService.isExisted(this.btnClearPolicyReference)
            || await this.driverService.isExisted(this.btnClearProduct)
            || await this.driverService.isExisted(this.btnClearOrganization)
        ) && await this.driverService.isExisted(this.btnClearClaimHandler)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`validateClearedSearchAndFilterClaimForm`);
        console.log(error);
        return false;
    }

}

}