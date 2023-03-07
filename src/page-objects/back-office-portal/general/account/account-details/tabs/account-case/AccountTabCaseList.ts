import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, reloadTable, waitUntilHorizontalProgressBarLoaded } from "../../../../../../../shared/functions";
import { scenarioName } from "../../../../../../../shared/variables";
import { CaseList } from "../../../../case/case-list/CaseList";


/**
 * Case list in Account detail
 */
export class AccountTabCaseList extends CaseList {
  protected btnCreate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-add-task-entity-list']");
  protected lblCaseTitle = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[1]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]");

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  public async pressCreate() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCreate);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Output: this function will return:
  //        1. Possition of row edited.
  //        2. Created Date of edited case.
  public async openEditCaseFormByName(selectedCase: string): Promise<any> {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      for (let i = 1; i <= 10; i++) {
        let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // logWarningMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnEdit = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//*[@id='pgs-edit-case-act'])[${i}]`);
            let lblCreateDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`);
            let createDate = await this.driverService.getText(lblCreateDate);
            await this.driverService.click(btnEdit);
            return [i, createDate];
          }
        }
      }
      return [-1, ""];
    } catch (error) {
      console.log("openEditCaseFormByName");
      console.log(error);
      return [-1, ""];
    }
  }

  public async openCaseFormByRow(positionRow: number = 1) {
    try {
      let btnCaseEditForm = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//*[@id='pgs-edit-case-act'])[${positionRow}]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(btnCaseEditForm)) {
        await this.driverService.click(btnCaseEditForm);
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
        return true;
      }
      return false;
    } catch (error) {
      console.log(`openCaseFormByRow`);
      console.log(error);
      return false;
    }
  }

  public async openAssignUserFormByName(selectedCase: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 10; i++) {
        let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // fail(`Can't find account with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnAssign = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]//*[@id='pgs-assign-case-act']`);
            await this.driverService.click(btnAssign);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find account with name \"${selectedCase}\" into Case List`);
      return false;
    } catch (error) {
      console.log("openAssignUserFormByName");
      console.log(error);
      return false;
    }
  }

  //input: title of case want to delete. (string)
  //Output: position row of case deleted (number), and CreatedDate of that case (string)
  //If don't find case to delete, it will return -1.
  public async deleteCaseByName(caseTitle: string): Promise<any> {
    let position: number = -1;
    let createdDate: string = "";
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
        let btnDeleteCase = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-list//table//tr[${i}]//button//*[contains(@class,'fa-trash')]`);
        let txtCreatedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`);

        if ((await this.driverService.isExisted(lblCaseTitle))) {//if a case at row {i} existing
          let actualTitle = await this.driverService.getText(lblCaseTitle);
          if (actualTitle.localeCompare(caseTitle) === 0) {// if title of case at row is = {caseTitle}
            createdDate = await this.driverService.getText(txtCreatedDate);
            await this.driverService.waitUntilElementLoaded(btnDeleteCase);
            await this.driverService.click(btnDeleteCase);
            position = i;
            break;
          }
        }
      }
    } catch (error) {
      console.log("Error: Delete case with title");
      console.log(error);
      position = -2;
    } finally {
      return [position, createdDate];
    }
  }

  public async assertCase(
    positionRow: number = 1,
    Casetitle: string,
    Queue: string,
    Priority: string,
    Assignedto: string,
    Duedate: string,
    createddate: string,
  ) {
    let actualCasetitle: string = "";
    let actualDueDate: string = "";
    let actualQueue: string = "";
    let actualPriority: string = "";
    let actualAssignedTo: string = "";
    let actualCreatedDate: string = "";

    try {
      //xpath of element at Case list
      let lblAssignee = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-assignee')]//*[self::*[text()]]`);
      let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
      let lblDuaDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-due-date')]//*[self::*[text()]]`);
      let lblPriority = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-priority')]//*[self::*[text()]]`);
      let lblQueue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-queue')]//*[self::*[text()]]`);
      let lblCreatedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`);

      await this.driverService.waitForSeconds(7000);
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(lblAssignee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);


      actualCasetitle = await this.driverService.getText(lblCaseTitle);
      actualDueDate = await this.driverService.getText(lblDuaDate);
      actualQueue = await this.driverService.getText(lblQueue);
      actualPriority = await this.driverService.getText(lblPriority);
      actualAssignedTo = await this.driverService.getText(lblAssignee);
      actualCreatedDate = await this.driverService.getText(lblCreatedDate);

    } catch (error) {
      console.log("Assert Case");
      console.log(error);
      return false;
    }

    if (actualCreatedDate.localeCompare(createddate) !== 0) {
      if (
        Number(actualCreatedDate.substring(14, 16)) -
        Number(createddate.substring(14, 16)) <
        3
      ) {
        createddate = actualCreatedDate;
      }
    }
    if (actualDueDate.localeCompare(Duedate) !== 0) {
      if (
        Number(actualDueDate.substring(14, 16)) -
        Number(Duedate.substring(14, 16)) <
        3
      ) {
        Duedate = actualDueDate;
      }
    }
    return this.driverService.validateRecord(
      scenarioName,
      [actualCasetitle, Casetitle, "Assert at Title: Incorrect Title!"],
      [actualQueue, Queue, "Assert at Queue: Incorrect Queue!"],
      [actualPriority, Priority, "Assert at Priority: Incorrect Priority!"],
      [actualAssignedTo, Assignedto, "Assert at Assinged: Incorrect Assigned!"],
      [actualDueDate, Duedate, "Assert at Due Date: Incorrect Due Date!"],
      [actualCreatedDate, createddate, "Assert at Created Date: Incorrect Created Date!"]
    );
  }
}

