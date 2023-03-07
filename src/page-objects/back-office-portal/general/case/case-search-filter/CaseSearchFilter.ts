import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, selectDropdownOption, logSuccessMessage } from "../../../../../shared/functions";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";



export class CaseSearchFilter {

  //Element at Search and Filter
  private btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");
  private txtKeywordSearchFilter = By.xpath("//input[@id='pgs-task-filter-keyword']");
  private cmbSelectEntityType = By.xpath("//app-task-filter//*[text()='Select entity type']/following-sibling::div/input");
  private cmbSearchEntity = By.xpath("//app-task-filter//*[text()='Search Entity']/following-sibling::div/input");
  private cmbStatus = By.xpath("//input[@id='pgs-task-filter-status']");
  private cmbAssignee = By.xpath("//input[@id='pgs-task-filter-assignee']");
  private dtpDueDateFrom = By.xpath("//input[@id='pgs-task-filter-dd-start']");
  private dtpDueDateTo = By.xpath("//input[@id='pgs-task-filter-dd-end']");
  private dtpCreatedDateFrom = By.xpath("//input[@id='pgs-task-filter-created-start']");
  private dtpCreatedDateTo = By.xpath("//input[@id='pgs-task-filter-created-end']");

  //clear all button element for each field
  private btnClearAllKeyword = By.xpath("//label[@for='pgs-task-filter-keyword']//following-sibling::*//button");
  private btnClearAllSelectEntityType = By.xpath("//label[@for='pgs-task-filter-relate-record']//following-sibling::*//span[@title='Clear all']");
  private btnClearAllSearchEntity = By.xpath("//label[@for='pgs-task-filter-relate-record']//following-sibling::*//div[@class='entity-items-select']/div/i");
  private btnClearAllStatus = By.xpath("//label[@for='pgs-task-filter-status']//following-sibling::*//span[@title='Clear all']");
  private btnClearAllAssignee = By.xpath("//label[@for='pgs-task-filter-assignee']//following-sibling::*//span[@title='Clear all']");






  constructor(private driverService: SeleniumWebDriverService) { }
  globalPageObject = new GlobalPageObject(this.driverService);

