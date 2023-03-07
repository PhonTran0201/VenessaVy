import { Before, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountTabCaseForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseForm";
import { AccountTabCaseList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseList";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, reloadTable } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let accountTabCaseList: AccountTabCaseList;
let accountTabCaseForm: AccountTabCaseForm;
let accountTabSummary: AccountTabSummary;
let globalPageObject: GlobalPageObject;
let fileDataCreate: string = "";


Before(async function () {
  const context: ICommonContext = this.context;
  accountTabCaseList = new AccountTabCaseList(context.driverService);
  accountTabCaseForm = new AccountTabCaseForm(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});
When("User opens the case on Case tab {string}", async (filename) => {
  let data = await DataRepo.getInstance().loadData(filename);

  let temp = await accountTabCaseList.openDetailCaseByName(data[0].CaseTitle);
  logFailTestcase(temp > 0, "opens the case on Case tab failed!")
})
When("User inputs valid case data from csv file {string}", async function (filename) {
  let rows
  if (filename.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(filename));
  } else {
    rows = await DataRepo.getInstance().loadData(filename);
  }
  fileDataCreate = filename;
  let temp = true;
  for (let obj of rows) {
    const DontpressCreateButton = obj.DontPressCreateButton;
    if (!DontpressCreateButton) {
      temp = await accountTabCaseList.pressCreate();
      logFailTestcase(temp, "Can't open New case form!");
    }
    const CaseTitle = obj.CaseTitle;
    const Workflow = obj.Workflow;
    const CaseType = obj.CaseType;
    const SelectEntityType = obj.SelectEntityType;
    const SearchEntity = obj.Entity || obj.SearchEntity;
    const Description = obj.Description;
    const DueDate = obj.Duedate;
    const Queue = obj.Queue;
    const Priority = obj.Priority;
    const AssignedTo = obj.Assignedto || obj.AssignedTo;

    if (CaseTitle) {
      temp = await accountTabCaseForm.inputCaseTitleOnCaseForm(CaseTitle);
      logFailTestcase(temp, "Input case title On case form failed!");
    }
    if (Workflow) {
      temp = await accountTabCaseForm.inputWorkFlowOnCaseForm(Workflow);
      logFailTestcase(temp, "Input workflow on case form failed!");
    }
    if (CaseType) {
      temp = await accountTabCaseForm.inputCaseTypeOnCaseForm(CaseType);
      logFailTestcase(temp, "Input case type on case form failed!");
    }
    if (SelectEntityType) {
      await accountTabCaseForm.clearOldDataOfRelatedRecordsOnEditCaseForm();
      temp = await accountTabCaseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
      logFailTestcase(temp, "Input select entity type on case form failed!");
      if (SearchEntity) {
        temp = await accountTabCaseForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input search entity on case form failed!");
      }
    }

    if (Description) {
      temp = await accountTabCaseForm.inputDescriptionOnCaseForm(Description);
      logFailTestcase(temp, "Input description on case form failed!");
    }
    if (DueDate) {
      temp = await accountTabCaseForm.inputDueDateOnCaseForm(DueDate);
      logFailTestcase(temp, "Input due date on case form failed!");
    }
    if (Queue) {
      temp = await accountTabCaseForm.inputQueueOnCaseForm(Queue);
      logFailTestcase(temp, "Input queue On case form failed!");
      if (AssignedTo) {
        temp = await accountTabCaseForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned to case form failed!");
      }
    }
    if (Priority) {
      temp = await accountTabCaseForm.inputPriorityOnCaseForm(Priority);
      logFailTestcase(temp, "Input priority on case form failed!");
    }

    if (DueDate) {
      //validate Due Date
      temp = await accountTabCaseForm.validateDueDateValueOnCaseForm(DueDate);
      logFailTestcase(temp, "Due date shows incorrectly !");
    }



    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save case form!");

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "Press save failed...Input invalid data!");
  }
}
);
Then("System shows new case in the Case list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const title = rows[i].CaseTitle;
    const queue = rows[i].Queue;
    const priority = rows[i].Priority;
    const assignedto = rows[i].Assignedto;
    const duedate = rows[i].Duedate;

    await accountTabCaseList.assertCase(
      j,
      title,
      queue,
      priority,
      assignedto,
      duedate,
      getCurrentDateTime()
    );
  }
  await globalPageObject.closeOpeningForm();
});

Then("System shows new case in the Case list {string}", async (filename) => {
  let rows
  if (filename.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(filename));
  } else {
    rows = await DataRepo.getInstance().loadData(filename);
  }
  let len = rows.length;
  let temp = true;
  let CreatedDate = getCurrentDateTime();
  for (let i = 0; i <= 5; i++) {
    await globalPageObject.reloadTable(3000);
    if (await accountTabCaseList.validateCreateDateValueOnList(CreatedDate, 1)) {
      break;
    }else if(i == 5){
      logFailTestcase(false, "System not show new case in the Case list");
    }
  }
  let Reference = await accountTabCaseList.getReferenceValueOnList(1);
  pushObjectToDataArrayWithUniqueKey("Reference", Reference);
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const CaseTitle = rows[i].CaseTitle;
    const CreatedDate = getCurrentDateTime();
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;
    const Assignedto = rows[i].Assignedto;
    const Duedate = rows[i].Duedate;
    const Status = rows[i].Status;

    if (CaseTitle) {
      temp = await accountTabCaseList.validateCaseTitleValueOnList(CaseTitle, j);
      logFailTestcase(temp, 'Validate CaseTitle on Case List failed!');
    }
    if (CreatedDate) {
      temp = await accountTabCaseList.validateCreateDateValueOnList(CreatedDate, j);
      logFailTestcase(temp, 'Validate CreatedDate on Case List failed!');
    }
    if (Duedate) {
      temp = await accountTabCaseList.validateDueDateOnList(Duedate, j);
      logFailTestcase(temp, 'Validate Duedate on Case List failed!');
    }
    if (Priority) {
      temp = await accountTabCaseList.validatePriorityOnList(Priority, j);
      logFailTestcase(temp, 'Validate Priority on Case List failed!');
    }
    if (Status) {
      temp = await accountTabCaseList.validateStatusValueOnList(Status, j);
      logFailTestcase(temp, 'Validate Status on Case List failed!');
    }
    if (Assignedto) {
      temp = await accountTabCaseList.validateAssigneeValueOnList(Assignedto, j);
      logFailTestcase(temp, 'Validate Assignedto on Case List failed!');
    }
    if (Queue) {
      temp = await accountTabCaseList.validateQueueValueOnList(Queue, j);
      logFailTestcase(temp, 'Validate Queue on Case List failed!');
    }
  }
});


Then("System shows new case in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp, "Navigates to summary failed!");
  temp = await accountTabSummary.selectSummaryViewLayout("Summary");
  // logFailTestcase(temp, `Select layout for summary tab failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const title = rows[i].CaseTitle;
    temp = await accountTabSummary.assertCaseSummary(j, title);
    logFailTestcase(temp);
  }
});