import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountTabCaseForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseForm";
import { AccountTabCaseList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseList";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");

let accountTabCaseList: AccountTabCaseList;
let accountTabCaseForm: AccountTabCaseForm;
let accountTabSummary: AccountTabSummary;

let globalPageObject: GlobalPageObject;
let fileDataEdit: string = "";
let possitionRow: number = -1;

let createdDate: string;
Before(async function () {
  const context: ICommonContext = this.context;
  accountTabCaseList = new AccountTabCaseList(context.driverService);
  accountTabCaseForm = new AccountTabCaseForm(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});
Given("User is on Case List", async function () {
  let temp = await globalPageObject.navigateToSubCases();
  logFailTestcase(temp, "Navigates to Case tab failed!");
});

When("User selects a case from precondition and updates case from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;

  const selectedCase = rows[0].SelectedCase;
  const CaseTitle = rows[0].CaseTitle;
  const Workflow = rows[0].Workflow;
  const CaseType = rows[0].CaseType;
  const SelectEntityType = rows[0].SelectEntityType;
  const SearchEntity = rows[0].Entity;
  const Description = rows[0].Description;
  const DueDate = rows[0].Duedate;
  const Queue = rows[0].Queue;
  const Priority = rows[0].Priority;

  const AssignedTo = rows[0].Assignedto;

  let temp = await accountTabCaseList.openEditCaseFormByName(selectedCase);
  logFailTestcase(temp, "Can't open Edit case form!");
  createdDate = temp[1].toString();
  possitionRow = temp[0];

  temp = await accountTabCaseForm.clearOldDataOfCaseTitleOnEditCaseForm();
  logFailTestcase(temp, "clear Old Data Of Case Title Failed !");
  if (CaseTitle) {
    temp = await accountTabCaseForm.inputCaseTitleOnCaseForm(CaseTitle);
    logFailTestcase(temp, "Input Case Title failed !");
  }

  temp = await accountTabCaseForm.clearOldDataOfWorkflowOnEditCaseForm();
  logFailTestcase(temp, "clear Old Data Of Workflow Failed !");
  if (Workflow) {
    temp = await accountTabCaseForm.inputWorkFlowOnCaseForm(Workflow);
    logFailTestcase(temp, "Input Workflow failed !");
  }

  temp = await accountTabCaseForm.clearOldDataOfCaseTypeOnEditCaseForm();
  logFailTestcase(temp, "clear Old Data Of Case Type Failed !");
  if (CaseType) {
    temp = await accountTabCaseForm.inputCaseTypeOnCaseForm(CaseType);
    logFailTestcase(temp, "Input Case Type failed !");
  }

  // temp = await accountTabCaseForm.clearOldDataOfRelatedRecordsOnEditCaseForm();
  // logFailTestcase(temp, "clear Old Data Of Related Records Failed !");
  if (SelectEntityType) {
    temp = await accountTabCaseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
    logFailTestcase(temp, "Input Select Entity Type failed !");

    if (SearchEntity) {
      temp = await accountTabCaseForm.inputSearchEntityOnCaseForm(SearchEntity);
      logFailTestcase(temp, "Input Search Entity failed !");
    }
  }

  if (Description) {
    temp = await accountTabCaseForm.inputDescriptionOnCaseForm(Description);
    logFailTestcase(temp, "Input Description failed !");
  }

  if (DueDate) {
    temp = await accountTabCaseForm.inputDueDateOnCaseForm(DueDate);
    logFailTestcase(temp, "Input DueDate failed !");
  }

  temp = await accountTabCaseForm.clearOldDataOfQueueOnEditCaseForm();
  logFailTestcase(temp, "clear Old Data Of Queue Failed !");
  if (Queue) {
    temp = await accountTabCaseForm.inputQueueOnCaseForm(Queue);
    logFailTestcase(temp, "Input Queue failed !");
    temp = await accountTabCaseForm.clearOldDataOfAssignedToOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Assigned To Failed !");
    if (AssignedTo) {
      temp = await accountTabCaseForm.inputAssignedToOnCaseForm(AssignedTo);
      logFailTestcase(temp, "Input Assigned to failed !");
    }
  }

  temp = await accountTabCaseForm.clearOldDataOfPriorityOnEditCaseForm();
  logFailTestcase(temp, "clear Old Data Of Priority Failed !");
  if (Priority) {
    temp = await accountTabCaseForm.inputPriorityOnCaseForm(Priority);
    logFailTestcase(temp, "Input Priority failed !");
  }

  if (DueDate) {
    //validate Due Date
    temp = await accountTabCaseForm.validateDueDateValueOnCaseForm(DueDate);
    logFailTestcase(temp, "Due date shows incorrectly !");
  }

  temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Can't press Save case form!");

  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp, "Can't press Save case form!");
});

Then("System shows updated case in the Case list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  const title = rows[0].CaseTitle;
  const queue = rows[0].Queue;
  const priority = rows[0].Priority;
  const assignedto = rows[0].Assignedto;
  const duedate = rows[0].Duedate;

  await globalPageObject.reloadTable();
  await accountTabCaseList.assertCase(
    possitionRow,
    title,
    queue,
    priority,
    assignedto,
    duedate,
    createdDate
  );

  await globalPageObject.closeOpeningForm();
});

Then("System shows updated case in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
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