  public async searchAndFilterCaseByTitle(caseTitle: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
      await this.driverService.click(this.btnSearchAndFilter);
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-task-list//div[contains(@class,'show-right-side')]"));
      await this.driverService.waitForSeconds(2000);
      await this.driverService.setText(this.txtKeywordSearchFilter, caseTitle);
      await this.driverService.pressEnterCurrentElement();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("searchAndFilterCaseByTitle");
      console.log(error);
      return false;
    }
  }

  //#region input value to each field search and filter form

  public async inputKeywordOnSearchAndFilterFormForCase(CaseTitle: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtKeywordSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtKeywordSearchFilter, CaseTitle);
      return true;
    } catch (error) {
      console.log("inputKeywordOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputSelectEntityTypeOnSearchAndFilterFormForCase(selectEntityType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSelectEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSelectEntityType, selectEntityType);
      await this.driverService.waitForSeconds(1000);
      await this.driverService.pressEnter(this.cmbSelectEntityType);
      return true;
    } catch (error) {
      console.log("inputSelectEntityTypeOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputSearchEntityOnSearchAndFilterFormForCase(searchEntity: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.canBeSetText(this.cmbSearchEntity)) {
        await this.driverService.setText(this.cmbSearchEntity, searchEntity);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(searchEntity, "", this.driverService);
        await this.driverService.pressTabCurrentElement();
        return true;
      } else return false;

    }
    catch (error) {
      console.log("inputSearchEntityOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputStatusOnSearchAndFilterFormForCase(status: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbStatus);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbStatus, status);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await selectDropdownOption(status, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputStatusOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputAssigneeOnSearchAndFilterFormForCase(assignee: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbAssignee, assignee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(assignee, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputAssigneeOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputDueDateFromOnSearchAndFilterFormForCase(dueDateFrom: string, isUserForClear: boolean = false): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDueDateFrom);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDueDateFrom, dueDateFrom);
      await this.globalPageObject.waitForSeconds(500);

      if (isUserForClear) {
        const validationMessage = By.xpath("//label[@for='pgs-task-filter-dd-start']//following-sibling::*//formly-validation-message");
        if (await this.driverService.isExisted(validationMessage)) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log("inputDueDateFromOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputDueDateToOnSearchAndFilterFormForCase(dueDateTo: string, isUserForClear: boolean = false): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDueDateTo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDueDateTo, dueDateTo);
      await  this.globalPageObject.waitForSeconds(500);
      if (isUserForClear) {
        const validationMessage = By.xpath("//label[@for='pgs-task-filter-dd-end']//following-sibling::*//formly-validation-message");
        if (await this.driverService.isExisted(validationMessage)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log("inputDueDateToOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputCreatedDateFromOnSearchAndFilterFormForCase(CreatedDateFrom: string, isUserForClear: boolean = false): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateFrom);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpCreatedDateFrom, CreatedDateFrom);
      await this.globalPageObject.waitForSeconds(500);
      if (isUserForClear) {
        const validationMessage = By.xpath("//label[@for='pgs-task-filter-created-start']//following-sibling::*//formly-validation-message");
        await  this.globalPageObject.waitForSeconds(500);
        if (await this.driverService.isExisted(validationMessage)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log("inputCreatedDateFromOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }

  public async inputCreatedDateToOnSearchAndFilterFormForCase(CreatedDateTo: string, isUserForClear: boolean = false): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateTo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpCreatedDateTo, CreatedDateTo);
      await  this.globalPageObject.waitForSeconds(500);
      if (isUserForClear) {
        const validationMessage = By.xpath("//label[@for='pgs-task-filter-created-end']//following-sibling::*//formly-validation-message");
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
        if (await this.driverService.isExisted(validationMessage)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log("inputCreatedDateToOnSearchAndFilterFormForCase");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region check the Existence of button clear all for each field when click "Clear" Button
  public async checkBtnClearAllOfKeywordOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtKeywordSearchFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllKeyword)) {
        return false;
      }
      else {
        logSuccessMessage("Keyword : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfKeywordOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfSelectEntityTypeOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSelectEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllSelectEntityType)) {
        return false;
      }
      else {
        logSuccessMessage("Select Entity Type : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfSelectEntityTypeOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfSearchEntityOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllSearchEntity)) {
        return false;
      }
      else {
        logSuccessMessage("Search Entity : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfSearchEntityOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfStatusOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbStatus);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllStatus)) {
        return false;
      }
      else {
        logSuccessMessage("Status : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfStatusOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkBtnClearAllOfAssigneeOnSearchAndFilterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if (await this.driverService.isExisted(this.btnClearAllAssignee)) {
        return false;
      }
      else {
        logSuccessMessage("Assignee : is Cleaned!");
        return true;
      }
    } catch (error) {
      console.log("checkBtnClearAllOfAssigneeOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkClearAllOfDueDateFromOnSearchAndFilterForm() {
    try {

      await this.driverService.waitUntilElementLoaded(this.dtpDueDateFrom);
      const DueDateFrom = await this.driverService.getAttributeValue(this.dtpDueDateFrom, "value");
      if (DueDateFrom == "") {
        logSuccessMessage("Due date from field : has not text!");
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log("checkClearAllOfDueDateFromOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkClearAllOfDueDateToOnSearchAndFilterForm() {
    try {

      await this.driverService.waitUntilElementLoaded(this.dtpDueDateTo);
      const DueDateTo = await this.driverService.getAttributeValue(this.dtpDueDateTo, "value");
      if (DueDateTo == "") {
        logSuccessMessage("Due date To field : has not text!");
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log("checkClearAllOfDueDateToOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkClearAllOfCreatedDateFromOnSearchAndFilterForm() {
    try {

      await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateFrom);
      const CreatedDateFrom = await this.driverService.getAttributeValue(this.dtpCreatedDateFrom, "value");
      if (CreatedDateFrom == "") {
        logSuccessMessage("Created date From field : has not text!");
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log("checkClearAllOfCreatedDateFromOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }

  public async checkClearAllOfCreatedDateToOnSearchAndFilterForm() {
    try {

      await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateTo);
      const CreatedDateTo = await this.driverService.getAttributeValue(this.dtpCreatedDateTo, "value");
      if (CreatedDateTo == "") {
        logSuccessMessage("Created date To field : has not text!");
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log("checkClearAllOfCreatedDateToOnSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  //#endregion
}
