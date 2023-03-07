import { strictEqual, notStrictEqual } from "assert";
import { compareDesc } from "date-fns";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, waitUntilHorizontalProgressBarLoaded, logFailMessage, logWarningMessage, logFailTestcase, logSuccessMessage, reloadTable, logInfoMessage } from "../../../../../shared/functions";
import { toastSuccess } from "../../../../../shared/variables";


export class CaseList extends BasePage{
  protected btnCreate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-create-btn']");

  //xpath of elements at Case list in entity detail
  protected lblReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[1]//td[contains(@class,'pgs-task-reference')]//*[self::*[text()]]`);
  protected lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[1]//td[contains(@class,'pgs-task-title')]//a`);
  protected cmbReportedByMe = By.xpath("//*[@id='pgs-task-list-tab-type']");
  private btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");
  private dropdownQueue = By.xpath(`//ng-select//input[@id="pgs-task-list-tab-type"]`);



  public async switchQueue(QueueName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.dropdownQueue);
      await this.driverService.setText(this.dropdownQueue, QueueName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(QueueName, "", this.driverService);

      return true;
    } catch (error) {
      console.log(`switchQueue`);
      console.log(error);
      return false;
    }
  }

  public async openReportedByMeCaseList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbReportedByMe);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let textDropdown = await this.driverService.getText(By.xpath("//*[@id='pgs-task-list-tab-type']/parent::div/parent::div//span[2]"));
      if (textDropdown.localeCompare("Reported by me") === 0) {
        return true;
      }
      await this.driverService.setText(this.cmbReportedByMe, "Reported by me");
      await this.driverService.pressEnter(this.cmbReportedByMe);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.waitForSeconds(3000);
      return true;
    } catch (error) {
      console.log("openReportedByMeCaseList");
      console.log(error);
      return false;
    }
  }

  public async openAssignUserFormByName(selectedCase: string): Promise<any> {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblCaseTitle = By.xpath(`(//app-edit-link-col/a)[${i}]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // logFailMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnAssign = By.xpath(`(//*[@id='pgs-assign-case-act'])[${i}]`);
            await this.driverService.click(btnAssign);
            return i;
          }
        }
      }
      logFailMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
      return -1;
    } catch (error) {
      console.log("openAssignUserFormByName");
      console.log(error);
      return -1;
    }
  }

  public async openDetailCaseByName(selectedCase: string): Promise<number> {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      const tabCaseOpening = By.xpath(`//app-task-page//li[@title='${selectedCase}']/*[@aria-selected='true']`);
      if (await this.driverService.isExisted(tabCaseOpening)) {
        return 1;
      }
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      for (let i = 1; i <= 30; i++) {
        const lblCaseTitle = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${i}]//app-edit-link-col/a | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${i}]//app-edit-link-col/a)[last()])[1]`);
        if (await this.driverService.isExisted(lblCaseTitle)) {
          const nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            await this.driverService.click(lblCaseTitle);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return i;
          }
        }
      }
      logWarningMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
      return -1;
    } catch (error) {
      console.log("openDetailCaseManagementByName");
      console.log(error);
      return -1;
    }
  }

  public async openDetailCaseByReference(reference: string){
    try {
      const lblTitle = By.xpath(`//tbody//tr[./td[contains(@class,'-reference')]/span[text()=' ${reference} ']]/td[contains(@class,'-title')]`);
      await this.driverService.waitUntilElementVisible(lblTitle);
      await this.driverService.click(lblTitle);
      return true;
    } catch (error) {
      console.log("openDetailCaseByReference");
      console.log(error);
      return false;
    }
  }
  public async openEditCaseFormByName(selectedCase: string): Promise<number> {
    try {
      await this.driverService.waitForSeconds(5000);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await this.driverService.pressTabCurrentElement();
      await this.driverService.pressTabCurrentElement();
      for (let i = 1; i <= 30; i++) {
        let lblCaseTitle = By.xpath(`(//app-edit-link-col/a)[${i}]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // logFailMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnEdit = By.xpath(`(//*[@id='pgs-edit-case-act'])[${i}]`);
            await this.driverService.click(btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return i;
          }
        }
      }
      logFailMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
      return 0;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return 0;
    }
  }



  public async deleteCaseByName(selectedCase: string): Promise<any> {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblCaseTitle = By.xpath(`(//app-edit-link-col/a)[${i}]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          logFailMessage(`Can't find account with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnDelete = By.xpath(`(//*[@id='pgs-delete-case-act'])[${i}]`);
            let lblCreatedDate = await this.driverService.getText(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`));
            await this.driverService.waitUntilElementLoaded(btnDelete);
            await this.driverService.click(btnDelete);
            return [i, lblCreatedDate];
          }
        }
      }
      logFailMessage(`Can't find account with name \"${selectedCase}\" into Case List`);
      return [-1, -1];
    } catch (error) {
      console.log("deleteCaseManagementByName");
      console.log(error);
      return [-1, -1];
    }
  }

  public async deleteCaseByName_v2(CaseName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let positionRow = 1; positionRow <= 10; positionRow++) {
        let txtTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-title")]`);
        let txtTitleValue = await this.driverService.getText(txtTitle);
        if (txtTitleValue == CaseName) {
          let btnDelete = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[.="${CaseName}"]/preceding-sibling::td//button[@id="pgs-delete-fnol-act"]`);
          await this.driverService.waitUntilElementLoaded(btnDelete);
          await this.driverService.click(btnDelete);
          await this.driverService.waitForSeconds(100);
          return true;
        }
      }
    }
    catch (error) {
      console.log(`deleteCaseByName_v2`);
      console.log(error);
      return false;
    }

  }

  public async pressCreate() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnCreate);
      return true;
    } catch (error) {
      console.log("pressCreate");
      console.log(error);
      return false;
    }
  }

  public async waitToastMessageVisible() {
    await this.driverService.waitUntilElementLoaded(toastSuccess);
    await this.driverService.waitForSeconds(3000);
  }

  public async assertAssignUser(positionRow: number, AssignedTo: string) {
    let lblAssignee = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-assignee')]//*[self::*[text()]]`);

    await this.driverService.waitUntilElementLoaded(lblAssignee);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    let actualAssignee = await this.driverService.getText(lblAssignee);
    await this.driverService.validateTestCase("[TC] [Cases Management] Assign user successfully",
      [actualAssignee, AssignedTo, "Assert at Assignee: Incorrect Assignee!"]
    );
  }
  public async assertDeleteCase(positionRow: number, caseTitle: string, createdDate: string) {
    let lblCaseTitle = By.xpath(
      `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task') and contains(@class,'title')]//*[self::*[text()]]`
    );
    let lblCreatedDate = By.xpath(
      `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`
    );
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    if (await this.driverService.isExisted(this.lblCaseTitle)) {
      let actualCaseTitle = await this.driverService.getText(lblCaseTitle);
      let actualCreatedDate = await this.driverService.getText(lblCreatedDate);

      if (caseTitle.localeCompare(actualCaseTitle) === 0) {
        if (createdDate.localeCompare(actualCreatedDate) === 0) {
          logWarningMessage("Can't delete case: " + caseTitle);
          logFailTestcase(false, "[TC] [Cases Management] Delete a case successfully: Test case is failed!");
        }
      } else {
        logSuccessMessage("[TC] [Cases Management] Delete a case successfully: Test case is passed!");
      }
    }
  }
  public async assertCase(
    positionRow: number = 1,
    CaseTitle: string,
    CaseType: string,
    Entity: string,
    //CreatedDate: string,
    DueDate: string,
    Priority: string,
    Status: string,
    AssignedTo: string,
    Queue: string
  ): Promise<boolean> {
    try {
      let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-title')]//*[self::*[text()]]`);
      let lblCaseType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-case-type')]//*[self::*[text()]]`);
      let lblEntity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-entity')]//*[self::*[text()]]`);
      let lblCreatedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`);
      let lblDueDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-due-date')]//*[self::*[text()]]`);
      let lblPriority = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-priority')]//*[self::*[text()]]`);
      let lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-status')]//*[self::*[text()]]`);
      let lblAssignee = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-assignee')]//*[self::*[text()]]`);
      let lblQueue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-queue')]//*[self::*[text()]]`);

      await this.driverService.waitUntilElementLoaded(lblCaseTitle);
      await this.driverService.waitForSeconds(10000);
      await reloadTable(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (!DueDate) DueDate = "N/A";
      if (!AssignedTo) AssignedTo = "N/A";

      let actualCaseTitle = await this.driverService.getText(lblCaseTitle);
      let actualCaseType = await this.driverService.getText(lblCaseType);
      let actualEntity = await this.driverService.getText(lblEntity);
      let actualDueDate = await this.driverService.getText(lblDueDate);

      //let actualCreatedDate = await this.driverService.getText(lblCreatedDate);
      //Maximize delay time is 3 minutes.
      // if (actualCreatedDate.localeCompare(CreatedDate) !== 0) {
      //   if (Number(actualCreatedDate.substring(14, 16)) - Number(CreatedDate.substring(14, 16)) < 3) {
      //     CreatedDate = actualCreatedDate;
      //   }
      // }

      let actualPriority = await this.driverService.getText(lblPriority);
      let actualStatus = await this.driverService.getText(lblStatus);
      let actualAssignee = await this.driverService.getText(lblAssignee);
      let actualQueue = await this.driverService.getText(lblQueue);

      return await this.driverService.validateRecord(
        actualCaseTitle,
        [actualCaseTitle, CaseTitle, "Assert at Case Title: Incorrect Case Title"],
        [actualCaseType, CaseType, "Assert at Case Type: Incorrect Case Type"],
        [actualEntity, Entity, "Assert at Entity: Incorrect Entity"],
        //[actualCreatedDate, CreatedDate, "Assert at Created Date: Incorrect Created Date"],
        [actualDueDate, DueDate, "Assert at Due Date: Incorrect Due Date"],
        [actualPriority, Priority, "Assert at Priority: Incorrect Priority"],
        [actualStatus, Status, "Assert at Status: Incorrect Status"],
        [actualAssignee, AssignedTo, "Assert at Assigned To: Incorrect Assigned To"],
        [actualQueue, Queue, "Assert at Queue: Incorrect Queue"]
      );
    } catch (error) {
      console.log("assertCaseManagement");
      console.log(error);
      return false;
    }
  }
  public async assertCloseCase(positionRow = 1, expectedStatusCase: string) {
    let actualStatusCase: string = "";
    try {
      await reloadTable(this.driverService);
      let lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-status')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblStatus);
      actualStatusCase = await this.driverService.getText(lblStatus);
    } catch (error) {
      console.log("Assert Close case");
      console.log(error);
    }
    await this.driverService.validateTestCase("Close case successfully",
      [actualStatusCase, expectedStatusCase, "Assert at Status case: Incorrect Status case!"]
    );

  }
  public async verifyButtonsOnTopOfCaseTable() {
    let countError = 0;
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      logInfoMessage("\tVerify buttons at Case list:");

      //Verify "Create" button
      if (!(await this.driverService.isExisted(this.btnCreate))) {
        logWarningMessage(`'Can't find "Create" button on Case list`);
        countError++;
      }

      //Verify "Queue option" dropdown 
      if (!(await this.driverService.isExisted(this.cmbReportedByMe))) {
        logWarningMessage(`'Can't find Queue option dropdown on Case list`);
        countError++;
      }

      //Verify "Search and Filter" button
      if (!(await this.driverService.isExisted(this.btnSearchAndFilter))) {
        logWarningMessage(`'Can't find "Search & Filter" button on Case list`);
        countError++;
      }
    } catch (error) {
      console.log("verifyButtonsOnTopOfCaseTable");
      console.log(error);
      return false;
    }
    if (countError > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  public async verifyColumnsOfCaseTable() {
    let countError = 0;
    try {
      logInfoMessage('\tVerify columns of Case list:');
      const titleColumns = ["Action", "Case title", "Reference", "Case type", "Entity", "Created date",
        "Remaining time", "Due date", "Priority", "Status", "Assignee", "Queue"];

      for (const element of titleColumns) {
        const title = By.xpath(`//table//th//span[text()='${element}']`);
        if (!(await this.driverService.isExisted(title))) {
          logWarningMessage(`Case list is missing "${element}" column!`);
          countError++;
        }
      }
    } catch (error) {
      console.log("verifyColumnsOfCaseTable");
      console.log(error);
      return false;
    }
    return countError === 0;
  }

  public async checkCaseWithNameNotExisted(saleName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const lblFirstCaseName = By.xpath('//table//tr[1]//app-edit-link-col/a');
      await this.driverService.waitUntilElementLoaded(lblFirstCaseName);
      const actualSaleName = await this.driverService.getText(lblFirstCaseName);
      return saleName.localeCompare(actualSaleName) !== 0;
    } catch (error) {
      console.log("checkCaseWithNameNotExisted");
      console.log(error);
      return true;
    }
  }

  public async openCloseCaseFormByName(selectedCase: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 10; i++) {
        let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${i}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // do nothing
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnClose = By.xpath(`(//*[@id='pgs-close-case-act'])[${i}]`);
            await this.driverService.click(btnClose);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find account with name \"${selectedCase}\" into Case List`);
      return false;
    } catch (error) {
      console.log("openCloseCaseFormByName");
      console.log(error);
      return false;
    }
  }

  public async assertCaseExistence(
    positionRow: number = 1,
    Casetitle: string,
    Queue: string,
    Priority: string,
    Duedate: string,
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", Casetitle, `Note does not exist "${Casetitle}"`);
    } else {
      let actualCaseTitle: string = "";
      let actualQueue: string = "";
      let actualPriority: string = "";
      let actualDueDate: string = "";

      let lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-case-title')]//*[self::*[text()]]`);
      let lblDueDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-due-date')]//*[self::*[text()]]`);
      let lblPriority = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-priority')]//*[self::*[text()]]`);
      let lblQueue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[${positionRow}]/td[contains(@class,'pgs-task-queue')]//*[self::*[text()]]`);


      try {
        if (await this.driverService.isExisted(lblCaseTitle)) {
          await this.driverService.waitUntilElementLoaded(lblCaseTitle);
          actualCaseTitle = await this.driverService.getText(lblCaseTitle);
          actualQueue = await this.driverService.getText(lblQueue);
          actualPriority = await this.driverService.getText(lblPriority);
          actualDueDate = await this.driverService.getText(lblDueDate);
        } else {
          console.info("Case does not exist");
          return;
        }
      } catch (error) {
        console.error("Assert Assign note");
        console.error(error);
      }
      notStrictEqual(actualCaseTitle, Casetitle, "Assert at Title");
      notStrictEqual(actualQueue, Queue, "Assert at Description");
      // notStrictEqual(actualPriority, Priority, "Assert at Priority");
      // notStrictEqual(actualDueDate, Duedate, "Assert at Due Date");
    }
  }

  //#region  Validate value on List

  public async validateCaseTitleValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let txtCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-title") or contains(@class, "pgs-task-case-title")]//a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtCaseTitle);
      let ActualCaseTitle = await this.driverService.getText(txtCaseTitle);
      if (isUsedForSearch) {
        return ActualCaseTitle.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Case Title`, [ActualCaseTitle, ExpectedValue, `Incorrect Case Title`]);
    } catch (error) {
      console.log(`validateCaseTitleValueOnList`);
      console.log(error);
      return false;
    }
  }


  public async validateReferenceValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let txtReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-reference")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtReference);
      let ActualValue = await this.driverService.getText(txtReference);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Reference`, [ActualValue, ExpectedValue, `Incorrect Reference`]);
    } catch (error) {
      console.log(`validateReferenceValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateEntityValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtEntityValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[count(//table/thead/tr/th[.="Entity"]/preceding-sibling::th)+1]//app-related-entities`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtEntityValue);
      let ActualEntityValue = await this.driverService.getText(txtEntityValue)
      if (ActualEntityValue.includes(ExpectedValue) == true) {
        console.log(`Validate Entity field: passed`);
        return true;
      }
      else {
        console.log(`Validate Entity field failed`);
        return false;
      }
    } catch (error) {
      console.log(`validateEntityValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateDueDateOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let dtpDueDateValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-due-date") or contains(@class, "pgs-task-case-due-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(dtpDueDateValue);
      let ActualDueDate = await (await this.driverService.getText(dtpDueDateValue)).substring(0, 10);
      return await this.driverService.validateRecord(`Validate Due Date`, [ActualDueDate, ExpectedValue, `Incorrect Due Date`]);
    } catch (error) {
      console.log(`validateDueDateOnList`);
      console.log(error);
      return false;
    }
  }

  public async validatePriorityOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtPriorityValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-priority")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtPriorityValue);
      let ActualPriority = await this.driverService.getText(txtPriorityValue);
      return await this.driverService.validateRecord(`Validate Priority`, [ActualPriority, ExpectedValue, `Incorrect Priority!`]);
    } catch (error) {
      console.log(`validatePriorityOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateAssigneeValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtAssigneeValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-assignee")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtAssigneeValue);
      let ActualAssignee = await this.driverService.getText(txtAssigneeValue);
      return await this.driverService.validateRecord(`Validate Assignee`, [ActualAssignee, ExpectedValue, `Incorrect Assignee!`]);
    } catch (error) {
      console.log(`validateAssigneeOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateQueueValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtQueueValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-queue")]//a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtQueueValue);
      let ActualQueueValue = await this.driverService.getText(txtQueueValue);
      return await this.driverService.validateRecord(`Validate Queue Value`, [ActualQueueValue, ExpectedValue, `Incorrect Queue`]);
    } catch (error) {
      console.log(`validateQueueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateCreateDateValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtCreateDateValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-created-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtCreateDateValue);
      let ActualValue = await this.driverService.getText(txtCreateDateValue);

      if (ActualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(ExpectedValue.substring(14, 16)) - Number(ActualValue.substring(14, 16)) < 3) {
          ActualValue = ExpectedValue;
        }
      }
      return await this.driverService.validateRecord(`Validate Create Date Value`, [ActualValue, ExpectedValue, `Incorrect Create Date`]);
    } catch (error) {
      console.log(`validateCreateDateOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtStatusValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-status")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtStatusValue);
      let ActualValue = await this.driverService.getText(txtStatusValue);
      return await this.driverService.validateRecord(`Validate Status`, [ActualValue, ExpectedValue, `Incorrect Status!`]);
    } catch (error) {
      console.log(`validateStatusValueOnList`);
      console.log(error);
      return false;
    }
  }


  public async validateDueDateFromToOnList(DueDateFrom: string, DueDateTo: string, positionRow: number = 1) {
    try {
      let dtpDueDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-due-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualDueDate = await this.driverService.getText(dtpDueDate);

      const actualDueDateValue = new Date(parseInt(actualDueDate.substring(6, 10)), parseInt(actualDueDate.substring(3, 5)), parseInt(actualDueDate.substring(0, 2)));

      const expectedDueDateForm = DueDateFrom ? new Date(parseInt(DueDateFrom.substring(6, 10)), parseInt(DueDateFrom.substring(3, 5)), parseInt(DueDateFrom.substring(0, 2))) : new Date(0);

      const expectedDueDateTo = DueDateTo ? new Date(parseInt(DueDateTo.substring(6, 10)), parseInt(DueDateTo.substring(3, 5)), parseInt(DueDateTo.substring(0, 2))) : new Date(8640000000000000);

      logInfoMessage("Validate Due date On List")
      logInfoMessage("Actual Due Date: " + actualDueDate);
      logInfoMessage("Actual Due Date Value: " + actualDueDateValue.toString());
      logInfoMessage("Expected Due Date From: " + expectedDueDateForm.toString());
      logInfoMessage("Expected Due Date To: " + expectedDueDateTo.toString());

      if (
        compareDesc(expectedDueDateForm, actualDueDateValue) >= 0 &&
        compareDesc(actualDueDateValue, expectedDueDateTo) >= 0
      ) {
        logSuccessMessage("Validate Due Date: Test passed!")
        return true;
      } else return false;
    } catch (error) {
      console.log("validateDueDateFromToOnList\n" + error);
      return false;
    }
  }

  public async validateCreatedDateFromToOnList(CreatedDateFrom: string, CreatedDateTo: string, positionRow: number = 1) {
    try {
      let dtpCreatedDate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-created-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualCreatedDate = await this.driverService.getText(dtpCreatedDate);

      const actualCreatedDateValue = new Date(parseInt(actualCreatedDate.substring(6, 10)), parseInt(actualCreatedDate.substring(3, 5)), parseInt(actualCreatedDate.substring(0, 2)));

      const expectedCreatedDateForm = CreatedDateFrom ? new Date(parseInt(CreatedDateFrom.substring(6, 10)), parseInt(CreatedDateFrom.substring(3, 5)), parseInt(CreatedDateFrom.substring(0, 2))) : new Date(0);

      const expectedCreatedDateTo = CreatedDateTo ? new Date(parseInt(CreatedDateTo.substring(6, 10)), parseInt(CreatedDateTo.substring(3, 5)), parseInt(CreatedDateTo.substring(0, 2))) : new Date(8640000000000000);

      logInfoMessage("Validate Created date On List")
      logInfoMessage("Actual Created Date: " + actualCreatedDate);
      logInfoMessage("Actual Created Date Value: " + actualCreatedDateValue.toString());
      logInfoMessage("Expected Created Date From: " + expectedCreatedDateForm.toString());
      logInfoMessage("Expected Created Date To: " + expectedCreatedDateTo.toString());

      if (
        compareDesc(expectedCreatedDateForm, actualCreatedDateValue) >= 0 &&
        compareDesc(actualCreatedDateValue, expectedCreatedDateTo) >= 0
      ) {
        logSuccessMessage("Validate Created Date: Test passed!")
        return true;
      } else return false;
    } catch (error) {
      console.log("validateCreatedDateFromToOnList\n" + error);
      return false;
    }
  }


  //#endregion

  public async pressStatusFilterOnList(){
    try {
      let statusFilter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[@id='status-colum-dropdown']`);
      await this.driverService.waitUntilElementLoaded(statusFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
      await this.driverService.click(statusFilter);
      return true;
    } catch (error) {
      console.log('pressStatusFilterOnList');
      console.log(error);
      return false;
    }
  }

  public async selectStatusToFilterStatusColumnOnList(statusName: string){
    try {
      let lblStatusFilter = By.xpath(`//div[contains(@aria-labelledby,'status-colum-dropdown')]//span[text()='${statusName}']`);
      await this.driverService.waitUntilElementLoaded(lblStatusFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
      await this.driverService.click(lblStatusFilter);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log('selectStatusToFilterStatusColumnOnList');
      console.log(error);
      return false;
    }

  }

  public async getReferenceValueOnList(positionRow: number = 1) {
    try {
      let txtReferenceValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-reference")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtReferenceValue);
      let ActualValue = await this.driverService.getText(txtReferenceValue);
      return ActualValue;
    } catch (error) {
      console.log(`getReferenceValueOnList`);
      console.log(error);
      return "";
    }
  }

  public async getStatusValueOnList(positionRow: number = 1) {
    try {
      let txtStatusValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-status")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtStatusValue);
      let ActualValue = await this.driverService.getText(txtStatusValue);
      return ActualValue;
    } catch (error) {
      console.log(`getStatusValueOnList`);
      console.log(error);
      return "";
    }
  }


  public async getValueCreatedDateOnCaseListByRow(positionRow:number = 1){
    try {
      const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-task-created-date')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
  } catch (error) {
      console.log('getValueCreatedDateOnCaseListByRow');
      console.log(error);
      return "";
  }
  }
  

  public async getValueDueDateOnCaseListByRow(positionRow:number = 1){
    try {
      const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-task-due-date')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
  } catch (error) {
      console.log('getValueDueDateOnCaseListByRow');
      console.log(error);
      return "";
  }
  }

  public async getValuePriorityOnCaseListByRow(positionRow:number = 1){
    try {
      const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-task-priority')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
  } catch (error) {
      console.log('getValuePriorityOnCaseListByRow');
      console.log(error);
      return "";
  }
  }
}
